# Office Meal Management System - Frontend

## Overview

This is the frontend part of the Office Meal Management System built using ReactJS, Redux, Tailwind CSS, React Hook Form, React Select, Shadcn, and Next.js. The system provides administrative and general user functionalities, including authentication, user management, item management, meal management, and meal ordering.

## Prerequisites

- Node.js (version 14 or later)
- Git

## Setup Instructions

### Clone the repository

```bash
git clone https://github.com/toushik018/office-meal-management-client
cd office-meal-management-client
```

### Install frontend dependencies

```bash
npm install
```

### Set up environment variables

Create a `.env.local` file in the `frontend` directory and add the following environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Start the frontend server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

```
/frontend
  ├── components
  │   ├── Forms
  │   │   ├── FForm.tsx
  │   │   ├── FInput.tsx
  │   ├── UI
  │       ├── button.tsx
  │       ├── input.tsx
  │       ├── card.tsx
  ├── pages
  │   ├── api
  │   ├── auth
  │   ├── dashboard
  │   ├── index.tsx
  ├── redux
  │   ├── api
  │   │   ├── authApi.ts
  │   │   ├── orderApi.ts
  │   ├── slices
  │   ├── store.ts
  ├── styles
  │   ├── globals.css
  │   ├── tailwind.css
  ├── utils
  │   ├── constants.ts
  │   ├── role.ts
  ├── public
  │   ├── favicon.ico
  ├── .env.local
  ├── package.json
  ├── tailwind.config.js
  ├── next.config.js
```

## Notes

- Ensure the backend server is running on `http://localhost:5000`.
- Modify environment variables as needed for your setup.
- If there are any issues or you need further assistance, please refer to the project's documentation or raise an issue on the repository.
