
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex flex-col">
            <div>
                <div className="bg-gray-100 max-w-md mx-auto">
                    <div className="flex flex-col mt-36 gap-6 p-8">
                        <h1 className="text-4xl">Borç Durumum</h1>
                        <div>
                            <h2 className="text-2xl">Toplam Borç: </h2>
                            <h3 className="text-2xl">Ödenen Borç:</h3>
                        </div>
                        <div className="flex justify-between w-56 mx-auto">
                            <Link className="p-2 bg-red-400 " to="/create-debt">Borç Ekle</Link>
                            <Link className="p-2 bg-red-400 " to="/debt">Borçlarım Sayfası</Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Dashboard;