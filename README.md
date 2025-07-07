# HireFlow - AI-Powered Job Application Assistant

HireFlow is a comprehensive web application that streamlines the job application process by providing AI-powered resume building, job application tracking, and personalized career assistance. The platform features a modern user portal system with secure authentication, profile management, and file uploads.

## 🚀 Features

### User Portal System
- **Mock Authentication**: Simulated login/registration with localStorage
- **Profile Management**: Update personal information, upload profile pictures
- **Resume Upload**: PDF resume storage with mock file handling
- **Social Links**: Connect GitHub, LinkedIn, and portfolio URLs
- **Responsive Dashboard**: Modern UI with theme support (light/dark/night)

### AI-Powered Features
- **Conversational Resume Builder**: Chat-based resume creation with AI assistance
- **Job Application Tracker**: Monitor application status and progress
- **Cover Letter Generator**: AI-powered cover letter creation
- **Resume Tailoring**: Customize resumes for specific job descriptions

### Frontend Features
- **Mock Data**: Simulated user data and API responses
- **File Upload Simulation**: Mock file uploads with realistic delays
- **Form Validation**: Comprehensive client-side validation
- **Theme System**: Three theme modes with smooth transitions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Custom Hooks** for state management
- **Responsive Design** with mobile-first approach
- **Mock Services** for demonstration purposes

### Mock Features
- **LocalStorage** for token management
- **Simulated API delays** for realistic UX
- **Mock user data** for demonstration
- **File upload simulation** with progress indicators

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HireFlow--AI-project-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm start
```

The application will run on `http://localhost:3000`

## 🎨 Theme System

The application supports three themes:
- **Light**: Clean, professional appearance
- **Dark**: Easy on the eyes for low-light environments
- **Night**: Ultra-dark theme for maximum comfort

Users can toggle between themes using the theme toggle in the header.

## 📱 User Portal Features

### Profile Management
- Update personal information (name, phone number)
- Upload and manage profile pictures (simulated)
- View profile completion statistics

### Resume Management
- Upload PDF resumes (simulated, max 10MB)
- View and download uploaded resumes
- Resume best practices and tips

### Social Links
- Connect GitHub profile
- Link LinkedIn account
- Add portfolio website
- URL validation for all social links

## 🔧 Mock API Endpoints

The application simulates the following API endpoints:

### Authentication
- `POST /api/auth/register` - User registration (simulated)
- `POST /api/auth/login` - User login (simulated)
- `GET /api/auth/me` - Get current user (simulated)
- `PUT /api/auth/profile` - Update profile (simulated)

### File Uploads
- `POST /api/auth/profile-picture` - Upload profile picture (simulated)
- `POST /api/auth/resume` - Upload resume (simulated)

## 🎯 Demo Features

### Mock User Data
The application includes a demo user with:
- **Email**: demo@hireflow.com
- **Name**: John Doe
- **Profile Picture**: Sample image from Unsplash
- **Resume**: Mock PDF file
- **Social Links**: Sample GitHub, LinkedIn, and portfolio URLs

### Simulated Operations
- **Registration**: Creates new users in memory
- **Login**: Validates against mock user data
- **File Uploads**: Simulates upload with 2-second delay
- **Profile Updates**: Updates data in memory
- **Token Management**: Uses localStorage for persistence

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## 📊 Project Structure

```
src/
├── components/           # React components
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/       # Dashboard components
│   │   ├── UserDashboard.tsx
│   │   ├── ProfileSection.tsx
│   │   ├── ResumeSection.tsx
│   │   └── SocialLinksSection.tsx
│   ├── ChatInterface.tsx
│   ├── ApplicationTracker.tsx
│   ├── ResumeBuilder.tsx
│   └── ThemeToggle.tsx
├── services/            # API services
│   └── authService.ts   # Mock authentication service
├── hooks/               # Custom React hooks
│   ├── useChat.ts
│   └── useTheme.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── index.css            # Global styles
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🎨 Component Overview

### Authentication Components
- **LoginForm**: Clean login interface with validation
- **RegisterForm**: Comprehensive registration with strong password requirements

### Dashboard Components
- **UserDashboard**: Main dashboard with tabbed interface
- **ProfileSection**: Profile management with picture upload
- **ResumeSection**: Resume upload and management
- **SocialLinksSection**: GitHub, LinkedIn, portfolio links

### Core Components
- **ChatInterface**: Main chat component for AI interactions
- **ApplicationTracker**: Sidebar for tracking job applications
- **ResumeBuilder**: Template selection for resumes
- **ThemeToggle**: Theme switching functionality

## 🔮 Future Enhancements

### Backend Integration
- Real API endpoints with Node.js/Express
- MongoDB database integration
- Cloudinary file storage
- JWT authentication

### Additional Features
- Email verification system
- Password reset functionality
- Two-factor authentication
- Advanced resume analytics
- Integration with job boards
- AI-powered interview preparation
- Application automation features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the component structure

---

**Built with ❤️ for job seekers everywhere**

*Note: This is a frontend-only demonstration. For production use, integrate with a backend API.*
