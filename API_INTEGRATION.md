# GearUp Frontend API Integration

This document describes how the GearUp frontend integrates with the GearUp backend API. It maps all backend endpoints to their corresponding frontend components and services.

## Base API Configuration

**Base URL:** `http://localhost:8000` (local) or configured via `NEXT_PUBLIC_API_URL`  
**API Prefix:** `/api`  
**Authentication:** Bearer token via `Authorization` header (stored in `accessToken` cookie)  
**Credentials:** Requests include `withCredentials: true` for cookie handling

---

## 1. Authentication

### User Registration

- **Endpoint:** `POST /api/auth/register`
- **Service:** [services/auth.service.ts](services/auth.service.ts)
- **Components:** [LoginForm.tsx](<app/(authGroup)/_components/LoginForm.tsx>), [RegisterForm.tsx](<app/(authGroup)/_components/RegisterForm.tsx>)
- **Actions:** [authActions.ts](<app/(authGroup)/_actions/authActions.ts>)
- **Purpose:** Creates a new user account
- **Auth Required:** No

### User Login

- **Endpoint:** `POST /api/auth/login`
- **Service:** [services/auth.service.ts](services/auth.service.ts)
- **Components:** [LoginForm.tsx](<app/(authGroup)/_components/LoginForm.tsx>)
- **Actions:** [authActions.ts](<app/(authGroup)/_actions/authActions.ts>)
- **Purpose:** Authenticates user and establishes session via cookies
- **Auth Required:** No

### Authentication & Role Management

- **Protection Layer:** [lib/auth.ts](lib/auth.ts), [proxy.ts](proxy.ts)
- **Supported Roles:** `CUSTOMER`, `PROVIDER`, `ADMIN`
- **Protected Routes:** `/dashboard`, `/provider-dashboard`, `/admin-dashboard`
- **Fallback:** Unauthorized users redirected to `/unauthorized`

---

## 2. Public Gear Browsing

### Get All Gear

- **Endpoint:** `GET /api/gear`
- **Service:** [services/gear.service.ts](services/gear.service.ts)
- **Components:** [GearBrowser.tsx](<app/(publicGroup)/_components/GearBrowser.tsx>), [GearCard.tsx](<app/(publicGroup)/_components/GearCard.tsx>)
- **Pages:** [app/(publicGroup)/gear/page.tsx](<app/(publicGroup)/gear/page.tsx>)
- **Purpose:** Retrieves all publicly available rental gear with filters
- **Auth Required:** No
- **Cache:** `no-store` (fresh data on each request)

### Get Gear Details

- **Endpoint:** `GET /api/gear/:id`
- **Service:** [services/gear.service.ts](services/gear.service.ts)
- **Pages:** [app/(publicGroup)/gear/[id]/page.tsx](<app/(publicGroup)/gear/[id]/page.tsx>)
- **Components:** [GearImageGallery.tsx](<app/(publicGroup)/_components/GearImageGallery.tsx>)
- **Purpose:** Retrieves detailed information for a specific gear item
- **Auth Required:** No
- **Cache:** `no-store`

### Get All Categories

- **Endpoint:** `GET /api/categories`
- **Service:** [services/category.service.ts](services/category.service.ts)
- **Components:** [GearBrowser.tsx](<app/(publicGroup)/_components/GearBrowser.tsx>)
- **Purpose:** Retrieves all gear categories for filtering and navigation
- **Auth Required:** No

---

## 3. Rentals

### Create Rental Order

- **Endpoint:** `POST /api/rentals`
- **Service:** Server action [rental.actions.ts](<app/(publicGroup)/_actions/rental.actions.ts>)
- **Components:** [RentalForm.tsx](<app/(publicGroup)/_components/RentalForm.tsx>)
- **Purpose:** Creates a new rental order with start/end dates and gear items
- **Auth Required:** Yes
- **Payload:**
  ```json
  {
    "startDate": "2024-01-15",
    "endDate": "2024-01-20",
    "items": [
      { "gearItemId": "string", "quantity": number }
    ]
  }
  ```

### Get Provider Orders

- **Endpoint:** `GET /api/provider/orders`
- **Service:** [services/provider.service.ts](services/provider.service.ts)
- **Actions:** [provider.actions.ts](<app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts>)
- **Components:** [ProviderRentalCard.tsx](<app/(dashboardGroup)/provider-dashboard/_components/ProviderRentalCard.tsx>)
- **Pages:** [provider-dashboard/page.tsx](<app/(dashboardGroup)/provider-dashboard/page.tsx>)
- **Purpose:** Retrieves rental orders for gear listed by the provider
- **Auth Required:** Yes (Provider only)

### Update Rental Status

