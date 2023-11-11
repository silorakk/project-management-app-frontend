import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectService } from 'src/app/services/project.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project } from 'src/app/services/types';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-project-modal.component.html',
  styleUrl: './create-project-modal.component.css',
})
export class CreateProjectModalComponent {
  @Input({ required: true }) title: string | null = null;

  activeModal = inject(NgbActiveModal);
  #projectService = inject(ProjectService);

  projectForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  createProject(event: Event) {
    event.preventDefault();
  }
}
