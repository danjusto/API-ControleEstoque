export class ProdutoValidado {

    sku: string;
    nome: string;
    validacao: string

    constructor(sku:string, nome:string, validacao:string) {
      this.sku = sku;
      this.nome = nome;
      this.validacao = validacao;
    }
}