import { DiskStorage } from "../utils/DiskStorage";
import { Request, Response } from "express";
import { ProductRepo } from "../repositories/productRepo";
import { FileService } from "../services/fileService";

export class FilesController {
    async validate(request:any, response: Response) {
        const { file } = request;
        const diskStorage = new DiskStorage;
        const productRepo = new ProductRepo();
        const fileService = new FileService(productRepo);

        try {
            await diskStorage.saveFile(file.filename);
        } catch (e: any) {
            return response.status(400).json("Falha ao receber o arquivo. Verifique se o arquivo é um .csv")
        }

        let listaProdutos;
        try {
            listaProdutos = await fileService.validate();
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message)
        }

        return response.status(200).json(listaProdutos);
    }

    async create(request: Request, response: Response) {
        const diskStorage = new DiskStorage;

        const productRepo = new ProductRepo();
        const fileService = new FileService(productRepo);

        const listaProdutos = await fileService.create();

        await diskStorage.deleteFile("file.csv");

        return response.status(201).json(listaProdutos);
    }
}