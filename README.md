# Job Fiesta 🌟

> **A Next-Generation AI-Powered Job Discovery, Hiring, and AI Resume Builder Platform.**  
> *Final Year Project (FYP)*

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📖 Overview

**Job Fiesta** is a modern, full-featured web application designed to bridge the gap between talented job seekers and high-growth employers. Built from pixel-perfect Figma designs, it blends an authentic, aesthetically rich interface with cutting-edge functionalities including real-time job filtering, interactive candidate-recruiter messaging, role-based dashboards, and an **interactive AI Resume Builder** with live ATS formatting and direct PDF export.

---

## ✨ Key Features

### 1. 🎨 Figma-Matched Responsive Landing Page
- **Fluid & Responsive Layout**: Tailored for all viewports from ultra-wide desktops to 320px mobile devices with responsive typography (`clamp()`), mobile drawer navigation (`☰`), and flexible auto-fit grids.
- **Dynamic Vector Illustration Scaling**: Integrated `ResizeObserver` scaling on complex layered SVG office illustrations with GPU acceleration.
- **Interactive Discoverability**: Instant pill search bar, quick popular keyword chips, and direct click-to-filter category tiles leading directly to pre-filtered job listings.
- **Featured Opportunities**: Real-time display of premier featured jobs from top tech brands (Spotify, Google, Apple, Dribbble, etc.) with direct modal applications.
- **Client Testimonials & Feedback**: Verified community reviews with 5-star ratings and modal view for expanded testimonials.
- **Contact Inquiries**: Interactive contact form with automated feedback and local persistence for support tracking.

### 2. 🔍 Advanced Job Search & Discovery
- **Comprehensive Filtering**: Search by job title, company name, tags, geographic workplace location, discipline category, employment type (Full-Time, Contract, Internship), and minimum salary thresholds.
- **Bi-directional URL Synchronization**: Uses React Router query params (`?keyword=...&category=...`) to ensure shareable, bookmarkable search results.
- **Sort Control**: Sort opportunities by most recent postings or highest compensation tiers.
- **Mobile Filter Drawer**: Seamless slide-in drawer for filters on mobile screens without cluttering the screen.

### 3. 📄 Interactive AI Resume Builder
- **Multi-Step Form Wizard**: Dedicated sections for Personal Details, Professional Experience, Higher Education, and Key Technical Competencies.
- **AI Summary Enhancer**: One-click intelligent generation of tailored, high-impact professional executive summaries.
- **Live ATS Preview**: Instant side-by-side visualization of the resume formatted for applicant tracking systems.
- **Template Selector**: Choose among modern, clean design palettes (Emerald, Executive, Tech).
- **Direct PDF Export**: Browser-native print-to-PDF pipeline with dedicated print CSS media queries that strip away UI navigation.

### 4. 👥 Dual Role Portals & Dashboards
- **Candidate (Job Seeker) Dashboard**:
  - Live metric trackers (Active Applications, Scheduled Interviews, Bookmarked Jobs, Profile Match Score).
  - Tabbed workflow tracking statuses (*Under Review*, *Shortlisted*, *Interview Scheduled*, *Rejected*).
- **Employer (Recruiter) Dashboard**:
  - Centralized listing management, candidate review, and real-time status switcher.
  - Job publication pipeline with comprehensive compensation and requirement specifications.
- **Instant Role Toggle**: Switch between candidate and employer views on-the-fly via the top navigation bar.

