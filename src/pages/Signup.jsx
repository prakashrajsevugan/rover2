import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#001529] via-[#003d5c] to-[#001529] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg">
        {/* Signup Card */}
        <div className="bg-[#002140]/95 backdrop-blur-sm border border-[#005a8c]/50 rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
          {/* Home Button */}
          <Link
            to="/start"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#00D4FF] font-semibold transition-all duration-300 hover:scale-105 mb-6"
          >
            <span className="text-xl">🏠</span>
            <span>Back to Home</span>
          </Link>

          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0077BE] to-[#00B8D4] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0077BE]/20">
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
                className="w-full px-3.5 py-2.5 border border-[#005a8c]/50 bg-[#001529]/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-[#00B8D4]/50 focus:border-[#00B8D4] outline-none transition-all placeholder:text-slate-500"
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
                className="w-full px-3.5 py-2.5 border border-[#005a8c]/50 bg-[#001529]/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-[#00B8D4]/50 focus:border-[#00B8D4] outline-none transition-all placeholder:text-slate-500"
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
                className="w-full px-3.5 py-2.5 border border-[#005a8c]/50 bg-[#001529]/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-[#00B8D4]/50 focus:border-[#00B8D4] outline-none transition-all placeholder:text-slate-500"
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
                className="w-full px-3.5 py-2.5 border border-[#005a8c]/50 bg-[#001529]/50 text-slate-200 rounded-lg focus:ring-2 focus:ring-[#00B8D4]/50 focus:border-[#00B8D4] outline-none transition-all placeholder:text-slate-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start text-sm">
              <input
                type="checkbox"
                className="w-4 h-4 mt-0.5 text-[#0077BE] border-[#005a8c] rounded focus:ring-[#00B8D4]"
                required
              />
              <span className="ml-2 text-slate-400">
                I agree to the{" "}
                <a href="#" className="text-[#00D4FF] hover:text-[#80deea] font-semibold">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#00D4FF] hover:text-[#80deea] font-semibold">
                  Privacy Policy
                </a>
              </span>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#0077BE] to-[#00B8D4] hover:from-[#0099E5] hover:to-[#00D4FF] text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#0077BE]/30 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#005a8c]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#002140] text-slate-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#005a8c] bg-[#001529] text-slate-300 rounded-lg hover:bg-[#003d5c] transition"
            >
              <span className="text-xl">G</span>
              <span className="text-sm font-semibold">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 border border-[#005a8c] bg-[#001529] text-slate-300 rounded-lg hover:bg-[#003d5c] transition"
            >
              <span className="text-xl">f</span>
              <span className="text-sm font-semibold">Facebook</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-[#00D4FF] hover:text-[#80deea] font-semibold">
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
