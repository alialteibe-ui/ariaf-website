import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الحجز | أرياف زكي السالم للمياه الكبريتية",
  description: "سياسة الحجز لشاليهات أرياف زكي السالم للمياه الكبريتية في الأحساء.",
  robots: { index: false },
};

export default function BookingPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal antialiased">

      {/* Top bar */}
      <header className="border-b border-sand-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-brown-400 hover:text-gold-500 transition-colors duration-200"
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

        {/* Page header */}
        <div className="mb-10">
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
            معلومات مهمة
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-4">
            سياسة الحجز
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mb-6" />
          <p className="text-brown-400 text-sm leading-relaxed">
            يُرجى قراءة هذه السياسة قبل إرسال طلب الحجز.
          </p>
        </div>

        <div className="space-y-10">

          <Section title="كيف يتم الحجز">
            <ul className="list-disc list-inside space-y-2 text-brown-400">
              <li>إرسال الطلب من الموقع لا يعني تأكيد الحجز مباشرة.</li>
              <li>الحجز النهائي يتم فقط بعد تأكيد الإدارة عبر واتساب.</li>
              <li>الأسعار والتوفر يتم تأكيدهما من الإدارة بعد استلام الطلب.</li>
            </ul>
          </Section>

          <Section title="خطوات إتمام طلبك">
            <ol className="list-decimal list-inside space-y-2 text-brown-400">
              <li>أكمل بيانات النموذج على الموقع.</li>
              <li>اضغط على زر الحجز — سيُفتح تطبيق واتساب برسالة جاهزة.</li>
              <li>
                اضغط <span className="font-semibold text-charcoal">إرسال</span> داخل واتساب لإتمام الطلب.
              </li>
              <li>ستتواصل معك الإدارة لتأكيد التوفر والسعر النهائي.</li>
            </ol>
          </Section>

          <Section title="شاليهات الميني">
            <ul className="list-disc list-inside space-y-2 text-brown-400">
              <li>شاليهات الميني حجزها مباشر من المكتب عند بوابة 2.</li>
              <li>لا يلزم حجز مسبق عبر الموقع لشاليهات الميني.</li>
              <li>الويكند قد يشهد ازدحامًا وانتظارًا — يُنصح بالحضور المبكر.</li>
            </ul>
          </Section>

          <Section title="الدفع">
            <ul className="list-disc list-inside space-y-2 text-brown-400">
              <li>لا يوجد دفع إلكتروني عبر الموقع حاليًا.</li>
              <li>طريقة الدفع يتم الاتفاق عليها مع الإدارة عند تأكيد الحجز.</li>
            </ul>
          </Section>

          <Section title="التعديل والإلغاء">
            <ul className="list-disc list-inside space-y-2 text-brown-400">
              <li>أي تعديل أو إلغاء يتم عبر واتساب حصراً.</li>
              <li>يُفضّل الإشعار بالإلغاء قبل ٢٤ ساعة على الأقل من موعد الزيارة.</li>
              <li>في حال وجود أي تغيير أو ملاحظة ستتواصل معك الإدارة مباشرة.</li>
            </ul>
          </Section>

          <Section title="التواصل">
            لأي استفسار تواصل معنا على واتساب:
            <br /><br />
            <a
              href="https://wa.me/966567717401"
              className="text-gold-500 font-semibold hover:underline"
            >
              +966567717401
            </a>
            <br />
            ساعات الرد: ٨ صباحاً — ١٠ مساءً يومياً.
          </Section>

        </div>

        {/* Back to booking button */}
        <div className="mt-14 text-center">
          <Link
            href="/#booking"
            className="inline-flex items-center gap-2 bg-palm-600 hover:bg-palm-500 text-white font-semibold text-sm px-7 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
          >
            العودة إلى الحجز
          </Link>
        </div>

      </main>

      <PageFooter />
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

function PageFooter() {
  return (
    <footer className="border-t border-sand-200 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brown-400/60">
        <p>© {new Date().getFullYear()} أرياف زكي السالم للمياه الكبريتية. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-gold-500 transition-colors">سياسة الخصوصية</Link>
          <Link href="/terms" className="hover:text-gold-500 transition-colors">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}
