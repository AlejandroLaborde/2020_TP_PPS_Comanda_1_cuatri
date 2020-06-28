import { Usuario } from './usuario'
import { tipoCliente, estadoCliente } from './tipos';



export class Cliente extends Usuario{

    public tipo: tipoCliente;
    public foto: string;
    public clave: string;
    public aprobado: boolean;
    public estado: estadoCliente;
    public idBD: string;

    constructor(nombre: string, email: string, dni: string, sexo: string, tipo: tipoCliente, clave: string, aprobado: boolean, 
                estadoCliente: estadoCliente, apellido?: string, id?: string, foto?: string){

        if (tipo === 'anonimo'){
            if (id){
                super(nombre, '', email, dni, sexo, id);
            }else{
                super(nombre, '', email, dni, sexo);
            }

        }else{
            if (id){
                super(nombre, apellido, email, dni, sexo, id);
            }else{
                super(nombre, apellido, email, dni, sexo);
            }
        }
        this.clave = clave;
        this.aprobado = aprobado;
        this.estado = estadoCliente;
        this.tipo = tipo;
        this.foto = foto;
    }



}
