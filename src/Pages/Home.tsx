import { motion } from "framer-motion";
import { 
  User, Building2, PenTool, Music, Lightbulb, Palmtree, 
  FileText, Users, CreditCard, Settings, ShieldCheck, Clock, Database, CheckCircle2,
  ArrowRight, Shield
} from "lucide-react";

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 px-6 font-sans" dir="rtl">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto text-center mb-20 italic text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-royal-blue/10 border border-royal-blue/20 text-royal-blue text-[10px] font-black uppercase mb-8 tracking-widest"
        >
          <Shield size={12} /> حماية الملكية الفكرية والمعاملات الرقمية
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight"
        >
          منصة التوثيق <span className="text-royal-blue italic">الرقمي المعتمد</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-bold leading-relaxed mb-10 italic px-4"
        >
          نظام متكامل لتوثيق الأصول الرقمية وضمان صحة المعاملات، يحمي ابتكارات الأفراد ويؤمن تعاقدات المؤسسات وفق أعلى معايير التشفير العالمية.
        </motion.p>
        
        {/* Buttons Unified */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="w-full md:w-64 px-8 py-4 border border-royal-blue/30 bg-royal-blue/5 hover:bg-royal-blue hover:text-white text-royal-blue font-black rounded-2xl transition-all flex items-center justify-center gap-3 group">
            <User size={18} /> توثيق الأفراد
          </button>
          <button className="w-full md:w-64 px-8 py-4 border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 group text-white">
            <Building2 size={18} /> توثيق الشركات
          </button>
        </div>
      </section>

      {/* Roadmap / Transparency Section (The Pledge) */}
      <section className="max-w-5xl mx-auto mb-32 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-[#0a0a0a] to-[#111] border border-royal-blue/30 rounded-[2.5rem] p-8 md:p-14 overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-royal-blue/40" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-royal-blue/5 blur-[100px] rounded-full" />

          <div className="relative z-10 flex flex-col gap-10 text-right">
            <div className="flex items-center gap-4 border-r-4 border-royal-blue pr-4 font-black">
              <ShieldCheck className="text-royal-blue" size={36} />
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white italic">
                ميثاق الشفافية والموثوقية
              </h2>
            </div>

            <div className="space-y-10">
              <p className="text-gray-100 text-base md:text-xl font-bold leading-relaxed italic">
                "نحن نؤمن بالوضوح التام. توثيقك الحالي في <span className="text-royal-blue font-black underline decoration-white/10 italic leading-none">Black Box Verify</span> هو <span className="text-white">(توثيق رقمي تقني)</span> يمنحك بصمة <span className="text-royal-blue italic leading-none">SHA-256</span> فريدة وختماً زمنياً عالمياً لإثبات أسبقية الملكية ومنع التلاعب."
              </p>

              <div className="p-8 bg-white/5 border-r-4 border-royal-blue/20 rounded-2xl backdrop-blur-sm">
                <p className="text-gray-400 text-[13px] md:text-[16px] font-bold leading-loose italic">
                  نحن الآن في مرحلة الامتثال لمعايير <span className="text-white">ISO 27001</span> الدولية للحصول على الاعتماد القانوني العالمي. وبمجرد اكتمال الاعتماد، <span className="text-royal-blue underline decoration-royal-blue/20">نتعهد بتحويل كافة التوثيقات الحالية</span> إلى (توثيقات قانونية معتمدة) بنفس تاريخها الأصلي المسجل لدينا، لتكون درعاً قانونياً متكاملاً يعتد به أمام كافة المحاكم والجهات الدولية.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-royal-blue/70 mt-4 italic">
              <div className="w-2 h-2 bg-royal-blue rounded-full animate-pulse shadow-[0_0_10px_rgba(65,105,225,1)]" />
              قيد الامتثال لمعايير الدولية للأمن السيبراني
            </div>
          </div>
        </motion.div>
      </section>

      {/* Sectors Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 italic mb-32">
        {/* Sector 1: Individuals */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-8 border-r-4 border-royal-blue pr-4 font-black">
            <User className="text-royal-blue" size={28} />
            <h2 className="text-2xl md:text-3xl uppercase tracking-tighter text-white">حماية الإبداع (أفراد)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 uppercase font-bold text-[11px]">
            {[
              { icon: <PenTool size={22} />, title: "نصوص وأدب", desc: "روايات، أشعار، سيناريوهات، ومقالات." },
              { icon: <Music size={22} />, title: "موسيقى وألحان", desc: "نوتة موسيقية، توزيع، وتسجيلات أصلية." },
              { icon: <Lightbulb size={22} />, title: "ابتكار وبراءات", desc: "أفكار ابتكارية، مخططات هندسية، ونماذج عمل." },
              { icon: <Palmtree size={22} />, title: "فنون مرئية", desc: "هوية بصرية، تصوير فوتوغرافي، وفن رقمي." }
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="p-8 bg-white/5 border border-white/5 rounded-[2rem] hover:border-royal-blue/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-royal-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-royal-blue mb-5 group-hover:scale-110 transition-transform relative z-10">{item.icon}</div>
                <h3 className="text-white mb-3 text-[14px] italic relative z-10">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[12px] relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sector 2: Business */}
        <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="flex items-center gap-3 mb-8 border-r-4 border-white/20 pr-4 font-black">
            <Building2 className="text-white" size={28} />
            <h2 className="text-2xl md:text-3xl uppercase tracking-tighter text-white">موثوقية المعاملات (شركات)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 uppercase font-bold text-[11px]">
            {[
              { icon: <FileText size={22} />, title: "عقود واتفاقيات", desc: "توثيق عقود الشراكة واتفاقيات الخصوصية NDA." },
              { icon: <Users size={22} />, title: "موارد بشرية", desc: "شهادات خبرة وتعيينات بـ QR Code غير قابل للتلاعب." },
              { icon: <CreditCard size={22} />, title: "اعتمادات مالية", desc: "توثيق الفواتير الرسمية وشهادات الوكلاء المعتمدين." },
              { icon: <Settings size={22} />, title: "أصول تشغيلية", desc: "حماية كتيبات التشغيل Manuals وتقارير الجودة." }
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} className="p-8 bg-white/5 border border-white/5 rounded-[2rem] hover:border-white/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-white mb-5 group-hover:scale-110 transition-transform relative z-10">{item.icon}</div>
                <h3 className="text-white mb-3 text-[14px] italic relative z-10">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-[12px] relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Tech/Forensic Specs */}
      <section className="max-w-6xl mx-auto mt-20 bg-royal-blue/5 border border-royal-blue/20 rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden italic text-right">
        <div className="absolute top-0 right-0 w-72 h-72 bg-royal-blue/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black uppercase mb-8 leading-tight text-white">لماذا يعتد بنا <br /> <span className="text-royal-blue underline decoration-white/10">كدليل رقمي تقني؟</span></h2>
            <p className="text-gray-400 font-bold mb-10 text-[15px] leading-relaxed">نحن لا نكتفي بحفظ البيانات؛ نحن نمنحها "هوية رقمية" لا تقبل الجدل. عبر دمج التوقيع المشفر مع البصمة الزمنية، نوفر للمبدعين والشركات حجة فنية قاطعة أمام الجهات المختصة.</p>
            <div className="space-y-5">
              {[
                { icon: <ShieldCheck size={18} />, text: "بصمة SHA-256 فريدة تمنع تعديل المحتوى" },
                { icon: <Clock size={18} />, text: "ختم زمني مرتبط بساعة ذرية عالمية" },
                { icon: <Database size={18} />, text: "نظام سجل أحداث مشفر غير قابل للحذف" },
                { icon: <CheckCircle2 size={18} />, text: "توافق مع معايير الأدلة الجنائية الرقمية" }
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-black text-white/90 uppercase tracking-widest">
                  <span className="text-royal-blue bg-royal-blue/10 p-2 rounded-lg">{f.icon}</span> {f.text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] relative group">
            <div className="flex items-center justify-between mb-10 pb-5 border-b border-white/5 uppercase font-black tracking-[0.3em] text-[10px]">
              <span className="text-gray-600 italic">Official Sample Certificate</span>
              <span className="text-royal-blue" dir="ltr">BB-VERIFY-2026</span>
            </div>
            <div className="space-y-8">
              <div className="h-2.5 w-full bg-white/10 rounded-full" />
              <div className="h-2.5 w-2/3 bg-white/10 rounded-full" />
              <div className="h-2.5 w-5/6 bg-white/5 rounded-full" />
              <div className="flex items-end justify-between pt-8">
                <div className="w-20 h-20 border border-white/10 bg-white/5 rounded-2xl flex items-center justify-center italic text-[9px] text-gray-600 uppercase font-black p-4 text-center">Security QR Scan</div>
                <div className="text-left" dir="ltr">
                   <div className="text-[12px] font-black text-white italic tracking-tighter leading-none mb-1">SECURED BY</div>
                   <div className="text-[9px] text-royal-blue font-black tracking-[0.2em]">BLACK BOX SYSTEM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
