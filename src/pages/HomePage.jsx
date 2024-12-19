import { Route, Routes } from "react-router-dom";
// import PageNotFound from "./components/PageNotFound";
// import "./App.css";

// Components
import Sidebar from "./../components/Sidebar";

// Page
import ImageVedio from "./../pages/ImageVedio";
import MailBox from "./../pages/MailBox";
import CarDetail from "./../pages/CarDetail";
import DetailForm from "./../components/CarDetail/DetailForm";
import NewAndEvent from "./../pages/NewAndEvent";
import NewForm from "./../components/NewAndEvent/NewForm";

function HomePage() {
  return (
    <div className="flex bg-gray-100 h-screen">
      <Sidebar />
      <div className="flex-1">
        <Routes>
          <Route path="/image-vedio" element={<ImageVedio />} />
          <Route path="/mail" element={<MailBox />} />
          <Route path="/car-detail" element={<CarDetail />} />
          <Route path="/car-detail/form" element={<DetailForm />} />
          <Route path="/new" element={<NewAndEvent />} />
          <Route path="/new/form" element={<NewForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
