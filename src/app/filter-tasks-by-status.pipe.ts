import { Pipe, PipeTransform } from '@angular/core';
import { Task, TaskStatus } from './services/types';

@Pipe({
  name: 'filterTasksByStatus',
  standalone: true,
})
export class FilterTasksByStatusPipe implements PipeTransform {
  transform(res: { tasks: Task[] } | null, status: TaskStatus): Task[] {
    return res?.tasks.filter((item) => item.status === status) ?? [];
  }
}
