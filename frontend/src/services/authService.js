import axios from "axios";

const API_URL = "http://localhost:3000";

const register = async (name, cpf, email, password, userType) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, {
            name,
            cpf,
            email,
            password,
            userType,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.msg?.error || "Erro ao registrar usuário.");
    }
};

const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, {
            email,
            password,
        });

        const token = response.data.token;

        localStorage.setItem('authToken', token);
        console.log("Token recebido:", token);
        
        return token;
    } catch (error) {
        console.error("Erro ao fazer login.", error);
    }
};

export default {
    register,
    login
};
