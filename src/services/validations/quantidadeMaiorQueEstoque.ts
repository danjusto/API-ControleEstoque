import { AppError } from "../../utils/AppError";
import { Validacao } from "./validacao";

export class QuantidadeMaiorQueEstoque implements Validacao {
    quantidade: number;
    estoque_max: number;
    
    constructor(quantidade: number, estoque_max: number) {
        this.quantidade = quantidade;
        this.estoque_max = estoque_max;
    };
    
    executar(): string {

        if (this.quantidade > this.estoque_max) {
            throw new AppError("Quantidade supera o estoque máximo");
        } 
        return "ok";
    }
}