import { Router } from 'express';
import {
  getAllLinks,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
} from '../controllers/links.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const links = await getAllLinks();
    res.json(links);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const link = await getLinkById(req.params.id);
    if (!link) {
      res.status(404).json({ error: 'Link not found' });
      return;
    }
    res.json(link);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { id, title, url, description, color, category, icon_name } = req.body;
    if (!title || !url) {
      res.status(400).json({ error: 'Title and URL are required' });
      return;
    }
    const link = await createLink({
      id: id || crypto.randomUUID(),
      title,
      url,
      description: description || '',
      color: color || '#1877F2',
      category: category || '',
      icon_name: icon_name || 'Globe',
    });
    res.status(201).json(link);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { title, url, description, color, category, icon_name } = req.body;
    const link = await updateLink(req.params.id, {
      title,
      url,
      description,
      color,
      category,
      icon_name,
    });
    if (!link) {
      res.status(404).json({ error: 'Link not found' });
      return;
    }
    res.json(link);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await deleteLink(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Link not found' });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
