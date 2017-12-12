import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/Http';
import 'rxjs/Rx';

@Injectable()
export class DocumentService {
   documentSelectedEvent = new EventEmitter<Document>(); // to be deleted
   documentListChangedEvent = new Subject<Document[]>();
   documents: Document[] = [];
   maxDocumentId: number;

   constructor(private http: Http) {
       this.initDocuments();
   }

   initDocuments() {
       this.http.get('http://localhost:3000/documents')
       .map((response: Response) => {
           const docs: Document[] = response.json();
           return docs;
       }).subscribe((documents: Document[]) => {
        // console.log('docs:', documents);
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next([...this.documents]);
       });
   }

   storeDocuments() {
       const docs = JSON.stringify(this.documents);
       this.http.put('http://localhost:3000/documents', docs)
       .subscribe(() => {
           this.documentListChangedEvent.next([...this.documents]);
       });
   }

   getDocuments() {
      return [...this.documents];
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

   getMaxId (): number {
    let maxId = 0;
    this.documents.forEach((document: Document) => {
        const currId = +document.id;
        if (currId > maxId) {
            maxId = currId;
        }
    });
    return maxId;
   }

   addDocument (newDoc: Document) {
    if (newDoc === undefined || newDoc === null) {
        return;
    }
    this.maxDocumentId++;
    newDoc.id = this.maxDocumentId.toString();
    this.documents.push(newDoc);
    this.storeDocuments();
   }

   updateDocument(originalDoc: Document, newDoc: Document) {
    if (originalDoc === null || originalDoc === undefined || newDoc === null || newDoc === undefined) {
        return;
    }
    const pos = this.documents.indexOf(originalDoc);
    if (pos < 0) {
        return;
    }

    newDoc.id = originalDoc.id;
    this.documents[pos] = newDoc;
    this.storeDocuments();
   }

    deleteDocument(document: Document) {
    if (document === null || document === undefined) {
        return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
        return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
   }
}
