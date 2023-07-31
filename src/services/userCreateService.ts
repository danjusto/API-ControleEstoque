import { AppError } from "../utils/AppError";
import { hash } from "bcryptjs";

export class UserCreateService {

    userRepository: any;

    constructor(userRepository: any){
        this.userRepository = userRepository;
    }

    async execute ({ name, email, password }: {name: string, email: string, password: string}) {

        const checkUserExists: Array<any> = await this.userRepository.findByEmail(email);

        if (checkUserExists.length !== 0) {
            throw new AppError("Este e-mail já está em uso.");
        }
    
        const hashedPassword = await hash(password, 8);
    
        const userCreated = await this.userRepository.insertUser({ name, email, password: hashedPassword })

        return userCreated;
    }
}