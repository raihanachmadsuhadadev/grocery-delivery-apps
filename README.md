# Grocery Delivery Apps

Grocery Delivery Apps adalah aplikasi web grocery dan food delivery untuk mengelola alur pemesanan produk, cart, checkout, order customer, serta manajemen produk dan order dari sisi admin.

Aplikasi ini terdiri dari customer app, admin panel, dan REST API berbasis Express.js yang terhubung ke MongoDB.

## Ringkasan Sistem

Sistem mendukung alur delivery end-to-end. Customer dapat melihat produk, menambahkan produk ke cart, melanjutkan checkout, dan melihat order yang dibuat oleh sistem. Admin dapat mengelola produk serta memperbarui status order, kemudian customer dapat melihat status terbaru pada halaman My Orders.

Project dipisahkan menjadi tiga aplikasi utama:

- `backend` — Express.js REST API dengan MongoDB dan Mongoose.
- `frontend` — React + Vite untuk customer app.
- `admin` — React + Vite untuk admin panel.

Untuk pengujian lokal, checkout dapat dijalankan tanpa pembayaran sungguhan melalui `PAYMENT_MODE=demo`.

## Developer Role

- Menganalisis alur grocery/food delivery dari sisi customer dan admin.
- Merancang struktur aplikasi dengan pemisahan backend API, customer frontend, dan admin panel.
- Mengembangkan backend REST API menggunakan Node.js, Express.js, MongoDB, Mongoose, JWT, dan Multer.
- Membangun customer frontend menggunakan React, Vite, React Router, dan Axios.
- Membangun admin panel menggunakan React, Vite, Bootstrap, Axios, dan React Toastify.
- Mengimplementasikan customer authentication, cart API, product API, order API, admin authentication, dan protected admin endpoints.
- Mengimplementasikan mode checkout lokal menggunakan `PAYMENT_MODE=demo`.
- Menyiapkan screenshot aplikasi, environment example, demo credential, dan dokumentasi project.

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token Authentication
- Multer
- Stripe package structure for payment flow

### Customer Frontend

- React
- Vite
- React Router
- Axios

### Admin Panel

- React
- Vite
- React Router
- Axios
- Bootstrap
- React Toastify

### Tools

- NPM
- Git
- MongoDB Atlas

## Fitur Utama

### Customer App

- Product listing.
- Add to cart.
- Cart page.
- Checkout page.
- Local checkout mode.
- My Orders page.
- Order status tracking setelah admin memperbarui status order.

### Admin Panel

- Admin login.
- Admin token authentication.
- Add product.
- Product list.
- Remove product.
- Orders list.
- Update order status.

### Backend

- REST API.
- Koneksi MongoDB Atlas.
- Customer authentication.
- Cart API.
- Food/product API.
- Order API.
- Admin authentication.
- Protected admin endpoints.
- Local checkout mode menggunakan `PAYMENT_MODE=demo`.

## Role & Akses

### Customer

Customer memiliki akses ke product listing, cart, checkout, My Orders, dan pelacakan status order.

### Admin

Admin memiliki akses ke admin login, pengelolaan produk, upload gambar produk, pengelolaan order, dan pembaruan status order. Endpoint administratif dilindungi menggunakan admin token authentication.

## Struktur Project

```text
grocery-delivery-apps/
+-- admin/       # React + Vite admin panel
+-- backend/     # Express.js + MongoDB API
+-- docs/        # Screenshot dokumentasi
+-- frontend/    # React + Vite customer app
+-- README.md
```

## Screenshots

Screenshot berikut memperlihatkan alur utama customer dan aktivitas pengelolaan melalui admin panel.

### Customer Home

![Customer homepage](docs/screenshots/01-customer-home/homepage.png)

![Top products](docs/screenshots/01-customer-home/top-products.png)

### Customer Product Flow

![Add to cart state](docs/screenshots/02-customer-product-flow/add-to-cart-state.png)

### Customer Cart dan Checkout

![Cart page](docs/screenshots/03-customer-cart-checkout/cart-page.png)

![Checkout page](docs/screenshots/03-customer-cart-checkout/checkout-page.png)

### Customer Orders

![My Orders](docs/screenshots/04-customer-order/my-orders.png)

![My Orders status updated](docs/screenshots/08-responsive/my-orders-status-updated.png)

### Admin Authentication

![Admin login](docs/screenshots/05-admin-auth/admin-login.png)

### Admin Product Management

![Admin add product](docs/screenshots/06-admin-products/admin-add-product.png)

![Admin product list](docs/screenshots/06-admin-products/admin-product-list.png)

### Admin Orders

![Admin orders](docs/screenshots/07-admin-orders/admin-orders.png)

![Admin order status updated](docs/screenshots/07-admin-orders/admin-order-status-updated.png)

## Persiapan Environment

Pastikan perangkat pengembangan telah memiliki:

- Node.js
- npm
- Akun MongoDB Atlas atau MongoDB connection string
- Git

Clone repository sebelum menyiapkan setiap aplikasi:

```bash
git clone https://github.com/raihanachmadsuhadadev/grocery-delivery-apps.git
cd grocery-delivery-apps
```

## Setup Backend

