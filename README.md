# Último Hotel de Cancún - Desafío de Reservas

Este proyecto consiste en una aplicación web para gestionar las reservas de un hotel en Cancún. El objetivo de esta aplicación es permitir a los usuarios consultar la disponibilidad de la única habitación disponible, realizar reservas, cancelarlas o modificarlas, todo desde una interfaz simple y fácil de usar.

## Requisitos del Proyecto

El departamento de TI del hotel será responsable de mantener esta aplicación. Dado que se trata del último hotel disponible, la calidad del servicio debe ser del 99.99% al 100%, lo que implica que no debe haber tiempos de inactividad.

### Reglas de la reserva

- El hotel solo tiene una habitación disponible.
- La estadía máxima es de 3 días.
- Las reservas no pueden realizarse con más de 30 días de anticipación.
- Las reservas siempre comienzan al menos el día siguiente de la reserva.
- Un "DÍA" en la habitación del hotel comienza desde las 00:00 hasta las 23:59:59.
- La API es insegura para simplificar el caso de uso.

## Tecnologías Utilizadas

- **Angular**: Framework utilizado para la creación del frontend de la aplicación.
- **Angular Material**: Para proporcionar componentes UI modernos y responsivos, como formularios, botones, DatePicker y Tablas.
- **JSON Server**: Para simular una API RESTful y almacenar los datos localmente en archivos JSON.
- **Concurrently**: Herramienta para ejecutar múltiples scripts de manera concurrente, permitiendo levantar tanto el servidor de Angular como los servidores de JSON Server.
- **NgRx**: Librería para manejar el estado de la aplicación de forma reactiva, utilizando un patrón basado en Redux.

## Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener **Node.js** y **npm** instalados en tu máquina.

### Pasos para la instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/aristobulo99/challenge-santovecino-hotel-front

2. Instala las dependencias:

    npm install

3. Ejecuta el proyecto:
    npm start

Esto iniciará la aplicación Angular y los servidores de JSON Server en paralelo, permitiéndote interactuar con la API localmente.

## Información de la Versión
Este proyecto está configurado con las siguientes versiones de herramientas y dependencias:

- Angular CLI: 18.2.6
- Node: 20.16.0
- Gestor de Paquetes: npm 10.8.1
- Sistema Operativo: win32 x64
### Dependencias de Angular
- @angular-devkit/architect: 0.1802.6 (solo CLI)
- @angular-devkit/core: 18.2.6 (solo CLI)
- @angular-devkit/schematics: 18.2.6 (solo CLI)
- @schematics/angular: 18.2.6 (solo CLI)


## Ajustes de Responsividad
Los estilos de responsividad en este proyecto están configurados para adaptarse a las siguientes resoluciones de pantalla:

- Pantallas grandes: 1536 x 710
- Pantallas pequeñas (móviles - iPhone 12 Pro): 390 x 844

Los puntos de quiebre y las media queries han sido ajustados para garantizar una correcta visualización en estos tamaños de pantalla, proporcionando una experiencia de usuario óptima tanto en dispositivos grandes como pequeños.

## Funcionalidades

### Sección de Home

- La página de inicio muestra una imagen del hotel y el título: Reserva tu estadía en el último hotel de Cancún.
- Incluye un botón que redirige al usuario a la sección de disponibilidad.

### Sección de Disponibilidad

- Muestra una lista de habitaciones disponibles en tarjetas proporcionadas por Angular Material. Cada tarjeta muestra:
    * Nombre de la habitación
    * Número de personas que pueden ocuparla
    * Descripción
    * Disponibilidad
- También incluye un formulario reactivo para realizar una nueva reserva y registrar o validar si el usuario esta registrado.

## Sección de Mis Reservas
- Permite a los usuarios consultar sus reservas utilizando su número de documento.
- Si el usuario está registrado, se muestran sus datos de usuario y una tabla con todas sus reservas en la cual puede Cancelar o Modificar su reservación, usando tablas de Angular Material para mostrar la información de manera clara y organizada.



