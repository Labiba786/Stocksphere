const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Detect user's location and currency
 */

/**
 * @swagger
 * /api/location/currency:
 *   get:
 *     summary: Detect user's currency based on IP address
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: Successfully detected currency
 *         content:
 *           application/json:
 *             example:
 *               currency: "INR"
 *       500:
 *         description: Could not detect currency
 *         content:
 *           application/json:
 *             example:
 *               error: "Could not detect currency"
 */
router.get('/currency', locationController.getUserCurrency);

module.exports = router;
