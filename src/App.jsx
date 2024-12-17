import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./components/PageNotFound";
import "./App.css";

// Components
import Sidebar from "./components/Sidebar";

// Page
import LoginPage from "./pages/LoginPage";
import ImageVedio from "./pages/ImageVedio";
import MailBox from "./pages/MailBox";
import CarDetail from "./pages/CarDetail";
import DetailForm from "./components/CarDetail/DetailForm";
import NewAndEvent from "./pages/NewAndEvent";
import NewForm from "./components/NewAndEvent/NewForm";

export default function App() {
  // const token = sessionStorage.getItem("biz-bozz");
  // const { isAuthenticated, login } = useAuth();

  return (
    <AnimatePresence>
      <div className="flex bg-gray-100 h-screen">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                // <PrivateRoute>
                <ImageVedio />
                // </PrivateRoute>
              }
            />
            <Route
              path="/mail"
              element={
                // <PrivateRoute>
                <MailBox />
                // </PrivateRoute>
              }
            />
            <Route
              path="/car-detail"
              element={
                // <PrivateRoute>
                <CarDetail />
                // </PrivateRoute>
              }
            />
            <Route
              path="/car-detail/form"
              element={
                // <PrivateRoute>
                <DetailForm />
                // </PrivateRoute>
              }
            />
            <Route
              path="/new"
              element={
                // <PrivateRoute>
                <NewAndEvent />
                // </PrivateRoute>
              }
            />
            <Route
              path="/new/form"
              element={
                // <PrivateRoute>
                <NewForm />
                // </PrivateRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </AnimatePresence>
  );
}
