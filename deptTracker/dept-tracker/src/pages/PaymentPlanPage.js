import { useEffect, useState } from "react";
import tokenService from "../services/tokenService";
import axios from "axios";
import { Link } from "react-router-dom";

const PaymentPlanPage = () => {
    const token = tokenService.getToken();
    const paymentId = localStorage.getItem("deptId");
    const [paymentPlan, setPaymentPlan] = useState([]);

    useEffect(() => {
        const fetchPaymentPlan = async () => {
            try {
                const response = await axios.get(
                    `https://study.logiper.com/finance/payment-plans/${paymentId}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        }

                    }
                );
                setPaymentPlan(response.data.data)
                console.log(response.data.data);
            } catch (error) {
                console.error("Error fetching debts:", error);
            }
        };

        fetchPaymentPlan();
    }, []);

    const handlePay = async (paymentId, isPaid, amount, date) => {

        var myHeaders = new Headers();
        myHeaders.append("accept", "*/*");
        myHeaders.append("Authorization", `Bearer ${token} `);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "paymentDate": date,
            "paymentAmount": amount,
            "isPaid": isPaid
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://study.logiper.com/finance/payment-plans/${paymentId}`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        setTimeout(() => { window.location.href = "/payment-plan"; }, 500);

    }




    return (
        <div>
            <h1 className="text-2xl mb-4">Ödeme Planı</h1>
            {paymentPlan.length > 0 ? (
                paymentPlan.map((payment) => (
                    <div key={payment.id} className="p-4 rounded-md bg-gray-100 mt-2">
                        <div className="flex justify-between">
                            <div>
                                <p>Ödeme Tarihi: {new Date(payment.paymentDate).toLocaleDateString()}</p>
                                <p>Ödeme Miktarı: {payment.paymentAmount}</p>
                                <p>Durum: {payment.isPaid ? "Ödendi" : "Ödenmedi"}</p>
                            </div>
                            <button
                                onClick={() => handlePay(payment.id, !payment.isPaid, payment.paymentAmount, payment.paymentDate)}
                                className={`p-2 h-16 ${payment.isPaid ? 'bg-green-500' : 'bg-red-500'} text-white rounded-md`}
                            >
                                {payment.isPaid ? "Ödenmedi olarak işaretle" : "Ödendi olarak işaretle"}
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>Ödeme planı bulunamadı.</p>
            )}
        </div>
    );
}

export default PaymentPlanPage;