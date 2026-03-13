import logo from "../../../../assets/imgs/Logo.png";
import { useNavigate } from "react-router";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <div className="w-auto sm:w-25 lg:w-30 h-full flex items-center cursor-pointer">
      <a
        onClick={() => {
          navigate("/Home");
        }}
      >
        <img src={logo} alt="DnA Logo" className="h-auto w-auto" />
      </a>
    </div>
  );
}
