import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../lib/firebase";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Mail, Lock, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // دالة الدخول/التسجيل (Email/Pass)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("أهلاً بك مجدداً ⚡");
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // إضافة الـ 5 Bx فوراً لليوزر الجديد
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
        alert("تم إنشاء حسابك ومنحك 5 Bx هدية! 🎁");
      }
    } catch (err: any) {
      alert("حدث خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // دخول جوجل السريع
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: res.user.uid,
          email: res.user.email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
      }
      alert("تم الدخول عبر جوجل بنجاح 🚀");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 italic">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden"
      >
        {/* تأثير ضوئي خلفي */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-royal-blue/10 blur-[100px] rounded-full" />
        
        <div className="text-center mb-10 relative z-10">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block p-4 bg-royal-blue/10 rounded-3xl mb-4"
          >
            <ShieldCheck size={40} className="text-royal-blue" />
          </motion.div>
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">Black Box ID</h1>
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase">نظام التحقق الموحد والوصول الرقمي</p>
        </div>

        <div className="space-y-4 relative z-10">
          {/* زر جوجل */}
          <button 
            onClick={handleGoogle}
            className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all group"
          >
            <img src="/google-icon.png" className="w-5 h-5 group-hover:scale-110 transition-transform" alt="" />
            <span className="text-[10px] uppercase tracking-widest">المتابعة باستخدام Google</span>
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">أو عبر البريد</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                required
                className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-2xl focus:border-royal-blue outline-none transition-all font-bold text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="كلمة السر" 
                required
                className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-2xl focus:border-royal-blue outline-none transition-all font-bold text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-royal-blue text-white font-black py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(65,105,225,0.3)] transition-all flex items-center justify-center gap-2 group"
            >
              <span className="text-[10px] uppercase tracking-widest">
                {loading ? "جاري المعالجة..." : isLogin ? "دخول إلى النظام" : "إنشاء حساب جديد + 5 BX"}
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] text-gray-500 font-bold hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              {isLogin ? "لا تملك حساباً؟ سجل الآن واحصل على هدية" : "لديك حساب بالفعل؟ سجل دخولك"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
