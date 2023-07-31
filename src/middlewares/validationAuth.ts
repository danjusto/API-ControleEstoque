import { AppError } from "../utils/AppError";
import authConfig from "../config/auth";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

function validationAuth(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        return response.status(401).json({ erro: "JWT não informado"});
    }

    const [, token] = authHeader.split(" ");

    try {
        verify(token, authConfig.jwt.secret);
        return next();
    } catch (error: any) {
        return response.status(401).json({ erro: "Erro com JWT"});
    }
}

export default validationAuth;