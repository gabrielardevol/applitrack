import { Component, inject } from '@angular/core';
import { NotesService } from '@app/shared/services/notes/notes-service';

@Component({
  selector: 'app-notes-page',
  imports: [],
  templateUrl: './notes-page.html',
  styleUrl: './notes-page.scss',
})
export class NotesPage {
  notesService = inject(NotesService)
  notes = this.notesService.$listValue()
}
