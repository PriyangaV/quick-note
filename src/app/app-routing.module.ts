import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { NotesListComponent } from './pages/notes-list/notes-list.component';
import { NoteDetailsComponent } from './pages/note-details/note-details.component';
const routes: Routes = [
  { path: '', component: MainLayoutComponent,children: [
    { path: '', component: NotesListComponent },
    { path: 'new', component: NoteDetailsComponent },
    { path: ':id', component: NoteDetailsComponent },
  ]
  }
];
// Make sure the new route is above the :id route. The ordering of these routes is important because, Angular resolves routes from top to bottom so if the :id route was about the new route and a request was made to '/new' the angular will match the :id route and treat the 'new' string as the id parameter

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
