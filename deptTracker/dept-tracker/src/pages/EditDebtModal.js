import React, { useEffect, useState } from "react";
import axios from "axios";
import tokenService from "../services/tokenService";

const EditDebtModal = ({ debtId, onClose }) => {
    const [debtName, setDebtName] = useState("");
    const [lenderName, setLenderName] = useState("");
    const [debtAmount, setDebtAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [paymentStart, setPaymentStart] = useState("");
    const [installment, setInstallment] = useState("");
    const [description, setDescription] = useState("");
    const [paymantPlan, setPaymentPlan] = useState();

    const token = tokenService.getToken();

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    const handleDateChange = (event) => {
        setPaymentStart(event.target.value);
    };

    useEffect(() => {
        setPaymentStart(minDate.toISOString().split("T")[0]);
    }, [])

    const calculateTotalAmount = (debtAmount, interestRate, installment) => {
        const monthlyInterestRate = interestRate / 100;
        return parseFloat((debtAmount * Math.pow(1 + monthlyInterestRate, installment)));
    }

    const amount = !isNaN(parseFloat(debtAmount)) && !isNaN(parseFloat(interestRate)) && !isNaN(parseFloat(installment))
        ? calculateTotalAmount(parseFloat(debtAmount), parseFloat(interestRate), parseFloat(installment))
        : 0;

    const createPaymentPlan = (amount, installment, paymentStart) => {
        const monthlyPayment = amount / installment;
        const firstPaymentDate = new Date(paymentStart);

        const paymentPlan = [];


        for (let i = 0; i < installment; i++) {
            const paymentDate = new Date(firstPaymentDate.getFullYear(), firstPaymentDate.getMonth(), +1 + i, firstPaymentDate.getDate());
            paymentPlan.push({
                paymentDate: paymentDate.toISOString().split("T")[0],
                paymentAmount: parseFloat(monthlyPayment.toFixed(2))
            });
        }
        return paymentPlan;
    }

    const paymentPlan = createPaymentPlan(amount, parseFloat(installment), paymentStart);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const debt = JSON.stringify({
            "debtName": debtName,
            "lenderName": "string",
            "debtAmount": parseFloat(debtAmount),
            "interestRate": parseFloat(interestRate),
            "amount": parseFloat(amount),
            "paymentStart": "2024-06-13",
            "installment": parseInt(installment),
            "description": description,
            "paymentPlan": paymentPlan
        });

        try {
            var myHeaders = new Headers();
            myHeaders.append("accept", "*/*");
            myHeaders.append("Authorization", `Bearer ${token}`);
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: debt,
                redirect: 'follow'
            };

            fetch("https://study.logiper.com/finance/debt", requestOptions)
                // .then((e) => {
                //     if (e.status === 200) {
                //         window.location.href = "/debt";
                //     }
                // })
                .catch(error => console.log('error', error));

        } catch (error) {
            console.error(error);
            if (error.response) {
                console.error(error.response.data);
            }
        };
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-4 rounded-lg w-80">
                <h2 className="text-xl font-semibold mb-4">Borç Düzenle</h2>
                {/* <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full mb-4"
                    placeholder="Borç Adı"
                    value={debtName}
                    onChange={(e) => setDebtName(e.target.value)}
                /> */}

                <input
                    type="text"
                    placeholder="Borç adı giriniz"
                    className="bg-gray-100 p-2 h-10"
                    value={debtName}
                    onChange={(e) => setDebtName(e.currentTarget.value)}
                />
                <input
                    type="text"
                    placeholder="Borç veren"
                    className="bg-gray-100 p-2 h-10"
                    value={lenderName}
                    onChange={(e) => setLenderName(e.currentTarget.value)}
                />
                <input
                    type="number"
                    placeholder="Borç miktarı"
                    className="bg-gray-100 p-2 h-10"
                    value={debtAmount}
                    onChange={(e) => setDebtAmount(e.currentTarget.value)}
                />
                <input
                    type="number"
                    placeholder="Faiz oranı"
                    className="bg-gray-100 p-2 h-12"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.currentTarget.value)}
                />


                <input
                    type="number"
                    placeholder="Taksit sayısı"
                    className="bg-gray-100 p-2 h-10"
                    value={installment}
                    onChange={(e) => setInstallment(e.currentTarget.value)}
                />
                <input
                    type="number"
                    placeholder="Toplam borç"
                    className=" p-2 text-gray-600 pointer-events-none h-12"
                    value={amount.toFixed(2)}
                    readOnly

                />
                <input
                    type="date"
                    value={paymentStart}
                    onChange={handleDateChange}
                    min={minDate.toISOString().split('T')[0]}
                    className="h-12"
                />

                <input
                    type="text"
                    placeholder="Borç açıklaması"
                    className="bg-gray-100 p-2"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Kaydet
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditDebtModal;
