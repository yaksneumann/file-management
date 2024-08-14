import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Observable } from 'rxjs';

import { FileService } from '../../file.service';
import { FileQuery } from '../../fileQuery';
import type { Document } from '../../file.model';
@Component({
  selector: 'app-file-context-menu',
  standalone: true,
  imports: [],
  templateUrl: './file-context-menu.component.html',
  styleUrl: './file-context-menu.component.css'
})
export class FileContextMenuComponent {
  private documentQuery = inject(FileQuery);
  private documentService = inject(FileService);

  documents$ = toSignal(this.documentQuery.documents$, { initialValue: [] });
  loading$ = toSignal(this.documentQuery.loading$, { initialValue: false });
  
  ngOnInit(): void {
    this.documentService.loadDocuments().subscribe();
  }

  // get documents() {
  //   return this.documents
  //   return this.fileService.loadDocuments();
  // }

  onDownloadFile(documentId: any) {
    this.documentService.downloadDocument(documentId).subscribe();
    // this.fileService.downloadDocument(documentId).subscribe(blob => {
    //   const url = window.URL.createObjectURL(blob);
    //   const a = document.createElement('a');
    //   a.href = url;
    //   a.download = 'document'; // You might want to get the actual file name
    //   document.body.appendChild(a);
    //   a.click();
    //   window.URL.revokeObjectURL(url);
    // });
  }

}