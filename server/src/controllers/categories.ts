import pool from '../db/pool.js';

export interface CategoryData {
  id: string;
  label: string;
  icon_name: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllCategories(): Promise<CategoryData[]> {
  const result = await pool.query('SELECT * FROM categories ORDER BY created_at ASC');
  return result.rows;
}

export async function getCategoryById(id: string): Promise<CategoryData | null> {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createCategory(category: Omit<CategoryData, 'created_at' | 'updated_at'>): Promise<CategoryData> {
  const result = await pool.query(
    `INSERT INTO categories (id, label, icon_name)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [category.id, category.label, category.icon_name]
  );
  return result.rows[0];
}

export async function updateCategory(id: string, category: Partial<CategoryData>): Promise<CategoryData | null> {
  const result = await pool.query(
    `UPDATE categories
     SET label = COALESCE($2, label),
         icon_name = COALESCE($3, icon_name),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, category.label, category.icon_name]
  );
  return result.rows[0] || null;
}

export async function deleteCategory(id: string): Promise<boolean> {
  const result = await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}
