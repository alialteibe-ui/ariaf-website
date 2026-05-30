import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الخصوصية | أرياف زكي السالم للمياه الكبريتية",
  description: "سياسة الخصوصية لموقع أرياف زكي السالم للمياه الكبريتية في الأحساء.",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal antialiased">

      {/* Top bar */}
      <header className="border-b border-sand-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-brown-400 hover:text-gold-500 transition-colors duration-200 flex items-center gap-1"
          >
            ← الرئيسية
          </Link>
          <div className="text-right">
            <div className="font-serif text-base text-charcoal leading-tight">أرياف زكي السالم</div>
            <div className="text-[10px] text-gold-400 tracking-widest">للمياه الكبريتية</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-14">

        <div className="mb-10">
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
            قانوني
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-4">
            سياسة الخصوصية
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mb-6" />
          <p className="text-brown-400 text-sm leading-relaxed">
            آخر تحديث: {new Date().getFullYear()}م
          </p>
        </div>

        <div className="space-y-10 text-charcoal">

          <Section title="مقدمة">
            نحن في أرياف زكي السالم للمياه الكبريتية نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية.
            توضح هذه السياسة كيفية تعاملنا مع المعلومات التي تُشاركها معنا عبر الموقع أو واتساب.
          </Section>

          <Section title="البيانات التي نستقبلها">
            <p className="mb-3">عند استخدامك لنموذج الحجز في الموقع أو التواصل معنا عبر واتساب، قد تُشارك معنا المعلومات التالية:</p>
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>نوع الشاليه المطلوب</li>
              <li>تاريخ الزيارة وعدد الأشخاص</li>
              <li>أي ملاحظات أو طلبات خاصة</li>
              <li>رقم جوالك عبر محادثة واتساب</li>
            </ul>
          </Section>

          <Section title="كيف نستخدم البيانات">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>التواصل معك لتأكيد الحجز أو الرد على استفساراتك</li>
              <li>تحسين الخدمة وتجربة ضيوفنا بشكل عام</li>
              <li>لا نستخدم بياناتك لأي أغراض تجارية أو تسويقية خارج نطاق خدمتنا</li>
            </ul>
          </Section>

          <Section title="حماية البيانات">
            لا نبيع بياناتك الشخصية أو نشاركها مع أي طرف ثالث.
            التواصل يتم حصراً عبر واتساب المشفّر، ولا نحتفظ بأي قواعد بيانات إلكترونية تخزن معلوماتك.
          </Section>

          <Section title="التواصل عبر واتساب">
            جميع محادثات الحجز تتم عبر تطبيق واتساب. بمجرد تواصلك معنا فأنت توافق على تبادل المعلومات
            الضرورية لإتمام الحجز عبر هذه القناة. يمكنك طلب حذف بياناتك في أي وقت عبر إرسال طلب على
            الرقم +966567717401.
          </Section>

          <Section title="التحديثات">
            قد نُحدّث هذه السياسة من وقت لآخر. نشجعك على مراجعتها دورياً. الاستمرار في استخدام الموقع
            يعني قبولك للسياسة المحدّثة.
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-semibold text-lg text-charcoal mb-3 flex items-center gap-2">
        <span className="w-1 h-5 bg-gold-400 rounded-full inline-block flex-shrink-0" />
        {title}
      </h2>
      <div className="text-brown-400 text-sm leading-relaxed pr-3">{children}</div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-sand-200 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brown-400/60">
        <p>© {new Date().getFullYear()} أرياف زكي السالم للمياه الكبريتية. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="hover:text-gold-500 transition-colors">الشروط والأحكام</Link>
          <Link href="/booking-policy" className="hover:text-gold-500 transition-colors">سياسة الحجز</Link>
        </div>
      </div>
    </footer>
  );
}
