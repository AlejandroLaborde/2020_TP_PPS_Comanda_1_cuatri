import { tipoMesa, estadoMesa } from './tipos';



export class Mesa{

    public id:String;
    public cantidadComenzales:number;
    public foto:string;
    public tipo:tipoMesa;
    public estado:estadoMesa;

    constructor(cantidad:number, foto:string,tipo:tipoMesa, estado:estadoMesa, id?:string){
        this.cantidadComenzales=cantidad;
        this.foto=foto;
        this.tipo=tipo;
        this.estado=estado;
        if(id){
            id;
        }
    }
}