import { motion } from "framer-motion";
import { Gavel, ShieldCheck, FileText, Scale, AlertTriangle } from "lucide-react";

export default function Legal() {
  return (
    <div className="pt-32 pb-20 px-6 italic text-right relative z-10" dir="rtl">
      
      {/* الهيدر - Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex p-4 bg-royal-blue/10 border border-royal-blue/20 rounded-full mb-6"
        >
          <Gavel size={35} className="text-royal-blue" />
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white"
        >
          الاتفاقية <span className="text-royal-blue">القانونية</span>
        </motion.h1>
        
        <p className="text-gray-500 font-bold max-w-xl mx-auto text-[10px] md:text-xs leading-relaxed uppercase tracking-widest">
          بروتوكول تنظيم الحقوق والالتزامات الرقمية - إصدار 2026
        </p>
      </div>

      {/* المحتوى - Legal Sections */}
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* بند 1 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 border border-white/5 bg-[#080808] rounded-[2rem] transition-all hover:border-royal-blue/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck size={22} className="text-royal-blue" />
            <h3 className="text-xl font-black text-white italic">01. الخصوصية المطلقة</h3>
          </div>
          <p className="text-gray-500 font-bold text-sm leading-loose pr-10">
            نحن لا نطلع على محتوى ملفاتك. النظام يقوم بتوليد بصمة رقمية مشفرة (Hash) فقط. بمجرد إغلاق المتصفح، يتم مسح أي أثر للملف الأصلي من خوادمنا المؤقتة فوراً.
          </p>
        </motion.div>

        {/* بند 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="p-8 border border-white/5 bg-[#080808] rounded-[2rem] transition-all hover:border-royal-blue/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <FileText size={22} className="text-royal-blue" />
            <h3 className="text-xl font-black text-white italic">02. ملكية البيانات</h3>
          </div>
          <p className="text-gray-500 font-bold text-sm leading-loose pr-10">
            تظل كافة الحقوق الفكرية والقانونية للمحتوى الموثق ملكاً خالصاً للمستخدم. شهادة "بلاك بوكس" هي وسيلة إثبات تقنية وليست صك انتقال ملكية.
          </p>
        </motion.div>

        {/* بند 3 */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-8 border border-white/5 bg-[#080808] rounded-[2rem] transition-all hover:border-royal-blue/20"
        >
          <div className="flex items-center gap-4 mb-4">
            <Scale size={22} className="text-royal-blue" />
            <h3 className="text-xl font-black text-white italic">03. النزاعات القانونية</h3>
          </div>
          <p className="text-gray-500 font-bold text-sm leading-loose pr-10">
            في حال نشوب نزاع، توفر المنصة التقارير الفنية اللازمة لإثبات صحة الختم الزمني وتطابق البصمة الرقمية أمام الجهات المختصة كدليل تقني قاطع.
          </p>
        </motion.div>

        {/* تنبيه أمان */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 border-r-4 border-royal-blue bg-royal-blue/5 rounded-l-[2rem] flex gap-5 items-start"
        >
          <AlertTriangle className="text-royal-blue shrink-0" size={28} />
          <div>
            <h4 className="text-white font-black mb-1 italic">تنبيه هام</h4>
            <p className="text-gray-400 text-xs font-bold leading-relaxed">
              استخدام النظام في توثيق مواد مسروقة أو مخالفة للقوانين الدولية يعرض حسابك للإيقاف النهائي، ونخلي مسؤوليتنا عن أي سوء استخدام يتنافى مع معايير الأخلاقيات الرقمية.
            </p>
          </div>
        </motion.div>

      </div>

      {/* فوتر بسيط للوثيقة */}
      <div className="mt-20 text-center opacity-20 group">
        <span className="text-[10px] font-black tracking-[1em] text-white group-hover:text-royal-blue transition-colors uppercase">
          Black Box Legal Protocol
        </span>
      </div>

    </div>
  );
}
