import { Outlet } from "react-router-dom";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="bg-slate-100 min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
