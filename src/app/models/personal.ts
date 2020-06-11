import { Usuario } from './usuario';
import { tipoPersonal } from './tipos';



export class Personal extends Usuario{

    public tipo:tipoPersonal;
    public DNI:String;
    public CUIL:String;
    public clave:string;

    constructor(nombre:string,apellido:string,email:string,clave: string,dni:string,cuil:string,tipo:tipoPersonal,foto:string,id?:string){
        if(id){
            super(nombre, apellido, email, id);
        }else{
            super(nombre, apellido, email);
        }
        this.clave=clave;
        this.tipo=tipo;
        this.DNI=dni;
        this.CUIL=cuil;
    }
}