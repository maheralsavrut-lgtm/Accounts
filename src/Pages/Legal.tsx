import { motion } from "framer-motion";
import { Shield, Lock, Eye, Scale, Fingerprint, Globe, Cpu, CreditCard, Share2, Hammer, BellRing, BookOpen, UserCheck, HardDrive } from "lucide-react";
import { useState } from "react";

const LegalSection = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => {
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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-transparent text-white">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-5 bg-royal-blue/10 rounded-full mb-8 border border-royal-blue/20"
          >
            <Shield size={50} className="text-royal-blue" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white italic mb-6 uppercase tracking-tighter">سياسة الخصوصية الشاملة</h1>
          <p className="text-gray-500 font-black italic max-w-2xl mx-auto uppercase text-[12px] tracking-[0.4em] leading-loose">
            منظومة BLACK BOX TECHNOLOGY - الإصدار القانوني الموحد لجميع القطاعات
          </p>
        </div>

        <div className="space-y-6">
          
          <LegalSection title="1. نطاق البيانات والمنظومة" icon={BookOpen}>
            <p>تلتزم منظومة Black Box بحماية خصوصية المستخدمين عبر كافة قطاعاتها التقنية. تشمل هذه السياسة كل فرد يقوم بإنشاء حساب أو استخدام خدماتنا في الذكاء الاصطناعي، التسويق، التواصل، أو التوثيق.</p>
            <p>نحن نجمع البيانات الضرورية فقط لتقديم تجربة فائقة الجودة، ونستخدم تقنيات تشفير عسكرية لحماية البيانات أثناء النقل (In-Transit) وأثناء التخزين (At-Rest).</p>
          </LegalSection>

          <LegalSection title="2. معالجة بيانات الذكاء الاصطناعي" icon={Cpu}>
            <div className="space-y-4">
              <h4 className="text-white font-black underline">أ. النصوص والمستندات:</h4>
              <p>عند رفع مستندات (PDF, Word) للتحليل، يتم استخراج البيانات نصياً ومعالجتها في بيئة معزولة (Sandbox). لا تطلع الكوادر البشرية على محتوى مستنداتك إلا في حالة طلب دعم فني مباشر منك.</p>
              
              <h4 className="text-white font-black underline">ب. الصور والفيديو (Grafia & Motion):</h4>
              <p>يتم استخدام معالجة الصور لتغيير الملامح، الملابس، أو الخلفيات. يتم تخزين "نقاط الوجه" كأرقام رياضية مشفرة وليس كصور حيوية. نحتفظ بالصور الأصلية لمدة 30 يوماً في "سلة المحذوفات" الخاصة بك قبل مسحها نهائياً من خوادمنا.</p>
              
              <h4 className="text-white font-black underline">ج. البصمة الصوتية (Tune):</h4>
              <p>استنساخ الصوت يتطلب موافقة صريحة. يتم تحويل عينة الصوت إلى "نموذج عصبي" (Neural Model). هذا النموذج لا يمكن استخدامه لإنتاج أي محتوى يخالف القيم الأخلاقية أو القانونية، ويتم قفل النموذج بمفتاح تشفير حسابك الشخصي فقط.</p>
            </div>
          </LegalSection>

          <LegalSection title="3. سياسة التفاعل والتسويق الرقمي" icon={Share2}>
            <p>تدرك Black Box حساسية التعامل مع المنصات الخارجية. عند استخدام خدمات زيادة التفاعل (لايكات، متابعين، مشاهدات):</p>
            <ul className="list-disc list-inside space-y-2 pr-4 text-right">
              <li>نحن لا نطلب كلمات سر حساباتك على المنصات الخارجية (Facebook, Instagram, إلخ).</li>
              <li>يتم تنفيذ العمليات عبر "شبكات توزيع ذكية" تحاكي السلوك البشري لتجنب الحظر.</li>
              <li>العميل يتحمل المسؤولية القانونية عن المحتوى الذي يتم الترويج له.</li>
              <li>نحتفظ بسجلات الروابط المقدمة لضمان عدم استخدام خدماتنا في حملات كراهية أو تضليل.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. منصة التواصل الاجتماعي الشاملة" icon={Globe}>
            <p>تُقدم Black Box منصة تواصل اجتماعي فريدة وموحدة تدمج تجارب (التواصل الفوري، النشر الاجتماعي، مشاركة الفيديو، والبث المباشر) في واجهة واحدة:</p>
            <ul className="list-disc list-inside space-y-2 pr-4 text-right">
              <li><span className="text-white">المراسلات:</span> تعتمد المنصة تشفيراً معزولاً للمحادثات، مما يضمن خصوصية تامة مشابهة لتطبيقات المراسلة العالمية.</li>
              <li><span className="text-white">المحتوى المرئي والاجتماعي:</span> يتم التعامل مع المنشورات والفيديوهات وفق خوارزميات توزيع ذكية، مع الحفاظ على حق المستخدم الكامل في التحكم في خصوصية منشوراته.</li>
              <li><span className="text-white">التكامل:</span> تجمع المنصة خصائص التفاعل (Like, Share, Comment) والمشاهدة في بيئة رقمية واحدة تابعة لمنظومة بلاك بوكس.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. التوثيق وحقوق الملكية الفكرية (ISO Path)" icon={Fingerprint}>
            <p>هذا القطاع هو الأهم للحصول على شهادة الأيزو ISO/IEC 27001:</p>
            <div className="bg-white/5 p-6 rounded-xl border-r-4 border-royal-blue">
              <p>1. <span className="text-white">توثيق الأكواد:</span> يتم رفع بصمة الكود (Hash Sum) وتسجيلها في "سجل النزاهة". هذا يثبت أنك كنت تملك هذا الكود في تاريخ معين دون الحاجة لتخزين الكود نفسه لدينا.</p>
              <p>2. <span className="text-white">شهادة الملكية:</span> الشهادات الصادرة تحمل QR Code للتحقق الفوري من صحتها عالمياً.</p>
              <p>3. <span className="text-white">التحقق الرقمي (Verify):</span> يتم مسح صور البطاقات الشخصية أو جوازات السفر فور انتهاء عملية المطابقة لضمان عدم تسريب أي بيانات هوية رسمية.</p>
            </div>
          </LegalSection>

          <LegalSection title="6. المحفظة الموحدة والعمليات المالية" icon={CreditCard}>
            <p>جميع عمليات الشراء داخل "صندوق المنتجات" أو "AI Studio" تتم عبر عملة Bx:</p>
            <ul className="list-disc list-inside space-y-2 pr-4 text-right">
              <li>يتم تسجيل كل "سنت" أو "نقطة" في سجل العمليات (Audit Log) الذي لا يمكن تعديله.</li>
              <li>يتم تشفير بيانات الدفع عبر بوابات معتمدة دولياً (PCI-DSS Compliant).</li>
              <li>في حالة حذف الحساب، يتم تجميد الرصيد المتبقي ولا يمكن استرداده نقدياً إلا بحسب شروط "اتفاقية المستثمر".</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. صندوق المنتجات والتراخيص" icon={Hammer}>
            <p>عند شراء قوالب أو لوحات تحكم من Black Box:</p>
            <p>تمنحك المنظومة رخصة "استخدام" وليست رخصة "ملكية مطلقة". يُحظر إعادة توزيع الأكواد أو القوالب المشتراة تحت اسم آخر أو إعادة بيعها دون إذن كتابي موثق من إدارة Black Box Technology.</p>
          </LegalSection>

          {/* 8. التحديثات والإخطارات - البند الجوهري */}
          <div className="mt-10 p-10 bg-royal-blue/10 border-2 border-royal-blue/20 rounded-[3rem] relative overflow-hidden group backdrop-blur-md">
            <BellRing className="absolute -left-10 -top-10 text-royal-blue/20 w-40 h-40 group-hover:rotate-12 transition-transform" />
            <h3 className="text-2xl font-black text-white italic mb-4 flex items-center gap-3">
              <BellRing className="text-royal-blue" /> بند التعديلات والتحديثات الرسمية
            </h3>
            <div className="space-y-6 text-white font-bold italic leading-relaxed text-right">
              <p>
                تحتفظ إدارة <span className="text-royal-blue underline italic">Black Box Technology</span> بالحق في تعديل أي بند من بنود سياسة الخصوصية هذه في أي وقت، وذلك لمواكبة التطورات التقنية أو المتطلبات القانونية الجديدة.
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-lg">
                  "يتم إرسال النسخة المحدثة من السياسة فور اعتمادها إلى <span className="text-royal-blue underline">البريد الإلكتروني المسجل لدينا</span>. إن استخدامك لخدمات المنظومة بعد تاريخ إرسال هذا البريد يُعد بمثابة <span className="text-royal-blue uppercase">موافقة قانونية نهائية</span> وصريحة منك على كافة التعديلات الجديدة."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Final Footer */}
        <div className="mt-20 py-10 border-t border-white/5 text-center">
          <p className="text-gray-600 text-[10px] font-black italic uppercase tracking-[0.5em]">
            PROTECTED BY BLACK BOX CYBER-SECURITY PROTOCOLS © 2026
          </p>
        </div>

      </div>
    </div>
  );
}
