import { Mesa } from './mesa';
import { estadoConsulta } from './tipos';

export class Consulta{
    public id:string;
    public mesa:Mesa;
    public consulta:string;
    public estado:estadoConsulta;

    constructor (mesa:Mesa , consulta:string , estado:estadoConsulta, id?:string){
        this.mesa = mesa;
        this.consulta = consulta;
        this.estado = estado;
        if(id){
            this.id =id;
        }
    }
}