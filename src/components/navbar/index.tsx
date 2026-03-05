import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import NavbarItem from "./navbar-item";
import LanguageSwitcher from "./language-switcher";

const Navbar = () => {
  const { t } = useTranslation();

  const navbarItems = [
    { href: "#home", label: t("navbar.home") },
    { href: "#about", label: t("navbar.about") },
    { href: "#experiences", label: t("navbar.works") },
    { href: "#skills", label: t("navbar.skills") },
    {
      href: "#contact",
      label: t("navbar.contact"),
      icon: (
        <ArrowRight className="w-6 h-6 text-white bg-black rounded-full p-1" />
      ),
      className: "mx-6 bg-gray-100 pr-0",
    },
  ];

  return (
    <nav className="bg-white/60 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center py-4 max-w-6xl mx-auto px-2 md:px-4 lg:px-6 xl:px-0">
        <div className="hidden md:flex">
          <h1 className="text-2xl font-bold font-fira-code">jadscript.dev</h1>
        </div>
        <ul className="flex gap-2">
          {navbarItems.map((item) => (
            <NavbarItem key={item.href} {...item} />
          ))}
          <LanguageSwitcher className="hidden md:flex" />
        </ul>
        <LanguageSwitcher className="md:hidden" />
      </div>
      <div className="bg-linear-to-r from-cyan-300 to-lime-300 h-px z-10 left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] relative"></div>
    </nav>
  );
};

export default Navbar;
