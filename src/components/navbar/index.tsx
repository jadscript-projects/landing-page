import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import NavbarItem from "./navbar-item";
import LanguageSwitcher from "./language-switcher";

const Navbar = () => {
  const { t } = useTranslation();

  const navbarItems = [
    { href: "#home", label: t("navbar.home"), },
    { href: "#about", label: t("navbar.about") },
    { href: "#works", label: t("navbar.works") },
    { href: "#contact", label: t("navbar.contact"), icon: <ArrowRight className="w-6 h-6 text-white bg-black rounded-full p-1" />, className: "mx-6 bg-gray-100 pr-0" },
  ];
  
  return (
    <nav className="flex flex-col md:flex-row justify-center md:justify-between items-center py-4">
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
    </nav>
  );
};

export default Navbar;
