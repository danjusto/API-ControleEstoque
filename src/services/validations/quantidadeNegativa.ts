import { AppError } from "../../utils/AppError";
import { Validacao } from "./validacao";

export class QuantidadeNegativa implements Validacao {
    quantidade: number;
    estoque_max: number;

    constructor(quantidade: number, estoque_max: number) {
        this.quantidade = quantidade;
        this.estoque_max = estoque_max;
    };

    executar(): string {

        if (this.quantidade < 0) {
            throw new AppError("Quantidade (inserida ou total) não pode ser negativa");
        }
        return "ok";
    }
}