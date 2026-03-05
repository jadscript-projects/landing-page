import { HomeSection } from "./components/sections";
import { CodeIcon } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();

  const pageTitle = t("pageTitle");
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);


  
  const words = t("about.words") as string;
  const baseWordsArray = words
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);
  const wordsArray = Array(4).fill(baseWordsArray).flat();

  return (
    <div className="flex flex-col py-6">
      <HomeSection />
      <div className="bg-linear-to-r from-cyan-300 to-lime-300 h-24 -mt-2 z-10 relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]"></div>
      <div className="bg-black h-20 -mt-20 z-10 -rotate-3 2xl:-rotate-2 relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] flex items-center">
        <div className="marquee w-full">
          <div className="marquee-content">
            {wordsArray.map((word, index) => (
              <div key={`word-${index}`} className="marquee-item">
                <span className="text-white text-2xl font-semibold">
                  {word}
                </span>
                <CodeIcon className="w-8 h-8 text-teal-200" />
              </div>
            ))}
            {wordsArray.map((word, index) => (
              <div key={`word-duplicate-${index}`} className="marquee-item">
                <span className="text-white text-2xl font-semibold">
                  {word}
                </span>
                <CodeIcon className="w-8 h-8 text-teal-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
