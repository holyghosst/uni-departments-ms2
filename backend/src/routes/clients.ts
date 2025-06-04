import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Hello, Clients!' });
});

export default router;
