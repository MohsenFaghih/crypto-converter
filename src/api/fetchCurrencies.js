import axios from "axios";

export const getDcp = async () => axios.get('https://metrics.router.democraticcooperative.cash/metrics/last');
export const getCurrencies = async () => axios.get('https://blockchain.info/ticker');