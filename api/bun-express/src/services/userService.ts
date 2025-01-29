import express from 'express';
import { type User } from "../models/User";
import logger from '../logger'

let router = express.Router();


router.get('/current', function(req, res, next) {

  let user :User = {
    firstName: process.env.ADS_EXAMPLE_USER_FIRST_NAME ?? "Elmer",
    lastName: process.env.ADS_EXAMPLE_USER_LAST_NAME ?? "Fudd",
    userId: process.env.ADS_EXAMPLE_USER_ID ?? "elmer.fudd@warner.com"
  }

  logger.info("returning current user: " + user.userId);
  
  res.send(user);
});

export default router;