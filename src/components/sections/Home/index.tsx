import { ArrowRight, MousePointer2Icon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getWorkingYears } from "../../../utils/date";

const HomeSection = () => {
  const { t } = useTranslation();
  
  return (
    <section id="home" className="grid grid-cols-12 gap-4 mt-16">
      <div className="flex flex-col justify-center gap-6 col-span-7">
        <h1 className="text-6xl font-bold leading-20">{t("home.title")}</h1>
        <p className="max-w-md leading-6 opacity-60">{t("home.description", { years: getWorkingYears() })}</p>
        <button className="bg-linear-to-r from-cyan-300 to-lime-300 pl-6 gap-6 rounded-full font-medium w-fit flex items-center justify-center cursor-pointer hover:from-teal-300 hover:to-lime-300 transition-colors duration-300">
          <span className="text-lg font-semibold">{t("home.hireMe")}</span>
          <div className="flex items-center justify-center bg-black rounded-full p-2 text-white m-1 animate-left-to-right">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>
      <div className="flex justify-center relative col-span-5">
        <img
          src="/profile.png"
          alt="Jadscript"
          className="w-full h-full object-cover"
        />
        <div className="flex flex-col absolute top-[55%] left-30 animate-mouse-pointer">
          <MousePointer2Icon className="w-6 h-6 fill-cyan-300 text-cyan-300" />
          <span className="text-sm bg-cyan-300 text-black rounded-full px-3 py-1 ml-5 -mt-1">
            {t("home.position-1")}
          </span>
        </div>

        <div className="flex flex-col absolute top-[40%] -right-10 animate-mouse-pointer-reverse">
          <MousePointer2Icon className="w-6 h-6 fill-lime-300 text-lime-300" />
          <span className="text-sm bg-lime-300 text-black rounded-full px-3 py-1 ml-5 -mt-1">
            {t("home.position-2")}
          </span>
        </div>

        <div className="flex flex-col absolute top-[75%] right-0 animate-mouse-pointer-2">
          <MousePointer2Icon className="w-6 h-6 fill-teal-300 text-teal-300" />
          <span className="text-sm bg-teal-300 text-black rounded-full px-3 py-1 ml-5 -mt-1">
            {t("home.position-3")}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
