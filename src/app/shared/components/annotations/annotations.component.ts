import { Component, computed, inject, input, InputSignal, Signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnnotationService } from '@app/shared/services/annotations/annotation.service';
import { ANNOTATION_ENTITY_TYPES } from '@app/shared/types';

@Component({
  selector: 'app-annotations-component',
  imports: [ReactiveFormsModule],
  templateUrl: './annotations.component.html',
  styleUrl: './annotations.component.scss',
})
export class AnnotationsComponent {
  entityId = input.required<string>()
  entityType = input.required<ANNOTATION_ENTITY_TYPES>()

  annotationService = inject(AnnotationService)
  annotations = computed(() => this.annotationService.getByParams({ relatedId: this.entityId(), relatedType: this.entityType() }))

  formControl = new FormControl()

  createAnnotation() {
    let message = this.formControl.value
    let createdItem = this.annotationService.create({ message: message, relatedId: this.entityId(), relatedType: this.entityType() })
    console.log(createdItem)
  }
}
