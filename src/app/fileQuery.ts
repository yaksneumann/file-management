import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { FileStore } from './file.store';
import { DocumentState } from './file.model';

@Injectable({ providedIn: 'root' })

export class FileQuery extends Query<DocumentState> {
    
  documents$ = this.select(state => state.documents);
  loading$ = this.select(state => state.loading);
  
  constructor(protected override store: FileStore) {
    super(store);
  }
}