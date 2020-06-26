export class UserData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    passes: number;
    equus: number;
    created: Date;

    constructor(userName: string, email: string, password: string,
        confirmPassword: string, passes: number, equus: number, created: Date) {
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.passes = passes;
        this.equus = equus;
        this.created = created
    }
}
