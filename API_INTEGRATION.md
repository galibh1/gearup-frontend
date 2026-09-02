# GearUp Frontend API Integration

## Overview

This document maps the GearUp frontend components with backend API endpoints.

The frontend integrates APIs for authentication, gear management, rentals, payments, reviews, provider operations, and admin management.


---

# API Endpoint Mapping

| Feature | Method | Endpoint | Frontend Usage |
|---|---|---|---|
| Register User | POST | `/api/auth/register` | RegisterForm.tsx, auth.service.ts |
| Login User | POST | `/api/auth/login` | LoginForm.tsx, auth.service.ts |
| Get All Gear | GET | `/api/gear` | Gear page, GearBrowser.tsx |
| Get Gear Details | GET | `/api/gear/:id` | Gear Details Page |
| Get Categories | GET | `/api/categories` | Gear Filter, Provider Forms |
| Create Rental | POST | `/api/rentals` | RentalForm.tsx |
| Get Customer Rentals | GET | `/api/rentals` | Customer Dashboard |
| Get Rental Details | GET | `/api/rentals/:id` | Rental Details Page |
| Get Provider Gear | GET | `/api/provider/gear` | Provider Dashboard |
| Create Gear | POST | `/api/provider/gear` | Provider Gear Form |
| Update Gear | PUT | `/api/provider/gear/:id` | Provider Dashboard |
| Delete Gear | DELETE | `/api/provider/gear/:id` | Provider Dashboard |
| Get Provider Orders | GET | `/api/provider/orders` | Provider Dashboard |
| Update Order Status | PATCH | `/api/provider/orders/:id` | Provider Orders |
| Create Stripe Checkout | POST | `/api/payments/create` | PayButton.tsx |
| Confirm Payment | POST | `/api/payments/confirm` | Payment Success Page |
| Get Reviews | GET | `/api/reviews/gear/:id` | ReviewSection.tsx |
| Submit Review | POST | `/api/reviews` | ReviewSection.tsx |
| Get Users | GET | `/api/admin/users` | Admin UserTable.tsx |
| Update User Status | PATCH | `/api/admin/users/:id` | Admin User Management |
| Get Admin Gear | GET | `/api/admin/gear` | Admin GearTable.tsx |
| Get Admin Rentals | GET | `/api/admin/rentals` | Admin RentalTable.tsx |

---

# Payment Flow



Customer clicks Pay
↓
POST /api/payments/create
↓
Stripe Checkout
↓
/payment/success
↓
POST /api/payments/confirm
↓
Payment Completed


Payment pages:


/payment/success
/payment/cancel


---

# Authentication Flow


Login/Register
↓
JWT Token
↓
accessToken Cookie
↓
proxy.ts Route Protection
↓
Role Based Dashboard Access


Roles:

- CUSTOMER
- PROVIDER
- ADMIN

---

# Error Handling

Frontend handles API errors using:

- Toast notifications
- Form validation messages
- Server Action responses
- Loading states
- Error boundaries

---

# Frontend Architecture


                User Interface
                     |
                     ↓
              React Components
                     |
                     ↓
      Server Actions / Custom Hooks
                     |
                     ↓
              Service Layer
                     |
                     ↓
              Backend REST API


Services:


services/
├── auth.service.ts
├── gear.service.ts
├── category.service.ts
├── payment.service.ts
├── provider.service.ts
└── admin.service.ts


---

# Role Features

## Customer

- Browse gear
- Create rentals
- Make Stripe payments
- View rental history
- Submit reviews


## Provider

- Manage gear
- Handle rental requests
- Update rental status


## Admin

- Manage users
- View gear
- Monitor rentals



---

# Summary


GearUp frontend consumes backend REST APIs to provide a complete equipment rental platform with authentication, role-based dashboards, CRUD operations, Stripe payment integration, reviews, and admin management.
