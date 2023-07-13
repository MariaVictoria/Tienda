const URLGET='http://mviktoriau.pythonanywhere.com/producto';
let precioGodOfWar = 70;
let precioHarry = 60;
let precioHorizon = 50;
let dolarBlue
let valorGow= document.getElementById("valorGodOfWar");
let valorHarry=document.getElementById("valorHarry");
let valorHorizon=document.getElementById("valorHorizonFW");
let valorBlue=document.getElementById("valorDolarBlue");
let valorBlue2=document.getElementById("valorDolarBlue2");
let valorBlue3=document.getElementById("valorDolarBlue3");
let valores
let fechaActual = new Date();
let dia = fechaActual.getDate();
let mes = fechaActual.getMonth() + 1;
let anio = fechaActual.getFullYear();
let fechaActualHtml=document.getElementById("fechaActual1");
let fechaActualHtml2=document.getElementById("fechaActual2");
let fechaActualHtml3=document.getElementById("fechaActual3");

try{
    fetch(URLGET)
    .then(result=>result.json())
    .then(json=>{   
        valores = json;
        let dolar=valores[1];//en esta posicion esta el valor del dolar que quiero obtener         
        dolarBlue=parseInt(dolar.casa.venta); //y de ese dolar blue elijo el valor de venta, que lo utilizo para hacer el calculo contra pesos argentinos       
        precioGodOfWar = precioGodOfWar*dolarBlue;
        precioHarry = precioHarry*dolarBlue;
        precioHorizon = precioHorizon*dolarBlue;
      
        valorGow.innerHTML=`$${precioGodOfWar}`;
        valorHarry.innerHTML=`$${precioHarry}`;
        valorHorizon.innerHTML=`$${precioHorizon}`;
        valorBlue.innerHTML=`${dolarBlue}`;
        valorBlue2.innerHTML=`${dolarBlue}`;
        valorBlue3.innerHTML=`${dolarBlue}`;
        fechaActualHtml.innerHTML=`${fechaFormateada}`
        fechaActualHtml2.innerHTML=`${fechaFormateada}`
        fechaActualHtml3.innerHTML=`${fechaFormateada}` 
    })    
}catch(error) {
    console.error(error)
}