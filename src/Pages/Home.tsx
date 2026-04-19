import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { Mail, Lock, LogIn, UserPlus, Shield, Eye, EyeOff, AlertCircle, Phone, Ticket, CheckCircle2 } from "lucide-react";

export default function Home({ mode }: { mode: 'login' | 'signup' }) {
  const navigate = useNavigate();
  const isLogin = mode === 'login';

  // --- States ---
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Checkboxes
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [sendUpdates, setSendUpdates] = useState(false);

  // --- Logic & Validation ---
  const isEmailMatch = email === confirmEmail || isLogin;
  const isPassMatch = password === confirmPassword || isLogin;
  
  const passwordStrength = useMemo(() => {
    if (!password) return { label: "", color: "bg-gray-800", width: "0%" };
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*]/.test(password);
    const length = password.length;

    if (length >= 8 && hasLetters && hasNumbers && hasSymbols) return { label: "قوية جداً", color: "bg-green-500", width: "100%" };
    if (length >= 6 && hasLetters && hasNumbers) return { label: "متوسطة", color: "bg-yellow-500", width: "60%" };
    return { label: "ضعيفة", color: "bg-red-500", width: "30%" };
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      if (!isEmailMatch) return setErrorMsg("البريد الإلكتروني غير متطابق");
      if (!isPassMatch) return setErrorMsg("كلمة السر غير متطابقة");
      if (password.length < 8) return setErrorMsg("كلمة السر يجب أن تكون 8 رموز على الأقل");
      if (!agreedTerms || !agreedPrivacy) return setErrorMsg("يجب الموافقة على الشروط والسياسات");
    }

    setLoading(true);
    setErrorMsg("");
    
    try {
      if (isLogin) {
        // ... منطق تسجيل الدخول (نفس الكود السابق)
      } else {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email,
          phone,
          referralCode,
          bx_balance: 5,
          tier: "Free",
          marketingConsent: sendUpdates,
          createdAt: new Date()
        });
        navigate(`/${res.user.uid}/Profile`);
      }
    } catch (err: any) {
      setErrorMsg("حدث خطأ، تأكد من البيانات أو حاول مرة أخرى.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 font-sans italic">
      <motion.div 
        layout
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full max-w-lg bg-[#0A0A0A] border border-white/5 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-royal-blue/10 rounded-2xl mb-4 border border-royal-blue/20 text-royal-blue"><Shield size={28} /></div>
          <h1 className="text-xl font-black text-white italic tracking-tighter">Black Box Verify</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">{isLogin ? "دخول المنظومة" : "إنشاء هوية رقمية جديدة"}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* البريد الإلكتروني */}
          <div className="relative">
            <input type="email" placeholder="البريد الإلكتروني" required className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          </div>

          {!isLogin && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
              {/* تأكيد البريد */}
              <div className="relative">
                <input type="email" placeholder="تأكيد البريد الإلكتروني" required className={`w-full bg-white/[0.02] border ${!isEmailMatch ? 'border-red-500/50' : 'border-white/10'} p-4 pr-11 rounded-2xl outline-none text-sm text-white transition-all`} value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              </div>

              {/* رقم التليفون */}
              <div className="relative">
                <input type="tel" placeholder="رقم التليفون (اختياري)" className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white font-bold" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              </div>
            </motion.div>
          )}

          {/* كلمة السر */}
          <div className="relative">
            <input type={showPassword ? "text" : "password"} placeholder="كلمة السر" required className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 pl-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white font-bold" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
          </div>

          {!isLogin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {/* مقياس قوة الباسورد */}
              <div className="px-1">
                <div className="flex justify-between text-[9px] mb-1 font-bold uppercase tracking-tighter">
                  <span className="text-gray-500">قوة الرمز:</span>
                  <span className={passwordStrength.color.replace('bg-', 'text-')}>{passwordStrength.label}</span>
                </div>
                <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div animate={{ width: passwordStrength.width }} className={`h-full ${passwordStrength.color}`} />
                </div>
                <p className="text-[8px] text-gray-600 mt-1">* 8 رموز على الأقل (حروف، أرقام، رموز)</p>
              </div>

              {/* تأكيد الباسورد */}
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="تأكيد كلمة السر" required className={`w-full bg-white/[0.02] border ${!isPassMatch ? 'border-red-500/50' : 'border-white/10'} p-4 pr-11 rounded-2xl outline-none text-sm text-white font-bold`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <CheckCircle2 className={`absolute right-4 top-1/2 -translate-y-1/2 ${isPassMatch && confirmPassword ? 'text-green-500' : 'text-gray-600'}`} size={18} />
              </div>

              {/* كود الدعوة */}
              <div className="relative">
                <input type="text" placeholder="كود الدعوة (اختياري)" className="w-full bg-white/[0.02] border border-white/10 p-4 pr-11 rounded-2xl focus:border-royal-blue/40 outline-none text-sm text-white" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
                <Ticket className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} className="hidden" />
                  <div className={`w-5 h-5 rounded-md border ${agreedTerms ? 'bg-royal-blue border-royal-blue' : 'border-white/10'} flex items-center justify-center transition-all`}>
                    {agreedTerms && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className="text-[11px] text-gray-400 font-bold">أوافق على <Link to="/legal" className="text-royal-blue underline">شروط الاستخدام</Link></span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={agreedPrivacy} onChange={(e) => setAgreedPrivacy(e.target.checked)} className="hidden" />
                  <div className={`w-5 h-5 rounded-md border ${agreedPrivacy ? 'bg-royal-blue border-royal-blue' : 'border-white/10'} flex items-center justify-center transition-all`}>
                    {agreedPrivacy && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className="text-[11px] text-gray-400 font-bold">أوافق على <Link to="/legal" className="text-royal-blue underline">سياسة الخصوصية</Link></span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" checked={sendUpdates} onChange={(e) => setSendUpdates(e.target.checked)} className="hidden" />
                  <div className={`w-5 h-5 rounded-md border ${sendUpdates ? 'bg-royal-blue border-royal-blue' : 'border-white/10'} flex items-center justify-center transition-all`}>
                    {sendUpdates && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <span className="text-[11px] text-gray-400 font-bold">أرغب في استلام التحديثات والأخبار</span>
                </label>
              </div>
            </motion.div>
          )}

          {errorMsg && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold text-center flex items-center justify-center gap-2"><AlertCircle size={14}/> {errorMsg}</div>}

          <button type="submit" disabled={loading} className="w-full bg-royal-blue text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm shadow-xl shadow-royal-blue/20">
            {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "تأكيد وإنشاء الحساب"}
            {!loading && (isLogin ? <LogIn size={18} /> : <UserPlus size={18} />)}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-white/5">
          <button onClick={() => navigate(isLogin ? "/signup" : "/login")} className="text-[11px] text-gray-500 hover:text-white transition-all underline underline-offset-4 font-black">
            {isLogin ? "مستخدم جديد؟ انضم للمنظومة الآن" : "لديك حساب بالفعل؟ سجل دخولك"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
