export class PublicUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    rate: number;
    birthYear: Date;
    userId: number;
    description: string;
    car: string;
}

export class User extends PublicUser {
    password?: string;
}
