
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-100  text-green-900 ">
      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Website Info */}
        <div>
          <h1 className="text-2xl font-bold mb-2">🌿 Plant Tracker</h1>
          <p className="text-sm">&copy; {new Date().getFullYear()} Plant Tracker. All rights reserved.</p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Contact</h2>
          <p>Email: support@planttracker.com</p>
          <p>Phone: +1 (555) 123-4567</p>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Follow Us</h2>
          <div className="flex justify-center md:justify-start gap-4 text-2xl text-green-700">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
