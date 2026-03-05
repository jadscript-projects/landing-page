import { useEffect } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

export type Experience = {
  company: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  logo: string;
  color: string;
};

type CompanyModalProps = {
  experience: Experience | null;
  onClose: () => void;
};

const CompanyModal = ({ experience, onClose }: CompanyModalProps) => {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };
  
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!experience) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md md:max-w-2xl overflow-hidden rounded-xl bg-[#ebebeb] shadow-2xl border border-[#d1d1d1] animate-modal-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra de título estilo macOS */}
        <div
          className="grid grid-cols-12 items-center gap-2 px-4 py-2.5 bg-[#e5e5e5] border-b border-[#d1d1d1]"
          style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
        >
          <div className="flex gap-1.5 col-span-1">
            <button
              type="button"
              onClick={onClose}
              className="group relative flex items-center justify-center w-5 h-5 rounded-full bg-[#ff5f57] hover:bg-[#e04a42] transition-colors cursor-pointer shrink-0"
              aria-label="Fechar"
            >
              <X
                className="w-3 h-3 text-[#3d0000] opacity-0 group-hover:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </button>
          </div>
          <span className="flex-1 text-center text-sm font-medium text-[#5f5f5f] truncate col-span-10">
            {experience.company}
          </span>
        </div>

        {/* Conteúdo */}
        <div className="px-2 py-4 md:p-4 pr-0 md:pr-1 bg-white">
          <div className="flex flex-col items-center gap-6 max-h-96 overflow-y-auto pr-4">
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-20 h-20 object-cover rounded-full border-2 border-gray-200"
            />
            <div className="text-center space-y-1">
              <h3 className="text-xl font-semibold text-gray-900">
                {experience.company}
              </h3>
              <p className="text-sm font-medium text-gray-600">
                {experience.role}
              </p>
              <p className="text-xs text-gray-500">
                {formatDate(experience.startDate)} –{" "}
                {formatDate(experience.endDate)}
              </p>
            </div>
            <ul className="text-sm text-black/80 leading-relaxed list-disc list-inside space-y-4">
              {experience.description.split("\n").map((line, index) => (
                <li key={index}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyModal;
