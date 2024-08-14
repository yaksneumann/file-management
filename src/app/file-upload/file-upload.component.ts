import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileService } from '../file.service';
// import { FileQuery } from '../fileQuery';
import { type Document } from '../file.model';
import { FormsModule } from '@angular/forms';
import { ErrorDisplayComponent } from '../error-display.component';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [FormsModule, ErrorDisplayComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})

export class FileUploadComponent implements OnInit {
  private documentService = inject(FileService);

  private selectedFile = signal<any | null>(null);
  fileAsBase64 = signal<string>('');
  isFileValid = signal(false);
  errorMessage = signal('');
  fileTitle: string = '';
  
  //fileName = computed(() => this.fileTitle ?? this.selectedFile()?.name ?? '');

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile.set(fileList[0]);
      this.validateFile();
    }
  }

  private validateFile(): void {
    const file = this.selectedFile();
    if (file) {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        this.isFileValid.set(true);
        this.errorMessage.set('');
        this.encodeFileToBase64(file);
      } else {
        this.isFileValid.set(false);
        this.errorMessage.set('נא לבחור קובץ!');
      }
    }
  }

  private encodeFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      this.fileAsBase64.set(result.split(',')[1]);
    };
  }

  onUpload(): void {
    if (this.isFileValid()) {
      const docName = this.fileTitle || this.selectedFile().name;
       //console.log('File Name:', docName);


      const file: Document = {
        documentContent: this.fileAsBase64(),
        name: this.fileTitle || this.selectedFile().name
      };
      this.documentService.uploadDocument(file).subscribe();
        // this.documentService.uploadDocument(this.fileAsBase64(), this.fileName())
        //   .subscribe({
        //     next: (response) => console.log('Upload successful', response),
        //     error: (error) => console.error('Upload failed', error)
        //   });

    }
  }

}
