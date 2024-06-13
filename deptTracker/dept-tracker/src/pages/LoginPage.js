import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import tokenService from "../services/tokenService";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");





    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email,
            password
        };

        try {
            const response = await axios.post(
                "https://study.logiper.com/auth/login",
                user,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log(response.data.data);
            tokenService.setToken(response.data.data)
            console.log(response.data);
            if (tokenService.getToken()) {
                window.location.href = "/dashboard";
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="max-w-md mx-auto py-12">
            <h1 className="text-2xl">Giriş Yap</h1>
            <form className="flex flex-col gap-2 mt-8" onSubmit={handleSubmit}>
                <label>Email adresiniz</label>
                <input
                    type="email"
                    placeholder="Email giriniz"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    className="p-4 bg-gray-100 rounded-md" />
                <label>Şifreniz</label>
                <input
                    type="password"
                    placeholder="Şifre giriniz"
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                    className="p-4 bg-gray-100 rounded-md" />
                <button type="submit" className="p-4 bg-green-400 rounded-md">Giriş yap</button>
                <div>
                    <span>Hesabınız yok mu? </span>
                    <Link to="/register" className="text-green-400">Kayıt ol</Link>
                </div>
            </form>
        </div>
    )

}

export default LoginPage;