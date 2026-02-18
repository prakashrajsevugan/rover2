import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import Start from "./components/Start";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="animate-[fadeIn_0.3s_ease-out]">
      <Routes>
        {/* Auth routes - without navbar and footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Home route - with its own navbar (no footer) */}
        <Route path="/home" element={<Home />} />
        
        {/* Main routes - with navbar and footer */}
        <Route
          path="/*"
          element={
            <main>
              <Navbar />
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/start" element={<Start />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </main>
          }
        />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
