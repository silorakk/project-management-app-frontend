import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task, TaskStatus } from './types';
import { BASE_URL } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  #http = inject(HttpClient);

  createTask(projectId: string, name: string, status: TaskStatus) {
    console.log(status);
    return this.#http.post<{ task: Task }>(BASE_URL + '/tasks', {
      projectId: projectId,
      name: name,
      status: status,
    });
  }
}
