import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:5001/';

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}documents`);
  }

  getDocument(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}document/${name}`);
  }

  uploadDocument(name: string, documentContent: string): Observable<any> {
    const formData = new FormData();
    formData.append('documentContent', documentContent);
    formData.append('name', name);

    const headers = new HttpHeaders();
    
    return this.http.post<any>(`${this.apiUrl}document`, formData, { headers });
  }

}
