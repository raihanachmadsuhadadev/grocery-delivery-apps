# Grocery Delivery Apps

Aplikasi grocery dan food delivery sederhana yang dibuat sebagai demo portfolio lokal. Project ini terdiri dari customer app, admin panel, dan REST API Express.js yang terhubung ke MongoDB.

Repository ini ditujukan untuk menampilkan alur umum aplikasi delivery, seperti melihat produk, mengelola cart, simulasi checkout, riwayat order, manajemen produk oleh admin, dan update status order.

## Gambaran Umum Project

Grocery Delivery Apps dibagi menjadi tiga aplikasi utama:

- `backend` - Express.js API dengan MongoDB/Mongoose
- `frontend` - React + Vite untuk customer app
- `admin` - React + Vite untuk admin panel

Aplikasi ini dirancang untuk local development dan kebutuhan presentasi portfolio. Project menggunakan demo checkout mode melalui `PAYMENT_MODE=demo`, sehingga order dapat dibuat tanpa memproses pembayaran sungguhan.

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JSON Web Token authentication
- Multer untuk upload gambar
- Struktur package Stripe untuk payment flow

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

## Fitur Utama

### Customer App

- Product listing
- Add to cart
- Cart page
- Checkout page
- Demo checkout mode
- My Orders page
- Tracking/update status order setelah admin mengubah status order

### Admin Panel

- Admin login
- Admin token authentication
- Add product
- Product list
- Remove product
- Orders list
- Update order status

### Backend

- REST API
- Koneksi MongoDB Atlas
- Customer authentication
- Cart API
- Food/product API
- Order API
- Admin authentication
- Protected admin endpoints
- Demo checkout mode dengan `PAYMENT_MODE=demo`

## Struktur Project

```text
grocery-delivery-apps/
+-- admin/       # React + Vite admin panel
+-- backend/     # Express.js + MongoDB API
+-- docs/        # Portfolio screenshots
+-- frontend/    # React + Vite customer app
+-- README.md
```

## Screenshot

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

## Environment Variables

Buat file `.env` di dalam folder aplikasi yang membutuhkan konfigurasi. Jangan commit secret asli atau credential production.

### Contoh Backend `.env`

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

### Frontend `.env`

```env
VITE_API_URL=http://localhost:4000
```

### Admin `.env`

```env
VITE_API_URL=http://localhost:4000
```

## Setup Lokal

Clone repository dan install dependency untuk setiap aplikasi.

```bash
git clone <repository-url>
cd grocery-delivery-apps
```

Install dependency backend:

```bash
cd backend
npm install
```

Install dependency customer frontend:

```bash
cd ../frontend
npm install
```

Install dependency admin panel:

```bash
cd ../admin
npm install
```

## Menjalankan Project

Jalankan backend API:

```bash
cd backend
npm run server
```

Runtime backend:

```text
http://localhost:4000
```

Jalankan customer frontend:

```bash
cd frontend
npm run dev
```

Runtime customer frontend:

```text
http://localhost:5173
```

Jalankan admin panel di port `5174`:

```bash
cd admin
npm run dev -- --port 5174
```

Runtime admin panel:

```text
http://localhost:5174
```

## Akun Demo Admin

Untuk demo lokal:

```text
Email: admin@deliveryapps.local
Password: admin123
```

Credential ini hanya contoh untuk demo portfolio lokal. Ini bukan credential production dan harus diganti jika project digunakan untuk deployment nyata.

## Demo Checkout Mode

Project ini menggunakan `PAYMENT_MODE=demo` untuk kebutuhan pengujian lokal dan portfolio.

Saat demo mode aktif:

- Checkout mensimulasikan pembayaran berhasil.
- User diarahkan ke halaman My Orders setelah checkout.
- Order tetap masuk ke Admin Orders.
- Admin dapat mengubah status order.
- Customer dapat melihat status order yang sudah diperbarui di My Orders.

Struktur package Stripe dan payment flow sudah tersedia, tetapi Stripe webhook verification dan payment verification yang production-ready belum diimplementasikan.

Project ini belum production-hardened dan masih ditujukan untuk demo lokal.

## Ringkasan API

Base URL:

```text
http://localhost:4000
```

Endpoint utama:

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
| `GET` | `/images/:filename` | Menyajikan file gambar produk yang di-upload |

Endpoint customer menggunakan customer JWT authentication pada route yang membutuhkan proteksi. Endpoint admin menggunakan admin token authentication pada route yang membutuhkan proteksi.

## Keterbatasan / Known Limitations

- Demo checkout digunakan untuk pengujian lokal dan portfolio.
- Stripe webhook verification belum diimplementasikan.
- Credential admin menggunakan environment variable.
- Token disimpan di `localStorage` untuk kesederhanaan demo lokal.
- CORS masih terbuka untuk kebutuhan local development.
- Project belum disiapkan untuk production deployment.

## Pengembangan Selanjutnya / Future Improvements

- Stripe webhook integration
- Role-based admin management
- Konfigurasi CORS yang lebih ketat
- UI order tracking yang lebih baik
- Penyimpanan gambar menggunakan cloud storage
- Deployment configuration
- Validasi dan error handling yang lebih baik

## Author

Raihan Achmad Suhada
