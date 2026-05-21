import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Navigate to home page when login is clicked
    if (email && password) {
      // Extract username from email (part before @)
      const username = email.split('@')[0];
      // Store username in localStorage
      localStorage.setItem('username', username);
      navigate("/home");
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#DFE6E9] via-[#E8EBF0] to-[#DFE6E9] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Login Card */}
        <div className="bg-[#DFE6E9]/95 backdrop-blur-none border border-[#636E72]/40 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Home Button */}
          <Link
            to="/start"
            className="inline-flex items-center gap-2 text-[#636E72] hover:text-[#D63031] font-semibold transition-all duration-300 hover:scale-105 mb-6"
          >
            <span className="text-xl">🏠</span>
            <span>Back to Home</span>
          </Link>

          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <img
                src="/images/header.png"
                alt="Albedrozes Logo"
                className="w-16 h-16 object-contain shadow-lg"
                style={{ borderRadius: '10px' }}
              />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-[#636E72] text-sm">Sign in to continue to Albedrozes</p>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-[#636E72] mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 border border-[#636E72]/40 bg-white text-[#1E1E1E] rounded-lg focus:ring-2 focus:ring-[#D63031]/50 focus:border-[#D63031] outline-none transition-all placeholder:text-[#636E72]"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#636E72] mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 border border-[#636E72]/40 bg-white text-[#1E1E1E] rounded-lg focus:ring-2 focus:ring-[#D63031]/50 focus:border-[#D63031] outline-none transition-all placeholder:text-[#636E72]"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-600 text-[#0077BE] focus:ring-1 focus:ring-[#00B8D4]/50" />
                <span className="ml-2 text-[#636E72] group-hover:text-[#636E72] transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[#D63031] hover:text-[#E84C3D] font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#D63031] to-[#E84C3D] hover:from-[#E84C3D] hover:to-[#D63031] text-[#1E1E1E] font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#D63031]/30 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D63031]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#DFE6E9] text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#D63031] bg-[#DFE6E9] text-[#636E72] rounded-lg hover:bg-[#DFE6E9] transition"
            >
              <span className="text-xl">G</span>
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#D63031] bg-[#DFE6E9] text-[#636E72] rounded-lg hover:bg-[#DFE6E9] transition"
            >
              <span className="text-xl">f</span>
              <span className="text-sm font-semibold">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-[#636E72] text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#D63031] hover:text-[#E84C3D] font-medium transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-[#636E72] text-sm mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:no-underline">Terms of Service</a>
          {" "}and{" "}
          <a href="#" className="underline hover:no-underline">Privacy Policy</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
