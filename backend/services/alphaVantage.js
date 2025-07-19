const axios = require("axios");

const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

// Fetches stock price by symbol
const fetchStockPrice = async (symbol) => {
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_API_KEY}`;
    const response = await axios.get(url);
    const price = response.data["Global Quote"]["05. price"];
    return parseFloat(price);
  } catch (error) {
    console.error("Alpha Vantage error:", error.message);
    return null;
  }
};

// Fetches USD -> target currency exchange rate
const getExchangeRate = async (toCurrency) => {
  try {
    const response = await axios.get('https://www.alphavantage.co/query', {
      params: {
        function: 'CURRENCY_EXCHANGE_RATE',
        from_currency: 'USD',
        to_currency: toCurrency,
        apikey: ALPHA_API_KEY,
      },
    });

    const rateData = response.data['Realtime Currency Exchange Rate'];
    if (!rateData) throw new Error('No exchange data');

    return parseFloat(rateData['5. Exchange Rate']);
  } catch (err) {
    throw new Error(`Exchange rate error: ${err.message}`);
  }
};

module.exports = {
  fetchStockPrice,
  getExchangeRate,
};
