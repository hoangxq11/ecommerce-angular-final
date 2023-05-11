export class Account {
    id!: string;
    username!: string;
    role!: string;
    email!: string;
}

export class AccountRegister {
    username!: string;
    email!: string;
    authorities!: string[];
    password!: string;
}