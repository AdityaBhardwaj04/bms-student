import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage";
import PrivateRoute from "./components/PrivateRoutes";
import SummerCamp from "./pages/SummerCamp";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/summer-camp" element={<SummerCamp />} />
                <Route path="/landing-page" element={<LandingPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
