import { Cliente } from './cliente';
import { Mesa } from './mesa';
import { Producto } from './producto';




export class Pedido{

    public id:string;
    public cliente:Cliente;
    public mesa:Mesa;
    public productos:Producto[]


}