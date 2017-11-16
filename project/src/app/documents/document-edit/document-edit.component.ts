import { Document } from './../document.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DocumentService } from './../document.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  document: Document;
  originalDocument: Document;
  editMode = false;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }


    onSubmit(form: NgForm) {
      const values = form.value;

      const newDoc = new Document(null, values.name, values.description, values.docUrl, null);

      if (this.editMode === true) {
        this.documentService.updateDocument(this.originalDocument, newDoc);
      } else {
        this.documentService.addDocument(newDoc);
      }
      this.router.navigate(['/documents'], {relativeTo: this.route});
    }

    onCancel() {
      this.router.navigate(['/documents'], {relativeTo: this.route});
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (id === undefined || id === null){
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if (this.originalDocument === undefined || this.originalDocument === null) {
        return;
      }

      this.editMode = true;
      // Object.assign(this.document, this.originalDocument);
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

}
