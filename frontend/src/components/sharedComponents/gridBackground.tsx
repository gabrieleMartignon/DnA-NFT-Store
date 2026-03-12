import gridImage from "../../assets/imgs/Grid.jpg";

export default function GridBackground() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <img src={gridImage} alt="Grid Image" className="w-full h-full object-cover opacity-50" />
    </div>
  );
}
