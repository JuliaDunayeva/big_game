export class UserData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    horse1_id:string;

    constructor(userName: string, email: string, password: string, confirmPassword: string, horse1_id:string)  {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.horse1_id=horse1_id;
    }
}
