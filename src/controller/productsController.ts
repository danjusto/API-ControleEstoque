import { ProductRepo } from "../repositories/productRepo";
import { ProductsService } from "../services/productsService";
import { Request, Response } from "express";

export class ProductsController {
    async create(request: Request, response: Response) {
        const { sku, nome, quantidade, estoque_max } = request.body;
        
        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        let createdProduct: any;
        try {
            createdProduct = await productService.executeCreate({ sku, nome, quantidade, estoque_max });
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }

        return response.status(201).json(createdProduct);
    }
    
    async remove(request: Request, response: Response) {
        const { id } = request.params

        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        let resposta: any;
        try {
            resposta = await productService.executeDelete(Number(id));
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }

        return response.status(204).json(resposta)
    }

    async showAll(request: Request, response: Response) {
        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        const resposta = await productService.executeShowAll();

        return response.status(200).json(resposta);
    }

    async details(request:Request, response:Response) {
        const { id } = request.params

        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        let product: any;
        try {
            [ product ] = await productService.executeDetails(Number(id));
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }

        return response.status(200).json(product);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params
        const { nome, quantidade, estoque_max } = request.body;

        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        let updatedProduct: any;
        try {
            updatedProduct = await productService.executeUpdate(Number(id), { nome, quantidade, estoque_max });
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }

        return response.status(200).json(updatedProduct)
    }

    async add(request:Request, response:Response) {
        const { id } = request.params
        const { quantidade } = request.body;

        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        let updatedProduct: any;
        try {
            updatedProduct = await productService.executeAdd(Number(id), { quantidade });
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }

        return response.status(200).json(updatedProduct)
    }

    async decrease(request:Request, response:Response) {
        const { id } = request.params
        const { quantidade } = request.body;

        const productRepo = new ProductRepo();
        const productService = new ProductsService(productRepo);

        let updatedProduct: any;
        try {
            updatedProduct = await productService.executeDecrease(Number(id), { quantidade });
        } catch (error: any) {
            return response.status(error.statusCode).json(error.message);
        }

        return response.status(200).json(updatedProduct)
    }
}