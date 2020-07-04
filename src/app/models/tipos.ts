
export enum estadoProducto{
    
    pendiente= 'espera',
    preparandose= 'preparación',
    listo= 'listo',
    propina= 'propina',
}

export enum tipoProducto{
    
    comida= 'comida',
    bebida= 'bebida',
    propina= 'propina'
}

export enum estadoConsulta{
    
    pendiente= 'pendiente',
    contestada= 'contestada'
    
}

export enum estadoPedido{
    asociadoMesa= 'asociadoConMesa',
    inicial= 'inicial',
    espera= 'espera',
    preparandose= 'preparacion',
    listo= 'listo',
    servido= 'servido',
    confirmadoCliente= 'confirmadoCliente',
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
    dueño='dueño',
    metre='metre'
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