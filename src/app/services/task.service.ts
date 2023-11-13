import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task, TaskStatus } from './types';
import { BASE_URL } from './auth.service';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  #http = inject(HttpClient);

  #socket = io('http://localhost:8000');

  createTask(projectId: string, name: string, status: TaskStatus) {
    this.#socket.emit('createTask', { projectId, name, status });
  }

  notifyTaskUpdated() {
    this.#socket.emit('message', 'task updated');
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    return this.#http.put<{ task: Task }>(
      BASE_URL + '/tasks/' + taskId + '/status',
      {
        status: newStatus,
      },
      {
        observe: 'response',
      }
    );
  }
}
