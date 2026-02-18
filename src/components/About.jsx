const About = () => {
  const stats = [
    { value: "98%", label: "Cleaning Efficiency" },
    { value: "24/7", label: "Autonomous Operation" },
    { value: "5km²", label: "Coverage Range" },
    { value: "50L", label: "Debris Capacity" }
  ];

  const capabilities = [
    {
      icon: "🌊",
      title: "Autonomous Navigation",
      description: "GPS-guided pathfinding with obstacle detection and adaptive route optimization for efficient water body coverage."
    },
    {
      icon: "🗑️",
      title: "Debris Collection",
      description: "Advanced collection system for plastics, organic waste, and floating pollutants with automatic sorting capabilities."
    },
    {
      icon: "💧",
      title: "Water Quality Monitoring",
      description: "Real-time sensors measure pH, temperature, turbidity, and dissolved oxygen levels for comprehensive analysis."
    },
    {
      icon: "📍",
      title: "Live Tracking",
      description: "Real-time location monitoring and route visualization through web-based dashboard control systems."
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Cloud-based platform analyzing cleaning patterns, environmental impact, and operational efficiency metrics."
    },
    {
      icon: "🔋",
      title: "Extended Battery Life",
      description: "Solar-assisted power system enabling up to 8 hours of continuous operation with automatic return-to-dock."
    }
  ];

  return (
    <section
      id="about"
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-4xl">🌊</span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            About Albedrozes
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Pioneering autonomous water cleaning technology to protect and preserve aquatic ecosystems worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center transition-all duration-200 hover:border-emerald-500/30"
            >
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-8 sm:p-10 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            To revolutionize water cleaning through autonomous robotic technology, making our water bodies cleaner and healthier for future generations. We combine cutting-edge AI, advanced sensors, and sustainable engineering to combat water pollution at scale.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            Our rovers operate autonomously 24/7, collecting debris, monitoring water quality, and providing real-time environmental data to help communities maintain clean, healthy aquatic ecosystems.
          </p>
        </div>

        {/* Capabilities Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 transition-all duration-200 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                    <span className="text-2xl">{capability.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {capability.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
