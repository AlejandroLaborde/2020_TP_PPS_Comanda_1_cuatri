import { Usuario } from './usuario';
import { tipoPersonal } from './tipos';



export class Personal extends Usuario{

    public tipo: tipoPersonal;
    public CUIL: string;
    public clave: string;

    constructor(nombre: string, apellido: string, email: string, dni: string, sexo: string, clave: string, cuil: string,
                tipo: tipoPersonal, foto: string, id?: string){
        if (id){
            super(nombre, apellido, email, dni, sexo, id);
        }else{
            super(nombre, apellido, email, dni, sexo);
        }
        this.clave = clave;
        this.tipo = tipo;
        this.CUIL = cuil;
    }
}
