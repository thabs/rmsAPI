const express = require('express');
const router = express.Router();
//! Controller
const metersController = require('../controllers/meters');

/**
 * @swagger
 * /meters/{serialNum}:
 *   get:
 *     tags:
 *       - Meters
 *     name: Get meter readings
 *     summary: Get readings by meter serial number
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: serialNum
 *         schema:
 *            type: string
 *         required: true
 *         description: Serial number of the meter
 *     responses:
 *       '200':
 *         description: Meter reading success
 *       '409':
 *         description: Meter readings not found
 */
router.get('/meters/:serialNum', metersController.readMeterData);

module.exports = router;
