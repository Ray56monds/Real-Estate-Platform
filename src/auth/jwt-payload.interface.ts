import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadInterface extends JwtPayload {
  userId: string;
  username: string;
  email: string;
  roles: string[];
}
