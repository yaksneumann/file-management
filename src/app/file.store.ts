import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { DocumentState, createInitialState } from './file.model';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'documents' })

export class FileStore extends Store<DocumentState> {
  constructor() {
    super(createInitialState());
  }
}