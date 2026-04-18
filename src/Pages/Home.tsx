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
import { Mail, Lock, LogIn, UserPlus, Shield } from "lucide-react";

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
        alert("تم تسجيل الدخول بنجاح");
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // إضافة 5 Bx فوراً في قاعدة البيانات للحسابات الجديدة
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
        alert("أهلاً بك! تم إنشاء حسابك ومنحك 5 Bx هدية");
      }
    } catch (err: any) {
      alert("عذراً، تأكد من البيانات المدخلة");
    } finally {
      setLoading(false);
    }
  };

  // الدخول عبر جوجل
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
      alert("تم الدخول بنجاح");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        {/* اللوجو والعنوان */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-block p-3 bg-royal-blue/10 rounded-2xl mb-4 border border-royal-blue/20 text-royal-blue">
            <Shield size={28} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-1">Black Box Accounts</h1>
          <p className="text-gray-500 text-[11px] uppercase tracking-widest font-medium">حساب بلاك بوكس الموحد</p>
        </div>

        <div className="space-y-4 relative z-10">
          {/* زر Google المحدث بمسار الصورة الجديد */}
          <button 
            onClick={handleGoogle}
            className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-[0.98] text-sm"
          >
            <img src="/google.png" className="w-4 h-4" alt="Google" />
            المتابعة باستخدام Google
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-[9px] uppercase"><span className="bg-[#0A0A0A] px-3 text-gray-600 font-bold tracking-[0.2em]">أو البريد الإلكتروني</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                required
                className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-xl focus:border-royal-blue/40 outline-none transition-all text-sm text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            </div>

            <div className="relative">
              <input 
                type="password" 
                placeholder="كلمة السر" 
                required
                className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-xl focus:border-royal-blue/40 outline-none transition-all text-sm text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
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

          {/* تنويه الهدية يظهر فقط في حالة إنشاء حساب جديد */}
          <AnimatePresence>
            {!isLogin && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-royal-blue/5 border border-royal-blue/10 rounded-xl text-center"
              >
                <p className="text-[10px] text-royal-blue font-bold tracking-wide">
                   سيتم إضافة 5 Bx لمحفظتك فور اكتمال التسجيل 🎁
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-6">
            <button 
              onClick={() => setIsLogin(!isLogin)}
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
