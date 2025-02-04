# CRM System Requirements Document

## Project Overview
The CRM system is designed to store and manage all customer-related data for UZIO. The system will consist of multiple UI portals to handle various aspects of customer and product management. 

## Functional Requirements

### 1. Product Portal
**Purpose**: To maintain a master list of products offered by UZIO.

**Features**:
- Add new products with details such as:
  - Product Name
  - Product Description
  - Pricing Details
  - Product Category
  - Status (Active/Inactive)
- Edit and update product details.
- View a list of all products with filtering and sorting capabilities.


### 2. Customer Portal
**Purpose**: To capture and manage customer details.

**Features**:
- Add new customer profiles with details such as:
  - Customer ID (auto-generated)  
  - Company Name
  - Contact Person Name
  - Contact Email
  - Phone Number
  - Address
  - Industry Type
- Edit and update customer details.
- View a list of all customers with filtering and sorting options.
- Search functionality for customer profiles.

### 3. Order Portal
**Purpose**: To capture and manage order details for each customer.

**Features**:
- Add a new order for a customer with fields such as:
  - Order ID (auto-generated)
  - Customer Name (linked to Customer Portal)
  - Name of Billing contact person
  - Email of Billing contact person
  - Address of Billing contact person
  - Order term (monthly, 1 year,  2 year)
  - Order term start date
  - Order term end date
  - Product(s) Ordered (linked to Product Portal)
  - # of units of the product Ordered
  - Price per unit
  - One time fee
  - Name of the Account Executive (AE)
  - Special Notes
  - Order Date
  - Order Status (Pending, Kick-off, Implementation, live, on-hold, Canceled)
  - Total Order Value
- Edit and update order details.
- View a list of orders with filtering and sorting options.
- Search functionality for orders.







##Technology Stack
Frontend (UI)
Framework: Next.js (React-based for SEO benefits and fast UI)
UI Components: ShadCN/UI or Material UI (MUI)
State Management: React Query (for fetching and caching data)
Form Handling: React Hook Form (lightweight and optimized)
Styling: Tailwind CSS (for quick and scalable styling)

Backend (API & Business Logic)
Framework: FastAPI (lightweight, async, and modern for RESTful APIs)
Authentication: Clerk (for authentication & user management)
ORM & Database Interaction: Prisma (for working with databases seamlessly in TypeScript)
Background Processing: Celery (for async tasks like order notifications, email alerts)

Database
Primary DB: Supabase (PostgreSQL) (for storing structured customer, product, and order data)
Search Indexing: PostgreSQL Full-Text Search (or optional Meilisearch for advanced fuzzy search)





## Database Schema (High-Level)

### Tables
1. **Products**:
   - ProductID (Primary Key)
   - Name
   - Description
   - Category
   - Price
   - Status

2. **Customers**:
   - CustomerID (Primary Key)
   - CompanyName
   - ContactName
   - ContactEmail
   - PhoneNumber
   - Address
   - IndustryType

3. **Orders**:
   - OrderID (Primary Key)
   - CustomerID (Foreign Key)
 - Name of Billing contact person
  - Email of Billing contact person
- Order term (monthly, 1 year,  2 year)
  - Order term start date
  - Order term end date   
- ProductID (Foreign Key)
   - Price of Product per unit
   - # of units ordered of each product
   - One time fee
   - Name of the AE
   - Special comments
   - OrderDate
   - Status
   - TotalValue

4. **ProductStatus**:
   - StatusID (Primary Key)
   - CustomerID (Foreign Key)
   - ProductID (Foreign Key)
   - Status
   - StartDate
   - EndDate



# Current File Structure.  This is the file structure of the project.  you HAVE to follow this structure. . 

CRM-MAKER2
├── .next
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/ui
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── checkbox.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── radio-group.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── table.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
├── hooks
├── lib
├── node_modules
├── public
├── requirements
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

---

Please use this document as the blueprint for developing the CRM system.
