import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toggle } from "@/components/ui/toggle";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Lock, Image, Trash, Bell, Moon, Mail, Settings2, Camera } from "lucide-react";

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "general" | "password" | "delete">("profile");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Profile image updated",
          description: "Your profile image has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveChanges = () => {
    toast({
      title: "Settings Updated",
      description: "Your preferences have been successfully updated.",
    });
  };
  const handleDeleteAccount = () => {
    // TODO: Implement actual account deletion
    toast({
      title: "Account deleted",
      description: "Your account has been successfully deleted.",
      variant: "destructive",
    });
    setIsModalOpen(false);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password change
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated.",
    });
  };

  return ( 
    <div className="h-[95vh] flex bg-gray-50 relative">
      {/* Sidebar */}
      <nav className="sm:w-64  bg-white shadow-md sticky flex flex-col p-6">
          <div className="flex items-center md:justify-center mb-8 p-2 w-full">            
            <Settings2 className="w-5 h-5 md:w-6 md:h-6" />
            <span className="ml-3 text-xl font-bold hidden sm:block">Settings</span>
          </div>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center sm:w-full text-left p-2 rounded-lg ${
                activeTab === "profile" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Image className="w-5 h-5 md:w-6 md:h-6" />
              
            <span className="ml-3 hidden sm:block">Profile Image</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("general")}
              className={`flex items-center sm:w-full text-left p-2 rounded-lg ${
                activeTab === "general" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
              <span className="ml-3 hidden sm:block">General Settings</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("password")}
              className={`flex items-center sm:w-full text-left p-2 rounded-lg ${
                activeTab === "password" ? "bg-gray-200 text-gray-900" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Lock className="w-5 h-5 md:w-6 md:h-6" />
              <span className="ml-3 hidden sm:block">Change Password</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("delete")}
              className={`flex items-center sm:w-full text-left p-2 rounded-lg ${
                activeTab === "delete" ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Trash className="w-5 h-5 md:w-6 md:h-6" />
              <span className="ml-3 hidden sm:block">Delete Account</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form className="space-y-4">
            <div className="grid w-full h-full place-items-center">
            <h2 className="text-xl font-semibold mb-4">Profile Image</h2>
            <Tooltip>
                <TooltipTrigger>
                  {/* Avatar acts as a trigger for file input */}
                  <Avatar
                    className="w-24 h-24 relative cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault(); // Prevent form submission
                      document.getElementById("fileInput").click();
                    }}
                  >
                    <AvatarImage
                      src={profileImage || ""} // Use the selected image
                      className="object-cover"
                    />
                    <AvatarFallback>
                      <User className="w-12 h-12 text-gray-400" />
                    </AvatarFallback>
                    <Camera className="w-6 h-6 absolute top-2/3 w-full bg-gray-200 py-2 h-8 opacity-70" />
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>Recommended: Square image, at least 400x400px</TooltipContent>
              </Tooltip>
              <div>
                <Input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload} // Call a handler when an image is uploaded
                  className="hidden" // Hide the input
                />
              </div>
            </div>
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-xl font-semibold mb-4">Form Detail</h2>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <Button type="submit">Save Changes</Button>
          </div>
          </form>
          </div>
        )}
        {activeTab === "general" && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">General Settings</h2>
              <form className="space-y-6">
                {/* Notification Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span>Enable Notifications</span>
                  </div>
                  <Toggle
                    variant="outline"
                    size="sm"
                    pressed={notifications}
                    onPressedChange={setNotifications}
                  >
                    {notifications ? "On" : "Off"}
                  </Toggle>
                </div>
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Moon className="w-5 h-5 text-gray-500" />
                    <span>Enable Dark Mode</span>
                  </div>
                  <Toggle
                    variant="outline"
                    size="sm"
                    pressed={darkMode}
                    onPressedChange={setDarkMode}
                  >
                    {darkMode ? "On" : "Off"}
                  </Toggle>
                </div>
                {/* Email Updates Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span>Receive Email Updates</span>
                  </div>
                  <Toggle
                    variant="outline"
                    size="sm"
                    pressed={emailUpdates}
                    onPressedChange={setEmailUpdates}
                  >
                    {emailUpdates ? "On" : "Off"}
                  </Toggle>
                </div>
                {/* Save Button */}
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </form>
  </div>
        )}
        {activeTab === "password" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
              <Button type="submit">Update Password</Button>
            </form>
          </div>
        )}
        {activeTab === "delete" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-red-500 mb-4">Delete Account</h2>
            <p className="text-gray-600 mb-4">
              Warning: This action cannot be undone. All your data will be permanently deleted.
            </p>
            <Button
              variant="destructive"
              onClick={() => setIsModalOpen(true)} // Open the modal on button click
              className="bg-red-500 hover:bg-red-600"
            >
              Delete Account
            </Button>
            {/* Modal Confirmation */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                  <h3 className="text-xl font-semibold text-red-500 mb-4">
                    Are you sure you want to delete your account?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This action is irreversible and will permanently delete all your data.
                  </p>
                  <div className="flex justify-around w-full space-x-4">
                    {/* Cancel button */}
                    <button
                      onClick={() => setIsModalOpen(false)} // Close modal without action
                      className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg"
                    >
                      No, Cancel
                    </button>
                    {/* Confirm delete button */}
                    <button
                      onClick={handleDeleteAccount} // Proceed with deletion
                      className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg"
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
      )}
    </div>
        )}
      </div>
    </div>
  );
}
