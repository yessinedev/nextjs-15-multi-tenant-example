# Multi-tenant Next.js 15 Example

A simple multi-tenant todo application built with Next.js 15 App Router. This example demonstrates how to implement multi-tenancy using subdomains and JSON file as a data store.

## Features

- 🏢 Multi-tenant architecture using subdomains
- 🚀 Built with Next.js 15 App Router
- 💾 JSON file as a data store (easily convertible to a database)
- 🎯 Full API implementation
- 🎨 Modern UI with Tailwind CSS
- ⚡ Real-time updates
- 🔍 Type-safe with TypeScript

## How It Works

The application uses subdomains to separate different tenants. Each tenant has their own todo list and data.

Example URLs:
- Main app: http://localhost:3000
- Tenant 1: http://tenant1.localhost:3000
- Tenant 2: http://tenant2.localhost:3000

## API Routes

### Users

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user/tenant
  ```typescript
  // Request body
  {
    "name": "John Doe",
    "subdomain": "johndoe"
  }
  ```

### User Data

- `GET /api/users/[subdomain]` - Get user data and todos
- `DELETE /api/users/[subdomain]` - Delete a user/tenant

### Todos

- `GET /api/users/[subdomain]/todos` - Get todos for a tenant
- `POST /api/users/[subdomain]/todos` - Create a new todo
  ```typescript
  // Request body
  {
    "text": "Buy groceries"
  }
  ```

- `PATCH /api/users/[subdomain]/todos/[id]` - Toggle todo completion
- `DELETE /api/users/[subdomain]/todos/[id]` - Delete a todo

## Data Structure

The application uses a JSON file (`data/users.json`) to store data:

`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "subdomain": "johndoe",
      "todos": [
        {
          "id": 1,
          "text": "Buy groceries",
          "completed": false
        }
      ]
    }
  ]
}`

## Converting to Database

The application is designed to be easily convertible to use a database instead of JSON files. The data operations are centralized in `/lib/data.ts`, making it simple to swap out the JSON file storage for a database of your choice.

To convert to a database:
1. Update the data functions in `/lib/data.ts`
2. Keep the same API structure
3. Replace file operations with database queries

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Lucide Icons
- JSON File Storage (convertible to any database)

## Development Notes

- Uses file-based routing with Next.js App Router
- Implements API routes for all data operations
- Centralized data handling in `/lib/data.ts`
- Type-safe with TypeScript interfaces
- Modern UI components with Tailwind CSS
