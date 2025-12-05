📦 Inventory Management System (Bun + React + Tailwind)

A fast, modern Inventory Management System built using Bun, React, Tailwind CSS, and Prisma.
This project includes full CRUD for products and stock movement (add stock, remove stock), with a clean UI and local API routes powered by Bun.

🚀 Tech Stack

Bun v1.3+ – Runtime, package manager, bundler

React + Vite (via Bun) – Frontend UI

Tailwind CSS – UI styling

Prisma ORM – Database management

SQLite / PostgreSQL – Database

Axios – API calls

Lucide Icons – Icons

TypeScript – Type safety across project

📂 Project Features
✔ Product Management

Add new product

Edit product details

Delete products

Search products

Product listing table UI

✔ Stock Movement

Add stock (IN)

Remove stock (OUT)

Update product quantity automatically

Reason, notes, date, movement type

Stock history table

✔ UI Features

Responsive sidebar layout

Modal-based forms

Clean table design

Search + Filters (if added)

🛠 Installation & Setup
1️⃣ Install dependencies
bun install

2️⃣ Start development server
bun dev

3️⃣ Build & run production
bun start

🗄 Database Setup (Prisma)
Initialize Prisma
bunx prisma init

Generate Prisma Client
bunx prisma generate

Run migrations
bunx prisma migrate dev

📁 Important Folders
/src
  /components
  /product
  /stock
  /layout
  /api (Bun server routes)
  /styles (Tailwind)
prisma/schema.prisma

⚙ API Routes Example (Bun)
Products
Method	Route	Description
GET	/api/Products	Get all products
POST	/api/Products	Create product
POST	/api/Products/:id	Update product
DELETE	/api/Products/:id	Remove product
Stock
Method	Route	Description
GET	/api/Stock	Get stock history
POST	/api/Stock	Add stock movement
DELETE	/api/Stock/:id	Delete a movement
🖼 Screenshots (Optional)

You can add:

Dashboard UI

Product Table

Add/Edit Modals

Stock Movement Table

📜 License

This project is open-source. You may use or modify it freely.