import { Injectable } from '@angular/core';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root',
})
export class NotesService extends BaseService<{ title: string, content: string, id: string, createdAt: string | Date },
  { title: string, content: string, createdAt: string | Date, id: string }, { title: string, content: string }> {

  constructor() {
    super('NOTES', '/notes')
  }
}
