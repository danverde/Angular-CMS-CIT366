import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocumentEvent = new EventEmitter<Document>();
   
documents: Document[] = [
   new Document('1', 'doc1', 'This is the first Document', 'www.google.com'),
   new Document('2', 'doc2', 'This is the second Document', 'www.google.com'),
   new Document('3', 'doc3', 'This is the third Document', 'www.google.com'),
   new Document('4', 'doc4', 'This is the fourth Document', 'www.google.com')
];
   
  constructor() { }

  ngOnInit() {
  }

   onSelectedDocument(document: Document){
      this.selectedDocumentEvent.emit(document);
   }
   
}
