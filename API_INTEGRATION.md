# GearUp Frontend API Integration

This document describes how the GearUp frontend integrates with the existing GearUp backend API.

> The backend code is not modified by the frontend application.

## Base API Configuration

The frontend communicates with the backend through:

```text
BACKEND_API_URL

Local backend:

http://localhost:8000

API prefix:

/api
1. Authentication
User Registration

Endpoint

POST /api/auth/register

Frontend

app/(authGroup)/_actions/authActions.ts
services/auth.service.ts

Purpose

Creates a new user account.

User Login

Endpoint

POST /api/auth/login

Frontend

app/(authGroup)/_actions/authActions.ts
services/auth.service.ts

Purpose

Authenticates the user and establishes the authenticated session.

Authentication tokens are stored using cookies.

Authentication and Role Protection

Frontend

lib/auth.ts
proxy.ts
services/auth.service.ts

Supported roles:

CUSTOMER
PROVIDER
ADMIN

Protected routes:

/dashboard
/provider-dashboard
/admin-dashboard

Unauthorized users are redirected to:

/unauthorized
2. Public Gear
Get All Gear

Endpoint

GET /api/gear

Frontend

services/gear.service.ts
app/(publicGroup)/_actions/gear.actions.ts
app/(publicGroup)/gear/page.tsx
app/(publicGroup)/_components/GearCard.tsx

Purpose

Retrieves publicly available rental gear.

Get Gear Details

Endpoint

GET /api/gear/:id

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
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts

Purpose

Retrieves available gear categories for providers.

4. Customer Rental
Create Rental

Endpoint

POST /api/rental

Frontend

app/(publicGroup)/_components/RentalForm.tsx

Purpose

Creates a rental order for selected gear.

Get Customer Rentals

Endpoint

GET /api/rental

Frontend

app/(dashboardGroup)/dashboard/rentals/page.tsx
app/(dashboardGroup)/dashboard/rentals/_actions/

Purpose

Displays the authenticated customer's rental history and rental orders.

Get Rental Details

Endpoint

GET /api/rental/:id

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/_actions/rental.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/page.tsx

Purpose

Displays detailed information about an individual rental.

5. Provider Rental Management
Get Provider Orders

Endpoint

GET /api/provider/orders

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/page.tsx

Purpose

Allows providers to view rental requests for their gear.

Update Rental Status

Endpoint

PATCH /api/provider/orders/:id

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/_components/ProviderRentalCard.tsx

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
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/_components/ProviderGearSection.tsx

Purpose

Retrieves gear belonging to the authenticated provider.

Create Provider Gear

Endpoint

POST /api/provider/gear

Frontend

services/provider.service.ts
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/_components/ProviderGearSection.tsx

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
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/_components/ProviderGearSection.tsx

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
app/(dashboardGroup)/provider-dashboard/_actions/provider.actions.ts
app/(dashboardGroup)/provider-dashboard/_components/ProviderGearSection.tsx

Purpose

Allows providers to delete their gear.

A confirmation prompt is shown before deletion.

7. Reviews and Ratings
Get Gear Reviews

Endpoint

GET /api/review/gear/:gearItemId

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/_actions/review.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/ReviewSection.tsx

Purpose

Retrieves reviews and ratings for a gear item.

Submit Review

Endpoint

POST /api/review

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/_actions/review.actions.ts
app/(dashboardGroup)/dashboard/rentals/[id]/ReviewSection.tsx

Purpose

Allows an eligible customer to submit a rating and review after a rental.

The review contains:

Rental order ID
Gear item ID
Rating
Comment
8. Stripe Payment
Create Checkout Session

Endpoint

POST /api/payments/create

Frontend

app/(dashboardGroup)/dashboard/rentals/[id]/_actions/payment.actions.ts
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
app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/_components/UserTable.tsx

Purpose

Allows administrators to view registered users.

Update User Status

Endpoint

PATCH /api/admin/users/:id

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/_components/UserTable.tsx

Purpose

Allows administrators to activate or deactivate users.

Get All Gear

Endpoint

GET /api/admin/gear

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/_components/GearTable.tsx

Purpose

Allows administrators to view platform gear.

Get All Rentals

Endpoint

GET /api/admin/rentals

Frontend

services/admin.service.ts
app/(dashboardGroup)/admin-dashboard/_actions/admin.actions.ts
app/(dashboardGroup)/admin-dashboard/_components/RentalTable.tsx

Purpose

Allows administrators to monitor rental activity.

10. API Authentication

Protected requests use the authenticated access token.

Request format:

Authorization: Bearer <accessToken>

The frontend handles authentication through cookies and authentication utilities.

Role-based access is enforced through:

proxy.ts
11. Error Handling

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
Review submission errors
12. Frontend Service Architecture

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
Feature	Backend Endpoint	Frontend
Registration	POST /api/auth/register	authActions.ts
Login	POST /api/auth/login	authActions.ts
Browse Gear	GET /api/gear	Gear page
Gear Details	GET /api/gear/:id	Gear details
Categories	GET /api/categories	Provider dashboard
Create Rental	POST /api/rental	RentalForm
Customer Rentals	GET /api/rental	Customer dashboard
Rental Details	GET /api/rental/:id	Rental details
Provider Orders	GET /api/provider/orders	Provider dashboard
Confirm Rental	PATCH /api/provider/orders/:id	Provider dashboard
Pick Up Rental	PATCH /api/provider/orders/:id	Provider dashboard
Return Rental	PATCH /api/provider/orders/:id	Provider dashboard
Provider Gear	GET /api/provider/gear	Provider dashboard
Create Gear	POST /api/provider/gear	Provider dashboard
Update Gear	PUT /api/provider/gear/:id	Provider dashboard
Delete Gear	DELETE /api/provider/gear/:id	Provider dashboard
Gear Reviews	GET /api/review/gear/:gearItemId	Review section
Submit Review	POST /api/review	Review section
Stripe Checkout	POST /api/payments/create	Payment page
Admin Users	GET /api/admin/users	Admin dashboard
Update User	PATCH /api/admin/users/:id	Admin dashboard
Admin Gear	GET /api/admin/gear	Admin dashboard
Admin Rentals	GET /api/admin/rentals	Admin dashboard
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
View all rentals
15. Payment Flow

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
/payment/cancel
16. Summary

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
