import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner"; // Adjust the path to the Spinner component
import apiRequest from "@/api/api"; // Assuming this is the correct path to your API request module
import { useState } from "react"; // Import useState for managing dropdown visibility
import { PlusIcon, Settings, LogOutIcon } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

// Import the DropdownMenu components from ui
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; // Adjust the path as necessary

type NavData = {
  name: string;
  email: string;
  initials: string;
};

const fetchUser = async () => {
  try {
    const response = await apiRequest("getUser", {});
    if (response.status) {
      const userData = response.data;
      let initials: string;
      const nameParts = userData.name.split(" ");
      if (nameParts.length > 1) {
        initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      } else {
        initials = nameParts[0][0].toUpperCase();
      }

      return {
        name: userData.name,
        email: userData.email,
        initials: initials,
      };
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (error) {
    throw new Error(error.message || "Failed to fetch user data");
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Disable retries for simplicity
  });

  const handleLogout = () => {
    // Handle logout logic here
    // For example, you could clear session storage or cookies and redirect
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center shadow-sm p-8">
      <h1 className="text-3xl font-bold text-gray-900">LOGO</h1>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => navigate("/templates")}
          className="hidden sm:block" // Hide on small screens
        >
          Create New Resume
        </Button>

        {/* Plus button for small screens */}
        <Tooltip>
          <TooltipTrigger>
            <Button
              onClick={() => navigate("/templates")}
              className="sm:hidden" // Show only on small screens
            >
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Create New Resume</TooltipContent>
        </Tooltip>

        {/* Conditionally render based on query status */}
        {isLoading ? (
          <Spinner size={24} />
        ) : isError ? (
          <Button onClick={() => navigate("/login")}>Login</Button>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <div className="flex gap-2 cursor-pointer">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">
                    {user.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-left text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate("/settings")} className="p-2 px-4">
              <Settings className="w-5 h-5 p-1" />
              <span className="ml-3">Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="p-2 px-4">
              <LogOutIcon className="w-5 h-5 p-1" />
              <span className="ml-3">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate("/login")}>Login</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
