import GMLogo from "../../../src/assets/imgs/GMLogo.jpg"


export default function AboutPage() {
  const technologies = [
    { 
      name: "React, TypeScript, Tailwind CSS", 
      description: "Modern frontend stack for building responsive, type-safe user interfaces with utility-first styling" 
    },
    { 
      name: "Hardhat", 
      description: "Ethereum development environment for compiling, testing, and deploying smart contracts with advanced debugging capabilities" 
    },
    { 
      name: "ThirdWeb SDK", 
      description: "Comprehensive SDK for seamless wallet integration, user authentication, and blockchain interactions" 
    },
    { 
      name: "IPFS", 
      description: "Decentralized peer-to-peer storage network for hosting collection metadata and NFT images" 
    },
    { 
      name: "Chainlink Automation", 
      description: "Reliable decentralized oracle service that automates auction lifecycle management and ensures trustless execution" 
    },
  ];

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[15vh] p-10 bg-accent/20 rounded-xl shadow-2xl w-[85%] xl:w-[70%]">
      <div className="text-center text-sm font-bold space-y-6">
        
        <p>
          This project was conceived and developed as part of the final project within the Master's program in Blockchain Development and AI at{" "}
         <a href="https://www.start2impact.it/" className="underline hover:text-blue-500"> <b>start2impact</b>.</a>
        </p>

        <p>
          The primary objective was to design and implement a <b>Decentralized Application (DApp)</b> that enables users of a fictional online journal to purchase <b>ERC-721</b> compatible NFTs through an onchain auction system in order to access exclusive benefits.
        </p>
        <p>Prices are purely indicative. Sepolia network only.</p>

        <div>
          <p className="mb-4">
            <b>Technologies integrated into this application include:</b>
          </p>
          <ul className="space-y-2 text-left ">
            {technologies.map((tech) => (
              <li key={tech.name} className="flex items-start">
                <div className="mr-3">•</div>
                <div>
                  <b>{tech.name}</b> — {tech.description}.
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center w-full space-between">
        <img src={GMLogo} alt="Personal Logo" width={150} />
        <div className="flex items-center justify-center space around flex-col">
          <a href="https://github.com/gabrieleMartignon" className="underline font-bold hover:scale-120 transition-all duration-300">
          <img alt="Github Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiMwMjg4RDEiIGQ9Ik00MiwzN2MwLDIuNzYyLTIuMjM4LDUtNSw1SDExYy0yLjc2MSwwLTUtMi4yMzgtNS01VjExYzAtMi43NjIsMi4yMzktNSw1LTVoMjZjMi43NjIsMCw1LDIuMjM4LDUsNVYzN3oiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTIgMTlIMTdWMzZIMTJ6TTE0LjQ4NSAxN2gtLjAyOEMxMi45NjUgMTcgMTIgMTUuODg4IDEyIDE0LjQ5OSAxMiAxMy4wOCAxMi45OTUgMTIgMTQuNTE0IDEyYzEuNTIxIDAgMi40NTggMS4wOCAyLjQ4NiAyLjQ5OUMxNyAxNS44ODcgMTYuMDM1IDE3IDE0LjQ4NSAxN3pNMzYgMzZoLTV2LTkuMDk5YzAtMi4xOTgtMS4yMjUtMy42OTgtMy4xOTItMy42OTgtMS41MDEgMC0yLjMxMyAxLjAxMi0yLjcwNyAxLjk5QzI0Ljk1NyAyNS41NDMgMjUgMjYuNTExIDI1IDI3djloLTVWMTloNXYyLjYxNkMyNS43MjEgMjAuNSAyNi44NSAxOSAyOS43MzggMTljMy41NzggMCA2LjI2MSAyLjI1IDYuMjYxIDcuMjc0TDM2IDM2IDM2IDM2eiIvPjwvc3ZnPg=="/></a>
           <a href="https://www.linkedin.com/in/gabrielemartignon/" className="underline font-bold hover:scale-120 transition-all duration-300">
          <img alt="Linkedin Logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPiAgICA8cGF0aCBkPSJNMTcuNzkxLDQ2LjgzNkMxOC41MDIsNDYuNTMsMTksNDUuODIzLDE5LDQ1di01LjRjMC0wLjE5NywwLjAxNi0wLjQwMiwwLjA0MS0wLjYxQzE5LjAyNywzOC45OTQsMTkuMDE0LDM4Ljk5NywxOSwzOSBjMCwwLTMsMC0zLjYsMGMtMS41LDAtMi44LTAuNi0zLjQtMS44Yy0wLjctMS4zLTEtMy41LTIuOC00LjdDOC45LDMyLjMsOS4xLDMyLDkuNywzMmMwLjYsMC4xLDEuOSwwLjksMi43LDJjMC45LDEuMSwxLjgsMiwzLjQsMiBjMi40ODcsMCwzLjgyLTAuMTI1LDQuNjIyLTAuNTU1QzIxLjM1NiwzNC4wNTYsMjIuNjQ5LDMzLDI0LDMzdi0wLjAyNWMtNS42NjgtMC4xODItOS4yODktMi4wNjYtMTAuOTc1LTQuOTc1IGMtMy42NjUsMC4wNDItNi44NTYsMC40MDUtOC42NzcsMC43MDdjLTAuMDU4LTAuMzI3LTAuMTA4LTAuNjU2LTAuMTUxLTAuOTg3YzEuNzk3LTAuMjk2LDQuODQzLTAuNjQ3LDguMzQ1LTAuNzE0IGMtMC4xMTItMC4yNzYtMC4yMDktMC41NTktMC4yOTEtMC44NDljLTMuNTExLTAuMTc4LTYuNTQxLTAuMDM5LTguMTg3LDAuMDk3Yy0wLjAyLTAuMzMyLTAuMDQ3LTAuNjYzLTAuMDUxLTAuOTk5IGMxLjY0OS0wLjEzNSw0LjU5Ny0wLjI3LDguMDE4LTAuMTExYy0wLjA3OS0wLjUtMC4xMy0xLjAxMS0wLjEzLTEuNTQzYzAtMS43LDAuNi0zLjUsMS43LTVjLTAuNS0xLjctMS4yLTUuMywwLjItNi42IGMyLjcsMCw0LjYsMS4zLDUuNSwyLjFDMjEsMTMuNCwyMi45LDEzLDI1LDEzczQsMC40LDUuNiwxLjFjMC45LTAuOCwyLjgtMi4xLDUuNS0yLjFjMS41LDEuNCwwLjcsNSwwLjIsNi42YzEuMSwxLjUsMS43LDMuMiwxLjYsNSBjMCwwLjQ4NC0wLjA0NSwwLjk1MS0wLjExLDEuNDA5YzMuNDk5LTAuMTcyLDYuNTI3LTAuMDM0LDguMjA0LDAuMTAyYy0wLjAwMiwwLjMzNy0wLjAzMywwLjY2Ni0wLjA1MSwwLjk5OSBjLTEuNjcxLTAuMTM4LTQuNzc1LTAuMjgtOC4zNTktMC4wODljLTAuMDg5LDAuMzM2LTAuMTk3LDAuNjYzLTAuMzI1LDAuOThjMy41NDYsMC4wNDYsNi42NjUsMC4zODksOC41NDgsMC42ODkgYy0wLjA0MywwLjMzMi0wLjA5MywwLjY2MS0wLjE1MSwwLjk4N2MtMS45MTItMC4zMDYtNS4xNzEtMC42NjQtOC44NzktMC42ODJDMzUuMTEyLDMwLjg3MywzMS41NTcsMzIuNzUsMjYsMzIuOTY5VjMzIGMyLjYsMCw1LDMuOSw1LDYuNlY0NWMwLDAuODIzLDAuNDk4LDEuNTMsMS4yMDksMS44MzZDNDEuMzcsNDMuODA0LDQ4LDM1LjE2NCw0OCwyNUM0OCwxMi4zMTgsMzcuNjgzLDIsMjUsMlMyLDEyLjMxOCwyLDI1IEMyLDM1LjE2NCw4LjYzLDQzLjgwNCwxNy43OTEsNDYuODM2eiIvPjwvc3ZnPg=="/></a>
        </div>
        

      </div>
    </div>
  );
}