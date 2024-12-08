import { useParams } from "react-router-dom";

type PersonalInfo = {
  fullName: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
};

type Experience = {
  position: string;
  company: string;
  duration: string;
  description: string[];
};

type Education = {
  degree: string;
  school: string;
  year: string;
  description: string[];
};

type ResumePreviewProps = {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: string[];
  scale?: boolean;
};

const ResumePreview = ({
  personalInfo,
  experiences,
  educations,
  skills,
  scale,
}: ResumePreviewProps) => {
  const { templateId } = useParams();

  // Determine styles based on templateId
  const isSpecialTemplate = templateId === "creative";

  return (
    <div
      className={`lg:w-${scale ?  "1/2": "1/2"} md:w-7/8 md:m-5 lg:m-0 border-l ${
        isSpecialTemplate ? "border-blue-500" : "border-gray-200"
      } p-${scale ?  "0": "8"} h-screen sticky top-0 overflow-y-auto`}
    >
      <div
        className={`max-w-[21cm] mx-auto bg-white shadow-xl rounded-lg p-8 transition-all duration-300 transform zoom-${scale ?  "50": "50"} ${
          isSpecialTemplate
            ? "bg-gradient-to-r from-blue-50 to-blue-0"
            : "hover:shadow-2xl"
        }`} style={{zoom:`${scale ?  "0.50": "0.65"}`}}
        id="resumePreview"
      >
        <div className="pdf-page">
          {/* Header Section */}
          <div className="border-b-2 border-gray-200 pb-6 mb-6">
            <h1
              className={`text-4xl font-bold mb-3 ${
                isSpecialTemplate
                  ? "text-blue-700 from-blue-700 to-blue-500"
                  : "text-primary"
              }`}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {personalInfo.location}
                </span>
              )}
            </div>
          </div>

          {/* Summary Section */}
          {personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-primary">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience Section */}
          {experiences.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">
                Work Experience
              </h2>
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="mb-6 last:mb-0 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-gray-800">
                    {exp.position}
                  </h3>
                  <p className="text-accent mb-2">
                    {exp.company} | {exp.duration}
                  </p>
                  <ul className="list-disc ml-4 space-y-1">
                    {exp.description.map((desc, idx) => (
                      <li key={idx} className="text-gray-700">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {educations.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-primary">
                Education
              </h2>
              {educations.map((edu, index) => (
                <div
                  key={index}
                  className="mb-6 last:mb-0 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                  <p className="text-accent mb-2">
                    {edu.school} | {edu.year}
                  </p>
                  <ul className="list-disc ml-4 space-y-1">
                    {edu.description.map((desc, idx) => (
                      <li key={idx} className="text-gray-700">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-3 text-primary">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map(
                  (skill, index) =>
                    skill && (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
