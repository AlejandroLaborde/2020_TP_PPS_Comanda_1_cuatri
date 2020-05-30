import { Usuario } from "./usuario"
import { tipoCliente, estadoCLiente } from './tipos'



export class Cliente extends Usuario{

    public tipo:tipoCliente;
    public foto:string;
    public estado:estadoCLiente;

    constructor(nombre:string,email:string,tipo:tipoCliente,foto:string,estadoCLiente:estadoCLiente,id?:string,apellido?:string){
       
        if(tipo=="anonimo"){
            if(id){
                super(nombre,'anonimo',email,id);
            }else{
                super(nombre,'anonimo',email);
            }
            
        }else{
            if(id){
                super(nombre,apellido,email,id);
            }else{
                super(nombre,apellido,email);
            }
        }
        this.estado=estadoCLiente;
        this.tipo=tipo;
        this.foto=foto;
    }

   

}