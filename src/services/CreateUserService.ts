import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import User from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new Error('Email addres already used');
    }

    const hasedPassword = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hasedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
