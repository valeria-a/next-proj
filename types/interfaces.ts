export interface IUserData {
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        imgUrl: string
    } | null
}

export enum UserActionType {
    Login,
}


export interface INotifyData {
    status: string,
    msg: string
}

export enum NotificationStatus {
    Success, 
    Error,
    Warn
}