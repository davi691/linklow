
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyAhMepMcVYcRfo7RSC-O5Xfu9hODvNS76s",
    authDomain: "linklow-187d9.firebaseapp.com",
    projectId: "linklow-187d9",
    storageBucket: "linklow-187d9.firebasestorage.app",
    messagingSenderId: "592195791576",
    appId: "1:592195791576:web:ed862548e6feb379f245ad",
    measurementId: "G-LW1QKFG7QD"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);




const urlInput = document.getElementById("urlInput");
const shortButton = document.getElementById("shortButton");

const result = document.getElementById("result");
const shortUrl = document.getElementById("shortUrl");

const copyButton = document.getElementById("copyButton");
const openButton = document.getElementById("openButton");
const qrButton = document.getElementById("qrButton");

const historyList = document.getElementById("historyList");
const clearHistory = document.getElementById("clearHistory");

const totalLinks = document.getElementById("totalLinks");

const themeButton = document.getElementById("themeButton");



const BASE_URL = "https://linklow-theta.vercel.app";

let history = JSON.parse(
    localStorage.getItem("linklow-history")
) || [];


function generateCode(length = 6){

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let code = "";

    for(let i = 0; i < length; i++){

        code += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );

    }

    return code;

}

function isValidURL(url){

    try{

        new URL(url);

        return true;

    }catch{

        return false;

    }

}

shortButton.addEventListener("click", async()=>{


    const url = urlInput.value.trim();


    if(url === ""){

        alert("Digite um link.");

        return;

    }


    if(!isValidURL(url)){

        alert("URL inválida.");

        return;

    }


    const code = generateCode();


    const newShort = BASE_URL + code;



    // SALVAR NO FIREBASE

    await addDoc(collection(db,"links"),{

        urlOriginal: url,

        urlCurta: code,

        dataCriacao: new Date()

    });



    // MOSTRAR RESULTADO

    shortUrl.value = newShort;

    result.classList.remove("hidden");



    // HISTÓRICO

    history.unshift({

        original:url,

        short:newShort,

        code:code,

        clicks:0,

        date:new Date().toLocaleString()

    });


    saveHistory();

    renderHistory();

    updateStats();



    urlInput.value="";


});



copyButton.addEventListener("click", async()=>{


    await navigator.clipboard.writeText(shortUrl.value);


    copyButton.innerHTML =
    `<i class="fa-solid fa-check"></i>`;


    setTimeout(()=>{

        copyButton.innerHTML =
        `<i class="fa-solid fa-copy"></i>`;

    },1500);


});


openButton.addEventListener("click",()=>{


    window.open(
        shortUrl.value,
        "_blank"
    );


});

qrButton.addEventListener("click",()=>{


    window.open(

    "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data="
    +
    encodeURIComponent(shortUrl.value),

    "_blank"

    );


});

function saveHistory(){

    localStorage.setItem(

        "linklow-history",

        JSON.stringify(history)

    );

}



function updateStats(){

    totalLinks.textContent = history.length;

}



function renderHistory(){


    historyList.innerHTML="";


    if(history.length===0){

        historyList.innerHTML=
        `
        <div class="history-item">
            <h4>Nenhum link criado.</h4>
        </div>
        `;

        return;

    }



    history.forEach((item,index)=>{


        const card=document.createElement("div");


        card.className="history-item";


        card.innerHTML=
        `

        <div class="history-info">

            <h4>${item.short}</h4>

            <span>${item.original}</span>

            <small>${item.date}</small>

        </div>


        <div class="history-buttons">


        <button class="copy-btn">
        <i class="fa-solid fa-copy"></i>
        </button>


        <button class="open-btn">
        <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </button>


        </div>

        `;



        card.querySelector(".copy-btn")
        .onclick=()=>{

            navigator.clipboard.writeText(item.short);

        };


        card.querySelector(".open-btn")
        .onclick=()=>{

            window.open(item.original,"_blank");

        };


        historyList.appendChild(card);


    });


}


clearHistory.addEventListener("click",()=>{


    history=[];

    saveHistory();

    renderHistory();

    updateStats();


});




themeButton.addEventListener("click",()=>{


    document.body.classList.toggle("light");


});




urlInput.addEventListener("keypress",(e)=>{


    if(e.key==="Enter"){

        shortButton.click();

    }


});


// iniciar

renderHistory();

updateStats();