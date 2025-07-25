# 📚 Library Management System - Frontend

A modern and responsive frontend application for managing a digital library. This application allows users to manage books, borrow records, and view summaries, all built using powerful modern tools like React, Redux Toolkit Query, and TypeScript.

---

## ✨ Features

### 📖 Book Management
- Add new books with metadata (title, author, genre, ISBN, description, copies, availability).
- Edit existing books directly from the book list.
- Delete books with confirmation.
- View all books in a sortable and filterable table.
- Availability auto-handled based on number of copies.

### 📤 Borrow Book
- Borrow books using a modal form (triggered from the book list).
- Form fields: Quantity, Due Date.
- Posts to the backend `Borrow Book` API.

### 📊 Borrow Summary
- View total quantity of each book borrowed.
- Uses aggregation API endpoint.
- Displays columns: Book Title, ISBN, Total Borrowed Quantity.

### 🔍 Filtering and Sorting
- Filter by availability.
- Sort by title, author, copies, etc.
- Search functionality to quickly find a book.

### 🧩 State Management
- Redux Toolkit Query (RTK Query) for data fetching and caching.
- Optimistic UI updates and error handling using RTK Query.

### 🔔 Notifications
- Toast messages for success and error states.
- SweetAlert for confirmation dialogs.

### 📱 Responsive Design
- Fully mobile-friendly UI.
- Accessible inputs and labels.
- Tailored layout for both desktop and mobile users.

---

## 🛠️ Technologies Used

| Category       | Tech Stack                              |
|----------------|------------------------------------------|
| Framework      | [React](https://reactjs.org/)           |
| Language       | [TypeScript](https://www.typescriptlang.org/) |
| State/Data     | [Redux Toolkit](https://redux-toolkit.js.org/), [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) |
| UI Components  | [ShadCN UI](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| Form Handling  | [React Hook Form](https://react-hook-form.com/) |
| Styling        | [Tailwind CSS](https://tailwindcss.com/) |
| Notification   | [Sonner](https://sonner.emilkowal.ski/), [SweetAlert2](https://sweetalert2.github.io/) |
| Build Tool     | [Vite](https://vitejs.dev/)              |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>=18)
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/library-frontend.git
cd library-frontend

# Install dependencies
npm install
# or
yarn install
