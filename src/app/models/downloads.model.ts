export interface DownloadsModel {
  downloads: Download[];
}

export interface Download {
  id: number;
  title: string;
  img: string;
}
