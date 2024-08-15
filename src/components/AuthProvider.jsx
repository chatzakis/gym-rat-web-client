import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import getApiUrl from "../components/ApiClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const apiUrl = getApiUrl();

    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("_auth") || "");
    const navigate = useNavigate();
    const loginAction = async (data) => {
        setError("");
            try {
            const res = await axios.post(
                apiUrl + 'login',
                data, { withCredentials: true }
            );

            if (res.data) {
                setUser(res.data.id);
                setToken(res.data.token);
                localStorage.setItem("_uid", res.data.id);
                localStorage.setItem("_username", res.data.username);
                localStorage.setItem("_email", res.data.email);
                localStorage.setItem("_auth", res.data.token);
                navigate("/");
                console.log(res.data.message);
                return;
            }

        } catch (err) {
            if (err && err instanceof AxiosError){
                setError(err.response?.data.message);
                return err.response?.data.message
            }
            else if (err && err instanceof Error) setError(err.message);
            console.log("Error: ", err);
            return;
        }

    };

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("_auth");
        localStorage.removeItem("_username");
        localStorage.removeItem("_email");
        localStorage.removeItem("_uid");
        navigate("/auth");
    };

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );

};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};