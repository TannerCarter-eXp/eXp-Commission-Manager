# eXp Commission Manager

A comprehensive commission cap tracking system for eXp Realty agents, team leads, and administrative staff. This application provides role-based dashboards for monitoring agent commission caps, team performance, and transaction processing.

## 🚀 Features

### Multi-Role Dashboard System
- **Admin Dashboard**: Complete system oversight with user management, agent assignments, and transaction monitoring
- **eXp Staff Dashboard**: Assigned agent tracking and file closing capabilities
- **Team Lead Dashboard**: Team management, external cap setup, and split configuration
- **Agent Dashboard**: Personal cap progress tracking and commission history

### Commission Cap Tracking
- **eXp Company Caps**: Support for 16k, 8k, and 4k cap types
- **External Team Caps**: Configurable team-based cap management
- **Real-time Progress**: Live cap progress updates with visual indicators
- **Dual Cap System**: Track both company and team caps simultaneously

### Transaction Management
- **Automated Calculations**: Automatic commission splits based on cap configurations
- **Multi-Split Support**: eXp company split, external cap contributions, and team splits
- **Transaction History**: Complete audit trail of all commission transactions
- **Role-Based Entry**: Different transaction entry permissions by user role

### Advanced Access Control
- **Role-Based Permissions**: Four distinct user roles with scoped access
- **Assignment System**: eXp staff assigned to specific agents/teams
- **Protected Routes**: Secure access to dashboard sections based on user role
- **Data Isolation**: Users only see data relevant to their role and assignments

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation

### Planned Backend Integration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: Supabase REST API
- **Real-time**: Supabase subscriptions
- **Security**: Row Level Security (RLS)

### UI/UX
- **Component Library**: Radix UI primitives
- **Design System**: shadcn/ui
- **Icons**: Lucide React
- **Responsive Design**: Mobile-first approach
- **Theming**: Next-themes support

## 📊 Database Schema

### Core Tables
```sql
-- Users table
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  role user_role,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Agents table
agents (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  exp_cap_type cap_type,
  exp_cap_amount DECIMAL,
  exp_cap_paid DECIMAL DEFAULT 0,
  team_lead_id UUID REFERENCES users(id),
  exp_staff_id UUID REFERENCES users(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP
)

-- Teams table
teams (
  id UUID PRIMARY KEY,
  team_lead_id UUID REFERENCES users(id),
  exp_staff_id UUID REFERENCES users(id),
  team_name TEXT,
  external_cap_amount DECIMAL,
  external_cap_description TEXT,
  created_at TIMESTAMP
)

-- Transactions table
transactions (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  gross_commission DECIMAL,
  exp_company_split DECIMAL,
  team_external_cap_split DECIMAL,
  team_lead_general_split DECIMAL,
  agent_net_amount DECIMAL,
  transaction_date DATE,
  property_address TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP
)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, or bun

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/TannerCarter-eXp/eXp-Commission-Manager.git
cd eXp-Commission-Manager
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
bun install
```

3. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. **Open in browser**
Navigate to `http://localhost:8080`

### Demo Accounts
The application includes mock authentication for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@exp.com | any |
| eXp Staff | staff@exp.com | any |
| Team Lead | lead@exp.com | any |
| Agent | agent@exp.com | any |

## 📱 User Roles & Permissions

### Admin
- **Full System Access**: Complete oversight of all agents, teams, and transactions
- **User Management**: Create and manage user accounts with role assignments
- **Agent Assignment**: Assign agents to team leads and eXp staff
- **System Configuration**: Global settings and cap configurations
- **Reporting**: System-wide analytics and export capabilities

### eXp Staff
- **Assigned Agents**: Monitor cap progress for assigned agents only
- **File Closing**: Process transactions for assigned agents
- **Split Visibility**: View team split configurations for context
- **Limited Transaction Entry**: Add transactions for assigned agents
- **Team Reference**: Read-only access to team configurations

### Team Lead
- **Team Management**: Manage assigned team agents and performance
- **Cap Configuration**: Set up and modify external team caps
- **Split Setup**: Configure commission split percentages
- **Transaction Processing**: Enter transactions for team agents
- **Performance Tracking**: Monitor team and individual agent progress

### Agent
- **Personal Dashboard**: Track individual cap progress and performance
- **Commission History**: View detailed transaction history with splits
- **Cap Progress**: Monitor both eXp and external cap progress
- **Performance Metrics**: Year-to-date and monthly commission summaries

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build for development
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📁 Project Structure
src/
├── components/
│ ├── layout/
│ │ └── DashboardLayout.tsx # Main dashboard layout
│ └── ui/ # Reusable UI components
├── hooks/
│ ├── useAuth.tsx # Authentication hook
│ └── use-toast.ts # Toast notification hook
├── pages/
│ ├── admin/ # Admin dashboard pages
│ ├── agent/ # Agent dashboard pages
│ ├── exp-staff/ # eXp staff dashboard pages
│ ├── team-lead/ # Team lead dashboard pages
│ ├── Login.tsx # Login page
│ └── ...
├── types/
│ └── database.ts # TypeScript interfaces
├── lib/
│ └── utils.ts # Utility functions
└── App.tsx # Main app component

## 🎨 Design System

The application uses a comprehensive design system built on:

- **shadcn/ui**: High-quality, accessible components
- **Tailwind CSS**: Utility-first styling framework
- **Radix UI**: Unstyled, accessible primitives
- **Lucide Icons**: Beautiful, customizable icons
- **Responsive Design**: Mobile-first approach

### Key Components
- Dashboard layouts with responsive navigation
- Progress indicators for cap tracking
- Data tables for transaction management
- Form components with validation
- Toast notifications for user feedback
- Modal dialogs for data entry

## 🔐 Authentication & Security

### Current Implementation
- Mock authentication system for development
- Role-based access control
- Protected routes by user role
- Local storage for session management

### Planned Security Features
- Supabase authentication integration
- Row Level Security (RLS) in database
- JWT token-based authentication
- Secure API endpoints
- Role-based data filtering

## 📈 Roadmap

### Phase 1: Backend Integration
- [ ] Supabase project setup
- [ ] Database schema implementation
- [ ] API endpoints for CRUD operations
- [ ] Real authentication system
- [ ] Row Level Security policies

### Phase 2: Core Features
- [ ] Transaction entry system
- [ ] Cap calculation engine
- [ ] Assignment management
- [ ] Real-time updates
- [ ] Data validation

### Phase 3: Advanced Features
- [ ] Reporting and analytics
- [ ] Export capabilities
- [ ] Notification system
- [ ] Mobile app
- [ ] API documentation

### Phase 4: Enterprise Features
- [ ] Multi-tenant support
- [ ] Advanced permissions
- [ ] Audit logging
- [ ] Integration APIs
- [ ] Performance optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://radix-ui.com/) for accessible component primitives
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development experience

---
