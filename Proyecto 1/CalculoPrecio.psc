Algoritmo CalculoPrecio
	//Definimos variables
	Definir precio, descuento, impuesto, descuento_cantidad, peso Como Real
	Definir destino Como Cadena
	Definir cantidad Como Entero
	//Definimos constantes
	CANTIDAD_DESCUENTO1 = 10
	CANTIDAD_DESCUENTO2 = 20
	CANTIDAD_DESCUENTO3 = 30
	CANTIDAD_DESCUENTO4 = 40
	COSTO_FIJO_ENVIO = 10
	
	// Cliente ingresa precio del producto
	Escribir 'Ingrese precio del producto: '
	Leer precio
	// Cliente ingresa cupón de descuento
	Escribir 'Ingrese cupón de descuento, si no tiene ingrese 0, ingresar en formato decimal, ejemplo: 0.1 para 10%, 0.2 para 20%, etc...: '
	Leer descuento
	//Creamos una nueva variable para entregar información al usuario al final
	descuento_string <- descuento * 100
	//Cliente ingresa impuestos de su producto
	Escribir 'Ingrese impuesto a pagar, IVA u otros, ingrese en formato decimal, ejemplo: 0.1 para 10%, 0.2 para 20%, etc...: '
	Leer impuesto
	//Creamos una nueva variable para entregar información al usuario al final
	impuesto_string <- impuesto * 100
	//Cliente ingresa cantidad a comprar
	Escribir 'Ingrese cantidad a comprar'
	Leer cantidad
	//Se calcula descuento según cantidad y se crea la variable descuento_cantidad según la cantidad que el cliente lleve
	Si cantidad < CANTIDAD_DESCUENTO1 Entonces
		descuento_cantidad = 0
	SiNo		
		Si cantidad >= CANTIDAD_DESCUENTO1 Y cantidad < CANTIDAD_DESCUENTO2 Entonces
			descuento_cantidad = 0.05
		SiNo
			Si cantidad >= CANTIDAD_DESCUENTO2 Y cantidad < CANTIDAD_DESCUENTO3 Entonces
				descuento_cantidad = 0.1
			SiNo
				Si cantidad >= CANTIDAD_DESCUENTO3 Y cantidad < CANTIDAD_DESCUENTO4 Entonces
					descuento_cantidad = 0.15
				SiNo
					Si 	cantidad >= CANTIDAD_DESCUENTO4 Entonces
						descuento_cantidad = 0.2
					FinSi
				FinSi
			FinSi
		FinSi
	FinSi
	//Creamos una nueva variable para entregar información al usuario al final
	descuento_cantidad_string <- descuento_cantidad * 100
	//Pedimos peso del articulo para definir su costo de envío
	Escribir  'Ingrese el peso de su producto(solo el numero, entero en caso de ser kg (ejemplo 1 para 1kg o 1.5 para 1.5kg), en caso de ser gramos ingresar en formato decimal ( ejemplo : 0.1 para 100 gramos): '
	Leer peso
	//Pedimos dirección para envío y calculo de costos
	Escribir 'Ingrese su destino: '
	Leer destino
	//Realizamos los calculos para precios finales del producto
	//Precio aplicando descuento de cupón
	precio_cupon <- precio * ( 1 - descuento)
	//Precio aplicando impuestos y cupón
	precio_impuestos <- precio_cupon * (1 + impuesto)
	//Precio aplicando impuesto, cupón y descuentos por cantidad
	precio_cantidad <- precio_impuestos	* (1 - descuento_cantidad)
	//Calculo de costo de envío total
	costo_envio <- 10 + (peso * 3)
	//Calculo de precio final con todo aplicado
	precio_final <- precio_cantidad + costo_envio
	//Entregamos la información al cliente
	Escribir '                  '
	Escribir 'El precio inicial de su producto: ', precio
	Escribir 'Su cupón de descuento es de: ',descuento_string, '%'
	Escribir 'Sus impuestos son de: ', impuesto_string, '%'
	Escribir 'Su cantidad a comprar es de: ', cantidad, ' unidades'
	Escribir 'Su descuento por cantidad a recibir es de: ', descuento_cantidad_string, '%'
	Escribir 'El precio de su producto sin envío incluido es de: ', precio_cantidad
	Escribir 'El peso de su producto es de: ', peso, 'KG'
	Escribir 'Su dirección de envío es: ', destino
	Escribir 'Su costo de envío sería de: $', costo_envio
	Escribir 'El precio total a pagar con envío incluido es de: $', precio_final
	
FinAlgoritmo
