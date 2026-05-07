import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/home.css";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom rover icon
const roverIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzAwNzdCRSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48dGV4dCB4PSIyMCIgeT0iMjYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPvCfpow8L3RleHQ+PC9zdmc+',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

// Component to update map center
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
  const [debrisCollected, setDebrisCollected] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [areaCleaned, setAreaCleaned] = useState(0);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default: New York
  const [roverPosition, setRoverPosition] = useState([40.7128, -74.0060]);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  
  // Water Quality Metrics
  const [pH, setPH] = useState(0);
  const [turbidity, setTurbidity] = useState(0);
  const [tds, setTDS] = useState(0);
  const [dissolvedOxygen, setDissolvedOxygen] = useState(0);
  const [bod, setBOD] = useState(0);
  const [cod, setCOD] = useState(0);

  const runningTimerRef = useRef(null);
  const startTimeRef = useRef(null);
  const totalSecondsRef = useRef(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Timer effect for running time
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
        
        // Update metrics based on running time
        // Debris Collection: 0.3-0.7 kg every 5 seconds (more variable)
        if (totalSecondsRef.current % 5 === 0) {
          const debrisAmount = +(0.3 + Math.random() * 0.4).toFixed(1);
          setDebrisCollected(prev => +(prev + debrisAmount).toFixed(1));
        }
        
        // Area Cleaned: 3-8 m² every 5 seconds (varies with time)
        if (totalSecondsRef.current % 5 === 0) {
          const areaAmount = Math.floor(3 + Math.random() * 6);
          setAreaCleaned(prev => prev + areaAmount);
        }
        
        // Battery Drain: Depends on running time
        // Faster drain in first 30 seconds, then stabilizes
        if (totalSecondsRef.current % 15 === 0) {
          const drainRate = totalSecondsRef.current < 30 ? 2 : 1;
          setBatteryLevel(prev => Math.max(0, prev - drainRate));
        }
        
        // Stop cleaning if battery reaches 0
        if (batteryLevel <= 0) {
          setIsCleaning(false);
          const now = new Date();
          setDeactivatedTime(formatTime(now));
          alert("⚠️ Battery depleted! Rover stopped automatically.");
        }
      }, 1000);
    } else {
      if (runningTimerRef.current) {
        clearInterval(runningTimerRef.current);
      }
    }
    
    return () => {
      if (runningTimerRef.current) {
        clearInterval(runningTimerRef.current);
      }
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
      alert("Please enter Rover ID first!");
      return;
    }
    if (roverId !== "1853RV1") {
      alert("Invalid ID");
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
      // Use Nominatim API for geocoding (free, no API key needed)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setMapCenter([lat, lon]);
        setRoverPosition([lat, lon]);
        alert(`Location updated to: ${data[0].display_name}`);
      } else {
        alert("Location not found. Please try a different search term.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Error updating location. Please try again.");
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
          alert(`Location updated to your current position: ${lat.toFixed(4)}, ${lon.toFixed(4)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("Location permission denied. Please allow location access in your browser settings.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              alert("Location request timed out.");
              break;
            default:
              alert("An error occurred while getting your location.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleCameraStart = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraStatus("online");
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Could not access camera. Please ensure you have granted camera permissions.");
    }
  };

  const handleCameraStop = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
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
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      
      // Convert to data URL
      const imageDataUrl = canvas.toDataURL('image/png');
      setCapturedImage(imageDataUrl);
      
      // Download the image
      const link = document.createElement('a');
      link.href = imageDataUrl;
      link.download = `rover-snapshot-${Date.now()}.png`;
      link.click();
      
      alert("Snapshot captured and downloaded!");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  // Sync stream with video element
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const getBatteryBadge = () => {
    if (batteryLevel > 60) return { class: "good", text: "Good" };
    if (batteryLevel > 30) return { class: "ready", text: "Medium" };
    return { class: "standby", text: "Low" };
  };

  const handleReset = () => {
    // Stop cleaning if active
    if (isCleaning) {
      setIsCleaning(false);
      if (runningTimerRef.current) {
        clearInterval(runningTimerRef.current);
      }
    }
    
    // Stop camera if active
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
    
    // Reset all states
    setRoverId("");
    setLocation("");
    setCameraStatus("offline");
    setActivatedTime("--:--:--");
    setDeactivatedTime("--:--:--");
    setRunningTime("00:00:00");
    setDebrisCollected(0);
    setBatteryLevel(85);
    setAreaCleaned(0);
      setPH(0);
      setTurbidity(0);
      setTDS(0);
      setDissolvedOxygen(0);
      setBOD(0);
      setCOD(0);
    totalSecondsRef.current = 0;
    
    alert("System reset successfully!");
  };

  const batteryBadge = getBatteryBadge();
  const fixedBatteryLevel = 0;

  return (
    <>
        <Navbar username={username} />
        <section className="first">
          <div className="rover-controls">
            <input 
              type="text" 
              placeholder="Enter Rover ID" 
              className="rover-id-input"
              value={roverId}
              onChange={(e) => setRoverId(e.target.value)}
            />
            <button 
              className="btn-start-cleaning"
              onClick={handleStartCleaning}
              disabled={isCleaning}
              style={{ opacity: isCleaning ? 0.5 : 1, cursor: isCleaning ? 'not-allowed' : 'pointer' }}
            >
              🧹 Activate
            </button>
            <button 
              className="btn-stop-cleaning"
              onClick={handleStopCleaning}
              disabled={!isCleaning}
              style={{ opacity: !isCleaning ? 0.5 : 1, cursor: !isCleaning ? 'not-allowed' : 'pointer' }}
            >
              🛑 Deactivate
            </button>
          </div>

          <div className="monitoring-panel">
            <div className="location-section">
              <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="pin-icon">📍</span>
                  <h3>Location Map</h3>
                </div>
                <div 
                  onClick={handleGetCurrentLocation}
                  style={{ 
                    backgroundColor: '#0077BE', 
                    color: 'white', 
                    padding: '6px 16px', 
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    boxShadow: '0 2px 8px rgba(0, 119, 190, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    userSelect: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0099E5';
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 184, 212, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0077BE';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 119, 190, 0.4)';
                  }}
                  title="Click to use your device's current location"
                >
                  <span>📍</span> Current Location
                </div>
              </div>
              <div className="map-container">
                <MapContainer 
                  center={mapCenter} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%', borderRadius: '12px' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapUpdater center={mapCenter} />
                  <Marker position={roverPosition} icon={roverIcon}>
                    <Popup>
                      <div style={{ textAlign: 'center' }}>
                        <strong>🤖 Water Cleaning Rover</strong><br />
                        {roverId ? `ID: ${roverId}` : 'No ID Set'}<br />
                        Status: {isCleaning ? '🟢 Active' : '🔴 Standby'}
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <div className="location-controls">
                <input 
                  type="text" 
                  placeholder="Enter location (e.g., New York, London)" 
                  className="location-input"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdateLocation()}
                />
                <button className="btn-update" onClick={handleUpdateLocation}>Update</button>
              </div>
            </div>

            <div className="camera-section">
              <div className="section-header">
                <span className="camera-icon">📹</span>
                <h3>Rover Camera</h3>
                <span className={cameraStatus === "online" ? "status-online" : "status-offline"}>
                  ● {cameraStatus.toUpperCase()}
                </span>
              </div>
              <div className="camera-container">
                {cameraStatus === "online" ? (
                  <div className="camera-feed">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '12px'
                      }}
                    />
                    <div className="camera-live-indicator">
                      <span className="live-dot"></span>
                      <span>LIVE</span>
                    </div>
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                  </div>
                ) : (
                  <div className="camera-placeholder" style={{ 
                    background: "#0f172a",
                    border: "2px dashed #334155"
                  }}>
                    <span className="camera-icon-large">📷</span>
                    <p style={{ color: '#94a3b8' }}>Water Monitoring Camera Inactive</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7, color: '#64748b' }}>
                      Click "Start" to activate camera
                    </p>
                  </div>
                )}
              </div>
              <div className="camera-controls">
                <button 
                  className="btn-start" 
                  onClick={handleCameraStart}
                  disabled={cameraStatus === "online"}
                  style={{ opacity: cameraStatus === "online" ? 0.5 : 1 }}
                >
                  Start
                </button>
                <button 
                  className="btn-stop" 
                  onClick={handleCameraStop}
                  disabled={cameraStatus === "offline"}
                  style={{ opacity: cameraStatus === "offline" ? 0.5 : 1 }}
                >
                  Stop
                </button>
                <button className="btn-snapshot" onClick={handleSnapshot}>📸 Snapshot</button>
              </div>
            </div>
          </div>

          {/* Rover Status Section */}
          <section className="status-section">
            <div className="status-header">
              <span className="status-icon">📊</span>
              <h2>Rover Status</h2>
              {roverId && (
                <div className="active-rover-badge">
                  <span className="rover-badge-icon">🤖</span>
                  <span className="rover-badge-text">Active ID: {roverId}</span>
                </div>
              )}
            </div>
            <div className="status-cards">
              <div className="status-card">
                <p className="status-label">ACTIVATED TIME</p>
                <p className="status-time">{activatedTime}</p>
                <p className="status-format">HH:MM:SS</p>
              </div>
              <div className="status-card">
                <p className="status-label">DEACTIVATED TIME</p>
                <p className="status-time">{deactivatedTime}</p>
                <p className="status-format">HH:MM:SS</p>
              </div>
              <div className="status-card">
                <p className="status-label">RUNNING TIME</p>
                <p className="status-time">{runningTime}</p>
                <p className="status-format">HH:MM:SS</p>
              </div>
            </div>
            <div className="reset-button-container">
              <button className="btn-reset" onClick={handleReset}>
                🔄 Reset System
              </button>
            </div>
          </section>

          {/* Water Quality Metrics Section */}
          <section className="metrics-section">
            <div className="metrics-header">
              <span className="metrics-icon">💧</span>
              <h2>Water Quality Metrics</h2>
            </div>
            <div className="metrics-cards">
              <div className="metric-card debris-card">
                <span className="metric-icon no-animation">🧪</span>
                <p className="metric-label">pH Level</p>
                <p className="metric-value">{pH.toFixed(2)}</p>
                <span className={`metric-badge ${pH >= 6.5 && pH <= 8.5 ? 'good' : 'ready'}`}>
                  {pH >= 6.5 && pH <= 8.5 ? 'Neutral' : 'Adjust'}
                </span>
              </div>
              <div className="metric-card battery-card">
                <span className="metric-icon no-animation">📊</span>
                <p className="metric-label">Turbidity</p>
                <p className="metric-value">{turbidity.toFixed(2)} NTU</p>
                <span className={`metric-badge ${turbidity < 5 ? 'good' : 'ready'}`}>
                  {turbidity < 5 ? 'Clear' : 'Improving'}
                </span>
              </div>
              <div className="metric-card area-card">
                <span className="metric-icon no-animation">💦</span>
                <p className="metric-label">TDS</p>
                <p className="metric-value">{tds.toFixed(0)} ppm</p>
                <span className={`metric-badge ${tds < 500 ? 'good' : 'ready'}`}>
                  {tds < 500 ? 'Good' : 'High'}
                </span>
              </div>
              <div className="metric-card debris-card">
                <span className="metric-icon no-animation">🌬️</span>
                <p className="metric-label">Dissolved Oxygen</p>
                <p className="metric-value">{dissolvedOxygen.toFixed(2)} mg/L</p>
                <span className={`metric-badge ${dissolvedOxygen > 5 ? 'good' : 'ready'}`}>
                  {dissolvedOxygen > 5 ? 'Healthy' : 'Low'}
                </span>
              </div>
              <div className="metric-card battery-card">
                <span className="metric-icon no-animation">🔬</span>
                <p className="metric-label">BOD</p>
                <p className="metric-value">{bod.toFixed(2)} mg/L</p>
                <span className={`metric-badge ${bod < 5 ? 'good' : 'ready'}`}>
                  {bod < 5 ? 'Good' : 'High'}
                </span>
              </div>
              <div className="metric-card area-card">
                <span className="metric-icon no-animation">🧬</span>
                <p className="metric-label">COD</p>
                <p className="metric-value">{cod.toFixed(2)} mg/L</p>
                <span className={`metric-badge ${cod < 20 ? 'good' : 'ready'}`}>
                  {cod < 20 ? 'Normal' : 'Elevated'}
                </span>
              </div>
            </div>
          </section>

          {/* Cleaning Metrics Section */}
          <section className="metrics-section">
            <div className="metrics-header">
              <span className="metrics-icon">💧</span>
              <h2>Cleaning Metrics</h2>
            </div>
            <div className="metrics-cards">
              <div className="metric-card debris-card">
                <span className="metric-icon">🗑️</span>
                <p className="metric-label">Debris Collected</p>
                <p className="metric-value">0 kg</p>
                <span className={`metric-badge ${isCleaning ? 'good' : 'ready'}`}>
                  {isCleaning ? 'Collecting' : 'Ready'}
                </span>
              </div>
              <div className="metric-card battery-card">
                <span className="metric-icon">🔋</span>
                <p className="metric-label">Battery Level</p>
                <p className="metric-value">{fixedBatteryLevel}%</p>
                <span className={`metric-badge ${batteryBadge.class}`}>
                  {batteryBadge.text}
                </span>
              </div>
              <div className="metric-card area-card">
                <span className="metric-icon">🌊</span>
                <p className="metric-label">Area Cleaned</p>
                <p className="metric-value">0 m²</p>
                <span className={`metric-badge ${isCleaning ? 'good' : 'standby'}`}>
                  {isCleaning ? 'Active' : 'Standby'}
                </span>
              </div>
            </div>
          </section>
        </section>
        <Footer />
    </>
  );
};

export default Home;
