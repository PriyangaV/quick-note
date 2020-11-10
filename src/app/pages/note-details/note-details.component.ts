import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from '../../shared/note.model';
import { NotesService } from '../../shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {

  note: Note;

  noteId: number;

  new: boolean;

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    // we wanna find out if we're creating a new note or editing an existing one

    // an observer is just a callback function which will be executed each time a new message is emitted from the observable, which is this case is the params observable.

    // This callback will be executed each time there's a change in the route parameters.

    this.route.params.subscribe((params: Params) => {
      this.note = new Note();
      this.note.title = 'Untitled Note';
      if(params.id) {
        this.note = this.notesService.get(params.id);
        this.noteId = params.id;
        this.new = false;
      } else {
        this.new = true;
      }
    })
  }

  onSubmit(form: NgForm) {
    if(this.new) {
      // we should save the note
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl('/');
  }

  cancelNote() {
    this.router.navigateByUrl('/');
  }

}
