# Notes Space - Fullstack Notes Application

A modern, fullstack notes application built with **NestJS** (backend) and **React + TypeScript** (frontend). This application provides a rich note-taking experience with folder organization and a beautiful user interface.

## 🚀 Features

### Core Features

- **User Authentication** - Secure JWT-based authentication system
- **Note Management** - Create, read, update, and delete notes
- **Folder Organization** - Organize notes into folders for better structure
- **Real-time Updates** - Instant updates with React Query
- **Responsive Design** - Beautiful UI that works on all devices
- **Dark/Light Theme** - Toggle between themes for better user experience

### Technical Features

- **TypeScript** - Full type safety across the entire stack
- **API Documentation** - Swagger/OpenAPI documentation
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- **State Management** - React Query for server state, Context for client state
- **Form Validation** - Class-validator for backend, custom validation for frontend
- **Error Handling** - Comprehensive error handling and user feedback

## 🏗️ Architecture

### Backend (NestJS)

```
notes-api/
├── src/
│   ├── auth/           # Authentication module
│   ├── note/           # Notes CRUD operations
│   ├── folder/         # Folder management
│   ├── user/           # User management
│   └── public/         # Public assets
```

### Frontend (React + Vite)

```
note-space/
├── src/
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── services/       # API services
│   ├── providers/      # App providers
│   └── lib/           # Utility functions
```

## 🛠️ Tech Stack

### Backend

- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Swagger** - API documentation
- **Class-validator** - Input validation
- **TypeScript** - Type safety

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **React Query** - Server state management
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons
- **Sonner** - shadcn/ui Toast notifications

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Practice-notes-api
   ```

2. **Install dependencies**

   ```bash
   cd notes-api
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the `notes-api` directory:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/notes-app
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **Start the development server**

   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000`

   - API Documentation: `http://localhost:3000/api`

### Frontend Setup

1. **Install dependencies**

   ```bash
   cd note-space
   npm install
   ```

2. **Start the development server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## 📚 API Endpoints

### Authentication

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (protected)

### Notes

- `GET /note` - Get all notes (with optional userId filter)
- `POST /note` - Create a new note
- `GET /note/:id` - Get a specific note
- `GET /note/user/:userId` - Get notes by user
- `PATCH /note/:id` - Update a note
- `DELETE /note/:id` - Delete a note

### Folders

- `GET /folder` - Get all folders
- `POST /folder` - Create a new folder
- `GET /folder/:id` - Get a specific folder
- `PATCH /folder/:id` - Update a folder
- `DELETE /folder/:id` - Delete a folder

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration**: Users can create an account with email and password
2. **Login**: Users authenticate with their credentials
3. **Token Storage**: JWT tokens are stored securely in the frontend
4. **Protected Routes**: API endpoints are protected with JWT guards
5. **Auto-refresh**: Tokens are automatically refreshed when needed

## 🎨 UI Components

The frontend uses a modern component library built with:

- **shadcn/ui** - Beautiful, accessible, and customizable components
- **Tailwind CSS** - Utility-first styling
- **Custom Components** - Reusable UI components
- **Responsive Design** - Mobile-first approach
- **Dark/Light Theme** - Theme switching capability

## 🗂️ Folder Organization

Users can organize their notes into folders:

- **Create Folders** - Add new folders for organization
- **Move Notes** - Drag and drop notes between folders
- **Filter by Folder** - View notes from specific folders
- **Folder Management** - Edit and delete folders

## ✨ Upcoming Features

- **Rich Text Editor** - Advanced text editing with formatting, lists, and media support
- **Enhanced Search** - Full-text search across notes and folders

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NestJS** - For the amazing backend framework
- **React Team** - For the incredible frontend library
- **shadcn/ui** - For beautiful and accessible UI components
- **Tailwind CSS** - For the utility-first CSS framework

---

**Happy Note Taking! 📝✨**
