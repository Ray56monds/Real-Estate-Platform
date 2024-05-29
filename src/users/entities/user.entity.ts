import { Prisma } from '@prisma/client';

export class User implements Prisma.User {
  id: number;
  email: string;
  password: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  createdAt: Date;
  updatedAt: Date;
}