- **Endpoint:** `PATCH /api/provider/orders/:id`
- **Service:** [services/provider.service.ts](services/provider.service.ts)
- **Actions:** [provider.actions.ts](<app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts>)
- **Purpose:** Updates rental status (CONFIRMED, PICKED_UP, RETURNED)
- **Auth Required:** Yes (Provider only)
- **Payload:**
  ```json
  { "status": "CONFIRMED|PICKED_UP|RETURNED" }
  ```

---

## 4. Payments (Stripe Integration)

### Create Payment Session

- **Endpoint:** `POST /api/payments/create`
- **Service:** [services/payment.service.ts](services/payment.service.ts)
- **Pages:** [payment/success/page.tsx](app/payment/success/page.tsx)
- **Purpose:** Initiates Stripe checkout session for rental order
- **Auth Required:** Yes
- **Payload:**
  ```json
  { "rentalOrderId": "string" }
  ```

### Confirm Payment

- **Endpoint:** `POST /api/payments/confirm`
- **Service:** [services/payment.service.ts](services/payment.service.ts)
- **Pages:** [payment-success/page.tsx](<app/(publicGroup)/payment-success/page.tsx>)
- **Purpose:** Confirms payment after Stripe checkout completion
- **Auth Required:** Yes
- **Payload:**
  ```json
  { "stripeSessionId": "string" }
  ```

---

## 5. Reviews

### Get Gear Reviews

- **Endpoint:** `GET /api/reviews/gear/:id`
- **Service:** [services/review.service.ts](services/review.service.ts)
- **Purpose:** Retrieves all reviews for a specific gear item
- **Auth Required:** No

### Create Review

- **Endpoint:** `POST /api/reviews`
- **Service:** [services/review.service.ts](services/review.service.ts)
- **Purpose:** Submits a new review for completed rental
- **Auth Required:** Yes
- **Payload:**
  ```json
  {
    "rentalOrderId": "string",
    "gearItemId": "string",
    "rating": 1-5,
    "comment": "string"
  }
  ```

---

## 6. Admin Dashboard

### Get All Users

- **Endpoint:** `GET /api/admin/users`
- **Service:** [services/admin.service.ts](services/admin.service.ts)
- **Actions:** [admin.actions.ts](<app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts>)
- **Components:** [UserTable.tsx](<app/(dashboardGroup)/admin-dashboard/_components/UserTable.tsx>)
- **Pages:** [admin-dashboard/page.tsx](<app/(dashboardGroup)/admin-dashboard/page.tsx>)
- **Purpose:** Retrieves all users for admin management
- **Auth Required:** Yes (Admin only)

### Update User Status

- **Endpoint:** `PATCH /api/admin/users/:id`
- **Service:** [services/admin.service.ts](services/admin.service.ts)
- **Components:** [UserTable.tsx](<app/(dashboardGroup)/admin-dashboard/_components/UserTable.tsx>)
- **Purpose:** Updates user active/inactive status
- **Auth Required:** Yes (Admin only)
- **Payload:**
  ```json
  { "activeStatus": "string" }
  ```

### Get All Gear (Admin View)

- **Endpoint:** `GET /api/admin/gear`
- **Service:** [services/admin.service.ts](services/admin.service.ts)
- **Actions:** [admin.actions.ts](<app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts>)
- **Components:** [GearTable.tsx](<app/(dashboardGroup)/admin-dashboard/_components/GearTable.tsx>)
- **Purpose:** Retrieves all gear items in the system for admin oversight
- **Auth Required:** Yes (Admin only)

### Get All Rentals (Admin View)

- **Endpoint:** `GET /api/admin/rentals`
- **Service:** [services/admin.service.ts](services/admin.service.ts)
- **Actions:** [admin.actions.ts](<app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts>)
- **Components:** [RentalTable.tsx](<app/(dashboardGroup)/admin-dashboard/_components/RentalTable.tsx>)
- **Purpose:** Retrieves all rental orders in the system for admin monitoring
- **Auth Required:** Yes (Admin only)

---

## 7. Provider Gear Management

### Get Provider's Gear

- **Endpoint:** `GET /api/provider/gear`
- **Service:** [services/provider.service.ts](services/provider.service.ts)
- **Actions:** [provider.actions.ts](<app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts>)
- **Components:** [ProviderGearSection.tsx](<app/(dashboardGroup)/provider-dashboard/_components/ProviderGearSection.tsx>)
- **Purpose:** Retrieves all gear items listed by the authenticated provider
- **Auth Required:** Yes (Provider only)

### Create Gear Listing

