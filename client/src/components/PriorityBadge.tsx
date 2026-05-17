import { Priority } from '@/reducers/boardReducer';
import { Badge } from '@/components/ui/badge';

interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const variants: Record<Priority, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; className: string }> = {
    Low: { variant: 'secondary', className: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200' },
    Medium: { variant: 'secondary', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' },
    High: { variant: 'destructive', className: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200' },
  };

  const config = variants[priority];

  return (
    <Badge variant={config.variant} className={config.className}>
      {priority}
    </Badge>
  );
}
