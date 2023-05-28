export interface ComingSoonModel {
  comingSoon: ComingSoon[];
}

export interface ComingSoon {
  id: number;
  title: string;
  desc: string;
  date: string;
  tags: TagItem[];
  video: string;
}

export interface TagItem {
  id: number;
  tag: string;
}
