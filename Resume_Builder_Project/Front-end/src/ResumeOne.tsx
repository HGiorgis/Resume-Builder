import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function Resume() {
  return (
    <div className="w-[794px] min-h-[1123px] bg-white mx-auto shadow-lg">
      <div className="grid grid-cols-[350px_1fr]">
        {/* Left Column */}
        <div className="bg-[#1a2b47] text-white p-8">
          {/* Profile Photo */}
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto overflow-hidden clip-path-hexagon">
              <img
                src="/test.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold border-b border-white/20 pb-2">
              Contact
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+00 1234 56789</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Address here, City, 12345</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} />
                <span>Yourwebsite.com</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6 mb-12">
            <h2 className="text-xl font-semibold border-b border-white/20 pb-2">
              Skills
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Photoshop</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Illustrator</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>InDesign</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b border-white/20 pb-2">
              Language
            </h2>
            <div className="flex justify-between">
              <LanguageCircle language="English" percentage={100} />
              <LanguageCircle language="French" percentage={75} />
              <LanguageCircle language="German" percentage={65} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#1a2b47] mb-2">
              Graphic Designer
            </h1>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#1a2b47] mb-6">
              Experience
            </h2>
            <Timeline />
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xl font-semibold text-[#1a2b47] mb-6">
              Education
            </h2>
            <Timeline isEducation />
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageCircle({
  language,
  percentage,
}: {
  language: string;
  percentage: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-white/20"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${percentage * 1.76} 176`}
            className="text-white"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm">
          {percentage}%
        </span>
      </div>
      <span className="mt-2 text-sm">{language}</span>
    </div>
  );
}

function Timeline({ isEducation = false }: { isEducation?: boolean }) {
  const items = [
    {
      year: "2019",
      title: isEducation ? "Enter Your Masters Degree" : "Job Position",
      company: "Company Name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      year: "2017",
      title: isEducation ? "Enter Your Masters Degree" : "Job Position",
      company: "Company Name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      year: "2015",
      title: isEducation ? "Enter Your Masters Degree" : "Job Position",
      company: "Company Name",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative pl-8 pb-6 border-l-2 border-gray-200 last:pb-0"
        >
          <div className="absolute left-[-9px] top-0 w-4 h-4 bg-[#1a2b47] rounded-full" />
          <div className="text-sm text-gray-500 mb-1">{item.year}</div>
          <h3 className="text-lg font-semibold text-[#1a2b47] mb-1">
            {item.title}
          </h3>
          <div className="text-sm text-gray-600 mb-2">{item.company}</div>
          <p className="text-gray-600 text-sm">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
