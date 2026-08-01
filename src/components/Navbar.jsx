import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Home, Info, PhoneCall, User, LogOut, Menu, X, ChevronDown } from "lucide-react";

const Navbar = ({ username: usernameProp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const logoutMenuRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (usernameProp) {
      setUsername(usernameProp);
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [usernameProp]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutMenuRef.current && !logoutMenuRef.current.contains(event.target)) {
        setShowLogoutMenu(false);
      }
    };
    if (showLogoutMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogoutMenu]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    setShowLogoutMenu(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-sm transition-all duration-300">
      <nav className="w-full md:w-[80%] mx-auto flex items-center justify-between py-4 sm:py-5 px-4 sm:px-6">
        
        {/* Brand Logo Section */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <img
            src="/images/header.png"
            alt="Albedrozes Logo"
            className="h-12 sm:h-14 w-auto object-contain mix-blend-multiply bg-transparent group-hover:opacity-90 transition-opacity"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none mb-1">
              Albedrozes
            </span>
            <span className="text-[11px] font-extrabold text-[#f01a30] tracking-widest uppercase">
              PRIVATE LIMITED
            </span>
          </div>
        </Link>

        {/* Desktop Enterprise Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-full border border-slate-200">
            <Link
              to={username ? "/home" : "/start"}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold transition-all duration-200 ${
                isActive("/home") || isActive("/start") || isActive("/")
                  ? "bg-white text-[#f01a30] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold transition-all duration-200 ${
                isActive("/about")
                  ? "bg-white text-[#f01a30] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>

            <Link
              to="/contact"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-extrabold transition-all duration-200 ${
                isActive("/contact")
                  ? "bg-white text-[#f01a30] shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* User Account / Profile */}
          {username ? (
            <div className="relative" ref={logoutMenuRef}>
              <button
                onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-extrabold text-slate-800 shadow-sm hover:border-slate-300 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#f01a30] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[130px] truncate">{username}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showLogoutMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs font-extrabold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#f01a30] hover:bg-[#d61327] text-white text-sm font-extrabold shadow-md shadow-[#f01a30]/25 hover:shadow-lg transition-all duration-200"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-7 h-7 text-[#f01a30]" /> : <Menu className="w-7 h-7 text-slate-700" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <Link
            to={username ? "/home" : "/start"}
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-slate-800 hover:bg-slate-50 transition-colors text-base"
          >
            <Home className="w-5 h-5 text-[#f01a30]" />
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-slate-800 hover:bg-slate-50 transition-colors text-base"
          >
            <Info className="w-5 h-5 text-[#f01a30]" />
            <span>About</span>
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-slate-800 hover:bg-slate-50 transition-colors text-base"
          >
            <PhoneCall className="w-5 h-5 text-[#f01a30]" />
            <span>Contact</span>
          </Link>
          <div className="pt-3 border-t border-slate-200">
            {username ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 text-rose-600 font-extrabold rounded-xl text-base"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out ({username})</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#f01a30] text-white font-extrabold rounded-xl text-base shadow-md"
              >
                <User className="w-5 h-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
