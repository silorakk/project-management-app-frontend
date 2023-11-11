import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from 'src/app/services/types';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}
