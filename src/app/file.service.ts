import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FileStore } from './file.store';
import type { Document } from './file.model';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private http = inject(HttpClient);
  private fileStore = inject(FileStore);
  private errorService = inject(ErrorService);

  private apiUrl = 'https://localhost:5001/';

  loadDocuments(): Observable<Document[]> {
    // return this.http.get<Document[]>(`${this.apiUrl}documents`);
    this.fileStore.setLoading(true);
    return this.http.get<Document[]>(`${this.apiUrl}documents`).pipe(
      tap(documents => {
        console.log('documents data :');
        this.fileStore.update({ documents, error: null });
      }),
      catchError(error => {
        this.fileStore.setError(error);
        throw error;
      }),
      tap(() => {
        console.log('documents data  2:');
        this.fileStore.setLoading(false)}
    ));
  }

  downloadDocument(documentId: string) {
    this.fileStore.setLoading(true);
    return this.http.get(`${this.apiUrl}document/${documentId}`).pipe(
      tap(() => this.fileStore.setLoading(false)),
      catchError(error => {
        this.fileStore.setError(error);
        throw error;
      })
    );
  }

  uploadDocument(document: Document): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    console.log('data:', document);
    return this.http.post<string>(`${this.apiUrl}document`, document, { headers }).pipe(
      tap(data => {        
        console.log('new data  :', document);
        this.errorService.showError(data);
        this.fileStore.update(state => ({
          documents: [...state.documents, document],
          error: null
        }));
        console.log('fileStore val' + this.fileStore.getValue());
        
      }),
      catchError(error => {
        this.errorService.showError(error);
        console.log('catchError er  :', error);
        this.fileStore.setError(error);
        throw error;
      }),
      tap(() => this.fileStore.setLoading(false))
    );
  }

}
