import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Project, User } from '../services/types';
import { BehaviorSubject, Observable, Subject, of, switchMap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectModalComponent } from '../shared/components/create-project-modal/create-project-modal.component';
import { ProjectService } from '../services/project.service';
import { ProjectCardComponent } from '../components/project-card/project-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, CreateProjectModalComponent, ProjectCardComponent],
})
export class HomeComponent {
  #authService = inject(AuthService);
  #projectService = inject(ProjectService);

  isLoggedIn = this.#authService.isAuthenticated;
  user$: Observable<User | null> = of(null);
  refresh$ = new BehaviorSubject<string>('');
  userProjects$: Observable<{ projects: Project[] }>;

  #modalService = inject(NgbModal);

  constructor() {
    this.userProjects$ = this.refresh$.pipe(
      switchMap(() => this.#projectService.getUserProjects())
    );

    effect(() => {
      this.user$ = this.#authService.getUser();
    });
  }

  async openCreateProjectModal() {
    const modalRef = this.#modalService.open(CreateProjectModalComponent);
    modalRef.componentInstance.title = 'Create Project';
    modalRef.result.then((res) => {
      const name = modalRef.componentInstance.projectForm.controls.name.value;
      if (name !== null) {
        this.#projectService.createProject(name).subscribe(() => {
          this.refresh$.next('');
        });
      }
    });
  }
}
