import express from 'express';
import logger from '../logger'

let router = express.Router();

router.get('/', function(req, res, next) {
  const config  = {
    storageController: process.env.ADS_EXAMPLE_STORAGE_CONTROLLER ?? "session"
  }
  logger.info("sending config:");
  logger.info(config);
  res.send(config);
});

export default router;