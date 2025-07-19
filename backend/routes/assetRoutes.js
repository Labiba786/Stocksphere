const express = require("express");
const {
  getAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
  getStockPrice,
} = require("../controllers/assetController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Assets
 *   description: Asset management endpoints in portfolio
 */

/**
 * @swagger
 * /api/assets:
 *   get:
 *     summary: Get all assets for authenticated user
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: currency
 *         schema:
 *           type: string
 *           example: INR
 *         description: Currency code to convert prices (e.g. USD, INR, EUR, GBP)
 *     responses:
 *       200:
 *         description: List of assets with optional currency conversion
 *       401:
 *         description: Unauthorized
 *   post:
 *     summary: Create a new asset
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticker
 *               - quantity
 *               - buyPrice
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
 *                 enum: [stock, crypto, mutual_fund, etf, other]
 *     responses:
 *       201:
 *         description: Asset created with real-time stock price
 *       400:
 *         description: Validation or price fetch error
 */

/**
 * @swagger
 * /api/assets/price/{ticker}:
 *   get:
 *     summary: Get current stock price
 *     description: Fetches the current stock price for the given asset ticker using Alpha Vantage API.
 *     tags:
 *       - Assets
 *     parameters:
 *       - in: path
 *         name: ticker
 *         required: true
 *         description: The stock ticker symbol (e.g., AAPL, TSLA).
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved stock price.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ticker:
 *                   type: string
 *                   example: AAPL
 *                 price:
 *                   type: string
 *                   example: "197.23"
 *       400:
 *         description: Invalid ticker symbol or no price data found.
 *       500:
 *         description: Server error while fetching stock price.
 */


/**
 * @swagger
 * /api/assets/{id}:
 *   get:
 *     summary: Get a single asset by ID
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Asset details
 *       404:
 *         description: Asset not found
 *   put:
 *     summary: Update an existing asset
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     requestBody:
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
 *       200:
 *         description: Asset updated
 *       404:
 *         description: Asset not found
 *   delete:
 *     summary: Delete an asset by ID
 *     tags: [Assets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Asset ID
 *     responses:
 *       200:
 *         description: Asset deleted
 *       404:
 *         description: Asset not found
 */

router.route("/")
  .get(protect, getAssets)
  .post(protect, createAsset);

router.route("/:id")
  .get(protect, getAssetById)
  .put(protect, updateAsset)
  .delete(protect, deleteAsset);

router.get("/price/:ticker", getStockPrice);

module.exports = router;
