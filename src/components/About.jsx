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
      className="relative w-full min-h-screen bg-gradient-to-br from-[#DFE6E9] via-[#E8EBF0] to-[#DFE6E9] py-16 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <img 
              src="/images/header.png" 
              alt="Albedrozes Logo"
              className="w-24 h-20 object-contain shadow-lg shadow-[#D63031]/15"
              style={{ borderRadius: '10px' }}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1E1E1E] mb-4 tracking-tight">
            About Albedrozes
          </h1>
          <p className="text-xl text-[#636E72] max-w-3xl mx-auto leading-relaxed">
            Pioneering autonomous water cleaning technology to protect and preserve aquatic ecosystems worldwide
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#DFE6E9]/60 backdrop-blur-none border border-[#636E72]/40 rounded-xl p-6 text-center transition-all duration-200 hover:border-[#636E72]/40"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#D63031] mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#636E72] font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-[#D63031]/10 to-[#E84C3D]/10 border border-[#D63031]/20 rounded-2xl p-8 sm:p-10 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-4">Our Mission</h2>
          <p className="text-lg text-[#636E72] leading-relaxed mb-4">
            To revolutionize water cleaning through autonomous robotic technology, making our water bodies cleaner and healthier for future generations. We combine cutting-edge AI, advanced sensors, and sustainable engineering to combat water pollution at scale.
          </p>
          <p className="text-lg text-[#636E72] leading-relaxed">
            Our rovers operate autonomously 24/7, collecting debris, monitoring water quality, and providing real-time environmental data to help communities maintain clean, healthy aquatic ecosystems. Water quality monitoring is one of our key features, helping track pH, turbidity, TDS, dissolved oxygen, BOD, and COD.
          </p>
        </div>

        {/* Capabilities Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#1E1E1E] mb-8 text-center">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <div
                key={index}
                className="bg-[#DFE6E9]/60 backdrop-blur-none border border-[#636E72]/40 rounded-xl p-6 transition-all duration-200 hover:border-[#636E72]/40 hover:shadow-lg hover:shadow-[#D63031]/10"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                    <span className="text-2xl">{capability.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-[#636E72] leading-relaxed">
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
