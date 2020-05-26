export class UserData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    horse1_id:string;
    passes: number;
    equus: number;

    constructor(userName: string, email: string, password: string, 
        confirmPassword: string, passes: number, equus: number)  {
            // horse1_id:string
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        //this.horse1_id=horse1_id;
        this.passes=passes;
        this.equus=equus;
    }
}
