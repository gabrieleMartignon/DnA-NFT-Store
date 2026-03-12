import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import Navbar from "./components/sharedComponents/navbar/Navbar.tsx";
import Hero from "./components/homePage/homePage.tsx";
import Auctions from "./components/auctionsPage/auctionsPage.tsx";
import HistoryPage from "./components/historyPage/historyPage.tsx";
import AboutPage from "./components/aboutPage/aboutPage.tsx";
import GridBackground from "./components/sharedComponents/gridBackground.tsx";
import Verify from "./components/verifyPage/verify.tsx";
import DirectPurchase from "./components/directPurchasePage/directPurchasePage.tsx";

export default function App() {
  return (
    <>
   
      <BrowserRouter>
        <Navbar />
        <GridBackground />
        <Routes>
          <Route path="*" element={<Navigate to="/Home" replace />} />
          <Route path="/Home" element={<Hero />} />
          <Route path="/Auctions" element={<Auctions />} />
          <Route path="/DirectBuy" element={<DirectPurchase />}/>
          <Route path="/Verify" element={<Verify />} />
          <Route path="/History" element={<HistoryPage />} />
          <Route path="/About" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
