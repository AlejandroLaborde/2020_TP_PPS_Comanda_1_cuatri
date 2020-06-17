import { Mesa } from './mesa';
import { estadoConsulta } from './tipos';

export class Consulta{
    private id:string;
    private mesa:Mesa;
    private consulta:string;
    private estado:estadoConsulta;

    constructor (mesa:Mesa , consulta:string , estado:estadoConsulta, id?:string){
        this.mesa = mesa;
        this.consulta = consulta;
        this.estado = estado;
        if(id){
            this.id =id;
        }
    }
}