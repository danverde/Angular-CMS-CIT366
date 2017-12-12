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
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next([...this.documents]);
       });
   }

   /* storeDocuments() {
       const docs = JSON.stringify(this.documents);
       this.http.put('http://localhost:3000/documents', docs)
       .subscribe(() => {
           this.documentListChangedEvent.next([...this.documents]);
       });
   } */

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
    if (!newDoc) {
        return;
    }

    newDoc.id = '';
    const strDoc = JSON.stringify(newDoc);

    this.http.post('http:/localhost:3000/documents', strDoc)
    .map((res) => {
        return res.json().obj;
    })
    .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next([...this.documents]);
    });
   }

   updateDocument(originalDoc: Document, newDoc: Document) {
    if (!originalDoc || !newDoc) {
        return;
    }
    const pos = this.documents.indexOf(originalDoc);
    if (pos < 0) {
        return;
    }

    const strDoc = JSON.stringify(newDoc);
    this.http.patch(`http://localhost:3000/documents/${originalDoc.id}`, strDoc)
    .map((res: Response) => {
        return res.json().obj;
    })
    .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next([...this.documents]);
    });
}

deleteDocument(document: Document) {
    if (!document) {
        return;
    }
    this.http.delete(`http://localhost:3000/documents/${document.id}`)
    .map((res) => {
        return res.json().obj;
    }).subscribe((documents: Document[]) => {
        this.documents = documents;
        this.documentListChangedEvent.next([...this.documents]);
    });
   }
}
