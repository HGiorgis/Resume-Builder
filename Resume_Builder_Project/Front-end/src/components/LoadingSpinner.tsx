import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin h-16 w-16 text-#953ce2-500" />
    </div>
  );
};

export default LoadingSpinner;
