import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface SkillType {
  name: string;
  level: number;
}

interface LanguageType {
  name: string;
  percentage: number;
}

interface TimelineItemType {
  startYear: string;
  endYear: string;
  title: string;
  description: string;
}

interface ResumeProps {
  name: string;
  title: string;
  bio: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  skills: SkillType[];
  languages: LanguageType[];
  education: TimelineItemType[];
  experience: TimelineItemType[];
}

export default function ResumeCard({
  name = "Anne Winston",
  title = "Marketing Manager",
  bio = "Data-driven and creative digital marketing manager with over 10 years of marketing experience and five years of management experience.",
  contact = {
    email: "annewinston@email.com",
    phone: "+1.123-456-7890",
    address: "147 Wheeler Ave, San Jose, CA 95030, USA",
    website: "www.helpshared.com",
  },
  skills = [
    { name: "Leadership", level: 90 },
    { name: "Organizational", level: 85 },
    { name: "Creative", level: 80 },
    { name: "Teamwork", level: 95 },
  ],
  languages = [
    { name: "ENGLISH", percentage: 99.5 },
    { name: "SPANISH", percentage: 80 },
    { name: "JAPANESE", percentage: 55 },
  ],
  education = [
    {
      startYear: "2013",
      endYear: "2015",
      title: "Michigan University",
      description:
        "Complete education with Bachelor of Business Administration.",
    },
    {
      startYear: "2015",
      endYear: "2018",
      title: "Language Trainers",
      description: "Take Spanish and Japanese language courses.",
    },
    {
      startYear: "2018",
      endYear: "2019",
      title: "Professional Certified",
      description:
        "Professional Certified Marketer (PCM) and Certified Marketer (SCPM).",
    },
  ],
  experience = [
    {
      startYear: "2019",
      endYear: "2021",
      title: "Quantum Partners, Inc",
      description:
        "Conducted market research to gain insight into customer behavior and preferences.",
    },
    {
      startYear: "2021",
      endYear: "2024",
      title: "Onyx Enterprises",
      description:
        "Monitor and report on the performance of marketing campaigns, extracting valuable insights and assessing against predetermined goals",
    },
  ],
}: ResumeProps) {
  return (
    <div className="w-full max-w-4xl bg-white shadow-lg">
      <div className="relative bg-[#B37B4C]">
        <div
          className="absolute bottom-0 left-0 w-full h-32 bg-white"
          style={{
            clipPath: "polygon(0 100%, 100% 100%, 100% 0)",
          }}
        />
      </div>

      <div className="grid grid-cols-12 gap-8 px-8 pb-8">
        {/* Left Column */}
        <div className="col-span-4 -mt-20">
          <div className="relative">
            <div className="w-48 h-48 mx-auto rounded-full border-4 border-white overflow-hidden">
              <img
                src="/test.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-center mt-4 space-y-2">
            <h1 className="text-2xl font-bold">{name}</h1>
            <h2 className="text-[#B37B4C]">{title}</h2>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">{bio}</p>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">CONTACT</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">{contact.website}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">SKILLS</h3>
            <div className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="text-sm mb-1">{skill.name}</div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-full bg-[#B37B4C] rounded"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-8 pt-8">
          <div className="space-y-8">
            <section>
              <div className="bg-[#B37B4C] text-white px-6 py-2 rounded-r-full w-3/4 -ml-8">
                <h3 className="text-lg font-bold">EDUCATION</h3>
              </div>
              <div className="mt-4 space-y-6">
                {education.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#B37B4C] rounded-full" />
                      <div className="w-0.5 h-full bg-gray-200" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="text-sm text-gray-600">
                        {item.startYear} - {item.endYear}
                      </div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-[#B37B4C] text-white px-6 py-2 rounded-r-full w-3/4 -ml-8">
                <h3 className="text-lg font-bold">EXPERIENCE</h3>
              </div>
              <div className="mt-4 space-y-6">
                {experience.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-[#B37B4C] rounded-full" />
                      <div className="w-0.5 h-full bg-gray-200" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="text-sm text-gray-600">
                        {item.startYear} - {item.endYear}
                      </div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="bg-[#B37B4C] text-white px-6 py-2 rounded-r-full w-3/4 -ml-8">
                <h3 className="text-lg font-bold">LANGUAGES</h3>
              </div>
              <div className="mt-6 flex justify-around">
                {languages.map((language, index) => (
                  <div key={index} className="text-center">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#eee"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#B37B4C"
                          strokeWidth="3"
                          strokeDasharray={`${language.percentage}, 100`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {language.percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 text-sm font-semibold">
                      {language.name}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="text-center py-4 text-sm text-gray-500 border-t">
        WWW.HELPSHARED.COM
      </div>
    </div>
  );
}
