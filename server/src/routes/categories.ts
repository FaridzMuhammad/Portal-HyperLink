import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { id, label, icon_name } = req.body;
    if (!id || !label) {
      res.status(400).json({ error: 'ID and label are required' });
      return;
    }
    const category = await createCategory({
      id,
      label,
      icon_name: icon_name || 'Globe',
    });
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { label, icon_name } = req.body;
    const category = await updateCategory(req.params.id, {
      label,
      icon_name,
    });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await deleteCategory(req.params.id);
    if (!deleted) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
