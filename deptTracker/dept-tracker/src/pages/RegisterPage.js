import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const RegisterPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            name,
            email,
            password
        };

        try {
            const response = await axios.post(
                "https://study.logiper.com/auth/register",
                user
            );
            console.log(response.data.status === "success");
            if (response.data.status === "success") {
                window.location.href = "/login";
            }
        } catch (error) {
            console.error(error);
        };


    };

    return (
        <div className="max-w-md mx-auto py-12">
            <h1 className="text-2xl">Hesap oluştur</h1>
            <form className="flex flex-col gap-4 mt-8" onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Adınızı giriniz"
                    className="p-4 bg-gray-100 rounded-md"
                    value={name}
                    onChange={e => setName(e.currentTarget.value)}
                />

                <input
                    type="email"
                    placeholder="Email giriniz"
                    className="p-4 bg-gray-100 rounded-md"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                />

                <input type="password"
                    placeholder="Şifrenizi giriniz"
                    className="p-4 bg-gray-100 rounded-md"
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                />
                <button type="Submit" className="p-4 bg-green-400 rounded-md">Kayıt ol</button>
                <div>
                    <span>Hesabınız var mı? </span>
                    <Link to="/login" className="text-green-400">Giriş yap</Link>

                </div>
            </form>
        </div>
    )
}
export default RegisterPage;