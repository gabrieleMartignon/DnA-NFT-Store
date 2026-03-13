import { useNavigate } from "react-router";

export default function Stats() {
  const navigate = useNavigate();
  const stats = [
    {
      value: "+50",
      label: "Researchers",
      description: "Contributing to our goal",
    },
    {
      value: "+1000",
      label: "Published Articles",
      description: "Spreding scientific information",
    },
    {
      value: "+180",
      label: "Countries",
      description: "Reached with our publications",
    },
    {
      value: "+95%",
      label: "Peer Review",
      description: "Approval rate from expert reviewers",
    },
  ];

  return (
    <div className="flex justify-center items-center  p-2 md:mt-[35vh] lg:mt-0 ">
      <div className="py-20 px-6 w-[80%] rounded-xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-5xl lg:text-6xl font-bold bg-linear-to-b from-primary to-accent bg-clip-text text-transparent leading-none tracking-tighter text-balance py-2 px-2 mb-4">
              Our Impact
            </h2>
            <div className="w-24 h-1 mx-auto mb-4 rounded-2xl bg-accent"></div>
            <p className="text-xl w-full mx-auto text-text/70">
              Promoting excellence in scientific research and spreading knowledge around the world
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-2xl p-5 shadow-lg  transition-all duration-400 transform  flex-1 min-w-55 max-w-60 border-t-primary/90 border-t-8 border-b-primary/90 border-b-8 hover:shadow-primary hover:shadow-2xl hover:scale-105 h-43"
              >
                <div className="text-3xl font-bold mb-1 text-primary/90">{stat.value}</div>
                <h3 className="text-lg font-semibold mb-2 text-text">{stat.label}</h3>
                <p className="text-sm leading-relaxed text-text/70">{stat.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <button
              className="px-8 py-2 rounded-full text-white font-semibold text-lg shadow-lg  transition-all duration-300 transform hover:scale-105 bg-primary hover:text-primary hover:bg-white cursor-pointer hover:shadow-2xl hover:shadow-primary"
              onClick={() => {
                navigate("/Auctions");
              }}
            >
              Join us!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
