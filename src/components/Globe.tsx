
import { useEffect, useRef, useState } from "react";

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  location: string;
  time: string;
  lat: number;
  lng: number;
}

const mockActivities: ActivityItem[] = [
  { id: 1, user: "Sarah Chen", action: "Updated API_KEY in production", location: "San Francisco", time: "2m ago", lat: 37.7749, lng: -122.4194 },
  { id: 2, user: "Alex Kumar", action: "Synced database credentials", location: "Mumbai", time: "5m ago", lat: 19.0760, lng: 72.8777 },
  { id: 3, user: "Emma Wilson", action: "Added new environment variables", location: "London", time: "8m ago", lat: 51.5074, lng: -0.1278 },
  { id: 4, user: "Carlos Rodriguez", action: "Rotated JWT secrets", location: "São Paulo", time: "12m ago", lat: -23.5505, lng: -46.6333 },
  { id: 5, user: "Yuki Tanaka", action: "Updated staging config", location: "Tokyo", time: "15m ago", lat: 35.6762, lng: 139.6503 },
  { id: 6, user: "David Kim", action: "Deployed new secrets", location: "Seoul", time: "18m ago", lat: 37.5665, lng: 126.9780 },
];

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [visibleActivities, setVisibleActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    // Simulate real-time activity updates
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % mockActivities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Update visible activities
    const newActivity = mockActivities[currentActivity];
    setVisibleActivities((prev) => {
      const updated = [newActivity, ...prev.slice(0, 4)];
      return updated;
    });
  }, [currentActivity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const centerX = canvas.width / (2 * window.devicePixelRatio);
    const centerY = canvas.height / (2 * window.devicePixelRatio);
    const radius = Math.min(centerX, centerY) - 20;

    let animationFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

      // Draw globe outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw grid lines
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radius * Math.cos(angle), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Horizontal lines - Fixed to prevent negative radius
      for (let i = 1; i < 4; i++) {
        const y = centerY - radius + (i * radius * 2) / 4;
        const distanceFromCenter = Math.abs(y - centerY);
        
        // Only draw if we're within the circle bounds
        if (distanceFromCenter < radius) {
          const ellipseRadius = Math.sqrt(Math.max(0, radius * radius - Math.pow(distanceFromCenter, 2)));
          
          // Only draw if we have a valid positive radius
          if (ellipseRadius > 0) {
            ctx.beginPath();
            ctx.ellipse(centerX, y, ellipseRadius, ellipseRadius * 0.3, 0, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }

      // Draw location blips
      mockActivities.forEach((activity, index) => {
        const isActive = index === currentActivity;
        const x = centerX + (activity.lng / 180) * radius * 0.8;
        const y = centerY - (activity.lat / 90) * radius * 0.8;

        // Pulse effect for active location
        if (isActive) {
          const pulseRadius = 8 + Math.sin(Date.now() * 0.01) * 3;
          ctx.beginPath();
          ctx.arc(x, y, pulseRadius, 0, Math.PI * 2);
          ctx.fillStyle = '#34d399';
          ctx.globalAlpha = 0.3;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Location dot
        ctx.beginPath();
        ctx.arc(x, y, isActive ? 4 : 2, 0, Math.PI * 2);
        ctx.fillStyle = isActive ? '#10b981' : '#6b7280';
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, [currentActivity]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Globe */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-80 h-80 lg:w-96 lg:h-96"
            style={{ width: '320px', height: '320px' }}
          />
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-full blur-xl" />
        </div>

        {/* Activity Feed */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700 p-6">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-3" />
              <h3 className="text-white text-lg font-semibold">Live Team Activity</h3>
            </div>
            
            <div className="space-y-3 max-h-64 overflow-hidden">
              {visibleActivities.map((activity, index) => (
                <div
                  key={`${activity.id}-${index}`}
                  className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-500 ${
                    index === 0 
                      ? 'bg-emerald-500/10 border border-emerald-500/20' 
                      : 'bg-slate-800/50'
                  }`}
                  style={{
                    opacity: 1 - (index * 0.2),
                    transform: `translateY(${index * 2}px)`
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white font-medium text-sm">{activity.user}</span>
                      <span className="text-slate-400 text-xs">• {activity.location}</span>
                    </div>
                    <p className="text-slate-300 text-sm">{activity.action}</p>
                    <p className="text-slate-500 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;
