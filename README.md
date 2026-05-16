# 🛍️ Shopping Cart — React Frontend

A modern e-commerce frontend built with **React 18 + Vite**, consuming a **Spring Boot** REST API backend. Originally upgraded from a Java JSP/Servlet (PRJ301) project.

---

## 🚀 Tech Stack

| Category      | Technology                                                                      |
| ------------- | ------------------------------------------------------------------------------- |
| Framework     | React 18, React Router DOM v6                                                   |
| Build Tool    | Vite 5                                                                          |
| Styling       | Tailwind CSS v3, DaisyUI, tailwindcss-animate                                   |
| UI Components | Radix UI (Accordion, Dialog, Dropdown, Select, Tabs, …), shadcn/ui, Headless UI |
| Icons         | Lucide React, React Icons, Heroicons                                            |
| HTTP Client   | Axios (custom instance, `baseURL: http://localhost:8080`)                       |
| Forms         | React Hook Form + Yup / @hookform/resolvers                                     |
| Animation     | Motion (Framer Motion v12), AOS, react-type-animation                           |
| Charts        | Recharts                                                                        |
| Real-time     | STOMP.js + SockJS                                                               |
| Auth          | JWT (`jwt-decode`), localStorage-based token storage                            |
| Payments      | VNPay, PayOS                                                                    |
| Notifications | react-hot-toast, Sonner                                                         |
| Date Utility  | date-fns                                                                        |
| Carousel      | Embla Carousel                                                                  |

---

## ✨ Features

### 👤 Customer

- **Authentication** — Register, Login, Logout
- **Email verification** — Token-based email confirm flow (`/verify`, `/email/verify/success`, `/email/verify/failed`)
- **Password management** — Forgot password & reset via email link
- **Product browsing** — Browse all products with pagination, filter by category/brand, search by name
- **New Arrivals** — Dedicated section on the homepage
- **Product detail** — Sizes, inventory, images, description
- **Shopping Cart** — Add, update quantity, remove items (authenticated)
- **Checkout & Payment** — Place order with:
  - Cash on delivery
  - **VNPay** online payment (with callback handling)
  - **PayOS** online payment (create link & execute callback)
- **My Orders** — View order history filtered by status; cancel pending orders; confirm delivery
- **Profile** — View and update personal information (name, phone, address via province/district/ward API)
- **Change Password** — Update account password

### 🛡️ Admin

- **Dashboard** — Key metrics: total revenue, total orders, total customers, product inventory stats (via Recharts)
- **Product Management** — List all products, add new product (with images), add more sizes/inventory to existing products
- **Category Management** — View, add, and delete categories
- **Order Management** — View all orders by status, update order status progression, confirm delivery
- **User Management** — View registered customers

---

## 🗺️ Route Map

### Public routes

| Path                    | Component            | Description                    |
| ----------------------- | -------------------- | ------------------------------ |
| `/`                     | `HomePage`           | Landing / hero page            |
| `/about`                | `AboutUs`            | About page                     |
| `/login`                | `Login`              | User login                     |
| `/register`             | `Register`           | New account registration       |
| `/forgot/password`      | `ForgotPassword`     | Request password reset email   |
| `/reset/password`       | `ResetPassword`      | Reset password with token      |
| `/verify`               | `VerifyEmail`        | Email verification trigger     |
| `/email/verify/success` | `VerifyEmailSuccess` | Email verified success         |
| `/email/verify/failed`  | `VerifyEmailFailed`  | Email verification failed      |
| `/shop`                 | `AllProducts`        | Full product listing & filters |
| `/product/:id`          | `ProductDetail`      | Single product detail          |
| `/auth`                 | `Auth`               | OAuth2 callback handler        |
| `*`                     | `NotFound`           | 404 page                       |

### Protected routes (requires login)

| Path                | Component       | Description               |
| ------------------- | --------------- | ------------------------- |
| `/user/profile`     | `Profile`       | User profile & edit       |
| `/user/cart`        | `CartPage`      | Shopping cart             |
| `/user/my-orders`   | `MyOrder`       | Order history             |
| `/order/success`    | `OrderSuccess`  | Post-payment success page |
| `/order/fail`       | `OrderFailed`   | Post-payment failure page |
| `/payment-callback` | `VnPayCallback` | VNPay redirect handler    |
| `/payos/callback`   | `PayOSCallback` | PayOS redirect handler    |

