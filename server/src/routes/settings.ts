import { Router } from 'express';
import { getSetting, setSetting } from '../controllers/settings.js';

const router = Router();

router.get('/:key', async (req, res, next) => {
  try {
    const value = await getSetting(req.params.key);
    res.json({ key: req.params.key, value });
  } catch (err) {
    next(err);
  }
});

router.post('/:key', async (req, res, next) => {
  try {
    const { value } = req.body;
    await setSetting(req.params.key, value);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
