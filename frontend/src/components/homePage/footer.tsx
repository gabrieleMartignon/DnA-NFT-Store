import GMLogo from "../../../src/assets/imgs/GMLogo.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" mt-6 flex items-center justify-center px-4">
      <div className="w-full h-auto py-2 flex justify-around">
        <div className="lg:gap-4 flex items-center justify-center ">
          <img src={GMLogo} alt="Personal Logo" width={140}  />
        </div>
        <div className="gap-4 flex items-center justify-center ">
          <p className="text-center text-base md:text-lg   text-muted max-w-3xl leading-relaxed  text-text/70 tracking-wide text-balance mr-5">
            &copy; DnA NFTs {currentYear}. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center  space-between ">
          <div className="flex items-center justify-center gap-4 ">
            <a href="https://github.com/gabrieleMartignon" className="underline font-bold hover:scale-120 transition-all duration-300">
              <img
                alt="Github Logo"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNDggNDgiIHdpZHRoPSI0OHB4IiBoZWlnaHQ9IjQ4cHgiPjxwYXRoIGZpbGw9IiMwMjg4RDEiIGQ9Ik00MiwzN2MwLDIuNzYyLTIuMjM4LDUtNSw1SDExYy0yLjc2MSwwLTUtMi4yMzgtNS01VjExYzAtMi43NjIsMi4yMzktNSw1LTVoMjZjMi43NjIsMCw1LDIuMjM4LDUsNVYzN3oiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTIgMTlIMTdWMzZIMTJ6TTE0LjQ4NSAxN2gtLjAyOEMxMi45NjUgMTcgMTIgMTUuODg4IDEyIDE0LjQ5OSAxMiAxMy4wOCAxMi45OTUgMTIgMTQuNTE0IDEyYzEuNTIxIDAgMi40NTggMS4wOCAyLjQ4NiAyLjQ5OUMxNyAxNS44ODcgMTYuMDM1IDE3IDE0LjQ4NSAxN3pNMzYgMzZoLTV2LTkuMDk5YzAtMi4xOTgtMS4yMjUtMy42OTgtMy4xOTItMy42OTgtMS41MDEgMC0yLjMxMyAxLjAxMi0yLjcwNyAxLjk5QzI0Ljk1NyAyNS41NDMgMjUgMjYuNTExIDI1IDI3djloLTVWMTloNXYyLjYxNkMyNS43MjEgMjAuNSAyNi44NSAxOSAyOS43MzggMTljMy41NzggMCA2LjI2MSAyLjI1IDYuMjYxIDcuMjc0TDM2IDM2IDM2IDM2eiIvPjwvc3ZnPg=="
              />
            </a>
            <a href="https://www.linkedin.com/in/gabrielemartignon/" className="underline font-bold hover:scale-120 transition-all duration-300">
              <img
                alt="Linkedin Logo"
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPiAgICA8cGF0aCBkPSJNMTcuNzkxLDQ2LjgzNkMxOC41MDIsNDYuNTMsMTksNDUuODIzLDE5LDQ1di01LjRjMC0wLjE5NywwLjAxNi0wLjQwMiwwLjA0MS0wLjYxQzE5LjAyNywzOC45OTQsMTkuMDE0LDM4Ljk5NywxOSwzOSBjMCwwLTMsMC0zLjYsMGMtMS41LDAtMi44LTAuNi0zLjQtMS44Yy0wLjctMS4zLTEtMy41LTIuOC00LjdDOC45LDMyLjMsOS4xLDMyLDkuNywzMmMwLjYsMC4xLDEuOSwwLjksMi43LDJjMC45LDEuMSwxLjgsMiwzLjQsMiBjMi40ODcsMCwzLjgyLTAuMTI1LDQuNjIyLTAuNTU1QzIxLjM1NiwzNC4wNTYsMjIuNjQ5LDMzLDI0LDMzdi0wLjAyNWMtNS42NjgtMC4xODItOS4yODktMi4wNjYtMTAuOTc1LTQuOTc1IGMtMy42NjUsMC4wNDItNi44NTYsMC40MDUtOC42NzcsMC43MDdjLTAuMDU4LTAuMzI3LTAuMTA4LTAuNjU2LTAuMTUxLTAuOTg3YzEuNzk3LTAuMjk2LDQuODQzLTAuNjQ3LDguMzQ1LTAuNzE0IGMtMC4xMTItMC4yNzYtMC4yMDktMC41NTktMC4yOTEtMC44NDljLTMuNTExLTAuMTc4LTYuNTQxLTAuMDM5LTguMTg3LDAuMDk3Yy0wLjAyLTAuMzMyLTAuMDQ3LTAuNjYzLTAuMDUxLTAuOTk5IGMxLjY0OS0wLjEzNSw0LjU5Ny0wLjI3LDguMDE4LTAuMTExYy0wLjA3OS0wLjUtMC4xMy0xLjAxMS0wLjEzLTEuNTQzYzAtMS43LDAuNi0zLjUsMS43LTVjLTAuNS0xLjctMS4yLTUuMywwLjItNi42IGMyLjcsMCw0LjYsMS4zLDUuNSwyLjFDMjEsMTMuNCwyMi45LDEzLDI1LDEzczQsMC40LDUuNiwxLjFjMC45LTAuOCwyLjgtMi4xLDUuNS0yLjFjMS41LDEuNCwwLjcsNSwwLjIsNi42YzEuMSwxLjUsMS43LDMuMiwxLjYsNSBjMCwwLjQ4NC0wLjA0NSwwLjk1MS0wLjExLDEuNDA5YzMuNDk5LTAuMTcyLDYuNTI3LTAuMDM0LDguMjA0LDAuMTAyYy0wLjAwMiwwLjMzNy0wLjAzMywwLjY2Ni0wLjA1MSwwLjk5OSBjLTEuNjcxLTAuMTM4LTQuNzc1LTAuMjgtOC4zNTktMC4wODljLTAuMDg5LDAuMzM2LTAuMTk3LDAuNjYzLTAuMzI1LDAuOThjMy41NDYsMC4wNDYsNi42NjUsMC4zODksOC41NDgsMC42ODkgYy0wLjA0MywwLjMzMi0wLjA5MywwLjY2MS0wLjE1MSwwLjk4N2MtMS45MTItMC4zMDYtNS4xNzEtMC42NjQtOC44NzktMC42ODJDMzUuMTEyLDMwLjg3MywzMS41NTcsMzIuNzUsMjYsMzIuOTY5VjMzIGMyLjYsMCw1LDMuOSw1LDYuNlY0NWMwLDAuODIzLDAuNDk4LDEuNTMsMS4yMDksMS44MzZDNDEuMzcsNDMuODA0LDQ4LDM1LjE2NCw0OCwyNUM0OCwxMi4zMTgsMzcuNjgzLDIsMjUsMlMyLDEyLjMxOCwyLDI1IEMyLDM1LjE2NCw4LjYzLDQzLjgwNCwxNy43OTEsNDYuODM2eiIvPjwvc3ZnPg=="
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
