let carros = [

{
nome:"BMW M4 Competition",
preco:890000,
marca:"BMW",
ano:2024,
imagem:"https://images.unsplash.com/photo-1555215695-3004980ad54e"
},

{
nome:"Porsche 911 Turbo S",
preco:1450000,
marca:"Porsche",
ano:2023,
imagem:"https://images.unsplash.com/photo-1503376780353-7e6692767b70"
},

{
nome:"Audi RS6",
preco:980000,
marca:"Audi",
ano:2024,
imagem:"https://images.unsplash.com/photo-1549399542-7e3f8b79c341"
},

{
nome:"Mercedes AMG GT",
preco:1200000,
marca:"Mercedes",
ano:2022,
imagem:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d"
}

];

function listar(lista = carros){

let area=document.getElementById("lista");

area.innerHTML="";

lista.forEach((carro,indice)=>{

area.innerHTML+=`

<div class="card">

<img src="${carro.imagem}">

<div class="info">

<h3>${carro.nome}</h3>

<p><strong>Marca:</strong> ${carro.marca}</p>

<p><strong>Ano:</strong> ${carro.ano}</p>

<p class="preco">R$ ${carro.preco.toLocaleString()}</p>

<button class="remover" onclick="remover(${indice})">Remover</button>

</div>

</div>

`;

});

document.getElementById("quantidade").innerHTML=
"Quantidade de carros: "+carros.length;

let maior=carros.reduce((a,b)=>a.preco>b.preco?a:b);

document.getElementById("maisCaro").innerHTML=
"💎 Mais caro: "+maior.nome+" - R$ "+maior.preco.toLocaleString();

}

function adicionarCarro(){

let nome=document.getElementById("nome").value;

let preco=Number(document.getElementById("preco").value);

let marca=document.getElementById("marca").value;

let ano=document.getElementById("ano").value;

let imagem=document.getElementById("imagem").value;

if(nome=="" || preco=="" || marca=="" || ano=="" || imagem==""){

alert("Preencha todos os campos.");

return;

}

carros.push({

nome,
preco,
marca,
ano,
imagem

});

listar();

document.getElementById("nome").value="";
document.getElementById("preco").value="";
document.getElementById("marca").value="";
document.getElementById("ano").value="";
document.getElementById("imagem").value="";

}

function remover(indice){

carros.splice(indice,1);

listar();

}

function pesquisar(){

let texto=document.getElementById("pesquisa").value.toLowerCase();

let resultado=carros.filter(carro=>carro.nome.toLowerCase().includes(texto));

listar(resultado);

}

listar();