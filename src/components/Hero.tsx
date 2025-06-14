
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import Globe from "./Globe";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-fit bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium shadow-lg shadow-black/20">
            <span className="relative flex size-3 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-[#1DB954]"></span>
            </span>
            <span>Now in ALPHA</span>
          </div>
        </div>

        {/* Main content - horizontal on desktop, vertical on mobile */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Sync your secrets,
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                secure your apps
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-10 max-w-2xl lg:max-w-none leading-relaxed">
              EnvSync is the modern alternative to Doppler and Vault. Manage environment variables, 
              secrets, and configurations across all your applications with military-grade security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Link to="/onboarding">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-700 hover:bg-slate-800 hover:text-slate-200 px-8 py-4 text-lg text-black"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Globe with Team Activity */}
          <div className="flex-1 w-full">
            <Globe />
            <div className="text-center mt-8">
              <h3 className="text-white text-xl font-semibold mb-2">Global Team Collaboration</h3>
              <p className="text-slate-400">See your team's secret management activity in real-time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
