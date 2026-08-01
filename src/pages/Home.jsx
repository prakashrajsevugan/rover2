import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/home.css";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  Play, 
  Square, 
  MapPin, 
  Camera, 
  RefreshCw, 
  Droplets, 
  Activity, 
  Battery, 
  Trash2, 
  Waves, 
  Navigation, 
  Clock, 
  Search,
  Sparkles,
  Zap,
  FileText
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Leaflet default icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red rover icon
const roverIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iI2YwMWEzMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPjx0ZXh0IHg9IjIwIiB5PSIyNiIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+8J+DmjwvdGV4dD48L3N2Zz4=',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const Home = () => {
  const [username, setUsername] = useState("");
  const [roverId, setRoverId] = useState("");
  const [location, setLocation] = useState("");
  const [isCleaning, setIsCleaning] = useState(false);
  const [cameraStatus, setCameraStatus] = useState("offline");
  const [activatedTime, setActivatedTime] = useState("--:--:--");
  const [deactivatedTime, setDeactivatedTime] = useState("--:--:--");
  const [runningTime, setRunningTime] = useState("00:00:00");
  
  // Real-time Metrics State
  const [debrisCollected, setDebrisCollected] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [areaCleaned, setAreaCleaned] = useState(0);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
  const [roverPosition, setRoverPosition] = useState([40.7128, -74.0060]);
  const [stream, setStream] = useState(null);

  // Water Quality Metrics
  const [pH, setPH] = useState(7.2);
  const [turbidity, setTurbidity] = useState(3.4);
  const [tds, setTDS] = useState(240);
  const [dissolvedOxygen, setDissolvedOxygen] = useState(6.8);
  const [bod, setBOD] = useState(3.1);
  const [cod, setCOD] = useState(14.5);

  const runningTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const totalSecondsRef = useRef(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const dashboardRef = useRef(null);

  // GSAP ScrollTrigger Animations
  useGSAP(
    () => {
      // 1. Control Strip: Entrance animation delay (0.8s) & staggered child entrance (1.0s)
      gsap.fromTo(
        ".gsap-control-strip",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".gsap-control-item",
        { opacity: 0, scale: 0.95, y: -10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.2, delay: 1.0, ease: "back.out(1.4)" }
      );

      // 2. Location Map Card: Animate from Left (-100px) with 0.3s delay
      gsap.fromTo(
        ".gsap-map-card",
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-grid-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 3. Rover Camera Card: Animate from Right (+100px) with 0.6s delay
      gsap.fromTo(
        ".gsap-camera-card",
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          delay: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-grid-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 4. Rover Status Banner: Animates immediately on scroll
      gsap.fromTo(
        ".gsap-banner",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-banner",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 5. Metrics Dashboard Section: Triggers immediately when scrolled into view
      gsap.fromTo(
        ".gsap-metrics-dashboard",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gsap-metrics-dashboard",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".gsap-metric-card",
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.3)",
          scrollTrigger: {
            trigger: ".gsap-metrics-dashboard",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        ".gsap-battery-card",
        { opacity: 0, scale: 0.85, y: 25 },
        {
          opacity: 1,
          scale: 1.05,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ".gsap-metrics-dashboard",
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    },
    { scope: dashboardRef }
  );

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Telemetry loop when active
  useEffect(() => {
    if (isCleaning) {
      runningTimerRef.current = setInterval(() => {
        totalSecondsRef.current += 1;
        const hours = Math.floor(totalSecondsRef.current / 3600);
        const minutes = Math.floor((totalSecondsRef.current % 3600) / 60);
        const seconds = totalSecondsRef.current % 60;
        setRunningTime(
          `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );

        if (totalSecondsRef.current % 3 === 0) {
          const debrisAmount = +(0.2 + Math.random() * 0.3).toFixed(1);
          setDebrisCollected(prev => +(prev + debrisAmount).toFixed(1));
          setAreaCleaned(prev => prev + Math.floor(2 + Math.random() * 4));

          setPH(+(7.1 + (Math.random() * 0.4 - 0.2)).toFixed(2));
          setTurbidity(+(3.2 + (Math.random() * 0.6 - 0.3)).toFixed(2));
          setTDS(Math.floor(235 + Math.random() * 15));
          setDissolvedOxygen(+(6.7 + (Math.random() * 0.4 - 0.2)).toFixed(2));
          setBOD(+(3.0 + (Math.random() * 0.3 - 0.15)).toFixed(2));
          setCOD(+(14.2 + (Math.random() * 0.8 - 0.4)).toFixed(2));
        }

        if (totalSecondsRef.current % 12 === 0) {
          setBatteryLevel(prev => Math.max(0, prev - 1));
        }

        if (batteryLevel <= 0) {
          setIsCleaning(false);
          const now = new Date();
          setDeactivatedTime(formatTime(now));
          alert("⚠️ Battery depleted! Rover deactivated automatically.");
        }
      }, 1000);
    } else {
      if (runningTimerRef.current) clearInterval(runningTimerRef.current);
    }

    return () => {
      if (runningTimerRef.current) clearInterval(runningTimerRef.current);
    };
  }, [isCleaning, batteryLevel]);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleStartCleaning = () => {
    if (!roverId) {
      alert("Please enter Rover ID first (e.g. 1853RV1)");
      return;
    }
    if (roverId.trim() !== "1853RV1") {
      alert("Invalid Rover ID! Please use valid ID: 1853RV1");
      return;
    }
    setIsCleaning(true);
    const now = new Date();
    setActivatedTime(formatTime(now));
    startTimeRef.current = now;
    setDeactivatedTime("--:--:--");
  };

  const handleStopCleaning = () => {
    if (!isCleaning) return;
    setIsCleaning(false);
    const now = new Date();
    setDeactivatedTime(formatTime(now));
  };

  const handleUpdateLocation = async () => {
    if (!location) {
      alert("Please enter a location!");
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setMapCenter([lat, lon]);
        setRoverPosition([lat, lon]);
      } else {
        alert("Location not found.");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Error updating location.");
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setMapCenter([lat, lon]);
          setRoverPosition([lat, lon]);
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Could not fetch device location.");
        }
      );
    }
  };

  const handleCameraStart = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setCameraStatus("online");
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Camera unavailable.");
    }
  };

  const handleCameraStop = () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    setCameraStatus("offline");
  };

  const handleSnapshot = () => {
    if (cameraStatus === "offline" || !videoRef.current) {
      alert("Please start the camera first!");
      return;
    }
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `albedrozes-rover-snapshot-${Date.now()}.png`;
      link.click();
    }
  };

  const handleReset = () => {
    if (isCleaning) setIsCleaning(false);
    if (stream) handleCameraStop();
    setRoverId("");
    setLocation("");
    setActivatedTime("--:--:--");
    setDeactivatedTime("--:--:--");
    setRunningTime("00:00:00");
    setDebrisCollected(0);
    setBatteryLevel(85);
    setAreaCleaned(0);
    setPH(7.2);
    setTurbidity(3.4);
    setTDS(240);
    setDissolvedOxygen(6.8);
    setBOD(3.1);
    setCOD(14.5);
    totalSecondsRef.current = 0;
  };

  const handleDownloadReport = () => {
    const reportDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Albedrozes Water Quality Report</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 40px;
            background: #fff;
          }
          .report-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 3px solid #f01a30;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo-container {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          .logo-img {
            height: 60px;
            width: auto;
          }
          .company-title {
            font-size: 24px;
            font-weight: 900;
            color: #0f172a;
            margin: 0;
          }
          .company-sub {
            font-size: 11px;
            font-weight: 800;
            color: #f01a30;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .report-title {
            font-size: 24px;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 12px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 30px;
          }
          .meta-item label {
            font-size: 11px;
            font-weight: 700;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
            margin-bottom: 4px;
          }
          .meta-item span {
            font-size: 15px;
            font-weight: 700;
            color: #0f172a;
          }
          .section-title {
            font-size: 18px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 30px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th, td {
            padding: 14px 16px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 12px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          td {
            font-size: 14px;
            font-weight: 600;
          }
          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: 800;
          }
          .badge-green { background: #dcfce7; color: #166534; }
          .badge-blue { background: #e0f2fe; color: #075985; }
          .report-footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: #94a3b8;
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          <div class="logo-container">
            <img src="/images/header.png" class="logo-img" alt="Albedrozes Logo" />
            <div>
              <h1 class="company-title">Albedrozes</h1>
              <span class="company-sub">PRIVATE LIMITED</span>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 12px; font-weight: 700; color: #f01a30; text-transform: uppercase; letter-spacing: 1px;">Official Telemetry Report</div>
            <div style="font-size: 13px; color: #64748b; font-weight: 600; margin-top: 4px;">Generated: ${reportDate}</div>
          </div>
        </div>

        <h2 class="report-title">Water Quality & Environmental Metrics</h2>
        
        <div class="meta-grid">
          <div class="meta-item">
            <label>Rover ID</label>
            <span>${roverId || '1853RV1'}</span>
          </div>
          <div class="meta-item">
            <label>Operational Status</label>
            <span>${isCleaning ? '🟢 Active Cleaning' : '🔴 Standby Mode'}</span>
          </div>
          <div class="meta-item">
            <label>Target Location Coordinates</label>
            <span>${mapCenter[0].toFixed(4)}° N, ${mapCenter[1].toFixed(4)}° W</span>
          </div>
          <div class="meta-item">
            <label>Session Running Duration</label>
            <span>${runningTime}</span>
          </div>
        </div>

        <div class="section-title">💧 Water Quality Telemetry Readings</div>
        <table>
          <thead>
            <tr>
              <th>Metric Parameter</th>
              <th>Measured Value</th>
              <th>Reference Range</th>
              <th>Quality Assessment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>pH Level</td>
              <td>${pH.toFixed(2)}</td>
              <td>6.5 - 8.5</td>
              <td><span class="badge badge-green">Neutral</span></td>
            </tr>
            <tr>
              <td>Turbidity</td>
              <td>${turbidity.toFixed(2)} NTU</td>
              <td>&lt; 5.0 NTU</td>
              <td><span class="badge badge-blue">Clear Water</span></td>
            </tr>
            <tr>
              <td>Total Dissolved Solids (TDS)</td>
              <td>${tds} ppm</td>
              <td>&lt; 500 ppm</td>
              <td><span class="badge badge-green">Good</span></td>
            </tr>
            <tr>
              <td>Dissolved Oxygen (DO)</td>
              <td>${dissolvedOxygen.toFixed(2)} mg/L</td>
              <td>&gt; 5.0 mg/L</td>
              <td><span class="badge badge-green">Healthy</span></td>
            </tr>
            <tr>
              <td>Biological Oxygen Demand (BOD)</td>
              <td>${bod.toFixed(2)} mg/L</td>
              <td>&lt; 5.0 mg/L</td>
              <td><span class="badge badge-blue">Normal</span></td>
            </tr>
            <tr>
              <td>Chemical Oxygen Demand (COD)</td>
              <td>${cod.toFixed(2)} mg/L</td>
              <td>&lt; 20.0 mg/L</td>
              <td><span class="badge badge-green">Optimal</span></td>
            </tr>
          </tbody>
        </table>

        <div class="section-title">⚡ Debris & Cleaning Performance</div>
        <table>
          <thead>
            <tr>
              <th>Performance Indicator</th>
              <th>Telemetry Output</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Floating Debris Collected</td>
              <td>${debrisCollected} kg</td>
              <td>${isCleaning ? 'Active Collecting' : 'Standby'}</td>
            </tr>
            <tr>
              <td>Battery Power Level</td>
              <td>${batteryLevel}%</td>
              <td>${batteryLevel > 50 ? 'Optimal Capacity' : 'Normal'}</td>
            </tr>
            <tr>
              <td>Aquatic Surface Area Cleaned</td>
              <td>${areaCleaned} m²</td>
              <td>${isCleaning ? 'Active Coverage' : 'Standby'}</td>
            </tr>
          </tbody>
        </table>

        <div class="report-footer">
          <div>© ${new Date().getFullYear()} Albedrozes Private Limited. Confidential Environmental Telemetry Report.</div>
          <div>Page 1 of 1</div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
      </html>
    `;

    const reportWindow = window.open('', '_blank');
    if (reportWindow) {
      reportWindow.document.write(reportHtml);
      reportWindow.document.close();
    } else {
      alert("Please allow popups to generate and print the report.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      <Navbar username={username} />

      <main ref={dashboardRef} className="w-[95%] md:w-[70%] mx-auto pt-8 space-y-8 overflow-hidden">
        
        {/* Section 1: Floating Corporate Control Strip */}
        <section className="gsap-control-strip bg-white rounded-3xl p-5 sm:p-6 shadow-md border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="gsap-control-item flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Enter Rover ID (e.g. 1853RV1)"
                value={roverId}
                onChange={(e) => setRoverId(e.target.value)}
                className="w-full pl-4 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 font-semibold focus:outline-none focus:ring-2 focus:ring-[#f01a30]/30 focus:bg-white transition-all shadow-inner text-sm"
              />
              <Sparkles className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            </div>
            {roverId && (
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Rover Linked: {roverId}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleStartCleaning}
              disabled={isCleaning}
              className={`gsap-control-item flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-white text-sm shadow-md transition-all duration-200 ${
                isCleaning
                  ? "bg-slate-300 text-slate-400 cursor-not-allowed shadow-none"
                  : "bg-[#f01a30] hover:bg-[#d61327] shadow-[#f01a30]/20 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Activate</span>
            </button>
            <button
              onClick={handleStopCleaning}
              disabled={!isCleaning}
              className={`gsap-control-item flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-extrabold text-sm transition-all duration-200 ${
                !isCleaning
                  ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  : "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 shadow-sm cursor-pointer"
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Deactivate</span>
            </button>
          </div>
        </section>

        {/* Section 2: Two-Column Grid (Map from Left, Camera from Right) */}
        <div className="gsap-grid-container grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Location Map Card */}
          <section className="gsap-map-card bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Location Map</h3>
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">GPS Telemetry</p>
                </div>
              </div>
              <button
                onClick={handleGetCurrentLocation}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Current Location</span>
              </button>
            </div>

            <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative z-0">
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater center={mapCenter} />
                <Marker position={roverPosition} icon={roverIcon}>
                  <Popup>
                    <div className="text-center font-sans">
                      <strong className="text-[#f01a30]">Albedrozes Rover</strong><br />
                      {roverId ? `ID: ${roverId}` : 'ID Unassigned'}<br />
                      Status: {isCleaning ? '🟢 Active' : '🔴 Standby'}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Enter location (e.g. New York, London)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateLocation()}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:bg-white"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
              <button
                onClick={handleUpdateLocation}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Update
              </button>
            </div>
          </section>

          {/* Rover Camera Card */}
          <section className="gsap-camera-card bg-white rounded-3xl p-6 shadow-md border border-slate-200 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#f01a30]">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">Rover Camera</h3>
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">Live Visual Feed</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border flex items-center gap-1.5 ${
                cameraStatus === "online"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}>
                <span className={`w-2 h-2 rounded-full ${cameraStatus === "online" ? "bg-emerald-500 animate-ping" : "bg-slate-400"}`}></span>
                {cameraStatus.toUpperCase()}
              </span>
            </div>

            <div className="w-full h-80 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner overflow-hidden relative flex items-center justify-center">
              {cameraStatus === "online" ? (
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#f01a30] animate-pulse"></span>
                    <span className="text-[11px] font-extrabold text-white tracking-widest uppercase">LIVE STREAM</span>
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                </div>
              ) : (
                <div className="text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto shadow-inner text-slate-500">
                    <Camera className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-slate-200 font-extrabold">Camera Stream Offline</h4>
                    <p className="text-xs text-slate-400 mt-1">Activate the visual feed to start monitoring surface debris</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCameraStart}
                disabled={cameraStatus === "online"}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all ${
                  cameraStatus === "online"
                    ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                    : "bg-[#f01a30] hover:bg-[#d61327] text-white shadow-md shadow-[#f01a30]/20 cursor-pointer"
                }`}
              >
                Start Camera
              </button>
              <button
                onClick={handleCameraStop}
                disabled={cameraStatus === "offline"}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm transition-all ${
                  cameraStatus === "offline"
                    ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm cursor-pointer"
                }`}
              >
                Stop Camera
              </button>
              <button
                onClick={handleSnapshot}
                className="px-4 py-2.5 rounded-xl font-extrabold text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>📸</span>
                <span className="hidden sm:inline">Snapshot</span>
              </button>
            </div>
          </section>

        </div>

        {/* Section 3: Rover Status Banner */}
        <section className="gsap-banner bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#f01a30]">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Rover Operational Status</h2>
                <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">Live Digital Telemetry</p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm font-bold transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>Reset System</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">ACTIVATED TIME</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black font-mono text-[#f01a30] tracking-tight">
                {activatedTime}
              </p>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">HH:MM:SS</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">DEACTIVATED TIME</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black font-mono text-[#f01a30] tracking-tight">
                {deactivatedTime}
              </p>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">HH:MM:SS</span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold tracking-widest uppercase">RUNNING TIME</span>
              </div>
              <p className="text-3xl sm:text-4xl font-black font-mono text-[#f01a30] tracking-tight">
                {runningTime}
              </p>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">HH:MM:SS</span>
            </div>
          </div>
        </section>

        {/* Section 4: Unified Metrics Dashboard */}
        <section className="gsap-metrics-dashboard bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 space-y-8">
          
          {/* Water Quality Section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Water Quality Metrics</h2>
                  <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">Environmental Sensors</p>
                </div>
              </div>

              <button
                onClick={handleDownloadReport}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#f01a30] hover:bg-[#d61327] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#f01a30]/20 hover:shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Download Report</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">pH Level</span>
                <p className="text-2xl font-black text-slate-900">{pH.toFixed(2)}</p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200 w-fit">
                  Neutral
                </span>
              </div>

              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Turbidity</span>
                <p className="text-2xl font-black text-slate-900">{turbidity.toFixed(2)} <span className="text-xs font-bold text-slate-400">NTU</span></p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-600 border border-sky-200 w-fit">
                  Clear
                </span>
              </div>

              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">TDS</span>
                <p className="text-2xl font-black text-slate-900">{tds} <span className="text-xs font-bold text-slate-400">ppm</span></p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200 w-fit">
                  Good
                </span>
              </div>

              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Dissolved O₂</span>
                <p className="text-2xl font-black text-slate-900">{dissolvedOxygen.toFixed(2)} <span className="text-xs font-bold text-slate-400">mg/L</span></p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200 w-fit">
                  Healthy
                </span>
              </div>

              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">BOD</span>
                <p className="text-2xl font-black text-slate-900">{bod.toFixed(2)} <span className="text-xs font-bold text-slate-400">mg/L</span></p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-600 border border-sky-200 w-fit">
                  Normal
                </span>
              </div>

              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">COD</span>
                <p className="text-2xl font-black text-slate-900">{cod.toFixed(2)} <span className="text-xs font-bold text-slate-400">mg/L</span></p>
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-200 w-fit">
                  Optimal
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-t border-slate-100" />

          {/* Cleaning Metrics Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-[#f01a30]">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Cleaning Metrics</h2>
                <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">Rover Output & Power</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Debris Collected Card */}
              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Debris Collected</span>
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#f01a30] flex items-center justify-center">
                    <Trash2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">{debrisCollected}</span>
                  <span className="text-lg font-bold text-slate-400">kg</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                  isCleaning ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {isCleaning ? "Collecting Active" : "Standby"}
                </span>
              </div>

              {/* Spatial Z-Axis POP Card - Battery Level */}
              <div className="gsap-battery-card bg-gradient-to-br from-white to-rose-50/50 rounded-3xl p-7 border-2 border-[#f01a30]/30 shadow-lg transform md:scale-105 transition-all duration-300 relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#f01a30] uppercase tracking-widest">BATTERY LEVEL</span>
                  <div className="w-9 h-9 rounded-xl bg-[#f01a30] text-white flex items-center justify-center shadow-md shadow-[#f01a30]/30 animate-pulse">
                    <Battery className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-slate-900">{batteryLevel}</span>
                  <span className="text-2xl font-black text-[#f01a30]">%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-[#f01a30] to-rose-400 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#f01a30] text-white shadow-sm">
                  {batteryLevel > 50 ? "Optimal Capacity" : batteryLevel > 20 ? "Moderate Charge" : "Low Power"}
                </span>
              </div>

              {/* Area Cleaned Card */}
              <div className="gsap-metric-card bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Area Cleaned</span>
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
                    <Waves className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900">{areaCleaned}</span>
                  <span className="text-lg font-bold text-slate-400">m²</span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                  isCleaning ? "bg-sky-50 text-sky-600 border-sky-200" : "bg-slate-100 text-slate-500 border-slate-200"
                }`}>
                  {isCleaning ? "Coverage Active" : "Standby"}
                </span>
              </div>

            </div>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;
