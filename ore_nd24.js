// ==UserScript==
// @name        Calcolo Ore - ND24
// @namespace   Violentmonkey Scripts
// @match       https://accessi.netserv.it/ND24/ui/timbra_cartellino_gestione.aspx
// @grant       none
// @version     1.0
// @author      Endri
// @description 20/10/2023, 17:58:58
// ==/UserScript==

var tabella = document.getElementsByClassName('ListaSelezione')[0];
var righe = tabella.rows;

const orari = [];
const tipo = [];
const orari_Date = [];

for (let i = 1; i < righe.length; i++) {
  orari.push(righe[i].cells[0].getElementsByClassName('OPre')[0].innerHTML);
  tipo.push(righe[i].cells[1].getElementsByTagName('span')[0].innerHTML);
}

var temp_now = new Date(Date.now());
var adesso = temp_now.getHours() + ':' + temp_now.getMinutes();

if (orari.length > tipo.length){
  tipo.push("Adesso");
  orari.push(adesso)
}

const orariR = orari.reverse();
const tipoR = tipo.reverse();

orariR.forEach(calcola);

function calcola(o) {
  const ore = o.split(':');
  let dat = new Date(Date.now());
  dat.setHours(ore[0]);
  dat.setMinutes(ore[1]);
  dat.setSeconds(0);
  orari_Date.push(dat);
}

orari_Date.forEach(f => {
  console.log(f);
});

var sum = 0;
var i;
for (i = 0; i < orari_Date.length; i++){

    if (i == (orari_Date.length - 1))
      sum += (temp_now - orari_Date[i]);
    else if (i % 2 !== 0 && i !== 0)
      sum += (orari_Date[i] - orari_Date[i-1]);
    //else
  console.log(sum);
}

console.log(sum);

var hh = Math.trunc((sum) / (1000*60*60));
var mm = Math.trunc(((sum) / (1000*60*60) % 1) * 60);
var left_hh, left_mm;
if (mm > 0){
  left_hh = 7 - hh;
  left_mm = 60 - mm;
} else if (mm == 0) {
  left_hh = 8 - hh;
  left_mm = 0;
}
var row = tabella.insertRow(righe.length);
row.style.backgroundColor = 'lime';

var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);

cell1.style.textAlign = 'center';
cell1.style.fontWeight = 'bold';
cell2.style.textAlign = 'center';
cell3.style.textAlign = 'center';
cell3.style.fontWeight = 'bold';
cell4.style.textAlign = 'center';

cell1.innerHTML = "Totale Ore";
cell2.innerHTML = hh + ' ore ' + mm + ' min';
cell3.innerHTML = "Ore Rimanenti";
cell4.innerHTML = left_hh + ' ore ' + left_mm + ' min';
