export class PublicUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    rate: number;
    birthDate: Date;
    userId: number;
    description: string;
    car: string;
    address: string;
}

export class User extends PublicUser {
    password?: string;
}
