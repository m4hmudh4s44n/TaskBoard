# TaskBoard - Kanban Task Manager

A modern, responsive Kanban-style task management application built with React, Vite, and Tailwind CSS. TaskBoard allows users to organize tasks across three columns (To Do, In Progress, Done), manage priorities, and persist data between sessions.

## Features

**Core Functionality**
- **3-Column Kanban Board**: Organize tasks across To Do, In Progress, and Done columns
- **Task Management**: Create, read, update, and delete tasks with full CRUD operations
- **Priority System**: Assign Low, Medium, or High priority to each task
- **Task Details**: Each task displays title, description, priority badge, and creation date
- **Task Movement**: Move tasks between columns using arrow buttons or status dropdown
- **Task Filtering**: Filter all tasks by priority level across all columns

**User Experience**
- **Mock Authentication**: Login/logout functionality with session persistence
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop
- **Data Persistence**: All tasks and user preferences saved to localStorage
- **Protected Routes**: Board page is protected and redirects unauthenticated users to login

**Design**
- Modern Minimalist aesthetic with Swiss Design principles
- Clean, professional interface with teal accent colors
- Semantic color tokens for consistent theming
- IBM Plex Sans typography for professional appearance

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 + Vite |
| **Styling** | Tailwind CSS 4 |
| **Routing** | React Router v6 (wouter) |
| **State Management** | Context API + useReducer |
| **UI Components** | shadcn/ui |
| **Icons** | Lucide React |
| **Persistence** | localStorage with custom hook |
| **Deployment** | Vercel |

## Project Structure

```
taskboard-app/
├── client/
│   ├── public/
│   │   └── __manus__/          # Manus runtime files
│   ├── src/
│   │   ├── components/
│   │   │   ├── Column.tsx       # Kanban column component
│   │   │   ├── TaskCard.tsx     # Individual task card
│   │   │   ├── PriorityBadge.tsx # Priority display badge
│   │   │   ├── CreateTaskDialog.tsx # New task form
│   │   │   ├── EditTaskDialog.tsx   # Edit task form
│   │   │   ├── PrivateRoute.tsx     # Protected route wrapper
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx  # Authentication state
│   │   │   ├── BoardContext.tsx # Board/tasks state
│   │   │   └── ThemeContext.tsx # Theme state
│   │   ├── hooks/
│   │   │   └── useLocalStorage.ts # Persistence hook
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx    # Login page
│   │   │   ├── BoardPage.tsx    # Main board page
│   │   │   └── NotFound.tsx     # 404 page
│   │   ├── reducers/
│   │   │   └── boardReducer.ts  # Task state reducer
│   │   ├── App.tsx              # Root component with routing
│   │   ├── main.tsx             # React entry point
│   │   └── index.css            # Global styles
│   └── index.html               # HTML template
├── server/
│   └── index.ts                 # Express server (static only)
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The dev server will hot-reload on file changes

### Build for Production

```bash
npm run build
# or
pnpm build
```

The production build will be optimized and ready for deployment.

## Usage Guide

### Logging In
1. Navigate to the login page
2. Enter any email address and password (demo mode accepts any valid input)
3. Click "Sign In" to access the board

### Creating Tasks
1. Click the "New Task" button in the top-right corner
2. Fill in task details:
   - **Title**: Task name (required)
   - **Description**: Optional task details
   - **Priority**: Select Low, Medium, or High
3. Click "Create Task" to add to the To Do column

### Managing Tasks
- **Move Tasks**: Use the left/right arrow buttons on task cards to move between columns
- **Edit Tasks**: Click the three-dot menu and select "Edit" to modify task details
- **Delete Tasks**: Click the three-dot menu and select "Delete" (requires confirmation)
- **Filter Tasks**: Use the priority filter dropdown to show only specific priority levels

### Theme Toggle
- Click the "Dark" or "Light" button in the header to switch themes
- Your preference is saved automatically

### Logging Out
- Click the "Logout" button in the top-right corner
- You'll be redirected to the login page

## Architecture & State Management

### Authentication (AuthContext)
- Manages user login/logout state
- Persists authentication to localStorage
- Provides `useAuth()` hook for components

### Board State (BoardContext + boardReducer)
- Manages all tasks with useReducer pattern
- Supports actions: ADD_TASK, UPDATE_TASK, DELETE_TASK, MOVE_TASK, SET_TASKS
- Persists tasks to localStorage via custom hook

### Theme (ThemeContext)
- Manages light/dark mode preference
- Applies theme class to document root
- Persists theme preference to localStorage

### Custom Hooks
- **useLocalStorage**: Wraps localStorage with JSON serialization and error handling
- **useAuth**: Access authentication state and methods
- **useBoard**: Access board state and dispatch actions
- **useTheme**: Access theme state and toggle function

## Data Models

### Task
```typescript
interface Task {
  id: string;              // Unique identifier (nanoid)
  title: string;           // Task title
  description: string;     // Task description
  priority: 'Low' | 'Medium' | 'High';
  status: 'To Do' | 'In Progress' | 'Done';
  createdDate: string;     // ISO date string
}
```

### Board State
```typescript
interface BoardState {
  tasks: Task[];
}
```

## Styling & Design System

### Color Palette (Modern Minimalist)
- **Primary**: Teal/Cyan accent (oklch(0.523 0.191 262.881))
- **Background**: Clean white (light) / Deep slate (dark)
- **Text**: Professional slate gray
- **Status Colors**: 
  - To Do: Slate
  - In Progress: Blue
  - Done: Emerald

### Typography
- **Display Font**: IBM Plex Sans (700 weight)
- **Body Font**: IBM Plex Sans (400 weight)
- **Monospace**: IBM Plex Mono (for dates/metadata)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Performance Considerations

- **Lazy Rendering**: Task cards only render visible tasks
- **Memoization**: Filtered tasks are memoized to prevent unnecessary recalculations
- **Local Storage**: Efficient JSON serialization for persistence
- **CSS-in-JS**: Tailwind CSS generates only used styles
- **Code Splitting**: Vite automatically optimizes bundle splitting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators on interactive elements
- ARIA labels on buttons and form inputs
- Color contrast meets WCAG AA standards
- Respects `prefers-reduced-motion` for animations

## Future Enhancements

- Drag-and-drop task reordering
- Task due dates and reminders
- Task tags and categories
- User collaboration features
- Backend API integration
- Task search functionality
- Recurring tasks
- Task templates

## Deployment

This project is optimized for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel automatically builds and deploys on push
4. Environment variables are automatically configured

For other platforms (Netlify, Railway, etc.), follow platform-specific deployment guides.

## Git Workflow

The project follows a feature-branch workflow:

```bash
# Create feature branch
git checkout -b feature/task-name

# Make changes and commit
git add .
git commit -m "feat: add task name feature"

# Push and create pull request
git push origin feature/task-name
```

Commit messages follow conventional commits format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions

## Troubleshooting

### Tasks not persisting
- Check browser localStorage is enabled
- Clear localStorage and refresh: `localStorage.clear()`
- Check browser console for errors

### Dark mode not working
- Ensure `ThemeProvider` wraps the app
- Check that `.dark` class is applied to document root
- Verify CSS variables are defined in `index.css`

### Login not working
- Ensure email format is valid (contains @)
- Check that `AuthProvider` wraps the app
- Verify localStorage is enabled

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

## License

MIT

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
