# GearUp Frontend API Integration

## Overview

This document describes how the GearUp frontend integrates with the
backend REST API and maps frontend components/services to backend
endpoints.

## Base API Configuration

-   Base URL: `NEXT_PUBLIC_API_URL`
-   API Prefix: `/api`
-   Authentication: JWT Bearer token using accessToken cookie
-   Supported Roles: CUSTOMER, PROVIDER, ADMIN

------------------------------------------------------------------------

# Authentication

## Register User

Endpoint: `POST /api/auth/register`

Frontend: - RegisterForm.tsx - authActions.ts - services/auth.service.ts

Purpose: Creates a new user account.

------------------------------------------------------------------------

## Login User

Endpoint: `POST /api/auth/login`

Frontend: - LoginForm.tsx - authActions.ts - services/auth.service.ts

Purpose: Authenticates users and creates a session.

------------------------------------------------------------------------

# Gear APIs

## Get All Gear

Endpoint: `GET /api/gear`

Frontend: - Gear page - GearBrowser.tsx - GearCard.tsx -
services/gear.service.ts

Purpose: Displays available rental equipment.

------------------------------------------------------------------------

## Get Gear Details

Endpoint: `GET /api/gear/:id`

Frontend: - Gear details page - GearImageGallery.tsx

Purpose: Displays detailed information about a gear item.

------------------------------------------------------------------------

## Get Categories

Endpoint: `GET /api/categories`

Frontend: - GearBrowser.tsx - Provider gear forms

Purpose: Loads gear categories.

------------------------------------------------------------------------

# Customer Rental APIs

## Create Rental

Endpoint: `POST /api/rentals`

Frontend: - RentalForm.tsx - rental.actions.ts

Purpose: Creates rental orders.

Authentication: Required

------------------------------------------------------------------------

## Get Customer Rentals

Endpoint: `GET /api/rentals`

Frontend: - Customer dashboard - Rental history page

Purpose: Displays customer's rental history.

------------------------------------------------------------------------

## Get Rental Details

Endpoint: `GET /api/rentals/:id`

Frontend: - Rental details page

Purpose: Displays rental information.

------------------------------------------------------------------------

# Provider APIs

## Provider Gear Management

Endpoints:

    GET    /api/provider/gear
    POST   /api/provider/gear
    PUT    /api/provider/gear/:id
    DELETE /api/provider/gear/:id

Frontend: - Provider dashboard - provider.service.ts

Purpose: Allows providers to manage their gear listings.

------------------------------------------------------------------------

## Provider Orders

Endpoints:

    GET   /api/provider/orders
    PATCH /api/provider/orders/:id

Supported statuses:

-   CONFIRMED
-   PICKED_UP
-   RETURNED

Frontend: - Provider Dashboard - ProviderRentalCard.tsx

------------------------------------------------------------------------

# Stripe Payment Integration

## Create Checkout Session

Endpoint:

`POST /api/payments/create`

Frontend:

-   PayButton.tsx
-   payment.actions.ts
-   payment.service.ts

Purpose:

Creates Stripe checkout session and redirects customer to payment.

------------------------------------------------------------------------

## Confirm Payment

Endpoint:

`POST /api/payments/confirm`

Frontend:

-   payment.actions.ts
-   payment.service.ts

Purpose:

Confirms successful Stripe payment.

------------------------------------------------------------------------

## Payment Routes

Success:

`/payment/success`

Cancel:

`/payment/cancel`

------------------------------------------------------------------------

# Review APIs

## Get Reviews

Endpoint:

`GET /api/reviews/gear/:id`

Frontend:

-   ReviewSection.tsx
-   review.service.ts

Purpose:

Displays gear reviews.

------------------------------------------------------------------------

## Submit Review

Endpoint:

`POST /api/reviews`

Frontend:

-   ReviewSection.tsx
-   review.service.ts

Purpose:

Allows eligible customers to submit reviews.

------------------------------------------------------------------------

# Admin APIs

## Users

    GET   /api/admin/users
    PATCH /api/admin/users/:id

Frontend: - Admin Dashboard - UserTable.tsx

------------------------------------------------------------------------

## Admin Gear

Endpoint:

`GET /api/admin/gear`

Frontend: - Admin Dashboard - GearTable.tsx

------------------------------------------------------------------------

## Admin Rentals

Endpoint:

`GET /api/admin/rentals`

Frontend: - Admin Dashboard - RentalTable.tsx

------------------------------------------------------------------------

# Error Handling

The frontend handles API errors using:

-   Toast notifications
-   Form validation messages
-   Server action responses
-   Loading states
-   Error boundaries

Common errors:

-   Authentication failure
-   Validation errors
-   Payment failure
-   Unauthorized access
-   Server errors

------------------------------------------------------------------------

# Frontend Service Architecture

    services/
    ├── auth.service.ts
    ├── gear.service.ts
    ├── category.service.ts
    ├── payment.service.ts
    ├── provider.service.ts
    └── admin.service.ts

------------------------------------------------------------------------

# Role Based Features

## Customer

-   Browse gear
-   View gear details
-   Create rentals
-   Complete Stripe payments
-   View rental history
-   Submit reviews

## Provider

-   Add gear
-   Edit gear
-   Delete gear
-   Manage rental requests
-   Update rental status

## Admin

-   Manage users
-   View all gear
-   View all rentals

------------------------------------------------------------------------

# Summary

GearUp frontend integrates with backend APIs for authentication, gear
management, rental workflows, provider operations, Stripe payments,
reviews, and admin management.
