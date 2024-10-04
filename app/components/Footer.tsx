import { Link } from "@remix-run/react";
import { Linkedin } from "lucide-react";

export const Footer: React.FC = () => {
  const footerLinks = [
    { url: "https://linkedIn.com", label: "Mateusz" },
    { url: "https://www.linkedin.com/in/ma%C5%82gorzata-krawczuk/", label: "Gosia" },
    { url: "https://linkedIn.com", label: "Massiee" },
    { url: "https://linkedIn.com", label: "Łukasz" },
  ];
  return (
    <footer className="mx-auto mt-8 w-full flex-col items-center gap-5 bg-accent p-4">
      <div className="mx-auto max-w-[600px] flex-col items-center justify-center text-sm">
        <span className="flex items-center justify-center px-4 py-2">
          &copy; {new Date().getFullYear()} - All rights reserved.
        </span>
        <ul className="flex items-center justify-center gap-8 px-8 py-2">
          {footerLinks.map((link, index) => (
            <li key={index} className="flex items-center gap-2">
              <span>{link.label}</span>
              <Link to={link.url} className="mr-1 hover:underline">
                <Linkedin size={24} fill="blue" strokeWidth="1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
