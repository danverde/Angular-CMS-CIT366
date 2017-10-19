import { Component, OnInit, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
   documents: Document[] = [];

   constructor(private documentService: DocumentService) {
      this.documents = documentService.getDocuments();
   }

   ngOnInit() {
   }

   onSelectedDocument(document: Document) {
      // this.documentService.selectedDocumentEvent.emit(document);
   }

}