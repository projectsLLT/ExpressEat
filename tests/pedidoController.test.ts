import PedidoRepository from '../src/repositories/PedidoRepository';
import Pedido from '../src/model/Pedido';
import mongoose from 'mongoose';

jest.mock('../src/model/Pedido');

describe('PedidoRepository', () => {
    const validId = new mongoose.Types.ObjectId().toString();
    const invalidId = 'invalidId';
    
    beforeEach(() => {
        jest.clearAllMocks();
    });



    it('Deve criar um pedido com itens válidos', async () => {
        const pedidoData = {
            descricao: 'Pedido Teste',
            usuario: validId,
            itens: [{ idItem: validId, quantidade: 2 }]
        };

        (Pedido.create as jest.Mock).mockResolvedValue({ ...pedidoData, preco: 100 });
        
        const result = await PedidoRepository.createPedido(pedidoData);
        expect(result.status).toBe(201);
        expect(result.pedido).toHaveProperty('descricao', 'Pedido Teste');
    });



    it('Não deve criar um pedido com ID de item inválido', async () => {
        const pedidoData = {
            descricao: 'Pedido Inválido',
            usuario: validId,
            itens: [{ idItem: invalidId, quantidade: 2 }]
        };

        const result = await PedidoRepository.createPedido(pedidoData);
        expect(result.status).toBe(400);
        expect(result.message).toBe(`ID de item inválido: ${invalidId}`);
    });



    it('Deve retornar todos os pedidos de um usuário', async () => {
        (Pedido.find as jest.Mock).mockResolvedValue([{ usuario: validId }]);
        
        const result = await PedidoRepository.getAllForUserId(validId);
        expect(result).toHaveLength(1);
        expect(result[0]).toHaveProperty('usuario', validId);
    });



    it('Deve deletar um pedido pelo ID', async () => {
        (Pedido.findByIdAndDelete as jest.Mock).mockResolvedValue({ _id: validId });
        
        const result = await PedidoRepository.deletePedidoById(validId);
        expect(result.status).toBe(200);
        expect(result.message).toBe("Pedido deletado com sucesso");
    });



    it('Deve retornar erro ao tentar deletar pedido com ID inválido', async () => {
        const result = await PedidoRepository.deletePedidoById(invalidId);
        expect(result.status).toBe(400);
        expect(result.message).toBe("ID inválido");
    });



    it('Deve atualizar o status de entrega de um pedido', async () => {
        const novoStatus = 'delivered';
        (Pedido.findByIdAndUpdate as jest.Mock).mockResolvedValue({ statusEntrega: novoStatus });
        
        const result = await PedidoRepository.updateStatusEntregaById(validId, novoStatus);
        expect(result.status).toBe(200);
        expect(result.pedido).toHaveProperty('statusEntrega', novoStatus);
    });



    it('Deve retornar erro ao tentar atualizar status de entrega inválido', async () => {
        const result = await PedidoRepository.updateStatusEntregaById(validId, 'invalidStatus');
        expect(result.status).toBe(400);
        expect(result.message).toBe("Status de entrega inválido");
    });



    it('Deve atualizar o status de pagamento de um pedido', async () => {
        const novoStatus = 'confirmed';
        (Pedido.findByIdAndUpdate as jest.Mock).mockResolvedValue({ statusPagamento: novoStatus });
        
        const result = await PedidoRepository.updateStatusPagamento(validId, novoStatus);
        expect(result.status).toBe(200);
        expect(result.pedido).toHaveProperty('statusPagamento', novoStatus);
    });



    it('Deve retornar erro ao tentar atualizar status de pagamento inválido', async () => {
        const result = await PedidoRepository.updateStatusPagamento(validId, 'invalidStatus');
        expect(result.status).toBe(400);
        expect(result.message).toBe("Status de pagamento inválido");
    });



    it('Deve retornar erro ao tentar atualizar status de pagamento com ID inválido', async () => {
        const result = await PedidoRepository.updateStatusPagamento(invalidId, 'confirmed');
        expect(result.status).toBe(400);
        expect(result.message).toBe("ID inválido");
    });


});
