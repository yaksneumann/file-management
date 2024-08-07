export interface Document {
  id?: string;
  name: string;
  documentDate: Date;
  /**
   * base64 of the file to be uploaded
   */
  documentContent?: string;
}

export interface DocumentBody {
  document?: Document;
}
