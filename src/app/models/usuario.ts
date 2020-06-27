export class Usuario{

    public id: string;
    public nombre: string;
    public apellido: string;
    public email: string;
    public dni: string;
    public sexo: string;

    constructor(nombre: string, apellido: string, email: string, dni: string, sexo: string, id?: string){

        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.dni = dni;
        this.sexo = sexo;

        if (id){
            this.id = id;
        }
    }
}
