import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Mail, Lock, LogIn, UserPlus, Shield, Eye, EyeOff, AlertCircle, Phone, Ticket, CheckCircle2 } from "lucide-react";

export default function Home({ mode }: { mode: 'login' | 'signup' }) {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  // --- States مع استرجاع البيانات من sessionStorage ---
  const [email, setEmail] = useState(() => sessionStorage.getItem('bb_email') || "");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState(() => sessionStorage.getItem('bb_phone') || "");
  const [referralCode, setReferralCode] = useState(() => sessionStorage.getItem('bb_ref') || "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [sendUpdates, setSendUpdates] = useState(false);

  // حفظ البيانات تلقائياً عند التغيير
  useEffect(() => {
    sessionStorage.setItem('bb_email', email);
    sessionStorage.setItem('bb_phone', phone);
    sessionStorage.setItem('bb_ref', referralCode);
  }, [email, phone, referralCode]);

  // --- Logic ---
  const isEmailMatch = email === confirmEmail || isLogin;
  const isPassMatch = password === confirmPassword || isLogin;
  
  const passwordStrength = useMemo(() => {
    if (!password) return { label: "", color: "bg-gray-800", width: "0%" };
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*]/.test(password);
    if (password.length >= 8 && hasLetters && hasNumbers && hasSymbols) return { label: "قوية", color: "bg-green-500", width: "100%" };
    if (password.length >= 6 && (hasLetters || hasNumbers)) return { label: "متوسطة", color: "bg-yellow-500", width: "60%" };
    return { label: "ضعيفة", color: "bg-red-500", width: "30%" };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      if (!isEmailMatch) return setErrorMsg("البريد الإلكتروني غير متطابق");
      if (!isPassMatch) return setErrorMsg("كلمة السر غير متطابقة");
      if (password.length < 8) return setErrorMsg("كلمة السر ضعيفة جداً");
      if (!agreedTerms || !agreedPrivacy) return setErrorMsg("برجاء الموافقة على الشروط والسياسات");
    }
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate(`/profile`);
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid, email, phone, referralCode, bx_balance: 5, tier: "Free", createdAt: new Date()
        });
        // مسح البيانات بعد التسجيل الناجح
        sessionStorage.clear();
        navigate(`/${res.user.uid}/Profile`);
      }
    } catch (err: any) {
      setErrorMsg("حدث خطأ في البيانات، تأكد وحاول ثانية.");
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, { uid: res.user.uid, email: res.user.email, bx_balance: 5, tier: "Free", createdAt: new Date() });
      }
      sessionStorage.clear();
      navigate(`/${res.user.uid}`);
    } catch (err) { setErrorMsg("فشل الدخول عبر جوجل"); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 font-sans italic text-right dir-rtl">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-royal-blue/10 rounded-2xl mb-4 border border-royal-blue/20 text-royal-blue"><Shield size={28} /></div>
          <h1 className="text-xl font-black text-white uppercase tracking-tighter">Black Box Accounts</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">{isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}</p>
        </div>

        <div className="space-y-5">
          <button onClick={handleGoogle} className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-royal-blue hover:text-white transition-all duration-300 group text-sm shadow-lg shadow-white/5">
            <img src="/google.png" className="w-4 h-4 group-hover:brightness-0 group-hover:invert transition-all" alt="G" />
            المتابعة باستخدام Google
          </button>

          <div className="relative py-2 text-center text-[9px] uppercase">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative bg-[#0A0A0A] px-4 text-gray-600 font-black tracking-[0.2em]">أو البيانات الشخصية</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input type="email" placeholder="البريد الإلكتروني" required className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white transition-all text-right" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
            </div>

            {!isLogin && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                <div className="relative">
                  <input type="email" placeholder="تأكيد البريد الإلكتروني" required className={`w-full bg-white/[0.02] border ${!isEmailMatch ? 'border-red-500/50' : 'border-white/10'} p-4 pr-11 rounded-2xl outline-none text-sm text-white text-right`} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                </div>
                <div className="relative">
                  <input type="tel" placeholder="رقم التليفون (اختياري)" className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white text-right" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                </div>
              </motion.div>
            )}

            <div className="relative">
              <input type={showPassword ? "text" : "password"} placeholder="كلمة السر" required className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 pl-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white font-bold text-right" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
            </div>

            {!isLogin && (
              <div className="space-y-4 pt-1">
                <div className="px-1 text-right">
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-1">
                    <motion.div animate={{ width: passwordStrength.width }} className={`h-full ${passwordStrength.color} transition-all duration-500`} />
                  </div>
                  <span className={`text-[8px] font-black uppercase ${passwordStrength.color.replace('bg-', 'text-')}`}>{passwordStrength.label}</span>
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="تأكيد كلمة السر" required className={`w-full bg-white/[0.02] border ${!isPassMatch ? 'border-red-500/50' : 'border-white/10'} p-4 pr-11 rounded-2xl outline-none text-sm text-white font-bold text-right`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                </div>
                <div className="relative">
                  <input type="text" placeholder="كود الدعوة (اختياري)" className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white text-right" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
                  <Ticket className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                </div>
                <div className="space-y-3 px-1">
                  {[
                    { state: agreedTerms, set: setAgreedTerms, text: "أوافق على شروط الاستخدام", link: "/standards" },
                    { state: agreedPrivacy, set: setAgreedPrivacy, text: "أوافق على سياسة الخصوصية", link: "/legal" },
                    { state: sendUpdates, set: setSendUpdates, text: "أرغب في استلام التحديثات" }
                  ].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group w-fit flex-row-reverse ml-auto">
                      <div onClick={() => item.set(!item.state)} className={`w-4 h-4 rounded border ${item.state ? 'bg-royal-blue border-royal-blue' : 'border-white/10'} flex items-center justify-center transition-all group-hover:border-royal-blue/50`}>
                        {item.state && <CheckCircle2 size={12} className="text-white" />}
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold group-hover:text-gray-300 transition-colors">
                        {item.text} {item.link && <Link to={item.link} className="text-royal-blue hover:underline underline-offset-2"> (اطلاع) </Link>}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-royal-blue text-white font-black py-4 rounded-2xl hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm shadow-xl shadow-royal-blue/20 mt-4">
              {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "تأكيد وإنشاء الحساب"}
            </button>
          </form>

          {errorMsg && <div className="text-red-500 text-[10px] font-bold text-center animate-pulse">{errorMsg}</div>}

          <div className="text-center pt-4 border-t border-white/5">
            <button 
              onClick={() => navigate(isLogin ? "/signup" : "/login")} 
              className="text-[11px] text-gray-500 hover:text-white hover:scale-105 transition-all duration-300 underline underline-offset-8 font-black block w-full uppercase tracking-tighter"
            >
              {isLogin ? "مستخدم جديد؟ انضم للمنظومة الآن" : "لديك حساب بالفعل؟ سجل دخولك"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
