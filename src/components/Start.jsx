import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Bot, Compass, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Start = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-hero-card",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-feature-card",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, delay: 0.4, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-cta-btn",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.7, ease: "power2.out" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div id="start" ref={containerRef} className="min-h-screen bg-slate-50 py-12 sm:py-16 px-4 sm:px-6">
      <div className="w-[95%] md:w-[70%] mx-auto space-y-8">
        
        {/* Corporate Hero Card */}
        <div className="gsap-hero-card bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-200/90 text-center space-y-8">
          
          {/* Static Brand Logo */}
          <div className="inline-flex items-center justify-center mx-auto bg-transparent">
            <img
              src="/images/header.png"
              alt="Albedrozes Logo"
              className="h-20 sm:h-24 w-auto object-contain mix-blend-multiply bg-transparent"
            />
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="gsap-text">
              <span className="text-xs font-extrabold text-[#f01a30] tracking-widest uppercase bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200/80 inline-block">
                ALBEDROZES PRIVATE LIMITED
              </span>
            </div>

            <h1 className="gsap-text text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Autonomous Water Cleanup & Telemetry Platform
            </h1>

            <p className="gsap-text text-slate-600 text-base sm:text-lg leading-relaxed pt-2 max-w-2xl mx-auto">
              Enterprise-grade spatial positioning, real-time video streaming, automated surface debris collection, and multi-sensor water quality monitoring.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto">
            <div className="gsap-feature-card bg-slate-50/80 p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:bg-white transition-all flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#f01a30] group-hover:scale-105 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Autonomous Navigation</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Self-guided debris sweeping with intelligent obstacle avoidance</p>
            </div>

            <div className="gsap-feature-card bg-slate-50/80 p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:bg-white transition-all flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Live GPS Mapping</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Real-time OpenStreetMap spatial positioning and route tracking</p>
            </div>

            <div className="gsap-feature-card bg-slate-50/80 p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:bg-white transition-all flex flex-col items-center text-center space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">Water Telemetry</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Real-time monitoring for pH, Turbidity, TDS, DO, BOD & COD</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="gsap-cta-btn pt-4">
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#f01a30] hover:bg-[#d61327] text-white font-extrabold text-base rounded-xl shadow-lg shadow-[#f01a30]/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Launch Enterprise Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Start;
