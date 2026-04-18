import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { auth, db } from "../lib/firebase";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Mail, Lock, LogIn, UserPlus, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // التحقق من صحة الإيميل يدوياً لتغيير اللون
  const isEmailValid = useMemo(() => {
    if (email === "") return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailValid) return;
    setLoading(true);
    setErrorMsg("");
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setErrorMsg("هذا الحساب غير موجود في منظومتنا.");
      } else if (err.code === "auth/wrong-password") {
        setErrorMsg("كلمة السر غير صحيحة.");
      } else {
        setErrorMsg("حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

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
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-8 relative z-10">
          <div className="inline-block p-3 bg-royal-blue/10 rounded-2xl mb-4 border border-royal-blue/20 text-royal-blue">
            <Shield size={28} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Black Box Accounts</h1>
          <p className="text-gray-500 text-[11px] uppercase tracking-widest font-medium">حساب بلاك بوكس الموحد</p>
        </div>

        <div className="space-y-4 relative z-10">
          <button 
            onClick={handleGoogle}
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-royal-blue hover:text-white transition-all active:scale-[0.98] text-sm group"
          >
            <img src="/google.png" className="w-4 h-4 group-hover:brightness-0 group-hover:invert transition-all" alt="Google" />
            المتابعة باستخدام Google
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase"><span className="bg-[#0A0A0A] px-3 text-gray-600 font-bold tracking-[0.2em]">أو البريد الإلكتروني</span></div>
          </div>

          {/* رسالة الخطأ في حالة عدم وجود حساب */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex flex-col items-center gap-3 text-center"
              >
                <div className="flex items-center gap-2 text-red-500 text-xs font-bold">
                  <AlertCircle size={14} /> {errorMsg}
                </div>
                {errorMsg.includes("غير موجود") && (
                  <button 
                    onClick={() => { setIsLogin(false); setErrorMsg(""); }}
                    className="text-[10px] bg-red-500 text-white px-3 py-1.5 rounded-lg font-black hover:bg-red-600 transition-colors uppercase"
                  >
                    إنشاء حساب الآن
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                required
                className={`w-full bg-white/[0.02] border ${!isEmailValid ? 'border-red-500/50' : 'border-white/10'} p-4 pr-11 rounded-xl focus:border-royal-blue/40 outline-none transition-all text-sm text-white`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); if(errorMsg) setErrorMsg(""); }}
              />
              <Mail className={`absolute right-4 top-1/2 -translate-y-1/2 ${!isEmailValid ? 'text-red-500' : 'text-gray-600'}`} size={16} />
            </div>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="كلمة السر" 
                required
                className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 pl-11 rounded-xl focus:border-royal-blue/40 outline-none transition-all text-sm text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-royal-blue text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.98]"
            >
              {loading ? "جاري المعالجة..." : isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
              {!loading && (isLogin ? <LogIn size={16} /> : <UserPlus size={16} />)}
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => { setIsLogin(!isLogin); setErrorMsg(""); }}
              className="text-[11px] text-gray-500 hover:text-white transition-colors font-medium underline underline-offset-4"
            >
              {isLogin ? "لا تملك حساباً؟ انضم للمنظومة الآن" : "لديك حساب بالفعل؟ سجل دخولك"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
