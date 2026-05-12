import * as bcrypt from 'bcrypt';

export class PasswordService {
  async hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
