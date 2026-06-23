/**
 * Convert + optimize the raw HEIC chalet photos into web-ready WebP.
 *
 *   public/image/chalets-raw/<type>/*.HEIC   →   public/image/chalets/<type>/<type>-NN.webp
 *
 * ONLY processes: mini, small, medium.  maldives-vip is never touched.
 * Originals are read-only — nothing in chalets-raw is modified or deleted.
 *
 * Pipeline (realistic, non-generative): HEIC→JPEG decode → auto-orient →
 * resize to max 1600px wide → tiny brightness lift → very light sharpen →
 * WebP q82. Writes image-optimization-report.md.
 *
 * Run from the project root:  node scripts/optimize-chalet-images.mjs
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import sharp from "sharp";
import heicConvert from "heic-convert";

const IMAGE_ROOT = path.resolve(process.cwd(), "public/image");
const RAW_ROOT   = path.join(IMAGE_ROOT, "chalets-raw");
const OUT_ROOT   = path.join(IMAGE_ROOT, "chalets");
const TYPES      = ["mini", "small", "medium"]; // maldives-vip intentionally excluded

const MAX_WIDTH = 1600;
const QUALITY   = 82;

const kb = (bytes) => Math.round(bytes / 1024);
const pct = (before, after) =>
  before > 0 ? `${(((before - after) / before) * 100).toFixed(1)}%` : "—";

async function processType(type) {
  const srcDir = path.join(RAW_ROOT, type);
  const outDir = path.join(OUT_ROOT, type);
  await fs.mkdir(outDir, { recursive: true });

  // Match HEIC/HEIF case-insensitively; Arabic filenames & spaces are fine.
  const names = await fg(["*.heic", "*.heif"], {
    cwd: srcDir,
    onlyFiles: true,
    caseSensitiveMatch: false,
  });
  names.sort((a, b) => a.localeCompare(b, "ar"));

  const results = [];
  let counter = 0;

  for (const name of names) {
    const srcPath = path.join(srcDir, name);
    let beforeSize = 0;
    try {
      beforeSize = (await fs.stat(srcPath)).size;
    } catch {
      /* size unknown */
    }

    counter += 1;
    const outName = `${type}-${String(counter).padStart(2, "0")}.webp`;
    const outPath = path.join(outDir, outName);

    try {
      const inputBuf = await fs.readFile(srcPath);
      // Decode HEIC -> high-quality JPEG buffer (heic-convert applies orientation).
      const jpegBuf = Buffer.from(
        await heicConvert({ buffer: inputBuf, format: "JPEG", quality: 1 })
      );

      const info = await sharp(jpegBuf)
        .rotate() // honor any remaining EXIF orientation
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .modulate({ brightness: 1.03 }) // very slight, realistic lift
        .sharpen({ sigma: 0.5 }) // very light
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(outPath);

      results.push({
        src: name,
        beforeSize,
        out: outName,
        afterSize: info.size,
        heic: "نجح",
        ok: true,
      });
      console.log(`✓ ${type}/${name}  →  ${outName}  (${kb(beforeSize)}KB → ${kb(info.size)}KB)`);
    } catch (err) {
      counter -= 1; // keep success numbering contiguous
      results.push({
        src: name,
        beforeSize,
        out: "—",
        afterSize: 0,
        heic: `فشل: ${err.message}`,
        ok: false,
      });
      console.error(`✗ ${type}/${name}  —  ${err.message}`);
    }
  }

  return results;
}

async function main() {
  const byType = {};
  for (const type of TYPES) {
    byType[type] = await processType(type);
  }

  // ── Build the report ──────────────────────────────────────────────────────
  const lines = [];
  lines.push("# تقرير تحسين صور الشاليهات");
  lines.push("");
  lines.push(`التاريخ: ${new Date().toISOString().slice(0, 10)}`);
  lines.push("");
  lines.push(
    "المعالجة: HEIC→WebP · auto-orient · عرض أقصى 1600px · جودة 82 · شحذ خفيف · رفع إضاءة 3%."
  );
  lines.push("ملاحظة: مجلد maldives-vip لم يُمَسّ. الصور الأصلية في chalets-raw لم تُعدَّل أو تُحذف.");
  lines.push("");

  let grandBefore = 0;
  let grandAfter = 0;
  let okCount = 0;
  let failCount = 0;

  for (const type of TYPES) {
    const rows = byType[type];
    const ok = rows.filter((r) => r.ok).length;
    const fail = rows.length - ok;
    lines.push(`## ${type} — ${ok} نجحت${fail ? ` · ${fail} فشلت` : ""}`);
    lines.push("");
    lines.push("| الأصلية | الحجم قبل | الجديدة | الحجم بعد | التوفير | HEIC |");
    lines.push("|---|---|---|---|---|---|");
    for (const r of rows) {
      const before = r.beforeSize ? `${kb(r.beforeSize)} KB` : "—";
      const after = r.afterSize ? `${kb(r.afterSize)} KB` : "—";
      const saving = r.ok ? pct(r.beforeSize, r.afterSize) : "—";
      lines.push(`| ${r.src} | ${before} | ${r.out} | ${after} | ${saving} | ${r.heic} |`);
      grandBefore += r.beforeSize;
      grandAfter += r.afterSize;
      if (r.ok) okCount += 1;
      else failCount += 1;
    }
    lines.push("");
  }

  lines.push("## الإجمالي");
  lines.push("");
  lines.push(`- صور نجحت: ${okCount}`);
  lines.push(`- صور فشلت: ${failCount}`);
  lines.push(`- الحجم الكلي قبل: ${kb(grandBefore)} KB`);
  lines.push(`- الحجم الكلي بعد: ${kb(grandAfter)} KB`);
  lines.push(`- نسبة التوفير الكلية: ${pct(grandBefore, grandAfter)}`);
  lines.push("");

  const reportPath = path.resolve(process.cwd(), "image-optimization-report.md");
  await fs.writeFile(reportPath, lines.join("\n"), "utf8");

  console.log("\n──────────────");
  console.log(`نجحت: ${okCount} · فشلت: ${failCount}`);
  console.log(`التقرير: ${reportPath}`);

  // Emit a compact JSON summary for the calling shell (image lists per type).
  const summary = {};
  for (const type of TYPES) {
    summary[type] = byType[type].filter((r) => r.ok).map((r) => r.out);
  }
  console.log("SUMMARY_JSON=" + JSON.stringify(summary));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
