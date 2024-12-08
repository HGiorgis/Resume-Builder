import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import apiRequest from "@/api/api";

type LoginResponse = {
  status: boolean;
  message: string;
  redirect: string;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: login, isPending }: UseMutationResult<
    LoginResponse,
    Error,
    { email: string; password: string }
  > = useMutation({
    mutationFn: async ({ email, password }) => {
        const response = await apiRequest("login", { email, password });
        return response;
    },
    onSuccess: (data) => {
      if (data.status) {
        toast({
          title: "Login successful",
          description: data.message,
        });
        localStorage.setItem("token", "mock-token");
        navigate(data.redirect);
      } else {
        toast({
          title: "Login failed",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message || "React Query Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen h-[110vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg animate-fade-up">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin} method="post">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-600"
              >
                {showPassword ? <Eye className="w-5 h-5 text-gray-600" /> : <EyeOff className="w-5 h-5 text-gray-300 hover:text-gray-500" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            <div className="flex justify-center items-center">
              {isPending ? (
                <Spinner size={20} />
              ) : (
                "Sign in"
              )}
            </div>
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-accent hover:text-accent/80">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
