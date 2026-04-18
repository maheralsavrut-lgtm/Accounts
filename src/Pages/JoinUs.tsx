import { motion } from "framer-motion";
import { 
  Building2, ChevronLeft, Cpu, Globe, 
  LayoutDashboard, Send, ShieldCheck, Zap 
} from "lucide-react";
import { useState, FormEvent } from "react";

const features = [
  { 
    title: "بوابة API مخصصة", 
    desc: "ربط تقني مباشر مع أنظمتكم لإصدار شهادات التوثيق آلياً.", 
    icon: <Cpu className="text-royal-blue" /> 
  },
  { 
    title: "لوحة تحكم ذكية", 
    desc: "تتبع عمليات التحقق ومراقبة صحة الوثائق لحظة بلحظة.", 
    icon: <LayoutDashboard className="text-royal-blue" /> 
  },
  { 
    title: "حماية ضد التزييف", 
    desc: "تشفير AES-256 يضمن استحالة تكرار أو تزوير الأكواد الخاصة بكيانكم.", 
    icon: <ShieldCheck className="text-royal-blue" /> 
  }
];

export default function JoinUs() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // هنا يتم ربط الـ Backend لاحقاً
  };

  return (
    <div className="pt-24 md:pt-40 pb-20 px-6 max-w-7xl mx-auto relative z-10 text-right" dir="rtl">
      
      {/* Header Section */}
      <div className="mb-16 text-center md:text-right">
        <motion.h1 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl font-black italic uppercase text-white mb-6"
        >
          انضم إلى <span className="text-royal-blue">منظومة الثقة</span>
        </motion.h1>
        <p className="text-gray-400 max-w-2xl font-bold leading-relaxed text-sm md:text-base">
          حوّل مؤسستك إلى كيان موثق رقمياً. امنح عملائك اليقين التام بصحة منتجاتك ووثائقك عبر تكنولوجيا Black Box.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Information & Features */}
        <div className="lg:col-span-5 space-y-6">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl hover:bg-white/[0.04] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-black italic text-white mb-2 uppercase">{feature.title}</h3>
                  <p className="text-gray-500 text-xs font-bold leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Verification Badge Preview */}
          <div className="bg-gradient-to-br from-royal-blue/20 to-transparent border border-royal-blue/20 p-8 rounded-[2rem] text-center">
            <Building2 className="mx-auto text-royal-blue mb-4" size={48} />
            <span className="block text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Verified Entity</span>
            <div className="h-px bg-white/10 w-20 mx-auto mb-4" />
            <p className="text-[10px] text-royal-blue/60 italic font-bold">بمجرد الانضمام، ستحصل على معرف رقمي عالمي فريد (BB-ID).</p>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="lg:col-span-7">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#080808] border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 mr-2">اسم الكيان / الشركة</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-royal-blue outline-none transition-all font-bold" placeholder="مثال: شركة النظم العالمية" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 mr-2">نوع النشاط</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-royal-blue outline-none transition-all font-bold text-gray-400">
                      <option>تقني / برمجيات</option>
                      <option>صناعي / تجاري</option>
                      <option>حكومي / تعليمي</option>
                      <option>صانع محتوى مستقل</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 mr-2">الموقع الإلكتروني (إن وجد)</label>
                  <input type="url" dir="ltr" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-royal-blue outline-none transition-all font-bold" placeholder="https://example.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 mr-2">بريد التواصل الرسمي</label>
                  <input required type="email" dir="ltr" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-royal-blue outline-none transition-all font-bold" placeholder="info@company.com" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 mr-2">لماذا تريد الانضمام لنظام التوثيق؟</label>
                  <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-royal-blue outline-none transition-all font-bold resize-none" placeholder="اشرح لنا طبيعة الوثائق أو المنتجات التي ترغب في حمايتها..."></textarea>
                </div>

                <button type="submit" className="w-full bg-white text-black py-4 rounded-xl font-black italic uppercase hover:bg-royal-blue hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                  إرسال طلب الانضمام
                  <Send size={18} />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="py-20 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-royal-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-royal-blue" size={40} />
                </div>
                <h2 className="text-2xl font-black italic text-white uppercase">تم استلام طلبك بنجاح!</h2>
                <p className="text-gray-400 font-bold text-sm">سيقوم فريق Black Box التقني بمراجعة بيانات الكيان والتواصل معكم لتفعيل مفاتيح الـ API.</p>
                <button onClick={() => setSubmitted(false)} className="text-royal-blue text-[10px] font-black uppercase border-b border-royal-blue/30 pb-1 hover:text-white transition-colors">إرسال طلب آخر</button>
              </motion.div>
            )}

            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none">
               <Globe size={400} />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
