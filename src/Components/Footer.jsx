import { useContext } from "react";
import { FaFacebook, FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import AuthContext from "../Authentication With FireBase/AuthContext";

const cx = (...c) => c.filter(Boolean).join(" ");

const Footer = () => {
  const { darkMode } = useContext(AuthContext) || { darkMode: false };

  const bg = darkMode ? "bg-slate-900" : "bg-green-100";
  const text = darkMode ? "text-gray-300" : "text-green-900";
  const heading = darkMode ? "text-white" : "text-green-800";
  const iconColor = darkMode ? "text-emerald-300" : "text-green-700";

  return (
    <footer className={cx("", bg, text)}>
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-2">🌿 Plant Tracker</h1>
          <p className="text-sm leading-relaxed">
            Track and care for your plants with ease. Grow healthier, greener spaces every day.
          </p>
          <p className="mt-3 text-xs opacity-80">
            &copy; {new Date().getFullYear()} Plant Tracker. All rights reserved.
          </p>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h2 className={cx("font-semibold text-lg mb-2", heading)}>Contact</h2>
          <p>
            <a
              href="mailto:siamthca@gmail.com"
              className=" hover:text-emerald-500"
            >
              siamthca@gmail.com
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="text-center md:text-left">
          <h2 className={cx("font-semibold text-lg mb-2", heading)}>Follow Us</h2>
          <div className={cx("flex justify-center md:justify-start gap-5 text-2xl", iconColor)}>
            <a
              href="https://www.facebook.com/siam.ul.islam.428705"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:scale-110 transition-transform"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.linkedin.com/feed/?trk=404_page"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:scale-110 transition-transform"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/siamulislam17"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:scale-110 transition-transform"
            >
              <FaGithub />
            </a>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
