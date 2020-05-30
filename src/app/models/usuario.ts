



export class Usuario{

    public id:string;
    public nombre:string;
    public apellido:string;
    public email:string

    
    constructor(nombre:string, apellido:string, email:string, id?:string){
        
        this.nombre=nombre;
        this,apellido = apellido;
        this.email = email;

        if(id){
            this.id=id;
        }
    }
}