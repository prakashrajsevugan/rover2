import { useNavigate } from "react-router-dom";
const Start = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: "🗑️",
      title: "Surface Debris Collection",
      description: "Intelligent surface debris detection and removal system"
    },
    {
      icon: "📍",
      title: "Real-time Tracking",
      description: "Live location monitoring and surface route optimization"
    },
    {
      icon: "📷",
      title: "Surface Camera",
      description: "High-resolution imaging for surface water inspection"
    }
  ];

  return (
    <div id="start" className="min-h-screen bg-gradient-to-br from-[#001529] via-[#003d5c] to-[#001529] py-12 sm:py-16 px-4 sm:px-6">
      <div className="w-full max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="bg-[#002140]/60 backdrop-blur-sm border border-[#005a8c]/50 rounded-2xl shadow-xl p-8 sm:p-10 md:p-12 mb-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#0077BE] to-[#00B8D4] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0077BE]/20">
              <span className="text-4xl">🌊</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight leading-tight">
            Albedrozes Water Cleaning System
          </h1>
          <p className="text-lg sm:text-xl text-[#00D4FF] font-medium mb-3">
            Autonomous Rover Technology
          </p>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced Autonomous Water Purification & Debris Collection Platform
          </p>
        </div>

        {/* Product Showcase */}
        <div className="bg-[#001529]/50 rounded-xl overflow-hidden mb-8 border border-[#005a8c]/50">
          {/* <div className="relative aspect-video overflow-hidden">
            <img 
              src="/images/rover2.jpeg" 
              alt="Albedrozes Surface Rover - Advanced Water Cleaning System" 
              className="w-full h-full object-cover"
            />
          </div> */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Surface Cleaning Rover
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Our flagship autonomous water cleaning rover, equipped with intelligent debris collection, real-time GPS tracking, and advanced water purification technology.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#0077BE]/20 text-[#00D4FF] border border-[#0077BE]/30">
                🤖 Autonomous
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#00B8D4]/20 text-[#80deea] border border-[#00B8D4]/30">
                🐢 Amphibious
              </span>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[#00D4FF]/20 text-[#b2ebf2] border border-[#00D4FF]/30">
                📍 Live Tracking
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-gradient-to-r from-[#0077BE] to-[#00B8D4] hover:from-[#0099E5] hover:to-[#00D4FF] text-white font-semibold text-lg rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-[#0077BE]/30 active:scale-[0.98]"
          >
            Get Started
          </button>
        </div>
      </div>
{/* 
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden mb-8 sm:mb-12 border border-teal-200 animate-[scaleIn_0.8s_ease-out] hover:shadow-2xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
        <div className="relative overflow-hidden bg-white p-6 sm:p-8">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-400/10 to-orange-400/10 pointer-events-none"></div>
          <img 
            src="/images/rover2.jpeg" 
            alt="Albedrozes Advanced Water Rover - Dual Tank System" 
            className="w-full h-auto max-w-full object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-500 relative z-10"
          />
        </div>
        <div className="p-5 sm:p-6 bg-white">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent mb-3">
            Dual Collection System
          </h2>
          <p className="text-center text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed px-2 mb-3">
            Features dual floating tanks for enhanced stability and increased debris storage capacity. Perfect for large-scale water body cleaning operations with extended deployment times.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-rose-100 text-rose-700">
              🗑️ 50L Capacity
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-orange-100 text-orange-700">
              ⚖️ Balanced Design
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-amber-100 text-amber-700">
              🔄 Auto-Deploy
            </span>
          </div>
        </div>
      </div> */}
    </div>
    </div>
  );
};

export default Start;
