//cargamos las cartas en un arreglo 
//variables
let puntosjugador = 0;
let puntocomputadora = 0;
let puntosminimos = 0;
//manejo del dom
const btnNuevo = document.querySelector('#btnNuevo')
const btnPedir = document.querySelector('#btnPedir')
const btnParar = document.querySelector('#btnParar')
const puntoshtml = document.querySelectorAll("small")
const cartajugador = document.querySelector('#cartajugador')
const cartacomputador = document.querySelector('#cartacomputador')
const baraja =[
    '2C',
    '2D',
    '2H',
    '2S',
    '3C',
    '3D',
    '3H',
    '3S',
    '4C',
    '4D',
    '4H',
    '4S',
    '5C',
    '5D',
    '5H',
    '5S',
    '6C',
    '6D',
    '6H',
    '6S',
    '7C',
    '7D',
    '7H',
    '7S',
    '8C',
    '8D',
    '8H',
    '8S',
    '9C',
    '9D',
    '9H',
    '9S',
    '10C',
    '10D',
    '10H',
    '10S',
    'AC',
    'AD',
    'AH',
    'AS', 
    'JC',
    'JD',
    'JH',
    'JS',
    'KC',
    'KD',
    'KH',
    'KS',
    'QC',
    'QD',
    'QH',
    'QS',    
];
//console.log(baraja.length)

//=============funciones basicasdel juego=================
//hacer funcion que mezcle la baraja 

const mezclarBaraja = ()=>{
   baraja.sort(() => Math.random() -0.5) ;
  // console.log(baraja);
    return baraja;
}

mezclarBaraja();

const perdircarta=()=>{
    if(baraja.length===0)
    {
        throw('no existe mas cartas en la baraja');
    }
    const carta = baraja.pop();
    return carta;
}

const valorCarta = (carta)=>{
   const valorCarta = carta.substring(0,carta.length-1);
   let puntos =0
   if(isNaN(valorCarta)){
     puntos = valorCarta ==="A"?11 : 10;
   }else{
       puntos = valorCarta * 1;
   }
   return puntos;
}

const jugarcomputadora=(puntosminimos)=>{

    do {
        const carta =  perdircarta();
        puntocomputadora = puntocomputadora + valorCarta(carta);
        puntoshtml[1].innerText = puntocomputadora;

        const imgcarta = document.createElement("img");
        imgcarta.src = `assets/img/${carta}.png`;
        imgcarta.classList.add("carta");
        cartacomputador.append(imgcarta);

        if(puntosminimos > 21){
            break
        }
    } while (puntocomputadora<puntosminimos && puntosminimos <=21);

    //el timer out pone a jugar el computadot automaticamente durante 100 milisegundos
   setTimeout(()=>{
   if(puntocomputadora === puntosminimos){
    alert("nadie gana")
   }else if(puntosminimos > 21)
   {  
    alert("computadora gana")
   }else if(puntocomputadora> 21)
   {
    alert("jugador gana")
   }else
   {
    alert("computador gana")
   }
   },100) 
}
//=================eventos del juego =======================

//evento para plantarse
btnParar.addEventListener('click',()=>{
console.log('te plantaste')
btnPedir.disabled = true;
btnParar.disabled = true;
jugarcomputadora(puntosjugador)
});

//evento para reiniciar
btnNuevo.addEventListener('click',()=>{
   console.clear();
   mezclarBaraja()
   puntosjugador = 0;
   puntocomputadora = 0;
   puntoshtml[0].innerText=0;
   puntoshtml[1].innerText =0;
   cartajugador.innerHTML = '';
   cartacomputador.innerHTML = '';
   btnPedir.disabled = false;
   btnParar.disabled = false;
    });



//evento par pedir
btnPedir.addEventListener('click',()=>{
     const carta = perdircarta()
     console.log(carta)
     //aumentar valor de la carta en el contador
     puntosjugador = puntosjugador+valorCarta(carta)
    console.log(puntosjugador)
        puntoshtml[0].innerText = puntosjugador
        //mostrar las cartas  en la capa corresondiente
     const imgcarta=document.createElement('img');
    imgcarta.src=`assets/img/${carta}.png`;
    imgcarta.classList.add("carta");
     cartajugador.append(imgcarta)
     //validaos puntos acumulados 
     if(puntosjugador > 21){
      console.warn('lo sentimos excedio los 21 puntos')
      btnPedir.disabled = true;
      btnParar.disabled = true;
      //aca jugaria la computadora
      jugarcomputadora(puntosjugador)
     }else if(puntosjugador===21)
     {
        console.warn('excelente BLACKJACK')
        btnPedir.disabled = true;
        btnParar.disabled = true;
        jugarcomputadora(puntosjugador)
     }
    });
