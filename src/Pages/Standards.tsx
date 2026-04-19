import { motion } from "framer-motion";
import { Gavel, AlertTriangle, ShieldCheck, Zap, Coins, UserX, Globe, History, MailCheck, Code2 } from "lucide-react";
import { useState } from "react";

const TermsSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-white/5 overflow-hidden transition-all bg-white/[0.01] mb-4 rounded-2xl border border-white/5 backdrop-blur-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/[0.03] transition-colors text-right"
      >
        <div className="flex items-center gap-4 text-white flex-row-reverse">
          <Icon className="text-royal-blue" size={24} />
          <span className="font-black text-xl italic uppercase tracking-tighter">{title}</span>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-500">▼</motion.span>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="p-8 text-gray-400 text-sm leading-relaxed font-bold italic space-y-6 text-right dir-rtl border-t border-white/5">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-transparent text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-5 bg-royal-blue/10 rounded-full mb-8 border border-royal-blue/20 shadow-2xl shadow-royal-blue/10"
          >
            <Gavel size={50} className="text-royal-blue" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white italic mb-6 uppercase tracking-tighter">بنود الخدمة (شروط الاستخدام)</h1>
          <p className="text-gray-500 font-black italic max-w-2xl mx-auto uppercase text-[12px] tracking-[0.4em] leading-loose">
             اتفاقية الاستخدام القانونية الملزمة لمنظومة BLACK BOX TECHNOLOGY
          </p>
        </div>

        <div className="space-y-6 text-right">
          
          {/* 1. القبول والأهلية */}
          <TermsSection title="1. قبول الشروط والأهلية القانونية" icon={ShieldCheck}>
            <p>• باستخدامك لخدمات Black Box، فإنك تقر بأنك بلغت السن القانوني (13 عاماً على الأقل) وتمتلك الأهلية الكاملة لإبرام هذا العقد.</p>
            <p>• <span className="text-white">القبول الصريح:</span> إن إنشاء حساب أو الضغط على "تسجيل" يعني موافقتك المطلقة على هذه البنود وعلى سياسة الخصوصية المرتبطة بها.</p>
          </TermsSection>

          {/* 2. سياسة المحفظة والعملات المالية (Bx System) */}
          <TermsSection title="2. القواعد المالية وعملة Bx" icon={Coins}>
            <p>عملة <span className="text-white">Bx</span> هي عملة افتراضية مخصصة للاستخدام داخل منظومة بلاك بوكس فقط:</p>
            <ul className="list-disc list-inside space-y-3 pr-4">
              <li><span className="text-white underline">عدم القابلية للاسترداد:</span> بمجرد شراء باقة Bx، لا يمكن استرداد المبلغ نقدياً تحت أي ظرف، حيث يتم التعامل مع الشحن كشراء لـ "حقوق استخدام الخدمة".</li>
              <li><span className="text-white underline">التحويلات:</span> يُحظر تماماً محاولة بيع أو تداول عملة Bx خارج المنصة الرسمية.</li>
              <li><span className="text-white underline">الحظر المالي:</span> في حال اكتشاف استخدام بطاقات مسروقة أو عمليات مشبوهة، يتم حظر الحساب نهائياً ومصادرة الرصيد دون الرجوع للمستخدم.</li>
            </ul>
          </TermsSection>

          {/* 3. ضوابط الذكاء الاصطناعي والاستخدام العادل */}
          <TermsSection title="3. شروط استخدام AI Studio" icon={Zap}>
            <p>أنت تمنحنا حق معالجة بياناتك لإنتاج المحتوى، وتلتزم بالآتي:</p>
            <ul className="list-disc list-inside space-y-3 pr-4 text-red-400">
              <li>يُحظر استخدام الذكاء الاصطناعي لتوليد محتوى يروج للكراهية، العنف، أو الإباحية.</li>
              <li>يُحظر انتحال الشخصيات (Deepfake) دون إذن قانوني موثق.</li>
              <li>المنظومة غير مسؤولة عن حقوق الملكية الفكرية للمدخلات التي يرفعها المستخدم (مثل الصور المسروقة).</li>
            </ul>
          </TermsSection>

          {/* 4. إخلاء مسؤولية وكالة التسويق */}
          <TermsSection title="4. إخلاء مسؤولية قطاع التسويق" icon={AlertTriangle}>
            <div className="bg-red-500/10 border-r-4 border-red-500 p-6 rounded-xl">
              <p className="text-white font-black italic">بند هام جداً:</p>
              <p className="mt-2 text-gray-300">
                منظومة Black Box تقدم خدمات "زيادة التفاعل" كأداة تقنية مساعدة. نحن لا نضمن استقرار النتائج بنسبة 100% نظراً لاعتمادها على منصات خارجية (مثل فيسبوك، يوتيوب، تيك توك). أي إجراء يتخذ من قبل تلك المنصات ضد حساب المستخدم هو خارج نطاق مسؤوليتنا القانونية أو التقنية.
              </p>
            </div>
          </TermsSection>

          {/* 5. ملكية الأكواد والتوثيق الرقمي (ISO Standards) */}
          <TermsSection title="5. حماية الملكية الفكرية والتوثيق" icon={Code2}>
            <p>• <span className="text-white">التوثيق:</span> خدمة التوثيق الرقمي تثبت أن المستخدم هو "أول من سجل" البصمة الرقمية للأصل (الكود/التصميم) لدينا.</p>
            <p>• <span className="text-white">المسؤولية:</span> التوثيق لا يمنح ملكية قانونية مطلقة إذا ثبت أن الأصل مسروق من طرف ثالث قبل تاريخ التسجيل لدينا.</p>
            <p>• <span className="text-white">الأمان:</span> تلتزم بلاك بوكس بحماية بصمة الكود (Hash) وضمان عدم التلاعب بسجلات التوقيت الزمني (Timestamps).</p>
          </TermsSection>

          {/* 6. منصة التواصل والقواعد المجتمعية */}
          <TermsSection title="6. شروط منصة التواصل الاجتماعي" icon={Globe}>
            <p>• <span className="text-white">السلوك:</span> يحق للمنظومة حذف أي محتوى أو حظر أي مستخدم يمارس التحرش، التنمر، أو ينشر برمجيات خبيثة.</p>
            <p>• <span className="text-white">البيانات:</span> أنت تمنح Black Box رخصة عالمية، مجانية، لاستضافة وعرض المحتوى الذي تنشره علناً داخل المنصة.</p>
          </TermsSection>

          {/* 7. الحظر وحذف الحساب */}
          <TermsSection title="7. إنهاء الخدمة والحظر" icon={UserX}>
            <p>• يحق لـ Black Box تعليق أو إنهاء حسابك في حال مخالفة أي بند من هذه الشروط، دون سابق إنذار.</p>
            <p>• عند إغلاق الحساب بسبب مخالفة قانونية، تسقط كافة حقوق المستخدم في المطالبة بأي أرصدة متبقية في المحفظة.</p>
          </TermsSection>

          {/* 8. بند التحديثات الرسمية - الجملة الذهبية */}
          <div className="mt-10 p-10 bg-royal-blue/10 border-2 border-royal-blue/20 rounded-[3rem] relative overflow-hidden group backdrop-blur-md">
            <MailCheck className="absolute -left-10 -top-10 text-royal-blue/20 w-40 h-40 group-hover:rotate-12 transition-transform" />
            <h3 className="text-2xl font-black text-white italic mb-4 flex items-center gap-3">
              <History className="text-royal-blue" /> التعديلات والإخطار القانوني
            </h3>
            <div className="space-y-6 text-white font-bold italic leading-relaxed text-right">
              <p>
                تمتلك إدارة <span className="text-royal-blue underline italic">Black Box Technology</span> الحق الحصري في تعديل "بنود الخدمة" هذه في أي وقت تراه مناسباً.
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                <p className="text-lg">
                  "بمجرد اعتماد أي تعديل، سيتم إرسال النسخة الجديدة فوراً إلى <span className="text-royal-blue underline">بريدك الإلكتروني المسجل</span>. يعتبر استمرارك في استخدام المنظومة بعد تاريخ الإرسال بمثابة <span className="text-royal-blue uppercase tracking-widest">إقرار وموافقة قانونية ملزمة</span> منك على البنود الجديدة."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Final Footer */}
        <div className="mt-20 py-10 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] font-black italic uppercase tracking-[0.5em]">
            LEGAL COMPLIANCE DIVISION - BLACK BOX TECHNOLOGY © 2026
          </p>
        </div>

      </div>
    </div>
  );
}
