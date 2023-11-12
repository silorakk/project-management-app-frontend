import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from 'src/app/services/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;

  #router = inject(Router);

  navigateToProject() {
    this.#router.navigateByUrl('projects/' + this.project.id);
  }
}
