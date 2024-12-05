import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner"; 
import axios from "axios";  
import { GoogleLogin } from "@react-oauth/google"; 



// Mock login function with proper type for the response
type LoginResponse = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

const mockLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "hgiorgis@gmail.com" && password === "password123") {
        resolve({
          token: "mock-token",
          user: { name: "HGiorgis", email },
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Define types for the mutation result
  const { mutate: login, isLoading }: UseMutationResult<
    LoginResponse,
    Error,
    { email: string; password: string; }
  > = useMutation({
    mutationFn: mockLogin,
    onSuccess: (data) => {
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };
  // // Google login handler
  // const handleGoogleLogin = async (response: any) => {
  //   try {
  //     const { code } = response;

  //     // Exchange Google auth code for a token
  //     const { data } = await axios.post("/api/auth/google", { code });

  //     // Save the token and user info
  //     localStorage.setItem("token", data.token);
  //     toast({
  //       title: "Login successful",
  //       description: "Welcome back!",
  //     });
  //     navigate("/dashboard");
  //   } catch (error) {
  //     toast({
  //       title: "Login failed",
  //       description: error.response?.data?.message || "Something went wrong.",
  //       variant: "destructive",
  //     });
  //   }
  // };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg animate-fade-up">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            <div className="flex justify-center items-center">
              {isLoading ? (
                <Spinner size={20} />
              ) : (
                "Sign in"
              )}
            </div>
          </Button>
        {/* Google Login Button
        <div className="text-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          useOneTap
        />
      </div> */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-accent hover:text-accent/80"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
