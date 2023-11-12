import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { BehaviorSubject, Observable, Subject, map, of, switchMap } from 'rxjs';
import { Project, Task, TaskStatus } from '../services/types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterTasksByStatusPipe } from '../filter-tasks-by-status.pipe';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FilterTasksByStatusPipe,
  ],
})
export class ProjectsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #projectService = inject(ProjectService);
  #taskService = inject(TaskService);
  #refreshTasks = new BehaviorSubject<boolean>(false);
  projectId: string | null = null;
  project$: Observable<{ project: Project | null }> = of({ project: null });
  tasks$: Observable<{ tasks: Task[] }> = of({ tasks: [] });

  // Add card expansions for each column
  isAddBacklogExpanded = signal(false);
  isAddTodoExpanded = signal(false);
  isAddDoingExpanded = signal(false);
  isAddDoneExpanded = signal(false);

  // enums
  backlogStatus = TaskStatus.BACKLOG;
  doingStatus = TaskStatus.DOING;
  todoStatus = TaskStatus.TODO;
  doneStatus = TaskStatus.DONE;

  // inputs
  backlogInput = '';
  doingInput = '';
  todoInput = '';
  doneInput = '';

  ngOnInit(): void {
    this.#route.paramMap.subscribe((paramMap) => {
      this.projectId = paramMap.get('id');
      if (this.projectId) {
        this.project$ = this.#projectService.getProject(this.projectId);
        this.tasks$ = this.#refreshTasks.pipe(
          switchMap(() =>
            this.#projectService.getAllProjectTasks(this.projectId as string)
          )
        );
      }
    });
  }

  addTask(taskName: string, status: TaskStatus) {
    console.log('adding task');
    this.#taskService
      .createTask(this.projectId as string, taskName, status)
      .subscribe(() => {
        this.#refreshTasks.next(true);
      });

    if (status === TaskStatus.BACKLOG) {
      this.isAddBacklogExpanded.set(false);
      this.backlogInput = '';
    }
    if (status === TaskStatus.DOING) {
      this.isAddDoingExpanded.set(false);
      this.doingInput = '';
    }
    if (status === TaskStatus.TODO) {
      this.isAddTodoExpanded.set(false);
      this.todoInput = '';
    }
    if (status === TaskStatus.DONE) {
      this.isAddDoneExpanded.set(false);
      this.doneInput = '';
    }
  }
}
