import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentService {
   documents: Document[] = [];
   constructor() {
      this.documents = MOCKDOCUMENTS;
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
