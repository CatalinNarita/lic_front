export interface Gallery {
  id?: number;
  locale?: string;
  name?: string;
  category?: any;
  description?: string;
}

export interface Artifact {
  id?: number;
  locale?: string;
  name?: string;
  tagId?: string;
  textBasic?: string;
  textAdvanced?: string;
}
