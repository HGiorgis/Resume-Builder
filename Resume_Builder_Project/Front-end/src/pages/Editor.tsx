import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, DownloadCloud } from "lucide-react";
import html2pdf from "html2pdf.js";
import ResumePreview from "@/components/ResumePreview";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; 

export default function Editor() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
  });

  const [experiences, setExperiences] = useState([
    { company: "", position: "", duration: "", description: [] },
  ]);

  const [skills, setSkills] = useState([""]);
  const [educations, setEducations] = useState([
    { school: "", degree: "", year: "", description: [] },
  ]);

  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setPersonalInfo(parsedData.personalInfo || {});
      setExperiences(parsedData.experience || []);
      setEducations(parsedData.education || []);
      setSkills(parsedData.skills || []);
    }
  }, []);

  const handleSave = () => {
    const formData = {
      personalInfo,
      education: educations,
      skills,
      experience: experiences,
    };
    localStorage.setItem("resumeData", JSON.stringify(formData));
    toast({
      title: "Resume saved",
      description: "Your changes have been saved successfully.",
    });
  };
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleDownload = () => {
    const resumeContent = document.getElementById("resumePreview");
    const options = {
      margin: 1,
      filename: "Resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    toast({
      title: "Resume PDF Generated",
      description: "Your Pdf have been generated successfully.",
    });
    html2pdf().set(options).from(resumeContent).save();
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", position: "", duration: "", description: [] },
    ]);
  };

  const addEducation = () => {
    setEducations([
      ...educations,
      { school: "", degree: "", year: "", description: [] },
    ]);
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const addDescriptionPoint = (index, type) => {
    if (type === "experience") {
      const newExperiences = [...experiences];
      newExperiences[index].description.push("");
      setExperiences(newExperiences);
    } else {
      const newEducations = [...educations];
      newEducations[index].description.push("");
      setEducations(newEducations);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 pt-2">
      <div className="lg:flex md:grid">
        {/* Editor Form */}
        <div className="lg:w-1/2 md:w-7/8 p-8 md:m-5 lg:m-0 overflow-y-auto h-screen">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex justify-between items-center space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900">Edit Resume</h1>
              <div className="space-x-4">
                <Button variant="outline" onClick={handleSave}>
                  Save
                </Button>
                <Button onClick={handlePreview}
                  className="hidden sm:inline-block"
                >
                  Preview & Download
                </Button>
                <Tooltip>
                <TooltipTrigger>
                <Button onClick={handlePreview}
                  className="sm:hidden"
                >
                  <DownloadCloud />
                </Button>
                </TooltipTrigger>
                <TooltipContent>Preview & Download</TooltipContent>
              </Tooltip>
              </div>

            </div>

            {/* Personal Information */}
            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    value={personalInfo.fullName}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        fullName: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, email: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, phone: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Location
                  </label>
                  <Input
                    value={personalInfo.location}
                    onChange={(e) =>
                      setPersonalInfo({
                        ...personalInfo,
                        location: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Professional Summary
                  </label>
                  <Textarea
                    value={personalInfo.summary}
                    onChange={(e) =>
                      setPersonalInfo({ ...personalInfo, summary: e.target.value })
                    }
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            {/* Work Experience */}
            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Work Experience
                </h2>
                <Button variant="outline" size="sm" onClick={addExperience}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Experience
                </Button>
              </div>
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <Input
                      value={exp.company}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].company = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <Input
                      value={exp.position}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].position = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Duration
                    </label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => {
                        const newExperiences = [...experiences];
                        newExperiences[index].duration = e.target.value;
                        setExperiences(newExperiences);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description Points
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addDescriptionPoint(index, "experience")}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Point
                      </Button>
                    </div>
                    {exp.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex gap-2 mt-2">
                        <Input
                          value={desc}
                          onChange={(e) => {
                            const newExperiences = [...experiences];
                            newExperiences[index].description[descIndex] =
                              e.target.value;
                            setExperiences(newExperiences);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newExperiences = [...experiences];
                            newExperiences[index].description.splice(descIndex, 1);
                            setExperiences(newExperiences);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                <Button variant="outline" size="sm" onClick={addEducation}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Education
                </Button>
              </div>
              {educations.map((edu, index) => (
                <div key={index} className="space-y-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      School/University
                    </label>
                    <Input
                      value={edu.school}
                      onChange={(e) => {
                        const newEducations = [...educations];
                        newEducations[index].school = e.target.value;
                        setEducations(newEducations);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Degree
                    </label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducations = [...educations];
                        newEducations[index].degree = e.target.value;
                        setEducations(newEducations);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <Input
                      value={edu.year}
                      onChange={(e) => {
                        const newEducations = [...educations];
                        newEducations[index].year = e.target.value;
                        setEducations(newEducations);
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-700">
                        Description Points
                      </label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addDescriptionPoint(index, "education")}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Point
                      </Button>
                    </div>
                    {edu.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex gap-2 mt-2">
                        <Input
                          value={desc}
                          onChange={(e) => {
                            const newEducations = [...educations];
                            newEducations[index].description[descIndex] =
                              e.target.value;
                            setEducations(newEducations);
                          }}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newEducations = [...educations];
                            newEducations[index].description.splice(descIndex, 1);
                            setEducations(newEducations);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                <Button variant="outline" size="sm" onClick={addSkill}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => {
                        const newSkills = [...skills];
                        newSkills[index] = e.target.value;
                        setSkills(newSkills);
                      }}
                      placeholder="Enter a skill"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newSkills = [...skills];
                        newSkills.splice(index, 1);
                        setSkills(newSkills);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

         {/* Enhanced Preview */}
         <ResumePreview
            personalInfo={personalInfo}
            experiences={experiences}
            educations={educations}
            skills={skills}
          />
      </div>
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 lg:w-3/4 max-h-[90vh] overflow-y-auto p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-8">
              {/* Download Button */}
            <div className="mt-2 flex justify-end">
              <ProtectedRoute>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleDownload}
              >
                Download as PDF
              </button>
              </ProtectedRoute>
            </div>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsPreviewOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Resume Content */}

              <ResumePreview
                personalInfo={personalInfo}
                experiences={experiences}
                educations={educations}
                skills={skills}
                scale={true}
                />

            
          </div>
        </div>
      )}
    </div>
    
  );
}