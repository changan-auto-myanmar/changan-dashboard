import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageNotFound from "./components/PageNotFound";
import "./App.css";

// Page
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  // const token = sessionStorage.getItem("biz-bozz");
  // const { isAuthenticated, login } = useAuth();

  return (
    <AnimatePresence>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home/*" element={<HomePage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </AnimatePresence>
  );
}
