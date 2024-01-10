export interface IMessageResponse{
    message:string,
    status:number,
}
export interface ILoginMessageResponse{
    message:string,
    status:number,
    data:{
        accessToken:string,
        refreshToken:string
    }
}