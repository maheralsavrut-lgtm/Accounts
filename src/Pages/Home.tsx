import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // مهم جداً للتنقل
import { auth, db } from "../lib/firebase";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Mail, Lock, LogIn, UserPlus, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";

// لاحظ هنا بنستقبل mode كـ Prop
export default function Home({ mode }: { mode: 'login' | 'signup' }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isLogin = mode === 'login';

  const isEmailInput = identifier.includes("@");
  const isEmailValid = useMemo(() => {
    if (identifier === "" || !isEmailInput) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  }, [identifier, isEmailInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEmailInput && !isEmailValid) return;
    setLoading(true);
    setErrorMsg("");
    
    try {
      let finalEmail = identifier;

      // لو ID بنجيب الإيميل المرتبط بيه
      if (!isEmailInput && isLogin) {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("id", "==", identifier)); 
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          throw { code: "auth/user-not-found" };
        }
        finalEmail = querySnapshot.docs[0].data().email;
      }

      if (isLogin) {
        const res = await signInWithEmailAndPassword(auth, finalEmail, password);
        navigate(`/${res.user.uid}`); // توجيه لصفحة الـ ID
      } else {
        const res = await createUserWithEmailAndPassword(auth, finalEmail, password);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          id: identifier.split('@')[0], // ID افتراضي
          email: finalEmail,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
        navigate(`/${res.user.uid}/Profile`); // توجيه للبروفايل
      }
    } catch (err: any) {
      if (err.code === "auth/user-not-found" || err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setErrorMsg(isLogin ? "بيانات الدخول غير صحيحة. تأكد من كلمة السر أو انضم إلينا الآن." : "هذا البريد مسجل بالفعل.");
      } else {
        setErrorMsg("حدث خطأ، يرجى المحاولة مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: res.user.uid,
          id: res.user.email?.split('@')[0],
          email: res.user.email,
          bx_balance: 5,
          tier: "Free",
          createdAt: new Date()
        });
        navigate(`/${res.user.uid}/Profile`);
      } else {
        navigate(`/${res.user.uid}`);
      }
    } catch (err) {
      setErrorMsg("فشل الدخول عبر جوجل.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-3xl shadow-2xl relative"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-royal-blue/10 rounded-2xl mb-4 border border-royal-blue/20 text-royal-blue">
            <Shield size={28} />
          </div>
          <h1 className="text-xl font-bold text-white mb-1 tracking-tight">Black Box Accounts</h1>
          <p className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </p>
        </div>

        <div className="space-y-4">
          <button onClick={handleGoogle} className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-3 hover:bg-royal-blue hover:text-white transition-all group text-sm">
            <img src="/google.png" className="w-4 h-4 group-hover:brightness-0 group-hover:invert" alt="G" />
            المتابعة باستخدام Google
          </button>

          <div className="relative py-2 text-center text-[9px] uppercase">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#0A0A0A] px-3 text-gray-600 font-black tracking-[0.2em]">أو يدوياً</span>
          </div>

          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex flex-col items-center gap-2 text-center">
                <div className="text-red-500 text-[11px] font-bold flex items-center gap-2">
                  <AlertCircle size={14} /> {errorMsg}
                </div>
                {isLogin && (
                    <button onClick={() => navigate("/signup")} className="text-[10px] bg-red-500/20 text-red-500 px-4 py-1.5 rounded-lg font-black hover:bg-red-500 hover:text-white transition-all">
                        أنشئ حساباً الآن
                    </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder={isLogin ? "البريد الإلكتروني أو الـ ID" : "البريد الإلكتروني"}
                className={`w-full bg-white/[0.02] border ${!isEmailValid ? 'border-red-500/50' : 'border-white/10'} p-4 pr-11 rounded-xl focus:border-royal-blue/40 outline-none text-sm text-white`}
                value={identifier}
                onChange={(e) => { setIdentifier(e.target.value); setErrorMsg(""); }}
              />
              <Mail className={`absolute right-4 top-1/2 -translate-y-1/2 ${!isEmailValid ? 'text-red-500' : 'text-gray-600'}`} size={16} />
            </div>

            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="كلمة السر" 
                className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 pl-11 rounded-xl focus:border-royal-blue/40 outline-none text-sm text-white font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-royal-blue text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-royal-blue/10">
              {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "إنشاء الحساب + 5 Bx"}
              {!loading && (isLogin ? <LogIn size={16} /> : <UserPlus size={16} />)}
            </button>
          </form>

          <div className="text-center mt-6">
            <button 
              onClick={() => navigate(isLogin ? "/signup" : "/login")} 
              className="text-[11px] text-gray-500 hover:text-white underline underline-offset-4 font-bold transition-colors"
            >
              {isLogin ? "لا تملك حساباً؟ انضم للمنظومة" : "لديك حساب بالفعل؟ سجل دخولك"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
