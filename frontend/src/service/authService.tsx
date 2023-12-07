import axios from "axios";
import {TOAST_SETTINGS} from "../constants/constants";
import {toast} from "react-toastify";

const apiUrl ='http://localhost:8081';

export const updateTodoSettings = async (token : string, settings: any) => {
    try {
        const response = await axios.put(`${apiUrl}/auth/updatetodos`, settings, {
            headers: {
                "Authorization": token,
            },
        });
        return response.data.message;
    } catch (error) {
        console.error("Error set settings:", error);
    }
};
export const fetchTodos = async (token : string) => {
    try {
        const response = await axios.get(`${apiUrl}/auth/gettodos`, {
            headers: {
                Authorization: `${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Timer setting error", error);
        return null;
    }
};


export const auth = async (mode: string, values: any) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/${mode == "login" ? "login" : "registration"}`, {
                username: values.name,
                password: values.password,
            }
        );

        return response.data
    } catch (error) {
        if (mode === 'registration') {
            return toast.error("Error. User already Exist", TOAST_SETTINGS);
        }
        toast.error("Error. User doesn't exist", TOAST_SETTINGS);
    }
};
