# Portal Link

Aplikasi portal bookmark untuk mengakses website favorit dalam satu tempat. Dilengkapi dengan sistem CRUD lengkap terhubung ke backend API dan PostgreSQL.

## Fitur

- **Portal Link** — Akses cepat ke website favorit dengan kartu visual
- **Kategori** — Kelompokkan link per kategori (Sosial Media, Hiburan, Belajar, dll)
- **Pencarian** — Cari link berdasarkan nama atau deskripsi
- **Admin Mode** — Login admin untuk mengelola link, kategori, dan password
- **CRUD Backend** — Semua data tersimpan di PostgreSQL via REST API
- **Fallback Offline** — Jika backend offline, data tetap tersimpan di localStorage
- **Responsive** — Tampilan optimal di desktop maupun mobile

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| Backend | Express.js + TypeScript + tsx |
| Database | PostgreSQL + node-pg |
| Routing | React Router |

## Struktur Project

```
├── server/                 # Backend Express.js
│   ├── src/
│   │   ├── index.ts        # Entry point server
│   │   ├── db/pool.ts      # Koneksi PostgreSQL
│   │   ├── routes/         # API routes
│   │   │   ├── links.ts
│   │   │   ├── categories.ts
│   │   │   └── settings.ts
│   │   └── controllers/    # Business logic
│   │       ├── links.ts
│   │       ├── categories.ts
│   │       └── settings.ts
│   └── dist/               # Build output backend
├── src/
│   ├── components/         # React components
│   ├── pages/Home.tsx      # Halaman utama
│   ├── lib/
│   │   ├── utils.ts
│   │   └── api.ts          # Frontend API client
│   └── hooks/
├── database.sql            # Schema & seed PostgreSQL
├── docker-compose.yml      # PostgreSQL container (opsional)
└── .env                    # Konfigurasi environment
```

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/health` | Health check |
| GET | `/api/links` | Ambil semua link |
| POST | `/api/links` | Tambah link baru |
| PUT | `/api/links/:id` | Update link |
| DELETE | `/api/links/:id` | Hapus link |
| GET | `/api/categories` | Ambil semua kategori |
| POST | `/api/categories` | Tambah kategori |
| PUT | `/api/categories/:id` | Update kategori |
| DELETE | `/api/categories/:id` | Hapus kategori |
| GET | `/api/settings/:key` | Ambil setting |
| POST | `/api/settings/:key` | Simpan setting |

## Setup Development (Lokal)

### Prasyarat

- Node.js 20+
- PostgreSQL 15+ (atau Docker)

### 1. Clone & Install Dependencies

```bash
git clone <repo-url>
cd app
npm install
```

### 2. Konfigurasi Environment

Copy dari template:

```bash
cp .env.example .env
```

Edit `.env` dan sesuaikan kredensial database Anda:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=portal_link
PORT=3001
VITE_API_URL=http://localhost:3001/api
```

### 3. Setup Database

**Opsi A — PostgreSQL lokal:**

```bash
# Buat database
psql -U postgres -c "CREATE DATABASE portal_link;"

# Jalankan schema & seed
npm run db:init
```

**Opsi B — PostgreSQL via Docker:**

```bash
npm run db:up
npm run db:init
```

### 4. Jalankan Aplikasi

```bash
# Backend + Frontend sekaligus
npm run dev:full

# Atau terpisah:
# Terminal 1: npm run server:dev
# Terminal 2: npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Deploy ke aaPanel

### 1. Persiapan di aaPanel

1. Login ke aaPanel
2. Install **Node.js Version Manager** (Node 20+)
3. Install **PostgreSQL Manager** (PostgreSQL 15+)
4. Install **Nginx**

### 2. Upload Project

```bash
# Di server VPS / dedicated server
mkdir -p /www/wwwroot/portal-link
cd /www/wwwroot/portal-link
git clone <repo-url> .
npm install
```

### 3. Setup Database di aaPanel

1. Buka **Database** → **Add Database**
2. Isi nama database: `portal_link`
3. Buat user & password, catat kredensialnya
4. Buka **PostgreSQL Manager** → **Import**
5. Upload & jalankan file `database.sql`

### 4. Konfigurasi Environment

```bash
cp .env.example .env
nano .env
```

Isi dengan kredensial database dari aaPanel:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_aapanel_db_user
DB_PASSWORD=your_aapanel_db_password
DB_NAME=portal_link
PORT=3001
VITE_API_URL=/api
```

> **Catatan:** Untuk production, `VITE_API_URL` diisi `/api` (relative path) agar frontend mengarah ke domain yang sama.

### 5. Build untuk Production

```bash
# Build backend
npm run server:build

# Build frontend
npm run build
```

### 6. Jalankan Backend dengan PM2

Di aaPanel, buka **App Manager** atau gunakan terminal:

```bash
npm install -g pm2

# Jalankan backend
pm2 start server/dist/index.js --name portal-api

# Simpan konfigurasi PM2
pm2 save
pm2 startup
```

### 7. Setup Nginx Reverse Proxy

Di aaPanel:

1. **Website** → **Add Site**
2. Pilih **Reverse Proxy**
3. Domain: `portal-link.com` (sesuaikan)
4. Target URL: `http://127.0.0.1:3001`

Atau edit konfigurasi Nginx manual:

```nginx
server {
    listen 80;
    server_name portal-link.com;

    location / {
        root /www/wwwroot/portal-link/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 8. Setup SSL (Opsional)

1. Di aaPanel, pilih website Anda
2. Klik **SSL** → **Let's Encrypt**
3. Isi email dan domain
4. Centang **Force HTTPS**

### 9. Verifikasi Deployment

```bash
# Cek backend health
curl https://portal-link.com/api/health

# Cek API links
curl https://portal-link.com/api/links
```

### Update Aplikasi (Deployment Ulang)

```bash
cd /www/wwwroot/portal-link
git pull
npm install
npm run server:build
npm run build
pm2 restart portal-api
```

## Script npm

| Script | Deskripsi |
|--------|-----------|
| `npm run dev` | Jalankan frontend Vite (development) |
| `npm run server:dev` | Jalankan backend dengan tsx watch |
| `npm run dev:full` | Jalankan backend + frontend sekaligus |
| `npm run build` | Build frontend untuk production |
| `npm run server:build` | Build backend TypeScript ke JS |
| `npm run server:start` | Jalankan backend hasil build |
| `npm run db:create` | Buat database PostgreSQL |
| `npm run db:init` | Jalankan schema & seed SQL |
| `npm run db:reset` | Reset & seed ulang database |
| `npm run db:up` | Jalankan PostgreSQL container (Docker) |
| `npm run db:down` | Hentikan PostgreSQL container |

## Data Default

Aplikasi diisi dengan 30 link dan 6 kategori setelah menjalankan `database.sql`.

## Troubleshooting

**Error: `listen EADDRINUSE: address already in use 0.0.0.0:3001`**

```bash
kill $(lsof -ti:3001)
```

**Backend tidak terhubung ke PostgreSQL**

1. Pastikan PostgreSQL berjalan
2. Verifikasi database `portal_link` sudah ada
3. Cek kredensial di file `.env`

**Frontend error setelah deploy**

Pastikan `VITE_API_URL` di `.env` production diatur ke `/api` (bukan URL absolut).

## License

MIT
