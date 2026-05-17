import { useState, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useBoard } from '@/contexts/BoardContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useLocation } from 'wouter';
import { Column } from '@/components/Column';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Moon, Sun, LogOut } from 'lucide-react';
import { Priority } from '@/reducers/boardReducer';

export default function BoardPage() {
  const { state: authState, logout } = useAuth();
  const { state: boardState } = useBoard();
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');

  const handleLogout = () => {
    logout();
    setLocation('/login');
  };

  // Filter tasks by priority
  const filteredTasks = useMemo(() => {
    if (priorityFilter === 'All') {
      return boardState.tasks;
    }
    return boardState.tasks.filter(task => task.priority === priorityFilter);
  }, [boardState.tasks, priorityFilter]);

  // Group tasks by status
  const tasksByStatus = {
    'To Do': filteredTasks.filter(task => task.status === 'To Do'),
    'In Progress': filteredTasks.filter(task => task.status === 'In Progress'),
    'Done': filteredTasks.filter(task => task.status === 'Done'),
  };

  const totalTasks = {
    'To Do': tasksByStatus['To Do'].length,
    'In Progress': tasksByStatus['In Progress'].length,
    'Done': tasksByStatus['Done'].length,
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                TaskBoard
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Welcome, {authState.user?.email}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="gap-2"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark
                  </>
                ) : (
                  <>
                    <Sun className="h-4 w-4" />
                    Light
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Task Summary */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {totalTasks['To Do']} To Do · {totalTasks['In Progress']} In Progress · {totalTasks['Done']} Done
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as Priority | 'All')}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Priorities</SelectItem>
                  <SelectItem value="Low">Low Priority</SelectItem>
                  <SelectItem value="Medium">Medium Priority</SelectItem>
                  <SelectItem value="High">High Priority</SelectItem>
                </SelectContent>
              </Select>

              <CreateTaskDialog />
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column status="To Do" tasks={tasksByStatus['To Do']} />
          <Column status="In Progress" tasks={tasksByStatus['In Progress']} />
          <Column status="Done" tasks={tasksByStatus['Done']} />
        </div>
      </main>
    </div>
  );
}
