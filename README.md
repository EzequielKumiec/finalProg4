# Proyecto: Sistema de Gestión de Pedidos para Maderas Córdoba SA

La empresa **Maderas Córdoba SA**, encargada de la venta de placas de madera y cortes para la construcción de muebles, ha solicitado la creación de una **aplicación web** que permita la toma de pedidos realizados por los clientes.

## Requisitos del Sistema

### 1. Formulario de Carga de Pedidos 
    API: https://674531d6b4e2e04abea50775.mockapi.io/orders

Se requiere la implementación de un formulario para la carga de los pedidos, con los siguientes campos:

- **Nombre completo del cliente**: *Requerido* *Maximo 30 caracteres*
- **Usuario de empleado**: *Mínimo 3 caracteres*
- **Fecha de entrega**
- **Proveedor de placa de madera**: *Combo cargado mediante una API de proveedores* - *Requerido*
    API: https://6317ca93f6b281877c5d7785.mockapi.io/providers
- **Color de placa de madera**: *Combo cargado basado en el proveedor seleccionado y con datos de la API de colores* - *Requerido*
    API: https://6317ca93f6b281877c5d7785.mockapi.io/providers/PROVIDER_ID/colors
- **Listado de cortes necesarios**: Se debe validar que los cortes no excedan el tamaño de la placa. *No puede haber más de 10 cortes*.
    - **Ancho**: *Requerido*
    - **Largo**: *Requerido*

### 2. Validación de Disponibilidad

Teniendo en cuenta que la máquina de cortes realiza 20 cortes por día, se debe validar la disponibilidad para la **fecha seleccionada**.

### 3. Ejemplo de Request

```json
{
    "deliveryDate": "16-12-2024",
    "client": "nombreCliente",
    "username": "nombreUsuario",
    "providerId": "1",
    "providerColorId": "2",
    "requestedCuts": [
        {
            "width": 100,
            "height": 200
        },
        {
            "width": 100,
            "height": 200
        }
    ],
    "id": "1"
}
```


### 4. Redirección y Optimización de Cortes

Una vez cargado el pedido, se debe redirigir a la **página principal** donde se visualizará la optimización de los cortes solicitados. El usuario podrá seleccionar el pedido desde un **combo** con el formato:

`"nombre cliente - usuario (fecha formato dd/MM/yyyy)"`.

Una vez seleccionado el pedido, se habilitará un botón con el texto **"Optimizar"** que actualizará la pantalla para mostrar un gráfico con los cortes solicitados y las placas necesarias para realizar dichos cortes.

**Nota**: Se debe realizar un análisis y optimización de los cortes para aprovechar el mayor espacio de la placa de madera.

### 5. Algoritmo de Optimización: FFD (First Fit Decreasing)

Para la optimización de los cortes, se utilizará el algoritmo **First Fit Decreasing (FFD)**, el cual puede ser encontrado en línea y adaptado para este ejemplo.

## Rubrica de Evaluación

- **Formulario**: 4 puntos
- **Validación de la fecha**: 1 punto
- **Panel de Visualización**: 2 puntos
- **Algoritmo de Optimización**: 2 puntos
- **Estilos**: 1 punto

## Consideraciones Importantes

- **Tamaño de la placa**: 800mm x 600mm.
- **Visualización**: Para simplificar, se puede asumir que 1px = 1mm.
- **Código en inglés**.
- **Utilizar Routing**.
- **Utilizar Reactive Forms**.
- **Respetar los estilos solicitados**.
