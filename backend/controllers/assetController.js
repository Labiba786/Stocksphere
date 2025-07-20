const Asset = require("../models/Asset");
const axios = require("axios");
const https = require("https");
const dns = require("dns");

const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

// IPv4 agent to avoid IPv6 timeout issues
const ipv4Agent = new https.Agent({
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },
});

// Service to fetch real-time stock price
const fetchStockPrice = async (symbol) => {
  const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_API_KEY}`;
    const response = await axios.get(url, { httpsAgent: ipv4Agent, timeout: 5000 });
    const price = response.data["Global Quote"]["05. price"];
    return parseFloat(price);
  } catch (error) {
    console.error("Alpha Vantage error (stock price):", error.message);
    return null;
  }
};

/**
 * @swagger
 * /api/assets/exchange-rate/{currency}:
 *   get:
 *     summary: Get exchange rate from USD to a specified currency
 *     tags: [Assets]
 *     parameters:
 *       - in: path
 *         name: currency
 *         required: true
 *         schema:
 *           type: string
 *           enum: [USD, INR, EUR, GBP]
 *     responses:
 *       200:
 *         description: Exchange rate retrieved
 */
exports.getExchangeRate = async (req, res) => {
  const toCurrency = req.params.currency;
  const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  try {
    const response = await axios.get  ("https://www.alphavantage.co/query", {
      params: {
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: "USD",
        to_currency: toCurrency,
        apikey: ALPHA_API_KEY,
      },
      httpsAgent: ipv4Agent,
      timeout: 5000,
    });
    const rateData = response.data["Realtime Currency Exchange Rate"];
    if (!rateData || !rateData["5. Exchange Rate"]) {
      throw new Error("No exchange data");
    }

    res.json({
      from: "USD",
      to: toCurrency,
      rate: parseFloat(rateData["5. Exchange Rate"]),
    });
  } catch (err) {
    console.error("Exchange rate error:", err.message);
    res.status(500).json({ message: `Exchange rate error: ${err.message}` });
  }
};

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all assets for a user with optional currency conversion
 *     tags: [Stocks]
 */
exports.getAssets = async (req, res) => {
  const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  try {
    const userCurrency = req.query.currency || "USD";
    const assets = await Asset.find({ user: req.user._id });

    let exchangeRate = 1;
    if (userCurrency !== "USD") {
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "CURRENCY_EXCHANGE_RATE",
          from_currency: "USD",
          to_currency: userCurrency,
          apikey: ALPHA_API_KEY,
        },
        httpsAgent: ipv4Agent,
        timeout: 5000,
      });

      const rateData = response.data["Realtime Currency Exchange Rate"];
      if (!rateData || !rateData["5. Exchange Rate"]) throw new Error("No exchange data");

      exchangeRate = parseFloat(rateData["5. Exchange Rate"]);
    }

    const enrichedAssets = assets.map((asset) => ({
      ...asset.toObject(),
      currentPrice: (asset.currentPrice * exchangeRate).toFixed(2),
      currency: userCurrency,
      symbol: currencySymbols[userCurrency] || "$",
    }));

    res.json(enrichedAssets);
  } catch (err) {
    console.error("Get Assets Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @swagger
 * /api/stocks/{id}:
 *   get:
 *     summary: Get a single asset by ID
 *     tags: [Stocks]
 */
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @swagger
 * /api/stocks:
 *   post:
 *     summary: Create a new asset with real-time stock price
 *     tags: [Stocks]
 */
exports.createAsset = async (req, res) => {
  try {
    const { name, ticker, quantity, buyPrice, assetType } = req.body;

    const currentPrice = await fetchStockPrice(ticker);
    if (!currentPrice) {
      return res.status(400).json({ message: "Failed to fetch stock price" });
    }

    const newAsset = await Asset.create({
      user: req.user._id,
      name,
      ticker,
      quantity,
      buyPrice,
      assetType,
      currentPrice,
    });

    res.status(201).json(newAsset);
  } catch (err) {
    console.error("Create Asset Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @swagger
 * /api/stocks/{id}:
 *   put:
 *     summary: Update an existing asset
 *     tags: [Stocks]
 */
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({ _id: req.params.id, user: req.user._id });
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    Object.assign(asset, req.body);
    const updated = await asset.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     summary: Delete an asset
 *     tags: [Stocks]
 */
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!asset) return res.status(404).json({ message: "Asset not found" });
    res.json({ message: "Asset removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

/**
 * @swagger
 * /api/asset/price/{ticker}:
 *   get:
 *     summary: Get current stock price for a ticker symbol
 *     tags: [Stocks]
 */
exports.getStockPrice = async (req, res) => {
  const { ticker } = req.params;
  const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_API_KEY}`;
    const response = await axios.get(url, { httpsAgent: ipv4Agent, timeout: 5000 });

    const quote = response.data["Global Quote"];

    if (!quote || !quote["05. price"]) {
      return res.status(404).json({ message: "Stock price not found or invalid ticker." });
    }

    res.json({
      symbol: quote["01. symbol"],
      price: parseFloat(quote["05. price"]),
      volume: parseInt(quote["06. volume"]),
      change: quote["09. change"],
      changePercent: quote["10. change percent"],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Stock Price Error:", err.message);
    res.status(500).json({ message: "Failed to fetch stock price." });
  }
};
