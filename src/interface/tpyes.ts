export interface Diary {
  id: string;
  text: any;
  creatorId: string;
}

export interface Comment {
  id: string;
  text: string;
  creatorId: string;
  diaryid: string;
}

export interface commentUser {
  userName: string;
  userUrl: string;
}

export interface userState {
  isLoading?: true | false;
  isLoggedIn?: true | false;
  userUid?: string;
  userName?: string | null;
  userUrl?: string | null;
  coupleId?: string | null;
  coupleName?: string | null;
  coupleUrl?: string | null;
}

export interface diaryProps {
  doc: string;
  diary: string;
  obj: any;
}

export interface menuState {
  isProfile: boolean;
  isMenu: boolean;
  isCouple: boolean;
  isDiary: boolean;
}

export interface commentProps {
  info: any;
}
