import express from 'express';

let router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ apiName: "ACME Foods Backend - Bun w/ ExpressJS and TypeScript", version: "v1.0.0"});
});

export default router;