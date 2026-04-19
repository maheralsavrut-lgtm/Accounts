import { motion } from "framer-motion";
import { Shield, Lock, Eye, Scale, Fingerprint, Globe, Cpu, CreditCard, Share2, Hammer, BellRing } from "lucide-react";
import { useState } from "react";

// مكون القائمة المنسدلة للقسم القانوني (Accordion)
const LegalSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/5 overflow-hidden transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02] transition-colors text-right"
      >
        <div className="flex items-center gap-4 text-white flex-row-reverse">
          <Icon className="text-royal-blue" size={24} />
          <span className="font-black text-lg italic uppercase tracking-tighter">{title}</span>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-500">▼</motion.span>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden bg-white/[0.01]"
      >
        <div className="p-8 text-gray-400 text-sm leading-relaxed font-bold italic space-y-4 text-right dir-rtl">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default function Legal() {
  return (
    <div className="min-h-screen pt-20 pb-20 px-6 bg-black text-white selection:bg-royal-blue/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header - الهيدر الاحترافي */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-block p-4 bg-royal-blue/10 rounded-3xl mb-6 border border-royal-blue/20 shadow-2xl shadow-royal-blue/10"
          >
            <Scale size={40} className="text-royal-blue" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-white italic mb-4 uppercase tracking-tighter">المركز القانوني والخصوصية</h1>
          <p className="text-gray-500 font-bold italic max-w-xl mx-auto uppercase text-[10px] tracking-[0.3em]">
            Black Box Technology System - Unified Privacy Policy v2.1 (2026)
          </p>
        </div>

        <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl relative">
          
          {/* 1. قطاع الذكاء الاصطناعي */}
          <LegalSection title="قطاع الذكاء الاصطناعي (AI Studio)" icon={Cpu}>
            <p>• <span className="text-white font-black underline">معالجة البيانات:</span> تشمل المعالجة التقنية كافة المدخلات من نصوص (Text)، صور (Images)، بصمات صوتية (Audio)، ومستندات تقنية أو إدارية.</p>
            <p>• <span className="text-white">تعديل المحتوى (Grafia & Motion):</span> نستخدم خوارزميات تحليل الأنماط لتنفيذ عمليات التعديل (مثل تغيير الملابس أو المواقع). البيانات البيومترية المستخلصة لحظياً لا تُخزن كمعرفات هوية دائمة بل كإحداثيات رياضية مؤقتة.</p>
            <p>• <span className="text-white">التوثيق الصوتي (Voice Cloning):</span> عند تدريب نموذج صوتي في قطاع "Tune"، يتم تشفير البصمة الصوتية بمفتاح 256-bit مرتبط بحسابك فقط، ولا تملك الإدارة صلاحية استخدامه خارج نطاق طلباتك.</p>
            <p>• <span className="text-white">خصوصية المستندات:</span> المستندات المرفوعة للمعالجة تُعامل كمعلومات سرية مشفرة، ولا يتم تضمينها في قواعد البيانات التدريبية العامة للنماذج إلا بموافقة كتابية صريحة.</p>
          </LegalSection>

          {/* 2. وكالة التسويق والنمو */}
          <LegalSection title="وكالة التسويق والنمو الرقمي" icon={Share2}>
            <p>• <span className="text-white">الاستهداف الذكي:</span> نعتمد على بيانات التفاعل داخل منظومة Black Box لبناء ملفات اهتمام رقمية مشفرة. لا يتم بيع هذه البيانات لأطراف خارجية.</p>
            <p>• <span className="text-white">خدمات التفاعل (Engagement):</span> خدمات زيادة المتابعين والتفاعل تتم عبر أنظمة محاكاة متطورة. المنظومة غير مسؤولة قانونياً عن أي إجراءات تقيدية تتخذها المنصات الخارجية (مثل Meta أو X) نتيجة تغيير سياساتها المفاجئة.</p>
            <p>• <span className="text-white">السرية التجارية:</span> قائمة عملاء الوكالة وتفاصيل حملاتهم تُصنف كأسرار تجارية محمية بموجب اتفاقيات عدم الإفصاح (NDA) الضمنية في هذا الميثاق.</p>
          </LegalSection>

          {/* 3. منصة التواصل الاجتماعي */}
          <LegalSection title="التواصل الاجتماعي (BMassenger & BVD & BRM)" icon={Globe}>
            <p>• <span className="text-white">التشفير التام:</span> الرسائل في BMassenger محمية بروتوكول معزول. الغرف الصوتية في BRM تخضع للمراقبة الآلية فقط لضمان عدم مخالفة شروط الاستخدام، ولا يتم تسجيل المحتوى الصوتي للغرف الخاصة.</p>
            <p>• <span className="text-white">منصة BVD:</span> المحتوى المرئي المرفوع يخضع لمعايير الرقابة المجتمعية لمنظومة Black Box. تمنحنا حق العرض التقني وتوزيع المحتوى عبر خوادمنا العالمية.</p>
          </LegalSection>

          {/* 4. الملكية الفكرية وتوثيق الأكواد (ISO Section) */}
          <LegalSection title="الملكية الفكرية والتوثيق الرقمي" icon={Fingerprint}>
            <p>• <span className="text-white">حماية الأكواد والابتكارات:</span> عند تسجيل كود برمجي أو ابتكار، يتم توليد بصمة رقمية (Digital Signature) غير قابلة للتزوير باستخدام خوارزميات SHA-512. هذا يثبت ملكيتك للأصل في تاريخ وساعة محددة.</p>
            <p>• <span className="text-white">نزاهة البيانات (ISO/IEC 27001):</span> تلتزم المنظومة بمعايير الأيزو في إدارة أمن المعلومات. سجلات التوثيق (Immutable Logs) لا يمكن تعديلها أو حذفها، مما يجعلها مرجعاً قانونياً قطعياً في نزاعات الملكية الفكرية.</p>
            <p>• <span className="text-white">الشهادات الرقمية:</span> الشهادة الصادرة من Black Box هي وثيقة إثبات رقمية معترف بها داخل المنظومة وشركائها التقنيين كدليل أولوية ابتكار.</p>
          </LegalSection>

          {/* 5. المحفظة الموحدة (Bx) */}
          <LegalSection title="المحفظة الرقمية الموحدة" icon={CreditCard}>
            <p>• <span className="text-white">نظام العملة:</span> يتم تسجيل كافة حركات الشحن والخصم لعملة Bx في سجل عمليات مشفر (Operation History) متاح للمستخدم دائماً ولا يمكن التلاعب به.</p>
            <p>• <span className="text-white">التأمين المالي:</span> في حال اكتشاف محاولة اختراق أو تلاعب بالرصيد، يحق للمنظومة تجميد المحفظة مؤقتاً لحماية أصول المستخدم.</p>
          </LegalSection>

          {/* 6. صندوق المنتجات */}
          <LegalSection title="صندوق المنتجات (Product Box)" icon={Hammer}>
            <p>• <span className="text-white">تراخيص القوالب:</span> المنتجات الرقمية (قوالب، لوحات تحكم، تصاميم) محمية بموجب قوانين الملكية الفكرية. الشراء يمنح رخصة استخدام ولا يمنح حق إعادة البيع إلا برخصة خاصة.</p>
          </LegalSection>

          {/* 7. بند التحديثات والتعديلات - الجملة اللي طلبتها */}
          <LegalSection title="التعديلات والتحديثات القانونية" icon={BellRing}>
            <div className="space-y-4">
              <p>• <span className="text-white font-black underline italic">حق التحديث:</span> تحتفظ إدارة Black Box Technology بالحق المطلق في تعديل، إضافة، أو حذف أي بند من هذه السياسة بما يخدم مصلحة المنظومة وتطورها التقني والقانوني.</p>
              
              <div className="bg-royal-blue/10 border-r-4 border-royal-blue p-6 rounded-2xl">
                <p className="text-white font-black italic text-base leading-relaxed">
                  "تلتزم المنظومة بإخطار المستخدمين بأي تعديلات جوهرية عبر إرسال النسخة المحدثة إلى <span className="underline decoration-royal-blue">البريد الإلكتروني المسجل</span> بالحساب. يُعتبر استمرارك في استخدام أي من خدمات Black Box Technology بعد تاريخ إرسال هذا البريد موافقةً صريحةً ونهائيةً منك على كافة التحديثات والبنود الجديدة."
                </p>
              </div>
              
              <p className="text-[11px] text-gray-500 font-bold">
                * تاريخ آخر تحديث: 19 أبريل 2026.
              </p>
            </div>
          </LegalSection>

        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-[10px] font-black italic uppercase tracking-[0.4em]">
            All Rights Reserved © Black Box Technology 2026
          </p>
        </div>

      </div>
    </div>
  );
}
