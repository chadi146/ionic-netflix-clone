export class DetailModel {
  title!: string;
  desc!: string;
  match!: number;
  cast: string[] = ["", "", "", ""];
  spotlight!: string;
  year!: number;
  seasons!: number;
  episodes: Episode[] = [
    {
      id: 0,
      title: "",
      duration: "",
      desc: "",
    },
    {
      id: 1,
      title: "",
      duration: "",
      desc: "",
    },
    {
      id: 2,
      title: "",
      duration: "",
      desc: "",
    },
  ];
}

export class Episode {
  id!: number;
  title!: string;
  duration!: string;
  desc!: string;
}
