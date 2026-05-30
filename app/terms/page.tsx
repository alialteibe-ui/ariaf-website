import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الشروط والأحكام | أرياف زكي السالم للمياه الكبريتية",
  description: "الشروط والأحكام لاستخدام موقع أرياف زكي السالم للمياه الكبريتية في الأحساء.",
  robots: { index: false },
};

export default function TermsPage() {
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
            الشروط والأحكام
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mb-6" />
          <p className="text-brown-400 text-sm leading-relaxed">
            آخر تحديث: {new Date().getFullYear()}م
          </p>
        </div>

        <div className="space-y-10">

          <Section title="الاستخدام العام">
            هذا الموقع مخصص للتعريف بخدمات أرياف زكي السالم للمياه الكبريتية في الأحساء، وتمكين الزوار
            من الاطلاع على الشاليهات المتاحة وتقديم طلبات الحجز عبر واتساب.
            باستخدامك للموقع فأنت توافق على هذه الشروط.
          </Section>

          <Section title="الحجز والتأكيد">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>تقديم طلب الحجز عبر الموقع أو واتساب لا يعني تأكيد الحجز تلقائياً.</li>
              <li>يُعدّ الحجز مؤكداً فقط بعد تواصل فريقنا معك وإقرار التوفر عبر واتساب.</li>
              <li>نحتفظ بالحق في رفض أي طلب حجز دون إبداء أسباب في حالات استثنائية.</li>
            </ul>
          </Section>

          <Section title="الأسعار والتوفر">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>الأسعار قابلة للتغيير حسب التاريخ والموسم والطلب المتاح.</li>
              <li>التوفر غير مضمون إلا بعد التأكيد الرسمي من الإدارة.</li>
              <li>ننصح بالحجز المسبق قبل ٢٤ ساعة على الأقل لضمان حصولك على الموعد المناسب.</li>
            </ul>
          </Section>

          <Section title="الدفع">
            لا يتوفر في الموقع حالياً أي نظام للدفع الإلكتروني. يتم ترتيب الدفع بشكل مباشر مع الإدارة
            عبر واتساب عند التأكيد — إما عند الوصول أو بالتحويل البنكي المتفق عليه.
          </Section>

          <Section title="السلوك والاستخدام">
            <ul className="list-disc list-inside space-y-1.5 text-brown-400">
              <li>يُلزَم الضيوف بالحفاظ على نظافة المكان ومحتوياته خلال فترة الإقامة.</li>
              <li>يُمنع إدخال أي مواد مخالفة للأنظمة أو الآداب العامة.</li>
              <li>أي تلف في المرافق يستوجب التعويض وفق ما تقدّره الإدارة.</li>
            </ul>
          </Section>

          <Section title="إخلاء المسؤولية">
            لا تتحمل إدارة أرياف زكي السالم مسؤولية أي أضرار مباشرة أو غير مباشرة تنتج عن استخدام
            المرافق بطريقة غير سليمة. الاستخدام يكون على مسؤولية الضيف الكاملة.
          </Section>

          <Section title="تعديل الشروط">
            تحتفظ الإدارة بالحق في تعديل هذه الشروط في أي وقت. ينصح بمراجعة الصفحة دورياً.
            الاستمرار في استخدام الموقع أو طلب الحجز يعني موافقتك على الشروط السارية.
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
          <Link href="/booking-policy" className="hover:text-gold-500 transition-colors">سياسة الحجز</Link>
        </div>
      </div>
    </footer>
  );
}
