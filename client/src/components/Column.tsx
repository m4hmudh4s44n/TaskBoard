import { Status, Task } from '@/reducers/boardReducer';
import { TaskCard } from './TaskCard';

interface ColumnProps {
  status: Status;
  tasks: Task[];
}

const columnConfig: Record<Status, { title: string; color: string }> = {
  'To Do': { title: 'To Do', color: 'bg-slate-50 dark:bg-slate-900' },
  'In Progress': { title: 'In Progress', color: 'bg-blue-50 dark:bg-blue-950' },
  Done: { title: 'Done', color: 'bg-emerald-50 dark:bg-emerald-950' },
};

export function Column({ status, tasks }: ColumnProps) {
  const config = columnConfig[status];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
          {config.title}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </p>
      </div>

      <div className={`flex-1 space-y-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 ${config.color} overflow-y-auto`}>
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-slate-400 dark:text-slate-500">
            <p className="text-sm">No tasks yet</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}
