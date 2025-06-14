
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Users, Loader2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/helpers/api";

const AcceptUserInvite = () => {
  const { invite_code } = useParams();
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");

  const acceptUserInviteMutation = useMutation({
    mutationFn: (data: {
      invite_code: string;
      full_name: string;
      password: string;
    }) => api.onboarding.acceptUserInvite(data),
    onSuccess: (data) => {
      console.log("User invite accepted successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to accept user invite:", error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (invite_code && fullName && password && !acceptUserInviteMutation.isPending) {
      acceptUserInviteMutation.mutate({
        invite_code,
        full_name: fullName,
        password
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            {!acceptUserInviteMutation.isSuccess ? (
              <Card className="bg-slate-800 border-slate-700 shadow-xl shadow-black/20">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-emerald-600/20 p-3 rounded-lg w-fit mx-auto mb-4">
                    <Users className="h-6 w-6 text-emerald-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Join the Team</CardTitle>
                  <CardDescription className="text-slate-300">
                    Complete your account setup to join your organization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        disabled={acceptUserInviteMutation.isPending}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={acceptUserInviteMutation.isPending}
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-emerald-500"
                      />
                    </div>
                    
                    {acceptUserInviteMutation.isError && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          {acceptUserInviteMutation.error instanceof Error 
                            ? acceptUserInviteMutation.error.message 
                            : "Something went wrong. Please try again."}
                        </span>
                      </div>
                    )}
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="lg"
                      disabled={acceptUserInviteMutation.isPending || !fullName || !password}
                    >
                      {acceptUserInviteMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Joining...
                        </>
                      ) : (
                        <>
                          Join Organization
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                  <p className="text-sm text-slate-400 text-center mt-4">
                    You're joining an existing organization
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="pt-8 text-center">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Team!</h3>
                  <p className="text-slate-300 mb-6">
                    Your account has been successfully created. You're now part of the organization.
                  </p>
                  <Button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => window.location.href = '/'}
                  >
                    Start Working
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AcceptUserInvite;
