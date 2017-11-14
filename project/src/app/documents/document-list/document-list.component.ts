import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
   documents: Document[] = [];
   private subscription: Subscription;

   constructor(private documentService: DocumentService) {
   }

   ngOnInit() {
     this.documents = this.documentService.getDocuments();
     this.documentService.documentListChangedEvent
      .subscribe((documents: Document[]) => {
        this.documents = documents;
      });
   }

   ngOnDestroy() {
    this.subscription.unsubscribe();
   }
}
