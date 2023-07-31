export interface Validacao {
    quantidade: number;
    estoque_max: number;
    executar(): string;
}