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

  // دالة الدخول أو التسجيل بالإيميل
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("أهلاً بك في نظام بلاك بوكس ⚡");
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // لحظة منح الهدية: إضافة 5 Bx في قاعدة البيانات فوراً
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
        alert("مبروك! تم إنشاء حسابك ومنحك 5 Bx هدية افتتاحية 🎁");
      }
    } catch (err: any) {
      alert("خطأ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // الدخول السريع بجوجل
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      // لو أول مرة يدخل بجوجل، نفتح له حساب وندي له الـ 5 Bx
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: res.user.uid,
          email: res.user.email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
        alert("أهلاً بك! تم تفعيل حسابك بـ 5 Bx هدية 🚀");
      } else {
        alert("تم تسجيل الدخول بنجاح");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 italic" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden"
      >
        {/* توهج خلفي هادئ */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-royal-blue/5 blur-[120px] rounded-full" />
        
        <div className="text-center mb-10 relative z-10">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block p-4 bg-royal-blue/10 rounded-3xl mb-4 border border-royal-blue/20"
          >
            <ShieldCheck size={35} className="text-royal-blue" />
          </motion.div>
          <h1 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white">Black Box ID</h1>
          <p className="text-gray-500 text-[9px] font-bold tracking-[0.2em] uppercase">نظام التحقق الموحد والوصول الرقمي</p>
        </div>

        <div className="space-y-4 relative z-10">
          {/* زر Google */}
          <button 
            onClick={handleGoogle}
            className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95"
          >
            <img src="/google-icon.png" className="w-5 h-5" alt="" />
            <span className="text-[10px] uppercase tracking-widest">المتابعة باستخدام Google</span>
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[8px] text-gray-600 font-black uppercase tracking-[0.3em]">أو</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                required
                className="w-full bg-black/40 border border-white/5 p-4 pr-12 rounded-2xl focus:border-royal-blue/50 outline-none transition-all font-bold text-sm text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            <div className="relative">
              <input 
                type="password" 
                placeholder="كلمة السر" 
                required
                className="w-full bg-black/40 border border-white/5 p-4 pr-12 rounded-2xl focus:border-royal-blue/50 outline-none transition-all font-bold text-sm text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-royal-blue text-white font-black py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(65,105,225,0.2)] transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span className="text-[10px] uppercase tracking-widest">
                {loading ? "جاري المعالجة..." : isLogin ? "دخول إلى النظام" : "إنشاء حساب + 5 BX"}
              </span>
              <ArrowRight size={16} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] text-gray-500 font-bold hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              {isLogin ? "لا تملك حساباً؟ انضم للمنظومة الآن" : "لديك حساب بالفعل؟ سجل دخولك"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
