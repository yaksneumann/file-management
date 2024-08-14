export interface Document {
  id?: string;
  name: string;
  documentDate?: Date;
  documentContent: string;
}

export interface DocumentBody {
  document?: Document;
}

export interface DocumentState {
  documents: Document[];
  loading: boolean;
  error?: string | null;
}

export function createInitialState(): DocumentState {
  return {
    documents: [],
    loading: false,
  };
}
