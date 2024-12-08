import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import apiRequest from "@/api/api";

// Define types for the API request and response
type RegisterData = {
  name: string;
  email: string;
  password: string;
};

type RegisterResponse = {
  status: boolean;
  message: string;
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  
  const [showPasswordToastr, setShowPasswordToastr] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validation patterns
  const namePattern = /^[a-zA-Z]+ [a-zA-Z]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
  };
  const checkPasswordValidation = (password: string) => ({
    length: passwordPattern.length.test(password),
    uppercase: passwordPattern.uppercase.test(password),
    lowercase: passwordPattern.lowercase.test(password),
    number: passwordPattern.number.test(password),
  });

  // React Query mutation to handle registration
  const { mutate: register, isPending } = useMutation<RegisterResponse, Error, RegisterData>({
    mutationFn: async (data) => {
      // Call the real API using the apiRequest utility
      const response = await apiRequest("register", data);
      return response; // Extract and return the data
    },
    onSuccess: (data) => {
      if (data.status) {
        toast({
          title: "Registration successful",
          description: data.message || "You can now log in!",
        });
        navigate("/login");
      } else {
        toast({
          title: "Registration failed",
          description: data.message || "An error occurred.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namePattern.test(name)) {
      toast({ title: "Invalid Name", description: "Please enter your Full Name.", variant: "destructive" });
      return;
    }
    if (!emailPattern.test(email)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (!passwordPattern.length.test(password) || !passwordPattern.uppercase.test(password) || 
        !passwordPattern.lowercase.test(password) || !passwordPattern.number.test(password) 
        ) {
      toast({
        title: "Weak Password",
        description: "Ensure your password meets all requirements.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Password Mismatch", description: "Passwords do not match.", variant: "destructive" });
      return;
    }
    if (!acceptedTerms) {
      toast({ title: "Terms Not Accepted", description: "You must accept the terms and policy.", variant: "destructive" });
      return;
    }

    register({ name, email, password });
  };
  const passwordValidation = checkPasswordValidation(password);
  return (
    <div className="h-[110vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg animate-fade-up">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">Start building your professional resume</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="mt-1" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="mt-1" />
            </div>
            <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setShowPasswordToastr(true);
                }}
                onBlur={() => setShowPasswordToastr(false)}
                placeholder="Choose a password"
                className="mt-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? <Eye className="w-5 h-5 text-gray-600" /> : <EyeOff className="w-5 h-5 text-gray-300 hover:text-gray-500" />}
              </button>
            </div>
            {showPasswordToastr && (
              <div className="absolute right-0 top-0  mt-32 w-72 p-4 bg-white border rounded shadow-md">
                <p className="font-medium text-gray-700">Password must have:</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  {passwordValidation.length ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                  <span className={passwordValidation.length ? "text-green-500" : "text-gray-500"}>At least 8 characters</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  {passwordValidation.uppercase ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                  <span className={passwordValidation.uppercase ? "text-green-500" : "text-gray-500"}>One uppercase letter</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  {passwordValidation.lowercase ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                  <span className={passwordValidation.lowercase ? "text-green-500" : "text-gray-500"}>One lowercase letter</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  {passwordValidation.number ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                  <span className={passwordValidation.number ? "text-green-500" : "text-gray-500"}>One number</span>
                </div>
              </div>
            )}
          </div>
            <div>
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">Confirm Password</label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setShowPasswordToastr(true);
                }}
                onBlur={() => setShowPasswordToastr(false)}
                placeholder="Confirm your password"
                className="mt-1"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="terms" checked={acceptedTerms} onChange={() => setAcceptedTerms(!acceptedTerms)} className="mr-2" />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the{" "}
                <Link to="/terms" className="text-accent hover:text-accent/80">Terms and Policy</Link>.
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Spinner size={24} />
                <span> Creating account...</span>
              </>
            ) : (
              "Create account"
            )}
          </Button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-accent hover:text-accent/80">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
