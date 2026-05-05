import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';
import { Annotation, AnnotationForm } from '@app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class AnnotationService extends BaseService<Annotation, Annotation, AnnotationForm> {
  constructor() {
    super('ANNOTATIONS', '/annotations')
  }
}
