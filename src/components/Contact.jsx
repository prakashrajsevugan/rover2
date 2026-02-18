export const Contact = () => {
  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      detail: "support@albedrozes.com",
      link: "mailto:support@albedrozes.com"
    },
    {
      icon: "📱",
      title: "Phone",
      detail: "+91 96843 34356",
      link: "tel:+15551234567"
    },
    {
      icon: "📍",
      title: "Address",
      detail: "Kannampalayam,Coimbatore - 641 402,Tamil Nadu, India. ",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 px-4 sm:px-6"
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-[fadeIn_0.8s_ease-out] px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 sm:mb-4 drop-shadow-lg animate-[slideInDown_0.6s_ease-out] leading-tight">
            Get In Touch
          </h2>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto animate-[slideInUp_0.8s_ease-out] leading-relaxed">
            Have questions about our water cleaning solutions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Form */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl animate-[slideInLeft_0.8s_ease-out]">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-5 sm:mb-6">Send us a Message</h3>
            <form className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 sm:py-3.5 border border-slate-600 bg-slate-900 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-base touch-manipulation"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 sm:py-3.5 border border-slate-600 bg-slate-900 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-base touch-manipulation"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 sm:py-3.5 border border-slate-600 bg-slate-900 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-base touch-manipulation"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 sm:py-3.5 border border-slate-600 bg-slate-900 text-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition resize-none text-base touch-manipulation"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3.5 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl touch-manipulation"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-5 sm:space-y-6">
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 animate-[slideInRight_0.8s_ease-out] touch-manipulation"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl flex-shrink-0 transition-all duration-300 hover:scale-125 hover:rotate-12">{info.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-1">
                      {info.title}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-300 break-words">{info.detail}</p>
                  </div>
                </div>
              </a>
            ))}

            {/* Interactive Map */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-lg animate-[slideInRight_1.2s_ease-out] overflow-hidden">
              <h4 className="text-base sm:text-lg font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 sm:mb-4">Visit Our Office</h4>
              <div className="w-full h-56 sm:h-64 rounded-lg overflow-hidden shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d846.0891087746388!2d77.08184568329413!3d10.999352566748877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba856be6170b317%3A0x38b41cc57543ac84!2sPallapalayam%2C%20Kannampalayam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1769606177024!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Map"
                  className="rounded-lg transition-all duration-300 hover:scale-105"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

