export interface ActivityDto {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    completed?: boolean;
    idUser: number;
    activated?: boolean;
}