```bash
cd backend
npm install
```

## Setup Customer Frontend

```bash
cd frontend
npm install
```

## Setup Admin Panel

```bash
cd admin
npm install
```

## Environment Example

Buat file `.env` pada setiap folder aplikasi yang membutuhkannya.

### Backend `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_local_jwt_secret

ADMIN_EMAIL=admin@deliveryapps.local
ADMIN_PASSWORD=admin123

PAYMENT_MODE=demo
STRIPE_SECRET_KEY=
FRONTEND_URL=http://localhost:5173
```

### Customer Frontend `.env`

```env
VITE_API_URL=http://localhost:4000
```

### Admin Panel `.env`

```env
VITE_API_URL=http://localhost:4000
```

Jangan commit secret asli atau credential production.

### Menjalankan Aplikasi

Jalankan setiap aplikasi pada terminal terpisah.

Backend API:

```bash
cd backend
npm run server
```

Backend berjalan di `http://localhost:4000`.

Customer frontend:

```bash
cd frontend
npm run dev
```

Customer frontend berjalan di `http://localhost:5173`.

Admin panel:

```bash
cd admin
npm run dev -- --port 5174
```

Admin panel berjalan di `http://localhost:5174`.

## Akun Admin

Gunakan credential berikut untuk pengembangan lokal:

```text
Email: admin@deliveryapps.local
Password: admin123
```

Credential ini hanya untuk pengembangan lokal dan harus diganti sebelum deployment nyata.

## Alur Penggunaan Sistem

1. Customer membuka halaman customer app.
2. Customer melihat daftar produk.
3. Customer menambahkan produk ke cart.
4. Customer membuka cart dan melanjutkan checkout.
5. Sistem membuat order melalui backend API.
6. Pada `PAYMENT_MODE=demo`, sistem mensimulasikan pembayaran berhasil.
7. Customer melihat order pada halaman My Orders.
8. Admin login ke admin panel.
9. Admin melihat daftar order masuk.
10. Admin memperbarui status order.
11. Customer dapat melihat perubahan status order di My Orders.

## Mode Checkout Lokal

`PAYMENT_MODE=demo` menyediakan alur checkout lokal untuk menguji pemesanan tanpa memproses pembayaran sungguhan. Dalam mode ini:

- Sistem membuat order.
- User diarahkan melalui alur verifikasi lokal.
- Order tampil pada Admin Orders.
- Admin dapat memperbarui status order.
- Customer dapat melihat status terbaru pada My Orders.

Package Stripe tersedia sebagai struktur payment flow, tetapi verifikasi Stripe webhook untuk production belum diimplementasikan. Konfigurasi ini ditujukan untuk pengembangan dan pengujian lokal, bukan sebagai klaim kesiapan production.

## Ringkasan API

Base URL: `http://localhost:4000`

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| `GET` | `/` | Health check API |
| `POST` | `/api/user/register` | Registrasi akun customer |
| `POST` | `/api/user/login` | Login akun customer |
| `GET` | `/api/food/list` | Mengambil daftar produk |
| `POST` | `/api/food/add` | Menambahkan produk, protected admin endpoint |
| `POST` | `/api/food/remove` | Menghapus produk, protected admin endpoint |
| `POST` | `/api/cart/add` | Menambahkan item ke cart customer |
| `POST` | `/api/cart/remove` | Menghapus item dari cart customer |
| `POST` | `/api/cart/get` | Mengambil data cart customer |
| `POST` | `/api/order/place` | Membuat order customer |
| `POST` | `/api/order/verify` | Verifikasi order/payment flow |
| `POST` | `/api/order/userorders` | Mengambil daftar order customer |
| `GET` | `/api/order/list` | Mengambil semua order, protected admin endpoint |
| `POST` | `/api/order/status` | Mengubah status order, protected admin endpoint |
| `POST` | `/api/admin/login` | Login akun admin |
| `GET` | `/images/:filename` | Menyajikan gambar produk yang di-upload |

Endpoint customer yang terproteksi menggunakan customer JWT authentication. Endpoint admin yang terproteksi menggunakan admin token authentication.

## Validasi Build

Customer frontend dan admin panel menyediakan script build dan lint berikut:

```bash
cd frontend
npm run build
npm run lint
```

```bash
cd admin
npm run build
npm run lint
```

Backend tidak memiliki script build atau test terpisah. Validasi runtime dilakukan setelah environment dikonfigurasi dengan menjalankan:

```bash
cd backend
npm run server
```

## Project Status

Fitur utama customer, admin, dan backend API tersedia untuk pengembangan serta pengujian lokal. Project belum production-hardened dan masih memerlukan konfigurasi keamanan, pembayaran, dan deployment tambahan sebelum digunakan pada environment production.

## Keterbatasan Teknis

- Verifikasi pembayaran Stripe berbasis webhook belum diimplementasikan.
- Credential admin dikonfigurasi melalui environment variable.
- Token disimpan di `localStorage` untuk kebutuhan pengembangan lokal.
- Konfigurasi CORS masih menggunakan mode development.
- Gambar produk masih disimpan pada local storage server.
- Konfigurasi production deployment belum tersedia.


