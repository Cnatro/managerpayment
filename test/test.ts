import { PasswordService } from '../src/core/services/auth/password.service';

async function run() {
  const passwordService = new PasswordService();

  const hash = await passwordService.hash('123456');

  console.log(hash);
}

run();
