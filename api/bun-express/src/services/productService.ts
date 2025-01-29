import express from 'express';
import { type Product } from "../../../../shared/models/Product";
import logger from '../logger'

let router = express.Router();

router.get('/', async function(req, res, next) {

  const productFile = Bun.file("./data/products.json");
  const products = JSON.parse(await productFile.text()) as Product[]; // contents as a string
  logger.info("returning " + products.length + " products");
  res.send(products);

});

export default router;