export interface AccountModel {
  profiles: Profile[];
}

export interface Profile {
  id: number;
  name: string;
  img: string;
}
