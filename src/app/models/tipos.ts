
export enum estadoProducto{
    pendiente= 'espera',
    preparandose= 'preparacion',
    listo= 'listo',
}

export enum estadoPedido{
    pendiente= 'espera',
    preparandose= 'preparacion',
    listo= 'listo',
    servido= 'servido',
    pendienteCobro= 'pendiente cobro',
    abonado= 'abonado'
}

export enum estadoCliente{
    espera= 'espera',
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