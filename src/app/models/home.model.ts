export interface HomeModel {
  spotlight: Spotlight;
  sections: Section[];
}

export class Section {
  id!: number;
  title!: string;
  type!: string;
  series: Series[] = [
    {
      id: 0,
      progress: 0,
      title: "",
      season: "",
    },
    {
      id: 1,
      progress: 0,
      title: "",
      season: "",
    },
    {
      id: 2,
      progress: 0,
      title: "",
      season: "",
    },
  ];
}

export class Series {
  id!: number;
  progress!: number;
  title?: string;
  season?: string;
}

export class Spotlight {
  id!: number;
  name!: string;
  rating!: string;
  desc!: string;
}
