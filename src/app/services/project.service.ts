import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from './auth.service';
import { Project, Task } from './types';
import { BehaviorSubject, Subject, switchMap, tap, Observable } from 'rxjs';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  #http = inject(HttpClient);

  #socket = io('http://localhost:8000');
  message$: BehaviorSubject<Task> = new BehaviorSubject({} as Task);

  createProject(name: string) {
    return this.#http.post(
      BASE_URL + '/projects',
      { name },
      { observe: 'response' }
    );
  }

  joinRoom(projectId: string) {
    this.#socket.emit('joinRoom', projectId);
  }

  leaveRoom(projectId: string) {
    this.#socket.emit('leaveRoom', projectId);
  }

  inviteMemberToProject(projectId: string, email: string) {
    return this.#http.post<{ msg: string }>(
      BASE_URL + '/projects/' + projectId + '/invite',
      {
        email: email,
      },
      { observe: 'response' }
    );
  }

  getUserProjects() {
    return this.#http.get<{ projects: Project[] }>(BASE_URL + '/projects');
  }

  getProject(projectId: string) {
    return this.#http.get<{ project: Project }>(
      BASE_URL + '/projects/' + projectId
    );
  }

  getAllProjectTasks(projectId: string) {
    return this.#http.get<{ tasks: Task[] }>(
      BASE_URL + '/projects/' + projectId + '/tasks'
    );
  }

  getNewProjectTask(projectId: string) {
    this.#socket.on('message', (task: Task) => {
      this.message$.next(task);
    });

    return this.message$.asObservable();
  }
}
