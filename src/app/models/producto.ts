import { estadoProducto } from './tipos';


export class Producto{

    public id:string;
    public nombre:string;
    public descripcion:string;
    public tiempoPreparacion:number;
    public estado:estadoProducto;
    public precio:number;
    public foto1:string;
    public foto2:string;
    public foto3:string;


    constructor(nombre:string,descripcion:string,tiempoPreparacion:number,precio:number, estado:estadoProducto,foto1:string,foto2:string,foto3:string,id?:string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tiempoPreparacion = tiempoPreparacion;
        this.estado = estado;
        this.precio = precio;
        this.foto1 = foto1;
        this.foto2 = foto2;
        this.foto3 = foto3;
        if (id){
            this.id = id;
        }
    }
}