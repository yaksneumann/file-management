import { Component, inject, signal, computed } from '@angular/core';
import { FileService } from '../file.service';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  private documentService = inject(FileService);
  // private selectedFile: string | null = null;



  private selectedFile = signal<File | null>(null);
  fileName = computed(() => this.selectedFile()?.name ?? '');
  fileAsBase64 = signal<string>('');
  isFileValid = signal(false);
  errorMessage = signal('');

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
        this.errorMessage.set('Please select a PDF or DOCX file.');
      }
    }
  }

  private encodeFileToBase64(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL part
      this.fileAsBase64.set(result.split(',')[1]);
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }

  onUpload(): void {

    this.documentService.getDocuments()
          .subscribe({
            next: (response) => console.log('getDocuments successful', response),
            error: (error) => console.error('getDocuments failed', error)
          });


    if (this.isFileValid()) {
      console.log('File Name:', this.fileName());
      console.log('File as Base64:', this.fileAsBase64());

      //if (this.selectedFile) {
        this.documentService.uploadDocument(this.fileName(), this.fileAsBase64())
          .subscribe({
            next: (response) => console.log('Upload successful', response),
            error: (error) => console.error('Upload failed', error)
          });
     // }

    }
  }


}
