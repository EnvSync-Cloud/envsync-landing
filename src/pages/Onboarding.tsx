
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { CheckCircle, ArrowRight, Shield, Zap, Users } from "lucide-react";

const Onboarding = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      console.log("Email submitted:", email);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade encryption for all your environment variables"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Deploy configurations in seconds, not hours"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Seamless sharing and management across your team"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Start Your <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">EnvSync</span> Journey
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Join thousands of developers who trust EnvSync to manage their environment variables securely and efficiently.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {!isSubmitted ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">Get Started</CardTitle>
                  <CardDescription className="text-slate-300">
                    Enter your email to begin your journey with EnvSync
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="lg"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                  <p className="text-sm text-slate-400 text-center mt-4">
                    No setup fees • Start immediately
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome to EnvSync!</h3>
                  <p className="text-slate-300 mb-6">
                    We've sent you an email at <span className="text-emerald-400">{email}</span> with your next steps.
                  </p>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => window.open('mailto:', '_blank')}
                  >
                    Check Your Email
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose EnvSync?</h2>
              <p className="text-xl text-slate-300">
                Everything you need to manage environment variables at scale.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-slate-800 rounded-xl p-8 text-center">
                  <div className="bg-emerald-600/20 p-4 rounded-lg w-fit mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Onboarding;
