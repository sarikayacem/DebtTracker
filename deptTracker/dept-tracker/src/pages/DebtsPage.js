import React, { useEffect, useState } from "react";
import axios from "axios";
import tokenService from "../services/tokenService";
import { Link } from "react-router-dom";
import EditDebtModal from "./EditDebtModal";


const DebtsPage = () => {
  const [debts, setDebts] = useState([]);
  const [editDebtId, setEditDebtId] = useState(null); // Düzenleme için borç ID'si
  const token = tokenService.getToken();

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const response = await axios.get("https://study.logiper.com/finance/debt", {
          headers: {
            Accept: "/",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setDebts(response.data.data);
      } catch (error) {
        console.error("Error fetching debts:", error);
      }
    };

    fetchDebts();
  }, []);

  const handleEditClick = (id) => {
    setEditDebtId(id);
  };

  const handleDelete = async (debtId) => {
    try {
      const response = await axios.delete(
        `https://study.logiper.com/finance/debt/${debtId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setDebts((data) => data.filter((debt) => debt.id !== debtId));
      console.log(response);
    } catch (error) {
      console.error("Error deleting debt:", error);
    }
  };

  const handleClick = (id) => {
    console.log(`Clicked on debt with id ${id}`);
    localStorage.setItem("deptId", id);
  };

  return (
    <div>
      {debts.length > 0 ? (
        <div className="max-w-2xl py-12 mx-auto">
          <div className="flex justify-between">
            <h1 className="text-2xl mb-4">Borç Listesi</h1>
            <Link to="/create-debt" className="bg-green-300 p-2 rounded-md">
              Yeni Borç Ekle
            </Link>
          </div>

          {debts.map((debt) => (
            <div
              key={debt.id}
              className="p-4 rounded-md bg-gray-100 mt-2 flex justify-between items-center"
            >
              <p>Borç Adı: {debt.debtName}</p>
              <div>
                <button
                  onClick={() => handleEditClick(debt.id)}
                  className="p-2 bg-red-300 rounded-md"
                >
                  Düzenle
                </button>
                <Link
                  onClick={() => {
                    handleClick(debt.id);
                  }}
                  to="/payment-plan"
                  className="p-2 bg-blue-300 rounded-md ms-2"
                >
                  Ödeme Planı Gör
                </Link>
                <button
                  className="text-red-500 text-2xl ms-2"
                  onClick={() => handleDelete(debt.id)}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          {/* Düzenleme Modalı */}
          {editDebtId && (
            <EditDebtModal
              debtId={editDebtId}
              onClose={() => setEditDebtId(null)}
            />
          )}
        </div>
      ) : (
        <p>Veri bulunamadı.</p>
      )}
    </div>
  );
};

export default DebtsPage;
