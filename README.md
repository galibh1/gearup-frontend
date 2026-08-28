# GearUp — Equipment Rental Platform

GearUp is an equipment rental platform built with Next.js, TypeScript, and a REST API backend. The frontend provides separate experiences for customers, providers, and administrators.

> The existing GearUp backend is not modified by this frontend project.

## Features

### Customer

- Register and login
- Browse rental gear
- View gear details
- Create rental orders
- View rental history
- View rental details
- Pay through Stripe Checkout
- View ratings and reviews
- Submit eligible reviews

### Provider

- View rental requests
- Confirm rental requests
- Mark rentals as picked up
- Mark rentals as returned
- View owned gear
- Add gear
- Edit gear
- Delete gear

### Admin

- View users
- Activate/deactivate users
- View all gear
- View all rentals

## Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Next.js App Router
- Server Actions
- JWT authentication
- HTTP cookies
- Stripe Checkout
- Sonner notifications

## Application Routes

### Public

- `/`
- `/gear`
- `/gear/[id]`
- `/login`
- `/register`

### Customer

- `/dashboard`
- `/dashboard/rentals`
- `/dashboard/rentals/[id]`

### Provider

- `/provider-dashboard`

### Admin

- `/admin-dashboard`

### Payment

- `/payment/success`
- `/payment/cancel`

### Other

- `/unauthorized`

## Authentication

The application uses JWT authentication with access tokens stored in cookies.

Supported roles:

- CUSTOMER
- PROVIDER
- ADMIN

Protected dashboard routes are controlled by the application's route protection layer.

Users without the required role are redirected to:

```text
/unauthorized
```
Rental Workflow
Customer browses gear
        ↓
View gear details
        ↓
Select rental dates
        ↓
Create rental
        ↓
Provider confirms rental
        ↓
Customer opens rental
        ↓
Stripe Checkout
        ↓
Successful payment
        ↓
Payment confirmation
        ↓
Rental becomes PAID
        ↓
Provider pickup
        ↓
Provider return
        ↓
Customer submits review