- **Endpoint:** `POST /api/provider/gear`
- **Service:** [services/provider.service.ts](services/provider.service.ts)
- **Actions:** [provider.actions.ts](<app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts>)
- **Purpose:** Creates a new gear listing for the provider
- **Auth Required:** Yes (Provider only)
- **Payload:**
  ```json
  {
    "name": "string",
    "slug": "string",
    "description": "string",
    "brand": "string",
    "pricePerDay": number,
    "depositAmount": number,
    "stock": number,
    "availableStock": number,
    "condition": "string",
    "status": "string",
    "imageUrls": ["string"],
    "specifications": {},
    "location": "string",
    "isFeatured": boolean,
    "categoryId": "string"
  }
  ```

### Update Gear Listing

- **Endpoint:** `PUT /api/provider/gear/:id`
- **Service:** [services/provider.service.ts](services/provider.service.ts)
- **Actions:** [provider.actions.ts](<app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts>)
- **Purpose:** Updates an existing gear listing
- **Auth Required:** Yes (Provider only)
- **Payload:** All fields from Create are optional

### Delete Gear Listing

- **Endpoint:** `DELETE /api/provider/gear/:id`
- **Service:** [services/provider.service.ts](services/provider.service.ts)
- **Purpose:** Removes a gear listing
- **Auth Required:** Yes (Provider only)

---

## API Client Configuration

**Axios Instance:** [lib/api.ts](lib/api.ts)

- Automatic error handling and response transformation
- Credentials included by default
- Consistent error format with message, status, and data fields

**Server-Side Actions:**

- Use `fetch()` API directly for server-side operations
- Extract auth token from cookies via `next/headers`
- Include Bearer token in Authorization header

---

## Error Handling

All endpoints return standardized error responses:

```json
{
  "message": "Error description",
  "status": 400,
  "data": null
}
```

Common Status Codes:

- **200/201:** Success
- **400:** Bad request (validation error)
- **401:** Unauthorized (missing/invalid auth)
- **403:** Forbidden (insufficient permissions)
- **404:** Not found
- **500:** Server error

Frontend

services/gear.service.ts
hooks/useGear.ts
app/(publicGroup)/gear/[id]/

Purpose

Displays detailed information about an individual gear item.

3. Categories
   Get Categories

Endpoint

GET /api/categories

Frontend

services/category.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts

Purpose

Retrieves available gear categories for providers.

4. Customer Rental
   Create Rental

Endpoint

POST /api/rental

Frontend

app/(publicGroup)/\_components/RentalForm.tsx

Purpose

Creates a rental order for selected gear.

Get Customer Rentals

Endpoint

GET /api/rental

Frontend

app/(dashboardGroup)/dashboard/rentals/page.tsx
app/(dashboardGroup)/dashboard/rentals/\_actions/

Purpose

Displays the authenticated customer's rental history and rental orders.

Get Rental Details

Endpoint

GET /api/rental/:id

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/\_actions/rental.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/page.tsx

Purpose

Displays detailed information about an individual rental.

5. Provider Rental Management
   Get Provider Orders

Endpoint

GET /api/provider/orders

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/page.tsx

Purpose

Allows providers to view rental requests for their gear.

Update Rental Status

Endpoint

PATCH /api/provider/orders/:id

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/\_components/ProviderRentalCard.tsx

Supported statuses:

CONFIRMED
PICKED_UP
RETURNED

Purpose

Allows providers to manage the rental lifecycle.

6. Provider Gear Management
   Get Provider Gear

Endpoint

GET /api/provider/gear

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/\_components/ProviderGearSection.tsx

Purpose

Retrieves gear belonging to the authenticated provider.

Create Provider Gear

Endpoint

POST /api/provider/gear

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/\_components/ProviderGearSection.tsx

Purpose

Allows providers to add rental equipment.

Supported information includes:

Name
Slug
Description
Brand
Price per day
Deposit amount
Stock
Available stock
Condition
Status
Image URLs
Specifications
Location
Featured status
Category
Update Provider Gear

Endpoint

PUT /api/provider/gear/:id

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/\_components/ProviderGearSection.tsx

Purpose

Allows providers to update:

pricePerDay
availableStock
description
Delete Provider Gear

Endpoint

DELETE /api/provider/gear/:id

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/\_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/\_components/ProviderGearSection.tsx

Purpose

Allows providers to delete their gear.

A confirmation prompt is shown before deletion.

7. Reviews and Ratings
   Get Gear Reviews

Endpoint

GET /api/review/gear/:gearItemId

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/\_actions/review.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/ReviewSection.tsx

Purpose

Retrieves reviews and ratings for a gear item.

Submit Review

Endpoint

POST /api/review

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/\_actions/review.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/ReviewSection.tsx

Purpose

Allows an eligible customer to submit a rating and review after a rental.

The review contains:

