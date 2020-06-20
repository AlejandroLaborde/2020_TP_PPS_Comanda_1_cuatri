# **2020_TP_PPS_Comanda_1_cuatri**
![La Comanda](https://github.com/AlejandroLaborde/2020_TP_PPS_Comanda_1_cuatri/blob/master/proyecto/imagenes/presentacion.jpg)
### Desarrolladores 🔧

```
Alejandro Laborde Parodi
Santiago Ortiz
Sebastian Pasquini

```


## Despliegue 📦

El sistema cuenta con conexion a [Firebase](https://console.firebase.google.com/project/lacomanda-pps/overview), donde alojamos nuestra base de datos, storage y autentificacion para los usuarios.


Como herramienta para organizacion interna, estamos usando [Trello](https://trello.com/b/os8TqQu6/trabajo-practico-pps), nos permite de forma sencilla organizar cada iteracion


## Sábado 23/05 al 30/05 :computer:
Build: [APK](https://github.com/AlejandroLaborde/2020_TP_PPS_Comanda_1_cuatri/tree/master/proyecto/builds/30-05-2020)
```
Santiago Ortiz Splash -> animado
Sebastian Pasquini -> Icono
Alejandro Laborde Parodi -> Preparación de entorno de desarrollo, conexion a firebase y readme.
```

## Sábado 30/05 al 6/05 :computer:

Objetivos:
```
Santiago Ortiz -> Componente lectura qr
Sebastian Pasquini -> pagina login/registro
Alejandro Laborde Parodi -> servicios de integracion

Se logro cumplir con los objetivos fijados
```

## Sábado 06/05 al 13/05 :computer:

```
Santiago Ortiz ->
  -pantalla dueño/supervisor
  -modificacion de login para entrar como dueño/supervisor
  -se implemento servicio de mail
  -se crea pantalla para aprobar nuevos clientes
  
  -Cumplio con los objetivos y realizo tareas extra
```
```
Sebastian Pasquini -> 
  Tareas realizadas en el login:
  - Ingreso según el tipo de cliente.
  - Servicio para obtener clientes según el tipo de login seleccionado
  - Validación de cliente con autenticación de firebase y validación de tipo de cliente en nuestra base de datos
  
  Tareas realizadas en el registro:
  - Implementación de nuevo diseño de página, con segmentos distintos para los dos tipos de registro
  - Validación de todos los campos ingresados
  - Servicio para registrar cliente como usuario de la app en firebase y para darlo de alta en nuestra bd
  - Botón para que el cliente se pueda sacar una foto y guardarla en su perfil luego de darse de alta
  - Push notification para avisar registro de nuevo cliente

  - cumplio con los objetivos, y realizo mas tareas de las correspondientes en la iteracion
  ```
  ```
Alejandro Laborde Parodi -> 
  - Preparacion de qr mesas
  - Preparacion de qr propina
  - Preparacion inicial de pagina del cliente
  - Servicios de mesas, alta, cambio de estados y obtener.
  - Lector qr estado de mesa
  - Servicios de alta y obtener productos de firebase + el armado de datos iniciales para pruebas 

  -Por el momento me queda pendiente como tarea el alta de un pedido, lo tome para esta iteracion y todavia no llegue a cumplirlo.
```

## Sábado 13/05 al 20/05 :computer:

```
Santiago Ortiz ->
  
```
```
Sebastian Pasquini -> 
 Pagina de metre:
- Se visualiza una lista de los clientes que están en lista de espera.
- El metre cambia el estado del cliente para permitirle escanear el qr de la mesa.
- Se agrega una alerta personalizada para avisarle al metre cuando ingresa un nuevo cliente a la lista de espera.

Página de mozo:
- Se visualiza una lista de las consultas relizadas por los clientes-
- El mozo cambia el estado de la consulta una vez que esta es respondida.
- Se agrega alerta personalizada para avisarle al mozo cuando tiene una nueva consulta
 ```
 ```
Alejandro Laborde Parodi -> 

  Pagina de Loguin
    -Leer el codigo qr de DNI para autocompletado de nombre y apellido.
   
  Pagina de Cliente
    - Creacion de la pagina de cliente
    - Lectura de QR para ponerse en lista de espera
    - Pantalla que informa que esta en espera, hasta que el mozo le habilite para escanear mesa
    - Escaneo de QR Mesa, verificacion de mesa ocupada y asociacion del cliente con la mesa
    - Persistencia de datos, si se cierra la aplicacion, al volver a abrir, recupera el estado actual del cliente y su pedido
    - Alta de pedido, permite al cliente realizar su pedido, visualizado el importe y confirmandolo
    - Consulta al mozo, se permite realizar una consulta.
    
   Pagina Mi Pedido
   - Se solicita la lectura del codigo QR, para verificar que la mesa es la misma asociada al cliente, desde aca se puede ver el estado,
   acceder a encuestas y juegos
```

