import pool from '../db/pool.js';

export async function getSetting(key: string): Promise<string | null> {
  const result = await pool.query('SELECT value FROM settings WHERE key = $1', [key]);
  return result.rows[0]?.value || null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  await pool.query(
    `INSERT INTO settings (key, value)
     VALUES ($1, $2)
     ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()`,
    [key, value]
  );
}

export async function deleteSetting(key: string): Promise<boolean> {
  const result = await pool.query('DELETE FROM settings WHERE key = $1', [key]);
  return (result.rowCount ?? 0) > 0;
}
