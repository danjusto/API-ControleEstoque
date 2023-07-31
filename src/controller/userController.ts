import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepo";
import { UserCreateService } from "../services/userCreateService"

export class UsersController {
    async create(request: Request, response: Response) {
        const { name, email, password } = request.body;
        
        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);
        
        let newUser: any;
        try {
            newUser = await userCreateService.execute({ name, email, password });
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }
    
        return response.status(201).json(newUser);
    }
}