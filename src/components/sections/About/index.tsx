import { CodeIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  const words = t("about.words") as string;
  const baseWordsArray = words
    .split(",")
    .map((word) => word.trim())
    .filter(Boolean);
  const wordsArray = Array(4).fill(baseWordsArray).flat();

  return (
    <>
      <div className="bg-linear-to-r from-cyan-300 to-lime-300 h-24 -mt-2 z-10 relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw]"></div>
      <div className="bg-black h-20 -mt-20 z-10 -rotate-3 2xl:-rotate-2 relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] flex items-center shadow-lg">
        <div className="marquee w-full">
          <div className="marquee-content">
            {wordsArray.map((word, index) => (
              <div key={`word-${index}`} className="marquee-item">
                <span className="text-white text-xl font-semibold">{word}</span>
                <CodeIcon className="w-6 h-6 text-teal-200" />
              </div>
            ))}
            {wordsArray.map((word, index) => (
              <div key={`word-duplicate-${index}`} className="marquee-item">
                <span className="text-white text-xl font-semibold">{word}</span>
                <CodeIcon className="w-6 h-6 text-teal-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section id="about" className="flex flex-col gap-16 py-8 pt-20">
        <h2 className="text-5xl font-bold text-center max-w-2xl mx-auto leading-14">
          {t("about.titlePrefix")}
          <span className="bg-linear-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            {t("about.titleHighlight1")}
          </span>
          {t("about.titleMiddle")}
          <span className="bg-linear-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
            {t("about.titleHighlight2")}
          </span>
        </h2>
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <p className="opacity-60">{t("about.paragraph-1")}</p>
          <p className="opacity-60">{t("about.paragraph-2")}</p>
          <p className="opacity-60">{t("about.paragraph-3")}</p>
        </div>
        <div className="bg-linear-to-r from-cyan-300 to-lime-300 z-10 relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] flex flex-col justify-center items-center gap-4 py-16">
          <h3 className="text-LG font-bold">{t("social.title")}</h3>
          <div className="flex items-center justify-center gap-4">
            <a href="https://www.linkedin.com/in/jadson-souza/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:text-cyan-500 transition-colors duration-300">
              <LinkedinIcon className="w-5 h-5 " />
            </a>
            <a href="https://github.com/JadsonSouzaDev" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:text-teal-500 transition-colors duration-300">
              <GithubIcon className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/jadscript/" target="_blank" rel="noopener noreferrer" className="bg-white rounded-full p-2 hover:text-lime-500 transition-colors duration-300">
              <InstagramIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
