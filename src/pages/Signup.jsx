import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Lock, Mail, User, UserPlus } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (email) {
      const username = name || email.split('@')[0];
      localStorage.setItem('username', username);
      navigate("/home");
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-slate-100/90 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        
        {/* Floating Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.04)] border border-white/60 space-y-6">
          
          <Link
            to="/start"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#f01a30] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3 bg-transparent">
              <img
                src="/images/header.png"
                alt="Albedrozes Logo"
                className="h-16 w-auto object-contain mix-blend-multiply bg-transparent"
              />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create Account</h1>
            <p className="text-xs text-slate-500 font-medium">Join Albedrozes Private Limited</p>
          </div>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-500 pt-1">
              <input type="checkbox" required className="mt-0.5 rounded border-slate-300 text-[#f01a30] focus:ring-[#f01a30]" />
              <span>I agree to the <a href="#" className="text-[#f01a30] font-bold">Terms of Service</a> and <a href="#" className="text-[#f01a30] font-bold">Privacy Policy</a></span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#f01a30] hover:bg-[#d61327] text-white font-bold rounded-xl shadow-lg shadow-[#f01a30]/25 hover:shadow-xl hover:shadow-[#f01a30]/35 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link to="/signup" className="text-[#f01a30] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Signup;
