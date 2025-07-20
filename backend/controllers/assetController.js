const Asset = require("../models/Asset");
const axios = require("axios");

const ALPHA_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
};

// Service to fetch real-time stock price
const fetchStockPrice = async (symbol) => {
  try {
    console.log("Fetching stock price for:", symbol);
    console.log("Using API Key:", ALPHA_API_KEY);
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_API_KEY}`;
    const response = await axios.get(url);
    const price = response.data["Global Quote"]["05. price"];
    return parseFloat(price);
  } catch (error) {
    console.error("Alpha Vantage error (stock price):", error.message);
    return null;
  }
};

// Service to fetch exchange rate (USD → target)
exports.getExchangeRate = async (toCurrency) => {
  try {
    const response = await axios.get("https://www.alphavantage.co/query", {
      params: {
        function: "CURRENCY_EXCHANGE_RATE",
        from_currency: "USD",
        to_currency: toCurrency,
        apikey: ALPHA_API_KEY,
      },
    });

    const rateData = response.data["Realtime Currency Exchange Rate"];
    if (!rateData) throw new Error("No exchange data");

    return parseFloat(rateData["5. Exchange Rate"]);
  } catch (err) {
    throw new Error(`Exchange rate error: ${err.message}`);
  }
};

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: Asset management and stock price tracking
 */

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all assets for a user with optional currency conversion
 *     tags: [Stocks]
 *     parameters:
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *         description: Currency code (USD, INR, EUR, GBP)
 *     responses:
 *       200:
 *         description: List of user assets
 */
exports.getAssets = async (req, res) => {
  try {
    const userCurrency = req.query.currency || "USD";
    const assets = await Asset.find({ user: req.user._id });

    let exchangeRate = 1;
    if (userCurrency !== "USD") {
      exchangeRate = await getExchangeRate(userCurrency);
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asset object
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ticker:
 *                 type: string
 *               quantity:
 *                 type: number
 *               buyPrice:
 *                 type: number
 *               assetType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Asset created
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Updated asset
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
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Asset removed
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
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ticker symbol (e.g., AAPL, TSLA)
 *     responses:
 *       200:
 *         description: Current stock price
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 price:
 *                   type: number
 *                 volume:
 *                   type: number
 *                 change:
 *                   type: string
 *                 changePercent:
 *                   type: string
 *                 timestamp:
 *                   type: string
 */
exports.getStockPrice = async (req, res) => {
  const { ticker } = req.params;

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${ALPHA_API_KEY}`;
    const response = await axios.get(url);
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
