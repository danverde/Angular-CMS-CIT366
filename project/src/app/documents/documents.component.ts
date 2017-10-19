import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
   documents: Document[];

   constructor() {
      this.documents = MOCKDOCUMENTS;
   }

   ngOnInit() {
   }

   getDocuments() {
      return this.documents.slice();
   }

   getDocument(id: string) {
      this.documents.forEach((doc) => {
         if (doc.id === id) {
            return doc;
         }
      });
      return null;
   }
}