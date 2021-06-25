export interface UserData {
  email: string;
  password: string;
  token: string;
}

export interface State {
  user: any;
}

export interface Action {
  type: string;
  payload?: any;
}
