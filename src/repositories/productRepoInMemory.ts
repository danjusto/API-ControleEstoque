export class ProductRepoInMemory {
    products: Array<any> = [];
    current_id = 1;

    async findProductById(id: number) { 
        const product = this.products.find((product: any) => product.id === id);
        if (!product) {
            return [];
        }
        return [product];
    }

    async findAllProducts() {
        return this.products;
    }

    async findProductBySku(sku: string) {
        const product = this.products.find((product: any) => product.sku === sku);
        if (!product) {
            return [];
        }
        return [product];
    }

    async deleteById(id: number) {
        const index = this.products.findIndex((product: any) => product.id === id);

        return [this.products.splice(index, 1)];
    }

    async updateProduct(nome: string, quantidade: number, estoque_max: number, id: number) {
        const index = this.products.findIndex((product: any) => product.id === id);

        this.products[index].nome = nome;
        this.products[index].quantidade = quantidade;
        this.products[index].estoque_max = estoque_max;

        return [this.products[index]];
    }

    async insertProduct(nome: string, quantidade: number, estoque_max: number, sku: string) {
        const product = {
            id: this.current_id,
            sku,
            nome,
            estoque_max,
            quantidade
        };

        this.products.push(product);

        this.current_id++;

        return [product];
    }

    async updateQuantity(quantidade: number, id: number) {
        const index = this.products.findIndex((product: any) => product.id === id);

        this.products[index].quantidade = quantidade; 

        const product = await this.findProductById(id);

        return product;
    }
}