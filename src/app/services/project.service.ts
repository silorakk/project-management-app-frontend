import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from './auth.service';
import { Project, Task } from './types';
import { BehaviorSubject, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  #http = inject(HttpClient);

  createProject(name: string) {
    return this.#http.post(
      BASE_URL + '/projects',
      { name },
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
}
