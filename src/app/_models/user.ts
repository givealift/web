export class PublicUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    rate: number;
    birthYear: Date;
    userId: number;
}

export class User extends PublicUser {
    password?: string;
}
