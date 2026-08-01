import { useRef } from "react";
import { Waves, Trash2, Droplets, MapPin, BarChart3, BatteryCharging, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);

  const stats = [
    { value: "98.4%", label: "Debris Cleaning Efficiency" },
    { value: "24/7", label: "Autonomous Operation" },
    { value: "5 km²", label: "Areal Coverage Range" },
    { value: "50 L", label: "Onboard Debris Capacity" }
  ];

  const capabilities = [
    {
      icon: Waves,
      title: "Autonomous Navigation",
      description: "GPS-guided pathfinding with obstacle detection and adaptive route optimization for efficient water body coverage.",
      badge: "AI Pathfinding"
    },
    {
      icon: Trash2,
      title: "Debris Collection",
      description: "Advanced collection system for plastics, organic waste, and floating pollutants with automatic sorting capabilities.",
      badge: "High Capacity"
    },
    {
      icon: Droplets,
      title: "Water Quality Monitoring",
      description: "Real-time sensors measure pH, temperature, turbidity, and dissolved oxygen levels for comprehensive analysis.",
      badge: "Multi-Sensor"
    },
    {
      icon: MapPin,
      title: "Live GPS Telemetry",
      description: "Real-time location monitoring and route visualization through web-based dashboard control systems.",
      badge: "Real-Time Telemetry"
    },
    {
      icon: BarChart3,
      title: "Data Analytics Platform",
      description: "Cloud-based platform analyzing cleaning patterns, environmental impact, and operational efficiency metrics.",
      badge: "Cloud Telemetry"
    },
    {
      icon: BatteryCharging,
      title: "Extended Battery Life",
      description: "Solar-assisted power system enabling up to 8 hours of continuous operation with automatic return-to-dock.",
      badge: "Solar Assisted"
    }
  ];

  useGSAP(
    () => {
      // 1. Header Entrance Animation
      gsap.fromTo(
        ".gsap-about-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // 2. Stats Grid Staggered Pop-In Animation
      gsap.fromTo(
        ".gsap-stat-card",
        { opacity: 0, scale: 0.88, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.12, ease: "back.out(1.5)", delay: 0.2 }
      );

      gsap.fromTo(
        ".gsap-stat-val",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: "back.out(2)", delay: 0.3 }
      );

      // 3. Mission Card Scroll Reveal Animation
      gsap.fromTo(
        ".gsap-mission-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-mission-card",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 4. Horizontal ScrollTrigger for Core Capabilities
      const track = horizontalTrackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const containerWidth = section.clientWidth;
        return -(trackWidth - containerWidth + 60);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top 12%",
        end: () => `+=${Math.abs(getScrollAmount()) + 400}`,
        pin: true,
        animation: tween,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true
      });
    },
    { scope: containerRef }
  );

  const scrollLeftNav = () => {
    if (horizontalTrackRef.current) {
      gsap.to(horizontalTrackRef.current, {
        x: "+=380",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const scrollRightNav = () => {
    if (horizontalTrackRef.current) {
      gsap.to(horizontalTrackRef.current, {
        x: "-=380",
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  return (
    <section id="about" ref={containerRef} className="relative w-full min-h-screen bg-slate-50 py-16 px-4 sm:px-6">
      <div className="w-[95%] md:w-[70%] mx-auto space-y-16">
        
        {/* Header with GSAP Entrance Animation */}
        <div className="gsap-about-header text-center space-y-4">
          <div className="inline-flex items-center justify-center mx-auto bg-transparent">
            <img
              src="/images/header.png"
              alt="Albedrozes Logo"
              className="h-20 sm:h-24 w-auto object-contain mix-blend-multiply bg-transparent"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About Albedrozes
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Pioneering weightless, autonomous robotic technology to protect and preserve aquatic ecosystems worldwide.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="gsap-stat-card bg-white rounded-3xl p-6 text-center shadow-md border border-slate-200 hover:shadow-xl transition-all"
            >
              <div className="gsap-stat-val text-3xl sm:text-4xl font-black text-[#f01a30] mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Card */}
        <div className="gsap-mission-card bg-white/90 rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md hover:shadow-lg transition-all space-y-4">
          <span className="text-xs font-extrabold text-[#f01a30] uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Our Enterprise Mission
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Cleaning Aquatic Ecosystems at Scale</h2>
          <p className="text-slate-600 leading-relaxed text-base">
            To revolutionize water body cleanup through autonomous robotic technology, making our rivers, lakes, and oceans cleaner and healthier for future generations. We combine cutting-edge AI, advanced multi-sensor arrays, and sustainable engineering to combat aquatic pollution.
          </p>
        </div>

        {/* Core Capabilities Section */}
        <div ref={sectionRef} className="gsap-horizontal-section space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div>
              <h2 className="text-3xl font-black text-slate-900">Core Engineering Capabilities</h2>
              <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Key Engineering Innovations</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeftNav}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#f01a30] hover:border-slate-300 transition-all cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRightNav}
                className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-700 hover:text-[#f01a30] hover:border-slate-300 transition-all cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Track Wrapper */}
          <div className="overflow-hidden w-full rounded-3xl py-2">
            <div
              ref={horizontalTrackRef}
              className="flex gap-6 w-max py-4 px-2"
            >
              {capabilities.map((cap, index) => {
                const IconComponent = cap.icon;
                return (
                  <div
                    key={index}
                    className="w-[320px] sm:w-[380px] shrink-0 bg-white rounded-3xl p-7 border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#f01a30] shadow-xs">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold text-[#f01a30] uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                        {cap.badge}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-extrabold text-slate-900 text-xl">{cap.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{cap.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-bold">
                      <span>Capability 0{index + 1}</span>
                      <span className="text-[#f01a30]">Albedrozes Engineering</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
