import type { FC, ReactNode } from "react";

interface NavbarItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

const NavbarItem: FC<NavbarItemProps> = ({ href, label, icon, className }) => {
  return (
    <li
      className={`${className} hover:bg-gray-100 rounded-full px-3 py-1 transition-all duration-300`}
    >
      <a href={href} className="flex items-center gap-2">
        {label} {icon}
      </a>
    </li>
  );
};

export default NavbarItem;
