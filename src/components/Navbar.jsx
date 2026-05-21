import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ username: usernameProp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const logoutMenuRef = useRef(null);

  useEffect(() => {
    // Get username from prop or localStorage
    const storedUsername = localStorage.getItem('username');
    if (usernameProp) {
      setUsername(usernameProp);
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [usernameProp]);

  useEffect(() => {
    // Handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close logout menu when clicking outside
    const handleClickOutside = (event) => {
      if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target)) {
        setShowLogoutMenu(false);
      }
    };

    if (showLogoutMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLogoutMenu]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setUsername("");
    setShowLogoutMenu(false);
    navigate('/login');
  };

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  return (
    <header className={`w-full shadow-lg sticky top-0 z-50 animate-[slideInDown_0.5s_ease-out] transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#DFE6E9]/95 backdrop-blur-md border-b border-[#D63031]' 
        : 'bg-[#DFE6E9] border-b border-[#DFE6E9]'
    }`}>
      <nav className="mx-auto flex w-full items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-[#1E1E1E] group">
          <img
            className="h-15 w-30 rounded-xl shadow-md transition-all duration-300 "
            src="/images/Albedrozes.png"
            alt="Albedrozes logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-[#1E1E1E]">
          <Link className="relative px-3 py-2 text-base font-semibold transition-all duration-300 hover:scale-110 group" to={username ? "/home" : "/start"}>
            <span className="relative z-10">Home</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-lg"></span>
          </Link>
          <Link className="relative px-3 py-2 text-base font-semibold transition-all duration-300 hover:scale-110 group" to="/about">
            <span className="relative z-10">About</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-lg"></span>
          </Link>
          <Link className="relative px-3 py-2 text-base font-semibold transition-all duration-300 hover:scale-110 group" to="/contact">
            <span className="relative z-10">Contact</span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
            <span className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 group-hover:bg-white/20 group-hover:shadow-lg"></span>
          </Link>
          {username ? (
            <div className="relative" ref={logoutMenuRef}>
              <button
                onClick={toggleLogoutMenu}
                className="rounded-lg bg-white/20 px-4 py-2 text-base font-semibold backdrop-blur-none transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:shadow-lg hover:shadow-white/20 cursor-pointer"
              >
                👤 {username}
              </button>
              {showLogoutMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#DFE6E9] border border-[#636E72] rounded-lg shadow-xl py-2 z-50 animate-[scaleIn_0.2s_ease-out]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-[#1E1E1E] hover:bg-[#E8EBF0] hover:text-[#D63031] transition-colors duration-200 flex items-center gap-2"
                  >
                    <span>🚪</span>
                    <span className="font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="relative rounded-lg bg-[#D63031] hover:bg-[#E84C3D] px-4 py-2 text-base font-semibold text-[#1E1E1E] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#D63031]/30 hover:scale-105 active:scale-95 overflow-hidden group"
            >
              <span className="relative z-10">Sign In / Sign Up</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#E84C3D] to-[#D63031] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700"></span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col items-center justify-center w-11 h-11 text-[#1E1E1E] focus:outline-none z-[60] relative"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1.5 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-72 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 overflow-y-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(180deg, #DFE6E9 0%, #DFE6E9 50%, #DFE6E9 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-6">
          <Link
            to={username ? "/home" : "/start"}
            onClick={closeMenu}
            className="text-[#1E1E1E] text-base font-medium py-3.5 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 mb-1 flex items-center gap-3"
          >
            <span className="text-xl">🏠</span>
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="text-[#1E1E1E] text-base font-medium py-3.5 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 mb-1 flex items-center gap-3"
          >
            <span className="text-xl">ℹ️</span>
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="text-[#1E1E1E] text-base font-medium py-3.5 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors duration-200 mb-1 flex items-center gap-3"
          >
            <span className="text-xl">📞</span>
            <span>Contact</span>
          </Link>
          
          <div className="mt-6 pt-6 border-t border-[#005a8c]">
            {username ? (
              <div className="space-y-3">
                <div className="text-[#1E1E1E] text-base font-medium py-3 px-4 rounded-lg bg-white/10 flex items-center gap-3">
                  <span className="w-8 h-8 bg-[#0077BE] rounded-full flex items-center justify-center text-sm font-semibold">
                    {username.charAt(0).toUpperCase()}
                  </span>
                  <span>{username}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-[#1E1E1E] text-base font-medium py-3.5 px-4 rounded-lg bg-red-600/90 hover:bg-red-600 active:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="block text-center bg-[#0077BE] hover:bg-[#0099E5] active:bg-[#0066A5] text-[#1E1E1E] text-base font-semibold py-3.5 px-4 rounded-lg transition-colors duration-200"
              >
                Sign In / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeMenu}
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 animate-[fadeIn_0.3s_ease-out]"
        ></div>
      )}
    </header>
  );
};

export default Navbar;
