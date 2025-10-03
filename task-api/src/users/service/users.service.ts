import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/DTO/user.DTO';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(User)
        private userRepository: Repository<User>
        ) {}

    async create(newUserDto: UserDTO): Promise<User> {
        try {
          const saltOrRounds = 10;
          const hash = await bcrypt.hash(newUserDto.password, saltOrRounds);
          newUserDto.password = hash;
          return await this.userRepository.save(
            this.userRepository.create(newUserDto)
          );
        } catch (error: any) {
          if (error.code === "ER_DUP_ENTRY") {
            throw new HttpException("Email já registrado.", HttpStatus.BAD_REQUEST);
          } else {
            throw new HttpException(
              "Erro ao criar o registro. Tente novamente mais tarde.",
              HttpStatus.INTERNAL_SERVER_ERROR
            );
          }
        }
      }

    async findAll(): Promise<User[]>{
      return await this.userRepository.find({ relations: ['task'] })
    }

    async findById(id: number): Promise<User>{
        const user = await this.userRepository.findOne({
            where: { id_user: id },
            relations: ["task"],
        });

        if (!user){
            throw new HttpException(`Useário não encontrado.`, HttpStatus.NOT_FOUND);
        }
        return user;
    }

}
