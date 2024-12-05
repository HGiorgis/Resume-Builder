import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const templates = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean and minimalist design with a focus on readability",
    thumbnail: "../../public/modern.png",
    color: "green",
  },
  {
    id: "creative",
    name: "Creative Portfolio",
    description: "Stand out with a unique layout and creative elements",
    thumbnail: "../../public/Creative.jpg",
    color: "purple",
  },
  {
    id: "executive",
    name: "Executive Classic",
    description: "Traditional and elegant design for senior professionals",
    thumbnail: "../../public/Simple.jpg",
    color: "blue",
  },
];

export default function Templates() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const openModal = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Template
          </h1>
          <p className="text-lg text-gray-600">
            Select a template to start building your professional resume
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-up"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    onClick={() => navigate(`/editor/${template.id}`)}
                    className="bg-white text-gray-900 hover:bg-gray-100"
                  >
                    Use Template
                  </Button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex justify-around gap-4">
                  <Button
                    onClick={() => navigate(`/editor/${template.id}`)}
                    variant="outline"
                  >
                    Select Template
                  </Button>
                  <Button
                    onClick={() => openModal(template)}
                    variant="outline"
                  >
                    Preview
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full transform transition-transform scale-95 md:scale-100">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedTemplate.name}</h2>
              <p className="text-gray-600 mb-6">{selectedTemplate.description}</p>
              <img
                src={selectedTemplate.thumbnail}
                alt={selectedTemplate.name}
                className="w-full h-auto rounded-lg mb-4"
              />
              <div className="flex justify-end gap-4">
                <Button
                  onClick={() => navigate(`/editor/${selectedTemplate.id}`)}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Use Template
                </Button>
                <Button
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