### 5. 💬 Real-Time Messaging & Direct Recruiter Discussions
- Split-screen messaging interface connecting recruiters and candidates directly.
- Automated instant reply simulations.
- Interactive candidate rating system unlocked after meaningful discussion progress.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) |
| **Build Tooling & Bundler** | [Vite 6](https://vitejs.dev/) |
| **Routing** | [React Router v6](https://reactrouter.com/) |
| **State Architecture** | React Context API (`AuthContext`, `JobContext`, `SocketContext`) |
| **Icons & Visuals** | [Lucide React](https://lucide.dev/) |
| **Styling** | Custom Vanilla CSS with CSS Variables, Flexbox, CSS Grid & Fluid Clamp |
| **Typography** | Google Fonts (*League Script*, *Martel*, *Inter*, *Poppins*, *Caveat*) |

---

## 📂 Project Structure

```
fyp/
├── .gitignore                    # Root git ignore specification
├── README.md                     # Comprehensive project documentation
├── Job_fiesta_presentation1.pptx # Project Presentation Slide Deck 1
├── Job_fiesta_presentation2.pptx # Project Presentation Slide Deck 2
├── Phase4 upd.docx               # Final Year Project Documentation
├── Software Design Specification-1final.docx # Architectural specification
├── User Manual.docx              # Platform user guide
├── fyp_prototype.fig             # Figma source design file
│
└── frontend/                     # React + Vite Application
    ├── public/
    │   └── assets/
    │       └── Landingpageimages/ # Exact Figma vector SVGs & icons
    ├── src/
    │   ├── components/
    │   │   ├── common/           # Navbar, Footer, Modal, Badge, ErrorBoundary
    │   │   ├── jobs/             # JobCard, JobFilter
    │   │   ├── landing/          # HeroOfficeIllustration (dynamic scaler)
    │   │   └── resume/           # Resume templates & ATS preview components
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Role authentication & user state
    │   │   ├── JobContext.jsx    # Central job directory, filters & applications
    │   │   └── SocketContext.jsx # Real-time simulation provider
    │   ├── data/
    │   │   └── mockData.js       # Preloaded jobs, categories & testimonials
    │   ├── pages/
    │   │   ├── LandingPage.jsx   # Hero, search bar, categories, featured jobs
    │   │   ├── SearchPage.jsx    # Discovery page with live filters & drawer
    │   │   ├── JobdetailsPage.jsx# In-depth job specifications & quick apply
    │   │   ├── ResumeBuilderPage.jsx # AI resume generator & PDF export
    │   │   ├── Loginpage.jsx     # Dual-role authentication
    │   │   ├── RegistrationForjobseekerPage.jsx # Account onboarding
    │   │   ├── JobSeekerDashBoardPage.jsx # Candidate workflow center
    │   │   ├── RecruiterDashBoardPage.jsx # Employer pipeline & candidate management
    │   │   ├── PostJobPage.jsx   # Job listing creator
    │   │   ├── ChatMainPage.jsx  # Split-screen messaging & discussion
    │   │   └── AccountsettingsPage.jsx # Profile configuration
    │   ├── App.jsx               # Route mapping & global providers
    │   ├── main.jsx              # Application bootstrap
    │   └── index.css             # Design tokens, reset & responsive media queries
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version `18.x` or later recommended)
- `npm` (version `9.x` or later) or `yarn` / `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rehansajid2130/Job-fiesta_fyp.git
   cd Job-fiesta_fyp
   ```

2. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```
   The application will be running locally at `http://localhost:3000/` (or your configured port).

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview the production bundle:**
   ```bash
   npm run preview
   ```

---

## 📱 Responsiveness & Browser Support

Job Fiesta is engineered and tested across all standard viewport sizes:
- 📱 **Mobile devices**: 320px – 480px (iPhone, Pixel, Galaxy)
- 📱 **Tablets**: 768px – 1024px (iPad, Android tablets)
- 💻 **Desktops & Laptops**: 1024px – 1440px
- 🖥️ **Ultra-Wide Screens**: 1440px and above

Supported modern browsers:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Apple Safari (latest)
- Microsoft Edge (latest)

---

## 📜 Academic Deliverables

This repository serves as the official project repository for the **Final Year Project (FYP)**, containing:
1. **Source Code**: Fully responsive React single-page application with modular component architecture.
2. **Software Design Specification (SDS)**: Detailed architectural diagrams, database schema abstractions, and workflow state machines.
3. **Project Presentations**: Milestone presentations summarizing research, design iteration, and engineering implementation.
4. **User Manual**: Step-by-step instructions for candidate and recruiter workflows.

---

## 👤 Author

- **Rehan Sajid**
- **Repository**: [https://github.com/Rehansajid2130/Job-fiesta_fyp](https://github.com/Rehansajid2130/Job-fiesta_fyp)
- **Email**: [rehansajid.123456@gmail.com](mailto:rehansajid.123456@gmail.com)

---

## 📄 License

This project is licensed under the MIT License. Feel free to use and adapt it for learning and development.
