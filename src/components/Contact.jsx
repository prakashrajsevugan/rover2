import { useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const Contact = () => {
  const containerRef = useRef(null);

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "support@albedrozes.com",
      link: "mailto:support@albedrozes.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+91 96843 34356",
      link: "tel:+919684334356"
    },
    {
      icon: MapPin,
      title: "Headquarters",
      detail: "Kannampalayam, Coimbatore - 641 402, Tamil Nadu, India.",
      link: "https://maps.google.com"
    }
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-contact-header",
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-contact-form",
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-contact-card",
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, delay: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-contact-map",
        { opacity: 0, y: 35, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.6, ease: "back.out(1.2)" }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="contact" ref={containerRef} className="relative w-full min-h-screen bg-slate-50 py-16 px-4 sm:px-6">
      <div className="w-[95%] md:w-[70%] mx-auto space-y-10">
        
        {/* Header */}
        <div className="gsap-contact-header text-center space-y-3">
          <span className="text-xs font-extrabold text-[#f01a30] tracking-widest uppercase bg-rose-50 px-3.5 py-1.5 rounded-full border border-rose-200 inline-block">
            CONNECT WITH ALBEDROZES
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about deploying our autonomous water cleaning rovers or requesting a site demo? Send us a message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <div className="gsap-contact-form bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
            <h3 className="text-xl font-extrabold text-slate-900">Send us a Message</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your message has been sent."); }}>
              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30 focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30 focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Rover Deployment Inquiry"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30 focus:bg-white transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-1.5">Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Details regarding your water body or project location..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30 focus:bg-white resize-none transition-all text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#f01a30] hover:bg-[#d61327] text-white font-extrabold text-sm rounded-xl shadow-md shadow-[#f01a30]/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Contact Details & Map */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComp = info.icon;
              return (
                <a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-contact-card bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex items-start gap-4 hover:-translate-y-1 hover:shadow-lg transition-all block group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#f01a30] shrink-0 group-hover:scale-105 transition-transform">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{info.title}</h4>
                    <p className="text-slate-600 text-sm mt-0.5">{info.detail}</p>
                  </div>
                </a>
              );
            })}

            {/* Map Frame */}
            <div className="gsap-contact-map bg-white rounded-3xl p-4 border border-slate-200 shadow-md space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm px-2">Headquarters Location</h4>
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d846.0891087746388!2d77.08184568329413!3d10.999352566748877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba856be6170b317%3A0x38b41cc57543ac84!2sPallapalayam%2C%20Kannampalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1769606177024!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Office Location Map"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
