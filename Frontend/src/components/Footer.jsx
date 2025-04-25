import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content py-10 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Side - Logo */}
        <div>
          <h2 className="text-2xl font-bold text-center">🍽️ MyRestaurant</h2>
          <p className="text-sm mt-4">
            QR-based ordering system for modern restaurants.
          </p>
        </div>

        {/* Center - Navigation Links */}
        <div className="flex gap-6 text-sm">
          <a href="/" className="link link-hover">
            Home
          </a>
          <a href="/login" className="link link-hover">
            Login
          </a>
          <a href="/signup" className="link link-hover">
            Signup
          </a>
        </div>

        {/* Right Side - Social Icons */}
        <div className="flex gap-4 text-xl">
          <a
            href="https://github.com/"
            target="_blank"
            className="hover:text-primary"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            className="hover:text-primary"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            className="hover:text-primary"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
