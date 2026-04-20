import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "./lib/firebase"; 
import { 
  signOut, 
  onAuthStateChanged, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { LogOut, Construction, Shield, Loader2 } from "lucide-react";

// استيراد الصفحات (تأكد من وجود الملفات في مسار Pages)
import Home from "./Pages/Home";
import About from "./Pages/About";
import Legal from "./Pages/Legal";
import Standards from "./Pages/Standards";
import JoinUs from "./Pages/JoinUs"; 

// --- مكون لوحة التحكم الذكي مع خاصية التوجيه التلقائي ---
const DashboardPlaceholder = () => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // فحص هل يوجد رابط عودة في الـ URL (جاي من Verify مثلاً)
    const urlParams = new URLSearchParams(window.location.search);
    const returnTo = urlParams.get('returnTo');

    if (returnTo) {
      setIsRedirecting(true);
      // التوجيه فوراً للرابط المطلوب مع فك التشفير
      setTimeout(() => {
        window.location.href = decodeURIComponent(returnTo);
      }, 1500); // تأخير بسيط لإعطاء تجربة مستخدم سلسة
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("خطأ أثناء تسجيل الخروج", err);
    }
  };

  if (isRedirecting) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-center">
        <Loader2 className="text-royal-blue animate-spin mb-4" size={40} />
        <h2 className="text-xl font-black italic text-white tracking-widest uppercase">
          Redirecting to System...
        </h2>
        <p className="text-gray-500 text-xs mt-2 font-bold">جارٍ نقلك لمنظومة التوثيق الرقمي</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-40 text-center italic">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl"
      >
        <Construction className="text-royal-blue mb-6 mx-auto animate-bounce" size={48} />
        <h2 className="text-3xl font-black uppercase mb-3 tracking-tighter text-white">
          لوحة التحكم قيد التطوير
        </h2>
        <p className="text-gray-500 text-sm mb-10 max-w-xs mx-auto font-bold">
          مرحباً بك في منظومة Black Box.. حسابك نشط الآن ونعمل على تجهيز واجهتك البرمجية.
        </p>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 bg-red-600/10 border border-red-600/20 text-red-500 px-10 py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300 group font-black text-xs uppercase shadow-lg shadow-red-600/5"
        >
          <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
          تسجيل الخروج من المنظومة
        </button>
      </motion.div>
    </div>
  );
};

// --- بيانات المنظومة ---
const socialLinks = [
  { name: 'facebook', file: 'Facebook.png' },
  { name: 'whatsapp', file: 'whatsapp.png' },
  { name: 'instagram', file: 'Instagram.png' },
  { name: 'tiktok', file: 'tiktok.png' },
  { name: 'youtube', file: 'YouTube.png' },
  { name: 'x', file: 'x.png' },
  { name: 'linkedin', file: 'LinkedIn.png' },
  { name: 'github', file: 'GitHub copy.png' },
  { name: 'discord', file: 'Discord.png' }
];

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ضبط استمرارية الجلسة لتكون Local (لا تخرج بقفل المتصفح)
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // مراقبة حالة المستخدم
        return onAuthStateChanged(auth, (user) => {
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Persistence Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-royal-blue font-black italic animate-pulse tracking-[0.5em] text-[10px]">
          INITIALIZING BLACK BOX ACCOUNTS...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white selection:bg-royal-blue font-sans relative overflow-x-hidden" dir="rtl">
        
        {/* Background Layer */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('/marketing-background.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/50 to-[#050505]" />
        </div>

        {/* Header */}
        <header className="absolute top-0 inset-x-0 z-50 h-16 md:h-20 flex items-center justify-end px-6 md:px-12 bg-transparent">
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer group" dir="ltr">
            <motion.img 
              src="/favicon.png" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain" 
              alt="Logo" 
              whileHover={{ rotateY: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <div className="flex flex-col leading-none">
              <span className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-white">Black Box</span>
              <span className="text-[8px] md:text-[9px] font-bold text-royal-blue tracking-[0.3em] uppercase">accounts</span>
            </div>
          </Link>
        </header>

        {/* Content Area */}
        <main className="relative z-10 pt-24 md:pt-32"> 
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Home mode="login" />} />
            <Route path="/signup" element={<Home mode="signup" />} />
            
            <Route path="/:userID" element={<DashboardPlaceholder />} />
            <Route path="/:userID/Profile" element={<DashboardPlaceholder />} />
            <Route path="/:userID/Settings" element={<DashboardPlaceholder />} />

            <Route path="/about" element={<About />} />
            <Route path="/standards" element={<Standards />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/join-us" element={<JoinUs />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-16 border-t border-white/5 bg-[#050505]/90 backdrop-blur-xl mt-16 text-center italic">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* قسم قانوني */}
              <div className="flex flex-col items-center">
                <h4 className="text-white font-black mb-6 border-b-2 border-royal-blue inline-block pb-1">قانوني</h4>
                <ul className="text-gray-500 text-sm font-bold space-y-2.5 text-center">
                  {[{ name: "اتفاقية الاستخدام", path: "/legal" }, { name: "عنا", path: "/about" }, { name: "الخصوصية", path: "#" }].map((item, idx) => (
                    <li key={idx} className="hover:text-royal-blue cursor-pointer transition-colors">
                      <Link to={item.path}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* قسم القطاعات */}
              <div className="flex flex-col items-center">
                <h4 className="text-white font-black mb-6 border-b-2 border-royal-blue inline-block pb-1">القطاعات</h4>
                <p className="text-gray-500 text-xs font-bold leading-relaxed">
                  الذكاء الاصطناعي • التوثيق الرقمي • منصة التواصل <br/> صندوق المنتجات • المحفظة الموحدة
                </p>
              </div>

              {/* قسم التواصل */}
              <div className="flex flex-col items-center">
                <h4 className="text-white font-black mb-6 border-b-2 border-royal-blue inline-block pb-1">تواصل مباشر</h4>
                <div className="flex flex-wrap justify-center gap-3">
                  {socialLinks.slice(0, 9).map((social) => (
                    <img key={social.name} src={`/${social.file}`} alt={social.name} className="w-6 h-6 opacity-40 hover:opacity-100 transition-opacity cursor-pointer" />
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-3">
              <span className="text-[10px] tracking-[0.5em] text-gray-600 uppercase">
                Copyright © 2026 Black Box Technology System
              </span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
