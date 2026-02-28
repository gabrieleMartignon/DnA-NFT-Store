import { useState, useEffect } from "react";
import Logo from "./components/Logo.tsx";
import Menu from "./components/Menu.tsx";
import Modal from "./components/Modal.tsx";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const vhTrigger = window.outerHeight * 0.1;
      if (window.scrollY > vhTrigger) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <nav
        className={`fixed flex z-2 justify-around items-center py-2 md:py-3 lg:py-2 transition-all ease-in-out duration-1200 transform opacity-100 ${
          isScrolled
            ? "top-[4vh] w-[90vw] sm:w-[80vw] rounded-lg border-3 border-accent z-1 opacity-100 bg-white "
            : "w-screen top-0 border-transparent"
        }`}
      >
        <Logo />
        <Menu />
        <Modal />
      </nav>
    </div>
  );
}
