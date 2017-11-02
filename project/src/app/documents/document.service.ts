import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {
   documentSelectedEvent = new EventEmitter<Document>();
   documents: Document[] = [];
   constructor() {
      this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
      return this.documents.slice();
   }

   getDocument(id: string) {
      let doc: Document;
      this.documents.forEach((document) => {
         if (document.id === id) {
            doc = document;
         }
      });
      return doc;
   }
}
