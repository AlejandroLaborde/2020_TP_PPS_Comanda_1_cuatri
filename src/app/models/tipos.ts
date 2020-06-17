
export enum estadoProducto{
    
    pendiente= 'espera',
    preparandose= 'preparacion',
    listo= 'listo',
}

export enum estadoConsulta{
    
    pendiente= 'pendiente',
    contestada= 'contestada'
    
}

export enum estadoPedido{
    inicial= 'inicial',
    espera= 'espera',
    preparandose= 'preparacion',
    listo= 'listo',
    servido= 'servido',
    pendienteCobro= 'pendiente cobro',
    abonado= 'abonado'
}

export enum estadoCliente{
    espera= 'espera',
    aceptado= 'aceptado',
    sentado='comiendo',
    off='off'
    
}

export enum tipoCliente{
    anonimo='anonimo',
    registrado='registrado'
}

export enum tipoPersonal{

    mozo='mozo',
    cocinero='cocinero',
    bartender='bartender',
    supervisor='supervisor',
    dueño='dueño'
}

export enum tipoMesa{
    vip='vip',
    discapacitados='discapacitados',
    comun='comun'
}


export enum estadoMesa{
    ocupada='ocupada',
    libre='libre'
}