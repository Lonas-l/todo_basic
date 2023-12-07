import React from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {toast, ToastContainer} from "react-toastify";
import {TOAST_SETTINGS} from "./constants/constants";
import {Routes, Route, Outlet, Link, useNavigate, Navigate} from "react-router-dom";
import ToDo from "./pages/ToDo/ToDo";
import AuthPage from "./pages/Auth/AuthPage";

function App() {

    let navigate = useNavigate();
    const token = localStorage.getItem("accessToken") || "";
    const isAuthorize = localStorage.getItem("isAuthorize") || "";

    const handleLoginSuccess = () => {
        toast.success("🦄 Login Complete", TOAST_SETTINGS);
        localStorage.setItem("isAuthorize", "true");
        navigate("/");
    };

    return (
        <div className={"app"}>
            <Routes>
                {isAuthorize && <Route path="/" element={<ToDo token={token}/>} />}
                {!isAuthorize && <Route
                    path="login"
                    element={<AuthPage mode={"login"} onLoginSuccess={handleLoginSuccess}/>}
                />
                }
                {!isAuthorize &&
                    <Route path="/registration" element={<AuthPage onLoginSuccess={handleLoginSuccess}
                                                                   mode={"registration"}/>}/>
                }
                <Route
                    path="*"
                    element={<Navigate to={isAuthorize ? "/" : "/login"} replace/>}
                />
            </Routes>

            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                className={"toast"}
                limit={1}
            />
        </div>

    );

}

export default App;
