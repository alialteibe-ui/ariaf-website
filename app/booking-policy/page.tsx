import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الحجز | أرياف زكي السالم للمياه الكبريتية",
  description: "سياسة الحجز والإلغاء لشاليهات أرياف زكي السالم للمياه الكبريتية في الأحساء.",
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

        <div className="mb-10">
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">
            قانوني
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal mb-4">
            سياسة الحجز
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mb-6" />
          <p className="text-brown-400 text-sm leading-relaxed">
            آخر تحديث: {new Date().getFullYear()}م
          </p>
        </div>

        <div className="space-y-10">

          <Section title="طلب الحجز">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>تقديم طلب الحجز عبر نموذج الموقع أو واتساب يعني رغبتك في الحجز فقط.</li>
              <li>لا يُعدّ الطلب حجزاً مؤكداً إلا بعد رد الإدارة بالتأكيد الصريح.</li>
              <li>يُرجى إرسال طلبك مبكراً بما يكفي لضمان التوفر في التاريخ المطلوب.</li>
            </ul>
          </Section>

          <Section title="تأكيد الحجز">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>ستتواصل معك الإدارة عبر واتساب للتحقق من التوفر خلال ساعات العمل.</li>
              <li>يُعدّ الحجز مؤكداً فور إرسال رسالة التأكيد الرسمية من الإدارة.</li>
              <li>ستحتوي رسالة التأكيد على الموعد والتفاصيل والاتجاهات للموقع.</li>
            </ul>
          </Section>

          <Section title="الإلغاء والتعديل">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>يتم طلب الإلغاء أو تعديل الحجز عبر واتساب حصراً.</li>
              <li>يُفضّل إخطارنا بالإلغاء قبل ٢٤ ساعة على الأقل من موعد الزيارة.</li>
              <li>في حالة الإلغاء المتأخر، قد تُطبَّق رسوم وفق ما تقدّره الإدارة حسب الحالة.</li>
              <li>نحتفظ بالحق في إلغاء الحجز في ظروف استثنائية مع إشعار مسبق.</li>
            </ul>
          </Section>

          <Section title="الالتزامات عند الوصول">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>يُلزَم الضيوف بالالتزام بعدد الأشخاص المتفق عليه في الحجز.</li>
              <li>الوصول يكون في الوقت المحدد المتفق عليه — يُرجى الإشعار عند التأخر.</li>
              <li>لا يُسمح بإدخال ضيوف إضافيين خارج العدد المحدد دون موافقة مسبقة.</li>
              <li>الشاليه يُسلَّم للعميل بحالة جيدة ويُستلَم بنفس الحالة عند المغادرة.</li>
            </ul>
          </Section>

          <Section title="الوقت والمغادرة">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>الإقامة تقتصر على الفترة المتفق عليها في تأكيد الحجز.</li>
              <li>التمديد يخضع للتوفر ويستوجب موافقة الإدارة مسبقاً.</li>
              <li>المغادرة تكون في الوقت المحدد لضمان جاهزية المكان للضيوف التاليين.</li>
            </ul>
          </Section>

          <Section title="التواصل">
            لأي استفسار حول الحجز أو التعديل أو الإلغاء، تواصل معنا مباشرةً على واتساب:
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
          <Link href="/privacy" className="hover:text-gold-500 transition-colors">سياسة الخصوصية</Link>
          <Link href="/terms" className="hover:text-gold-500 transition-colors">الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
}
