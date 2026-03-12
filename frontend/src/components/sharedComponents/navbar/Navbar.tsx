import { useState, useEffect } from "react";
import Logo from "./components/Logo";
import Menu from "./components/Menu";
import Modal from "./components/Modal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const vhTrigger = window.innerHeight * 0.1;
      if (window.scrollY > vhTrigger) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <nav
        className={`fixed flex z-2 justify-around items-center py-1 md:py-2 lg:py-1 transition-all ease-in-out duration-1000 transform opacity-100 mx-auto ${
          isScrolled ? "top-[4vh] w-[90vw] sm:w-[80vw] rounded-lg border-3 border-accent z-1 bg-white " : "w-screen top-0 border-transparent"
        }`}
      >
        <Logo />
        <Menu />
        <Modal />
      </nav>
    </div>
  );
}
