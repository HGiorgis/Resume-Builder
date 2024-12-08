import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Key } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

export default function OtpVerification() {
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual OTP verification
    toast({
      title: "OTP verified",
      description: "You can now set a new password.",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg animate-fade-up">
        <div className="text-center">
          <div className="flex justify-center">
            <Key className="h-12 w-12 text-accent" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Enter OTP Code
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We sent a code to your email. Please enter it below.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
              render={({ slots }) => (
                <InputOTPGroup>
                
                <Input id="name" placeholder="Enter OTP" />
                  {/* {slots.map((slot, index) => (
                    <React.Fragment key={index}>
                        
                      {index !== slots.length - 1 && <InputOTPSeparator />}
                    </React.Fragment>
                  ))} */}
                </InputOTPGroup>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={otp.length !== 6}>
            Verify Code
          </Button>
          <p className="text-center text-sm text-gray-600">
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-medium text-accent hover:text-accent/80"
              onClick={() =>
                toast({
                  title: "Code resent",
                  description: "A new code has been sent to your email.",
                })
              }
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}