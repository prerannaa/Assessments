export interface IUserRegister {
  body: { email: string; username: string; password: string; };
}

export interface IUserLogin {
  body: { username: string; password: string };
}   