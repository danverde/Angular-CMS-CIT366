import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   selectedSection = 'Documents';
   switchView(section: string){
      this.selectedSection = section;
   }
}
