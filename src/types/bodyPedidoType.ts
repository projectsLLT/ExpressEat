export type bodyPedidoType = {
    descricao:String,
    preco:number,
    statusEntrega?: 'ongoing' | 'delivered' | 'preparing' | 'canceled',
    statusPagamento?: 'pending' | 'confirmed' | 'canceled',
    usuario: string,
    quantidadeItens?: number,
    idItens: string[]
}