import { Request, Response } from "express";
import { UserRepository } from "../repositories/userRepo"
import { SessionCreateService } from "../services/sessionsCreateService";

export class SessionsController {
    async create(request: Request, response: Response) {
      const { email, password } = request.body;
      
      const userRepository = new UserRepository();
      const sessionCreateService = new SessionCreateService(userRepository);
  
      const { user, token } = await sessionCreateService.execute({ email, password });
  
      return response.status(201).json({ user, token });
    }
}