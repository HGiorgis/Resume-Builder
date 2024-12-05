import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner"; // Adjust the path to the Spinner component

type NavData = {
    name: string;
    email: string;
    initials: string;
  };
  
// Mock user fetch function using JSON
const fetchUser = async () => {
  // Simulating a delay for the fetch
  return new Promise<NavData>((resolve, reject) => {
    setTimeout(() => {
      // Simulating user data
      resolve({
        name: "HGiorgis",
        email: "hgiorgis@gmail.com",
        initials: "HG" ,
      });
      // Uncomment to simulate an error:
      // reject(new Error("Failed to fetch user data"));
    }, 1000);
  });
};

const Navbar = () => {
  const navigate = useNavigate();

  // Use React Query to fetch user data
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Disable retries for simplicity
  });

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">LOGO</h1>
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate("/templates")}>
          Create New Resume
        </Button>

        {/* Conditionally render based on query status */}
        {isLoading ? (
          <Spinner size={24} />
        ) : isError ? (
          <Button onClick={() => navigate("/login")}>Login</Button>
        ) : user ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-gray-600">
                {user.initials || user.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
