import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { ErrorDisplayComponent } from './error-display.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ErrorDisplayComponent, FileUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'file-management';
}
