import { useState } from "react";
import { useNavigate } from "react-router";
import type { pagesType } from "./Menu";

type propType = {
  pageName: pagesType;
  setHoveredPage: Function;
  currentPage: string;
  setCurrentPage: Function;
  hasDropdown: boolean;
  descriptions?: string[];
  titles?: string[];
  onNavigate: string[];
  imgSrc?: string[];
};

export default function MenuItem({
  pageName,
  setHoveredPage,
  currentPage,
  setCurrentPage,
  descriptions,
  titles,
  hasDropdown,
  onNavigate,
  imgSrc,
}: propType) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <li
      className="relative py-2 px-2.5 flex items-center justify-center rounded-lg transition duration-300 cursor-pointer w-[25%]"
      onMouseEnter={() => {
        (setIsOpen(true), setHoveredPage(pageName));
      }}
      onMouseLeave={() => {
        (setIsOpen(false), setHoveredPage(currentPage));
      }}
      onClick={() => (setCurrentPage(pageName), setIsOpen(!isOpen), hasDropdown ? "" : navigate(onNavigate[0]))}
    >
      <a>{pageName}</a>

      {hasDropdown ? (
        <div
          className={`absolute sm:left-0 w-[30vw] min-w-60 h-auto bg-white rounded-lg shadow-lg z-1 transition-all duration-400 top-full scale-85 ${
            isOpen ? "opacity-100" : "opacity-0 mt-10 invisible"
          }`}
        >
          {titles?.map((title, i) => {
            return (
              <div className="">
                <a
                  key={title}
                  className="flex items-center px-4 py-2 text-gray-800 gap-3 sm:gap-5 hover:bg-accent/15 rounded-lg "
                  onClick={() => {
                    (navigate(onNavigate[i]), setCurrentPage(pageName));
                  }}
                >
                  <img className="w-5 sm:w-7 " src={imgSrc![i]} alt="auction" />
                  <div className="flex flex-col">
                    <h1 className="pr-2 ">
                      <b>{titles[i]}</b>
                    </h1>
                    <h2 className="text-gray-400 py-1 tracking-wider">{descriptions![i]}</h2>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      ) : null}
    </li>
  );
}
