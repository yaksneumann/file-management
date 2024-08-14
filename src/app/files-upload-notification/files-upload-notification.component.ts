import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FileService } from '../file.service';
// import { FileQuery } from '../fileQuery';
import type { Document } from '../file.model';

@Component({
  selector: 'app-files-upload-notification',
  standalone: true,
  imports: [],
  templateUrl: './files-upload-notification.component.html',
  styleUrl: './files-upload-notification.component.css'
})
export class FilesUploadNotificationComponent implements OnInit {

  ngOnInit(): void {}
}
