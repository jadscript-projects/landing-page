import { useState } from "react";
import { useTranslation } from "react-i18next";
import CompanyModal, { type Experience } from "./CompanyModal";

const ExperiencesSection = () => {
  const { t } = useTranslation();
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

    const experiences: Experience[] = [
      {
        company: t("experiences.dock.title"),
        role: t("experiences.dock.role"),
        description: t("experiences.dock.description"),
        startDate: "2018-10-01",
        endDate: "2019-06-01",
        logo: "/companies/dock.png",
        color: "#00D8D8"
      },
      {
        company: t("experiences.invillia.title"),
        role: t("experiences.invillia.role"),
        description: t("experiences.invillia.description"),
        startDate: "2019-07-01",
        endDate: "2021-05-01",
        logo: "/companies/invillia.jpg",
        color: "#000000",
      },
      {
        company: t("experiences.ifood.title"),
        role: t("experiences.ifood.role"),
        description: t("experiences.ifood.description"),
        startDate: "2021-05-01",
        endDate: "2023-03-01",
        logo: "/companies/ifood.jpeg",
        color: "#E91D2D",
      },
      {
        company: t("experiences.uol.title"),
        role: t("experiences.uol.role"),
        description: t("experiences.uol.description"),
        startDate: "2023-09-01",
        endDate: "2024-06-01",
        logo: "/companies/uol.png",
        color: "#FF8001",
      },
      {
        company: t("experiences.daai.title"),
        role: t("experiences.daai.role"),
        description: t("experiences.daai.description"),
        startDate: "2024-07-01",
        endDate: "2025-03-01",
        logo: "/companies/daai.jpeg",
        color: "#FF8001",
      },
    ];

  return (
    <section id="experiences" className="flex flex-col gap-16 py-8">
      <h2 className="text-5xl font-bold text-center max-w-xl mx-auto leading-14">
        {t("experiences.title")}
      </h2>

      <div className="grid grid-rows-2 grid-cols-5 justify-items-center mx-auto">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedExperience(experiences[0])}
          onKeyDown={(e) =>
            e.key === "Enter" && setSelectedExperience(experiences[0])
          }
          className="row-start-1 col-start-1 col-span-1 flex items-center justify-center cursor-pointer animate-float-1"
        >
          <img
            src={experiences[0].logo}
            alt={experiences[0].company}
            className="w-32 h-32 hover:scale-130 transition-all duration-300 object-cover rounded-full"
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedExperience(experiences[2])}
          onKeyDown={(e) =>
            e.key === "Enter" && setSelectedExperience(experiences[2])
          }
          className="row-start-1 col-start-3 col-span-1 flex items-center justify-center cursor-pointer animate-float-2"
        >
          <img
            src={experiences[2].logo}
            alt={experiences[2].company}
            className="w-32 h-32 hover:scale-130 transition-all duration-300 object-cover rounded-full"
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedExperience(experiences[4])}
          onKeyDown={(e) =>
            e.key === "Enter" && setSelectedExperience(experiences[4])
          }
          className="row-start-1 col-start-5 col-span-1 flex items-center justify-center cursor-pointer animate-float-3"
        >
          <img
            src={experiences[4].logo}
            alt={experiences[4].company}
            className="w-32 h-32 hover:scale-130 transition-all duration-300 object-cover rounded-full"
          />
        </div>

        {/* Segunda linha: 2 colunas preenchidas, centralizadas nos espaços livres */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedExperience(experiences[1])}
          onKeyDown={(e) =>
            e.key === "Enter" && setSelectedExperience(experiences[1])
          }
          className="row-start-2 col-start-2 col-span-1 flex items-center justify-center cursor-pointer animate-float-4"
        >
          <img
            src={experiences[1].logo}
            alt={experiences[1].company}
            className="w-32 h-32 hover:scale-130 transition-all duration-300 object-cover rounded-full"
          />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelectedExperience(experiences[3])}
          onKeyDown={(e) =>
            e.key === "Enter" && setSelectedExperience(experiences[3])
          }
          className="row-start-2 col-start-4 col-span-1 flex items-center justify-center cursor-pointer animate-float-5"
        >
          <img
            src={experiences[3].logo}
            alt={experiences[3].company}
            className="w-32 h-32 hover:scale-130 transition-all duration-300 object-cover rounded-full"
          />
        </div>
      </div>

      <CompanyModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    </section>
  );
};

export default ExperiencesSection;
