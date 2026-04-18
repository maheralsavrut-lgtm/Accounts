import { motion } from "framer-motion";
import { 
  CheckCircle2, Fingerprint, ShieldAlert, Binary, 
  FileCheck2, Clock4, ServerCrash, Network 
} from "lucide-react";

export default function Standards() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const standards = [
    {
      icon: <Binary className="text-royal-blue" size={28} />,
      title: "تطابق البصمة الرقمية (Hash Integrity)",
      desc: "نعتمد معيار SHA-256 العالمي. أي تغيير ولو في بكسل واحد داخل الملف يؤدي لتغيير البصمة تماماً، مما يضمن كشف أي تلاعب فوراً."
    },
    {
      icon: <Clock4 className="text-royal-blue" size={28} />,
      title: "التوقيت الذري الموحد (UTC Timestamp)",
      desc: "يتم سحب التوقيت من خوادم زمنية ذرية (NTP) لضمان تسجيل لحظة التوثيق بدقة لا تقبل التشكيك قانونياً أو زمنياً."
    },
    {
      icon: <Network className="text-royal-blue" size={28} />,
      title: "اللا مركزية في التحقق",
      desc: "نظام التحقق متاح للعامة عبر الـ QR Code، مما يسمح لأي جهة التأكد من صحة الشهادة دون الحاجة للوصول لبياناتك الخاصة."
    },
    {
      icon: <ShieldAlert className="text-royal-blue" size={28} />,
      title: "بروتوكول عدم التعديل (Immutability)",
      desc: "بمجرد إصدار الشهادة، تُقفل البيانات في قاعدة بياناتنا المشفرة بصيغة 'للقراءة فقط'، ولا يمكن لأي موظف أو حتى مدير النظام تعديلها."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 italic text-right relative z-10" dir="rtl">
      {/* Header */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="inline-block border border-royal-blue/30 bg-royal-blue/5 px-4 py-1 rounded-full text-[10px] text-royal-blue font-black uppercase tracking-[0.3em] mb-6"
        >
          Reliability Protocol 2.1
        </motion.div>
        <motion.h1 
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} variants={fadeIn}
          className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white"
        >
          معايير <span className="text-royal-blue">الموثوقية</span> التقنية
        </motion.h1>
        <motion.p 
          initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }} variants={fadeIn}
          className="text-gray-500 font-bold max-w-2xl mx-auto"
        >
          يخضع نظام Black Box Verify لأعلى معايير الأمن السيبراني لضمان أن كل وثيقة تخرج من منصتنا هي دليل قاطع لا يقبل النقض.
        </motion.p>
      </section>

      {/* Standards Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
        {standards.map((s, i) => (
          <motion.div 
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: i * 0.1 }} variants={fadeIn}
            className="p-8 border border-white/5 bg-white/[0.02] rounded-[2rem] hover:bg-white/[0.04] transition-all group"
          >
            <div className="flex items-start gap-5">
              <div className="p-3 bg-black rounded-xl border border-white/5 group-hover:border-royal-blue/50 transition-colors">
                {s.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-black text-white italic">{s.title}</h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Verification Level Section */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
        className="max-w-5xl mx-auto bg-royal-blue/5 border border-royal-blue/20 rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 p-8 opacity-10">
          <Fingerprint size={150} className="text-royal-blue" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">درجات التحقق</h2>
            <div className="space-y-4">
              {[
                "تحقق من هوية الرافع عبر البروتوكولات الثنائية (2FA).",
                "فحص سلامة الملف من الفيروسات قبل التوثيق.",
                "مطابقة البصمة الرقمية مع سجلات الأرشفة العالمية.",
                "إصدار شهادة مشفرة غير قابلة للتزوير المادي أو الرقمي."
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-400 font-bold text-sm">
                  <CheckCircle2 size={18} className="text-royal-blue shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-center">
             <FileCheck2 size={50} className="mx-auto text-royal-blue mb-4" />
             <div className="text-white font-black text-xl mb-2 italic">شهادة موثقة</div>
             <div className="text-[10px] text-gray-600 tracking-[0.2em] uppercase font-bold">كل ملف يحصل على تقرير فني كامل</div>
             <div className="mt-6 pt-6 border-t border-white/5 text-royal-blue text-xs font-black tracking-widest uppercase animate-pulse">
               ISO 27001 Compliant Strategy
             </div>
          </div>
        </div>
      </motion.section>

      {/* Summary Footer */}
      <div className="mt-24 text-center">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.5em]">
          Black Box Verify System <span className="mx-2 text-royal-blue">/</span> Zero Manipulation Policy
        </p>
      </div>
    </div>
  );
}
