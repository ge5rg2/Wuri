export interface Diary {
  id: string;
  text: any;
  creatorId: string;
}

export interface userState {
  isLoading?: true | false;
  isLoggedIn?: true | false;
  userUid?: string;
}

export interface diaryProps {
  diary: string;
  isOwner: boolean;
}
