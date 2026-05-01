import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import linksRouter from './routes/links.js';
import categoriesRouter from './routes/categories.js';
import settingsRouter from './routes/settings.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/links', linksRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/settings', settingsRouter);

// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
