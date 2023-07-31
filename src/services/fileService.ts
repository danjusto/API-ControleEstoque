import { AppError } from "../utils/AppError";
import { ProdutoValidado } from "../models/produtoValidado";
import { Validacao } from "../services/validations/validacao";
import { QuantidadeMaiorQueEstoque } from "../services/validations/quantidadeMaiorQueEstoque";
import { QuantidadeNegativa } from "../services/validations/quantidadeNegativa";
import csv from "csvtojson";

export class FileService {
    productRepo: any;

    constructor(productRepo: any) {
        this.productRepo = productRepo;
    }

    async validate() {
        
        const listaFinal: Array<ProdutoValidado> = [];

        const lista = await csv().fromFile("./tmp/uploads/file.csv");

        if (lista.length === 0) {
            throw new AppError("Arquivo .csv não possui nenhum registro.");
        }

        for (const item of lista) {
            const estoque_max = parseInt(item.estoque_max);
            const quantidade = parseInt(item.quantidade);
            const validacoes: Array<Validacao> = [new QuantidadeMaiorQueEstoque(quantidade, estoque_max), new QuantidadeNegativa(quantidade, estoque_max)];
            for (const validacao of validacoes) {
                const resposta = validacao.executar();
                if (resposta !== "ok") {
                    listaFinal.push(new ProdutoValidado(item.sku, item.nome, resposta));
                    break;
                }
            }
            listaFinal.push(new ProdutoValidado(item.sku, item.nome, "ok"));
        }

        return listaFinal;
    }

    async create() {

        const lista = await csv().fromFile("./tmp/uploads/file.csv");

        for (const item of lista) {
            const estoque_max = parseInt(item.estoque_max);
            const quantidade = parseInt(item.quantidade);
            await this.productRepo.insertProduct(item.nome, quantidade, estoque_max, item.sku)
        }

        const listaProdutos: Array<any> = await this.productRepo.findAllProducts();

        return listaProdutos;
    }
}