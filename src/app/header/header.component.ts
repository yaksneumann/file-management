import { Component, OnInit, inject } from '@angular/core';
import { FileService } from '../file.service';
// import { FileQuery } from '../fileQuery';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private documentService = inject(FileService);

  counter: number = 0;

  ngOnInit(): void {
    this.loadDocuments();
    //this.documentService.loadDocuments().subscribe();
  }

  onCircle() {
    console.log('fire list');
  }

  loadDocuments() {
    this.documentService.loadDocuments().subscribe({
      next: (documents) => {
        console.log('loadDocuments successful', documents)
        this.counter = documents.length;
      },
      error: (error) => console.error('loadDocuments failed', error),
    });
  }
}
