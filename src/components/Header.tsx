
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold text-white">EnvSync</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="text-slate-300 hover:text-white transition-colors">Docs</a>
            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
              Sign In
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Get Started
            </Button>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#docs" className="text-slate-300 hover:text-white transition-colors">Docs</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  Sign In
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
