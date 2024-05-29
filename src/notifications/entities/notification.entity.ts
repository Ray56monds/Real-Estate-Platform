import { Prisma } from '@prisma/client';

export class Notification implements Prisma.Notification {
  id: number;
  message: string;
  type: string;
  recipientId: string;
  createdAt: Date;
}
