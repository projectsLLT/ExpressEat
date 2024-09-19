import { Router } from 'express';
import PedidoController from '../controller/PedidoController'; 

const PedidoRouter = Router();


PedidoRouter.get('/pedidos/:usuarioId', PedidoController.listAllForUser);
PedidoRouter.post('/pedidos', PedidoController.createPedido);
PedidoRouter.delete('/pedidos/:id', PedidoController.deletePedido);
PedidoRouter.put('/pedidos/:id/status-entrega', PedidoController.updateStatusEntrega);
PedidoRouter.put('/pedidos/:id/status-pagamento', PedidoController.updateStatusPagamento);

export default PedidoRouter;
