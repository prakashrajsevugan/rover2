import { Link } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Send, Droplet } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Autonomous Rover", "Water Metrics", "Live Stream"]
    },
    {
      title: "Company",
      links: ["About Us", "Mission", "Careers", "Press Release"]
    },
    {
      title: "Resources",
      links: ["Documentation", "API Reference", "Support", "Contact"]
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", url: "#" },
    { icon: FaXTwitter, label: "Twitter", url: "#" },
    { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
    { icon: FaYoutube, label: "YouTube", url: "#" }
  ];

  return (
    <footer className="relative w-full mt-24 pb-12">
      {/* Full Width Mobile / 80% Desktop Clean Enterprise Light Card */}
      <div className="w-full md:w-[80%] mx-auto bg-white text-slate-800 rounded-none sm:rounded-[2.5rem] p-6 sm:p-12 border-y sm:border border-slate-200 shadow-md space-y-12">
        
        {/* Top Corporate Newsletter Row */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Stay Updated with Albedrozes</h3>
              <Droplet className="w-4 h-4 text-[#f01a30]" />
            </div>
            <p className="text-xs font-bold text-slate-500">Subscribe for real-time autonomous telemetry & water cleanup updates.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }} className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <input
                type="email"
                required
                placeholder="Enter corporate email"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30 shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-extrabold text-xs text-white bg-[#f01a30] hover:bg-[#d61327] flex items-center gap-2 shadow-md shadow-[#f01a30]/20 hover:shadow-lg transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Main Corporate Link Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src="/images/header.png"
                alt="Albedrozes Logo"
                className="h-10 sm:h-11 w-auto object-contain mix-blend-multiply bg-transparent"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-tight">
                  Albedrozes
                </span>
                <span className="text-[10px] font-extrabold text-[#f01a30] tracking-widest uppercase">
                  PRIVATE LIMITED
                </span>
              </div>
            </Link>
            
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Designing weightless, autonomous robotic solutions to clean aquatic environments, manage floating debris, and monitor water quality in real time.
            </p>

            {/* Social Icon Pills */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-[#f01a30] text-slate-600 hover:text-white flex items-center justify-center border border-slate-200 transition-all duration-200 shadow-xs"
                  >
                    <IconComponent className="text-base" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Links Columns (Product & Company in single row on mobile, Resources hidden on mobile) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 md:col-span-3">
            {footerLinks.map((section) => (
              <div
                key={section.title}
                className={section.title === "Resources" ? "hidden md:block" : "block"}
              >
                <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-slate-600 hover:text-[#f01a30] transition-colors duration-200 text-sm font-medium block"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-semibold">
          <p>© {currentYear} Albedrozes Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#f01a30] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f01a30] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#f01a30] transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
