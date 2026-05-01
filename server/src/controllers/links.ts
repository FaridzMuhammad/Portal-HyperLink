import pool from '../db/pool.js';

export interface LinkData {
  id: string;
  title: string;
  url: string;
  description: string;
  color: string;
  category: string;
  icon_name: string;
  created_at?: string;
  updated_at?: string;
}

export async function getAllLinks(): Promise<LinkData[]> {
  const result = await pool.query('SELECT * FROM links ORDER BY created_at ASC');
  return result.rows;
}

export async function getLinkById(id: string): Promise<LinkData | null> {
  const result = await pool.query('SELECT * FROM links WHERE id = $1', [id]);
  return result.rows[0] || null;
}

export async function createLink(link: Omit<LinkData, 'created_at' | 'updated_at'>): Promise<LinkData> {
  const result = await pool.query(
    `INSERT INTO links (id, title, url, description, color, category, icon_name)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [link.id, link.title, link.url, link.description, link.color, link.category, link.icon_name]
  );
  return result.rows[0];
}

export async function updateLink(id: string, link: Partial<LinkData>): Promise<LinkData | null> {
  const result = await pool.query(
    `UPDATE links
     SET title = COALESCE($2, title),
         url = COALESCE($3, url),
         description = COALESCE($4, description),
         color = COALESCE($5, color),
         category = COALESCE($6, category),
         icon_name = COALESCE($7, icon_name),
         updated_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id, link.title, link.url, link.description, link.color, link.category, link.icon_name]
  );
  return result.rows[0] || null;
}

export async function deleteLink(id: string): Promise<boolean> {
  const result = await pool.query('DELETE FROM links WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
}
