import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {
   documentSelectedEvent = new EventEmitter<Document>();
   documentChangedEvent = new EventEmitter<Document[]>();
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

   deleteDocument(document: Document) {
    if (document === null) {
        return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
   }
}
