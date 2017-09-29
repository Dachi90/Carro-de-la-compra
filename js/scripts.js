var datos = [];

datos [0] = ["Calcetines rotos",16,"img/libro1.jpg"];
datos [1] = ["Patria",15.9,"img/libro2.jpg"];
datos [2] = ["Los ritos del agua",21.8,"img/libro3.jpg"];
datos [3] = ["El extraño verano de Tom Harvey",20,"img/libro4.jpg"];
datos [4] = ["La habitación en llamas",21.8,"img/libro5.jpg"];
datos [5] = ["El secreto de ile-de-Sein",16.5,"img/libro6.jpg"];
datos [6] = ["Ocho días de Marzo",15.9,"img/libro7.jpg"];
datos [7] = ["Cinco días de Octubre",15.9,"img/libro8.jpg"];

var salida = "";
var compra = [];
var numero;


imprimir();
function imprimir () {


	for(i=0; i < datos.length; i++){
		

		if( i == 0){
			salida+= '<div class="row">';
		}
		else if( (i % 4) == 0){
			salida += '</div> <div class="row">';
		}

		salida+='<div class="col-md-3 producto" style="height:30em"><img alt="Libro 1" src='+datos[i][2]+' class="img-rounded imagenes"><h3 class="text-primary text-center titulos">'+datos[i][0]+'</h3><p class="precio"> <span class="precio1">Precio:</span> '+datos[i][1]+'€</p><button id="boton" onclick ="addCart(this,'+i+')" type="button" style="margin-top:15px" class="btn btn-primary active btn-default"><p class="boton">Comprar <i class="material-icons">add_shopping_cart</i></p></button></div>';
		
	
	document.getElementById("contenedor").innerHTML = salida;
	};

	if (i!=0){
		salida += "</div>";
	}
	
};

function addCart (boton, libros){

	compra.push([libros,1,boton]);
	boton.disabled=true;
	refreshCarrito();



}

function refreshTabla () {
	salida = "";

	for(i=0; i<compra.length;i++){
		var numero = compra[i][0]
		salida += "<tr><td>"+(i+1)+"</td><td>"+ datos[numero][0]+"</td><td><button onclick='cantidades("+i+", -1)'>-</button>"+compra[i][1]+"<button onclick='cantidades("+i+",1)'>+</button></td><td>"+ datos[numero][1]+" €</td><td><button onclick=eliminar("+i+")>Eliminar</button></td></tr>"
	}

	document.getElementById("tablaLibros").innerHTML = salida;	


};

function cantidades (libroComprado,incremento){

	compra[libroComprado][1] += incremento;
	if(compra[libroComprado][1]<1){
		compra[libroComprado][1]=1;
	}
	refreshCarrito();
}

function eliminar (k){
	compra[k][2].disabled=false;
	compra.splice(k,1)
	refreshCarrito();
}
function calcular(){
	var importe = calculaImporte();
	var tasaDto = calculaTasa();
	var descuento = importe*tasaDto/100;
	var iva = (importe-descuento)*0.21;
	var total = importe - descuento + iva;

	document.getElementById("precio").innerHTML= importe.toFixed(2)+ "€";
	document.getElementById("descuento").innerHTML= descuento.toFixed(2)+ " € ("+tasaDto+"%)";
	document.getElementById("iva").innerHTML= iva.toFixed(2)+ "€";
	document.getElementById("total").innerHTML = total.toFixed(2) + "€";

	function calculaImporte(){
		var suma=0;
		for(i=0; i< compra.length; i++){
			suma += datos[compra[i][0]][1] * compra[i][1];
		};
		return suma;
	};

	function calculaTasa(){
	      var numero = 0;
	      for (i = 0; i < compra.length; i++) {
	        numero+= compra[i][1];
	      }
	      var tasa = 0;
	      if (numero > 7) {
	        tasa = 10;
	      } else if (numero> 5) {
	        tasa= 7.5;
	      }else if (numero>3) {
	        tasa=5;
	      }
	      return tasa;
	//      return numero>7?10:(numero>5?7.5:(numero>3?5:0));
	    }


};


function refreshCarrito() {
	refreshTabla();
	calcular();
	
	
};
