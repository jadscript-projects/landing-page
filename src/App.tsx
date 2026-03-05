import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { HomeSection, AboutSection, ExperiencesSection, SkillsSection } from "./components/sections";

function App() {
  const { t } = useTranslation();

  const pageTitle = t("pageTitle");
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return (
    <div className="flex flex-col py-6">
      <HomeSection />
      <AboutSection />
      <ExperiencesSection />
      <SkillsSection />
    </div>
  );
}

export default App;
