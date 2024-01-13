export interface ISignupData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string | undefined;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IProfileImage {
    type: "image";
    url: string;
    position?: number;
}