import { Task, Status } from '@/reducers/boardReducer';
import { useBoard } from '@/contexts/BoardContext';
import { PriorityBadge } from './PriorityBadge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ChevronRight, ChevronLeft, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { EditTaskDialog } from './EditTaskDialog';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const { dispatch } = useBoard();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const statuses: Status[] = ['To Do', 'In Progress', 'Done'];
  const currentIndex = statuses.indexOf(task.status);
  const canMoveForward = currentIndex < statuses.length - 1;
  const canMoveBackward = currentIndex > 0;

  const handleMoveForward = () => {
    if (canMoveForward) {
      dispatch({
        type: 'MOVE_TASK',
        payload: { taskId: task.id, newStatus: statuses[currentIndex + 1] },
      });
    }
  };

  const handleMoveBackward = () => {
    if (canMoveBackward) {
      dispatch({
        type: 'MOVE_TASK',
        payload: { taskId: task.id, newStatus: statuses[currentIndex - 1] },
      });
    }
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: task.id });
    setShowDeleteAlert(false);
  };

  const formattedDate = new Date(task.createdDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2">
            {task.title}
          </h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowDeleteAlert(true)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <PriorityBadge priority={task.priority} />
          <span className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMoveBackward}
            disabled={!canMoveBackward}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleMoveForward}
            disabled={!canMoveForward}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Task</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this task? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <EditTaskDialog
        task={task}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </>
  );
}
