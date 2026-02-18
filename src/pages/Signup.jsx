import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Signup Card */}
        <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Home Button */}
          <Link
            to="/start"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-semibold transition-all duration-300 hover:scale-105 mb-6"
          >
            <span className="text-xl">🏠</span>
            <span>Back to Home</span>
          </Link>

          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-3xl">🌊</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2 tracking-tight">Create Account</h1>
            <p className="text-slate-400 text-sm">Join Albedrozes to get started</p>
          </div>

          {/* Signup Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3.5 py-2.5 border border-slate-600/50 bg-slate-900/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-3.5 py-2.5 border border-slate-600/50 bg-slate-900/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 border border-slate-600/50 bg-slate-900/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3.5 py-2.5 border border-slate-600/50 bg-slate-900/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 text-emerald-500 border-slate-600 rounded focus:ring-emerald-500"
                required
              />
              <span className="ml-2 text-slate-400">
                I agree to the{" "}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800 text-slate-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-600 bg-slate-900 text-slate-300 rounded-lg hover:bg-slate-700 transition"
            >
              <span className="text-xl">G</span>
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-600 bg-slate-900 text-slate-300 rounded-lg hover:bg-slate-700 transition"
            >
              <span className="text-xl">f</span>
              <span className="text-sm font-semibold">Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-slate-400 text-sm mt-6">
          By signing up, you agree to receive updates and marketing communications from AquaClean
        </p>
      </div>
    </section>
  );
};

export default Signup;
