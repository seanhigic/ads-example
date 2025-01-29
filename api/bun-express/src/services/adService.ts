import express from 'express';
import type { SponsoredAd } from '../../../../shared/models/SponsoredAd';
import logger from '../logger'

let router = express.Router();

router.post('/track', function(req, res, next) {
  logger.info("ad tracking event!");
  logger.info(req.body);
  
  res.send({});
});

router.get('/sponsoredads', async function(req, res, next) {

  const productId :number = process.env.ADS_EXAMPLE_SAD_PRODUCT_ID ? parseInt(process.env.ADS_EXAMPLE_SAD_PRODUCT_ID) : 9;
  const sad :SponsoredAd = {
    objectTrackingId: process.env.ADS_EXAMPLE_SAD_OBJECT_TRACKING_ID ?? crypto.randomUUID(),
    productId: productId
  }
  logger.info("returning sponsored ads:");
  logger.info([sad]);

  res.send([sad]);

});

export default router;