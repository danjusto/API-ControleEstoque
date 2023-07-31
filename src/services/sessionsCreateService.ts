import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { AppError } from "../utils/AppError";

export class SessionCreateService {
    userRepository: any;

    constructor(userRepository: any){
        this.userRepository = userRepository;
    }
  
    async execute ({ email, password }: { email: string, password: string }) {
  
        const user: Array<any> = await this.userRepository.findByEmail(email);
            
        if(user.length === 0) {
            throw new AppError("E-mail e/ou senha incorreta.", 401);
        }
    
        const passwordMatched = await compare(password, user[0].password);
        if(!passwordMatched) {
            throw new AppError("E-mail e/ou senha incorreta.", 401);
        }
    
        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: email,
            expiresIn       
        })

        const userAuth = { user, token };

        return userAuth;
    }
}