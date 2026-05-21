import { FaFacebookF,FaLinkedinIn,FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Security", "Roadmap"]
    },
    {
      title: "Company",
      links: ["About", "Blog", "Careers", "Press"]
    },
    {
      title: "Resources",
      links: ["Documentation", "API Docs", "Support", "Contact"]
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, label: "Facebook", url: "#" },
    { icon: FaXTwitter, label: "Twitter", url: "#" },
    { icon: FaLinkedinIn, label: "LinkedIn", url: "#" },
    { icon: FaYoutube, label: "YouTube", url: "#" }
  ];

  return (
    <footer className="w-full bg-[#DFE6E9] text-slate-200 border-t border-[#D63031]">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/header.png" 
                alt="Albedrozes Logo"
                className="w-12 h-10 object-contain shadow-lg shadow-[#D63031]/15"
                style={{ borderRadius: '8px' }}
              />
              <h3 className="text-xl font-semibold text-[#1E1E1E]">Albedrozes</h3>
            </div>
            <p className="text-[#636E72] text-sm leading-relaxed mb-6 max-w-xs">
              Advanced autonomous water cleaning and monitoring solutions for a cleaner planet.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    aria-label={social.label}
                    className="w-9 h-9 bg-[#DFE6E9] hover:bg-[#D63031] rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <IconComponent className="text-sm" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections - 3 Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h4 className="text-sm font-semibold mb-4 text-[#1E1E1E] tracking-wide uppercase">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[#636E72] hover:text-[#D63031] transition-colors duration-200 text-sm block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#D63031] pt-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#636E72] text-sm">
            © {currentYear} Albedrozes Rover. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-[#636E72] hover:text-[#D63031] text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-[#636E72] hover:text-[#D63031] text-sm transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-[#636E72] hover:text-[#D63031] text-sm transition-colors duration-200">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
