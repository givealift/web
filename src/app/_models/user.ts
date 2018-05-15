export class PublicUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    rate: number;
    birthYear: Date
}

export class User extends PublicUser {
    id?: number;
    password?: string;
}