Rental order ID
Gear item ID
Rating
Comment 8. Stripe Payment
Create Checkout Session

Endpoint

POST /api/payments/create

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/\_actions/payment.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/PayButton.tsx
app/api/payments/create/route.ts

Purpose

Creates a Stripe Checkout session for an eligible rental.

The frontend receives the Checkout URL and redirects the customer to Stripe.

This is a real Stripe payment integration.

Payment Success

Frontend route

/payment/success

Purpose

Displays successful payment confirmation.

Payment Cancellation

Frontend route

/payment/cancel

Purpose

Displays payment cancellation information.

9. Admin Management
   Get All Users

Endpoint

GET /api/admin/users

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/\_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/\_components/UserTable.tsx

Purpose

Allows administrators to view registered users.

Update User Status

Endpoint

PATCH /api/admin/users/:id

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/\_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/\_components/UserTable.tsx

Purpose

Allows administrators to activate or deactivate users.

Get All Gear

Endpoint

GET /api/admin/gear

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/\_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/\_components/GearTable.tsx

Purpose

Allows administrators to view platform gear.

Get All Rentals

Endpoint

GET /api/admin/rentals

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/\_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/\_components/RentalTable.tsx

Purpose

Allows administrators to monitor rental activity.

10. API Authentication

Protected requests use the authenticated access token.

Request format:

Authorization: Bearer <accessToken>

The frontend handles authentication through cookies and authentication utilities.

Role-based access is enforced through:

proxy.ts 11. Error Handling

The frontend validates API responses and converts API failures into user-friendly messages.

Server actions generally return:

success
message
data

Toast notifications are used for important operations including:

Login errors
Registration errors
Rental errors
Payment errors
Gear creation errors
Gear update errors
Gear deletion errors
Rental status errors
Review submission errors 12. Frontend Service Architecture

Backend communication is separated into service modules:

services/
├── admin.service.ts
├── auth.service.ts
├── category.service.ts
├── gear.service.ts
├── payment.service.ts
└── provider.service.ts

Server actions connect protected backend operations with frontend components.

This separation keeps API communication independent from the UI.

13. Frontend Feature Mapping
    Feature Backend Endpoint Frontend
    Registration POST /api/auth/register authActions.ts
    Login POST /api/auth/login authActions.ts
    Browse Gear GET /api/gear Gear page
    Gear Details GET /api/gear/:id Gear details
    Categories GET /api/categories Provider dashboard
    Create Rental POST /api/rental RentalForm
    Customer Rentals GET /api/rental Customer dashboard
    Rental Details GET /api/rental/:id Rental details
    Provider Orders GET /api/provider/orders Provider dashboard
    Confirm Rental PATCH /api/provider/orders/:id Provider dashboard
    Pick Up Rental PATCH /api/provider/orders/:id Provider dashboard
    Return Rental PATCH /api/provider/orders/:id Provider dashboard
    Provider Gear GET /api/provider/gear Provider dashboard
    Create Gear POST /api/provider/gear Provider dashboard
    Update Gear PUT /api/provider/gear/:id Provider dashboard
    Delete Gear DELETE /api/provider/gear/:id Provider dashboard
    Gear Reviews GET /api/review/gear/:gearItemId Review section
    Submit Review POST /api/review Review section
    Stripe Checkout POST /api/payments/create Payment page
    Admin Users GET /api/admin/users Admin dashboard
    Update User PATCH /api/admin/users/:id Admin dashboard
    Admin Gear GET /api/admin/gear Admin dashboard
    Admin Rentals GET /api/admin/rentals Admin dashboard
14. Role-Based Features
    Customer

Customers can:

Browse gear
View gear details
Create rentals
View rental history
View rental details
Complete Stripe payments
View reviews
Submit eligible reviews
Provider

Providers can:

View rental requests
Confirm rentals
Mark rentals as picked up
Mark rentals as returned
View their gear
Add gear
Edit gear
Delete gear
Admin

Administrators can:

View users
Manage user status
View all gear
View all rentals 15. Payment Flow

The payment flow is:

Customer
↓
Rental Created
↓
Provider Confirms Rental
↓
Customer Opens Rental
↓
Create Stripe Checkout Session
↓
Stripe Checkout
↓
Successful Payment
↓
/payment/success

Cancellation flow:

Stripe Checkout
↓
Payment Cancelled
↓
/payment/cancel 16. Summary

The GearUp frontend integrates with the existing backend through dedicated service modules and server actions.

The integration covers:

Authentication
Role-based access
Gear browsing
Gear details
Categories
Rental creation
Rental management
Provider operations
Provider gear CRUD
Reviews and ratings
Stripe payments
Admin management
API error handling

The existing GearUp backend remains unchanged.
