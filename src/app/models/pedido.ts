import { Cliente } from './cliente';
import { Mesa } from './mesa';
import { Producto } from './producto';
import { estadoPedido } from './tipos';




export class Pedido{

    public id: string;
    public cliente: Cliente;
    public mesa: Mesa;
    public productos: Producto[];
    public estado: estadoPedido;
    public idBD: string;
    public total: number;

}