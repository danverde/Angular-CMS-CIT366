import { ContactsComponent } from './contacts/contacts.component';
import { MessagesComponent } from './messages/messages.component';
import { DocumentsComponent } from './documents/documents.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
   {path: '', redirectTo: '/documents', pathMatch: 'full'},
   {path: 'documents', component: DocumentsComponent},
   {path: 'messages', component: MessagesComponent},
   {path: 'contacts', component: ContactsComponent}
];

@NgModule({
   imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})

export class AppRoutingModule {

}
