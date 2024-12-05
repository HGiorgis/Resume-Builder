import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";  // Import your Tooltip components
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const dummyResumes = [
  {
    id: 1,
    name: "Software Engineer Resume",
    createdAt: "2024-12-01",
    description: "A detailed resume for software engineer roles.",
  },
  {
    id: 2,
    name: "Graphic Designer Resume",
    createdAt: "2024-11-25",
    description: "Creative resume with portfolio links for designers.",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState(dummyResumes);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResumes, setFilteredResumes] = useState(dummyResumes);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredResumes(
      resumes.filter((resume) =>
        resume.name.toLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        {/* Search and Filter */}
        <div className="mb-6">
          <Tooltip>
            <TooltipTrigger>
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full md:w-full px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
            </TooltipTrigger>
            <TooltipContent>Search through your saved resumes</TooltipContent>
          </Tooltip>
        </div>
        {/* Resume Cards */}
        {filteredResumes.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResumes.map((resume) => (
                <div
                  key={resume.id}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">
                      {resume.name}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4">
                      {resume.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created on: {resume.createdAt}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={() => navigate(`/resume/${resume.id}`)}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          View
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Click to view this resume</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          onClick={() => navigate(`/editor/${resume.id}`)}
                          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                          Edit
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Click to edit this resume</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-up">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No resumes yet
              </h2>
              <p className="text-gray-500 mb-6">
                Create your first resume by selecting a template
              </p>
              <Tooltip>
                <TooltipTrigger>
                  <Button onClick={() => navigate("/templates")}>
                    Choose a Template
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Choose a template to get started</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
