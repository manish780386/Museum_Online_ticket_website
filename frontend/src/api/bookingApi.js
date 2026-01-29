import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const createOrder = (amount) =>
  API.post("create-order/", { amount });

export const verifyPayment = (data) =>
  API.post("verify-payment/", data);
