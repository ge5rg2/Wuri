export interface Diary {
  id: string;
  text: any;
  creatorId: string;
}

export interface userState {
  isLoading?: true | false;
  isLoggedIn?: true | false;
  userUid?: string;
  userName?: string | null;
  userUrl?: string | null;
}

export interface diaryProps {
  diary: string;
  isOwner: boolean;
  obj: any;
}

export interface menuState {
  isProfile: boolean;
  isMenu: boolean;
}
