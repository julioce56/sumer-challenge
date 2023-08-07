# SumerCommerce

(Angular) Proyecto de carrito de compras para desafio de postulación en SUMER

## Descripcion del programa

La aplicacion se realizo sobre el framework Angular para aprovechar toda la capacidad que este nos ofrece junto con typescript.

Se realizo un scaffolding modular para tener un escalamiento mayor en la aplicación en cuanto al crecimiento de esta(simulando ser un proyecto productivo).

Se uso como tecnología de estilos el preprocesador SASS con CSS(SCSS) con el fin de tener un dominio mayor en los estilos y poder hacer uso de herencia, mixins, variables, importaciones y otras ayudas que nos brinda SCSS.

Para el desafio del estado de la aplicacion se opto por usar NgRx(uso del patron REDUX) para tener una sola fuente de verdad de la cual todos los componentes dependieran, con esto se creo una Store para el almacenamiento de la data, un Effects para la iteración con los servicios y unos reducer con actions para la iteracion con la informacion, ademas se hizo un desarrollo como capa de persistencia para evitar que al recargar la pagina se perdiera la informacion ya almacenada.

Como libreria de diseño se uso bootstrap para una buena iteracion con los componentes, el grid y el diseño responsive, tambien se hacen pequeños ajustes para el responsive con @media-query.

En el lado de mensajes se usa la librería Toastr, compatible con angular y muy buena funcionalidad.

Para el uso de iconos se usa la libreria material-icons.

En el lado de las pruebas se hacen con Karma - Jazmine, se dejan al 98% de cobertura.

Se crea un directiva para que en la pagina de todos los productos el sistema solo cargue en memoria del navegador las imagenes que estan dentro del viewport y a medida que se hace scroll el carga las imagenes que se muestran en pantalla, de esta manera optimiza el uso de recursos y ayuda a la optimizacion del CEO de la pagina.

## Instalacion

Para que el sistema funcione correctamente de debe contar con:

1. Nodejs instalado https://nodejs.org/es este trae consigo el gestor de paquetes npm.
2. Angular cli instalado https://angular.io/cli
3. Ir a la carpeta sumer-commerce descargada desde Git y ejecutar allí dentro el commando `npm install` o `npm i` para descargar todas las dependencias del proyecto.

## Ejecutar aplicación en modo desarrollo

Dentro de la carpeta despues de haber instalado las dependencias del proyecto con el comando `ng serve` ponemos en marcha la aplicación. Cuando la consola nos muestra que ya esta corriendo el sistema, nos dirigimos a `http://localhost:4200/` en el navegador y ya deberiamos poder visualizar el desarrollo web.

## Ejecutar pruebas unitarias

En la consola corremos el comando `ng test` y este nos permite ver el numero de pruebas que tiene la aplicacion, si se requiere mas a detalle se puede correr el comando `ng test --code-coverage` con esta flag podemos ver la cobertura del sistema en un archivo index.html que genera dentro de una carpeta coverage.

## EVIDENCIA DE FUNCIONAMIENTO

En la carpeta /evidencia se almacenara screenshots del funcionamiento correcto de la aplicación, pruebas y cobertura.
