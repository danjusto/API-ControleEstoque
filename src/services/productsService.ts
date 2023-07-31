import { AppError } from "../utils/AppError";
import { QuantidadeMaiorQueEstoque } from "../services/validations/quantidadeMaiorQueEstoque";
import { QuantidadeNegativa } from "../services/validations/quantidadeNegativa";
import { Validacao } from "../services/validations/validacao";

export class ProductsService {

    productRepo: any;

    constructor(productRepo: any) {
        this.productRepo = productRepo;
    }

    async executeCreate({sku, nome, quantidade, estoque_max} : {sku: string, nome: string, quantidade: number, estoque_max: number})  {
        
        const verificaSkuExiste: Array<any> = await this.productRepo.findProductBySku(sku);
        if (verificaSkuExiste.length !== 0) {
            throw new AppError("SKU já cadastrado.")
        }

        const validacoes : Array<Validacao> = [new QuantidadeMaiorQueEstoque(quantidade, estoque_max), new QuantidadeNegativa(quantidade, estoque_max)];
        for (const validacao of validacoes) {
            const resposta = validacao.executar();
            if (resposta !== "ok") {
                return resposta;
            }
        }

        const product = await this.productRepo.insertProduct(nome, quantidade, estoque_max, sku);

        return product;
    }

    async executeUpdate(id: number, { nome, quantidade, estoque_max }: { nome: string, quantidade: number, estoque_max: number}) {

        const product = await this.productRepo.findProductById(id);

        if (product.length === 0) {
            throw new AppError("Produto não existe.")
        }

        const nomeAtualizado = nome ? nome : product[0].name;
        const quantidadeAtualizado = quantidade ? quantidade : product[0].quantidade;
        const estoqueAtualizado = estoque_max ? estoque_max : product[0].estoque_max;

        const validacoes : Array<Validacao> = [new QuantidadeMaiorQueEstoque(quantidadeAtualizado, estoqueAtualizado), new QuantidadeNegativa(quantidadeAtualizado, estoqueAtualizado)];
        for (const validacao of validacoes) {
            const resposta = validacao.executar();
            if (resposta !== "ok") {
                return resposta;
            }
        }

        const updatedProduct = await this.productRepo.updateProduct(nomeAtualizado, quantidadeAtualizado, estoqueAtualizado, id)

        return updatedProduct;
    }

    async executeDelete(id: number) {

        const verificaProdutoExiste: Array<any> = await this.productRepo.findProductById(id);
        if (verificaProdutoExiste.length === 0) {
            throw new AppError("Produto não existe.")
        }

        await this.productRepo.deleteById(id);

        return ("Produto deletado.");
    }

    async executeShowAll() {

        const listaProdutos: Array<any> = await this.productRepo.findAllProducts();

        const listaEstoqueCritico: Array<number> = [];

        for (const produto of listaProdutos) {
            if (produto.quantidade < produto.estoque_max * 0.15) {
                listaEstoqueCritico.push(produto.sku);
            } 
        }

        return {listaProdutos, listaEstoqueCritico};
    }

    async executeDetails(id: number) {

        const product = await this.productRepo.findProductById(id);

        if (product.length === 0) {
            throw new AppError("Produto não existe.")
        }

        return product;
    }

    async executeAdd(id: number, { quantidade } : {quantidade:number}) {

        const product = await this.productRepo.findProductById(id);

        if (product.length === 0) {
            throw new AppError("Produto não existe.")
        }

        const quantidadeTotal = product[0].quantidade + quantidade;

        const validacoes : Array<Validacao> = [new QuantidadeMaiorQueEstoque(quantidadeTotal, product[0].estoque_max), new QuantidadeNegativa(quantidade, product[0].estoque_max), new QuantidadeNegativa(quantidadeTotal, product[0].estoque_max)];
        for (const validacao of validacoes) {
            const resposta = validacao.executar();
            if (resposta !== "ok") {
                return resposta;
            }
        }

        const updatedProduct = await this.productRepo.updateQuantity(quantidadeTotal, id)

        return updatedProduct
    }

    async executeDecrease(id: number, { quantidade } : {quantidade:number}) {

        const product = await this.productRepo.findProductById(id);

        if (product.length === 0) {
            throw new AppError("Produto não existe.")
        }

        const quantidadeTotal = product[0].quantidade - quantidade;

        const validacoes : Array<Validacao> = [new QuantidadeMaiorQueEstoque(quantidadeTotal, product[0].estoque_max), new QuantidadeNegativa(quantidade, product[0].estoque_max), new QuantidadeNegativa(quantidadeTotal, product[0].estoque_max)];
        for (const validacao of validacoes) {
            const resposta = validacao.executar();
            if (resposta !== "ok") {
                return resposta;
            }
        }

        const updatedProduct = await this.productRepo.updateQuantity(quantidadeTotal, id)

        return updatedProduct
    }
}