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
import NewDetail from "../components/NewAndEvent/NewDetail";
import DetailPage from "../components/CarDetail/DetailPage";
import BrandOverviewForm from "../components/ImageVedio/BrandOverviewForm";
import BrandOverviewDetail from "../components/ImageVedio/BrandOverviewDetail";

function HomePage() {
  return (
    <div className="flex bg-gray-100 min-h-screen ">
      <Sidebar />
      <div className="flex-1 pb-20">
        <Routes>
          <Route path="/image-vedio" element={<ImageVedio />} />
          <Route path="/mail" element={<MailBox />} />
          <Route path="/car-detail" element={<CarDetail />} />
          <Route path="/car-detail/form" element={<DetailForm />} />
          <Route
            path="/image-vedio/overview/form"
            element={<BrandOverviewForm />}
          />
          <Route
            path="/image-vedio/overview/detail/:id"
            element={<BrandOverviewDetail />}
          />
          <Route path="/car-detail/:id" element={<DetailPage />} />
          <Route path="/new" element={<NewAndEvent />} />
          <Route path="/new/form" element={<NewForm />} />
          <Route path="/new/detail/:id" element={<NewDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default HomePage;