### Admin routes (requires ADMIN role)

| Path                     | Component        | Description                 |
| ------------------------ | ---------------- | --------------------------- |
| `/admin`                 | `AdminPage`      | Admin home / sidebar layout |
| `/admin/dashboard`       | `DashBoard`      | Analytics & charts          |
| `/admin/product/add`     | `AddProduct`     | Add new product             |
| `/admin/product/list`    | `ProductList`    | All products table          |
| `/admin/manage/user`     | `ManageUser`     | Customer list               |
| `/admin/manage/category` | `ManageCategory` | Category CRUD               |
| `/admin/manage/orders`   | `ManageOrder`    | Orders management           |

---

## 📁 Project Structure

```
shopping-cart-fe/
├── assets/                  # README screenshot assets
├── public/
├── src/
│   ├── App.jsx              # Root router configuration
│   ├── main.jsx             # React DOM entry point
│   ├── index.css            # Global styles
│   ├── assets/              # Static assets (images, fonts)
│   ├── components/
│   │   ├── admin/
│   │   │   ├── layout/      # Admin sidebar/layout
│   │   │   └── pages/       # Dashboard, ProductList, ManageOrder, …
│   │   ├── auth/            # OAuth2 / auth helpers
│   │   ├── cart/            # CartPage
│   │   ├── common/          # Shared components (AppLoading, Auth)
│   │   ├── context/         # React context providers
│   │   ├── error/           # NotFound
│   │   ├── forgot-password/ # ForgotPassword, ResetPassword
│   │   ├── home/            # HomePage
│   │   ├── hooks/           # Custom hooks
│   │   ├── login/           # Login form
│   │   ├── logout/          # Logout handler
│   │   ├── orders/          # OrderSuccess, OrderFailed, VNPay/PayOS callbacks
│   │   ├── private-routes/  # PrivateRoute guard
│   │   ├── products/        # AllProducts, ProductDetail
│   │   ├── register/        # Register form
│   │   ├── service/         # API layer (Axios config + ApiFunctions)
│   │   ├── shop/            # AboutUs
│   │   ├── ui/              # Reusable UI primitives (shadcn)
│   │   ├── user/            # Profile, MyOrder
│   │   └── verify/          # Email verification pages
│   ├── config/
│   │   └── authConfig.js    # Auth-related config
│   ├── data/                # Static/mock data
│   ├── lib/                 # Utility helpers
│   ├── routes/
│   │   ├── AdminRoute.jsx   # Admin role guard
│   │   └── UserRoute.jsx    # Authenticated user layout
│   └── schemas/             # Yup validation schemas
├── .env                     # Environment variables (see below)
├── components.json          # shadcn/ui component config
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Spring Boot** backend running on `http://localhost:8080`

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd shopping-cart-fe

# 2. Install dependencies
npm install

# 3. Configure environment variables
#    Create a .env file in the root (see below)

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

### Environment Variables (`.env`)

```env
# Backend API base URL (already hardcoded in axiosConfig.js, override if needed)
VITE_API_BASE_URL=http://localhost:8080
```

### Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start local dev server with HMR  |
| `npm run build`   | Build production bundle          |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |

---

## 🔐 Authentication

- JWT tokens are stored in **`localStorage`** under the key `accessToken`.
- The Axios instance auto-attaches `Authorization: Bearer <token>` on every protected request.
- A `401` response automatically redirects the user to the homepage.
- Route guards:
  - `PrivateRoute` — requires any authenticated user.
  - `AdminRoute` — requires the `ADMIN` role (decoded from the JWT payload).

---

## 💳 Payment Integrations

| Gateway   | Flow                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------- |
| **VNPay** | `POST /api/order/vnpay` → redirect to VNPay → return to `/payment-callback` → `POST /api/order/vnpay-callback`          |
| **PayOS** | `POST /api/order/payos/create-link` → redirect to PayOS → return to `/payos/callback` → `POST /api/order/payos/execute` |

## 📦 Deployment

The project includes a `vercel.json` for zero-config deployment on **Vercel**. All routes are rewritten to `index.html` to support client-side routing.

```bash
# Build and deploy
npm run build
# Then push to your Vercel-connected repository
```
