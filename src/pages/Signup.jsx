import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#DFE6E9] via-[#E8EBF0] to-[#DFE6E9] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Signup Card */}
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
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-2 tracking-tight">Create Account</h1>
            <p className="text-[#636E72] text-sm">Join Albedrozes to get started</p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#636E72] mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 border border-[#636E72]/40 bg-white text-[#1E1E1E] rounded-lg focus:ring-2 focus:ring-[#D63031]/50 focus:border-[#D63031] outline-none transition-all placeholder:text-[#636E72]"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#636E72] mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 border border-[#636E72]/40 bg-white text-[#1E1E1E] rounded-lg focus:ring-2 focus:ring-[#D63031]/50 focus:border-[#D63031] outline-none transition-all placeholder:text-[#636E72]"
                placeholder="name@company.com"
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
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#636E72] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 border border-[#636E72]/40 bg-white text-[#1E1E1E] rounded-lg focus:ring-2 focus:ring-[#D63031]/50 focus:border-[#D63031] outline-none transition-all placeholder:text-[#636E72]"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 text-[#D63031] border-[#D63031] rounded focus:ring-[#D63031]"
                required
              />
              <span className="ml-2 text-[#636E72]">
                I agree to the{" "}
                <a href="#" className="text-[#D63031] hover:text-[#E84C3D] font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#D63031] hover:text-[#E84C3D] font-semibold">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#D63031] to-[#E84C3D] hover:from-[#E84C3D] hover:to-[#D63031] text-[#1E1E1E] font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#D63031]/30 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D63031]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#DFE6E9] text-slate-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup Buttons */}
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

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-[#636E72]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#D63031] hover:text-[#E84C3D] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-[#636E72] text-sm mt-6">
          By signing up, you agree to receive updates and marketing communications from AquaClean
        </p>
      </div>
    </section>
  );
};

export default Signup;
