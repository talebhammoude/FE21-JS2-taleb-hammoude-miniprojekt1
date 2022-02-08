const inputField = document.querySelector(".name-input");
const saveNameBtn = document.querySelector(".save-name");
const myName = document.querySelector(".my-name");

const theGame = document.querySelector(".the-game");
const yourName = document.querySelector(".your-name");

const buttons = document.querySelectorAll("button");

const myChoice = document.querySelector(".my-choice");
const compChoice = document.querySelector(".comp-choice");

const myPoints = document.querySelector(".my-points");
const compPoints = document.querySelector(".comp-points");

const restart = document.querySelector(".reset-button");


let myPointsCounter = 0;
let compPointsCounter = 0;


import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js';


// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdAnlmX_mxn81UBIBOdlpZdiSmAjzmH10",
    authDomain: "fe21-js2-801d6.firebaseapp.com",
    databaseURL: "https://fe21-js2-801d6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fe21-js2-801d6",
    storageBucket: "fe21-js2-801d6.appspot.com",
    messagingSenderId: "150869399051",
    appId: "1:150869399051:web:94e387e05b4756522d990e"
  };
  
  const app = initializeApp(firebaseConfig);
  
  // Get a reference to the database service
  const database = getDatabase(app);


  function writeUserData(userId, name, score) {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      name: name,
      score: score
    });
  }







function restartGame () {

    restart.addEventListener("click", (e)=> {
        myPointsCounter = 0;
        myPoints.innerHTML = myPointsCounter;

        compPointsCounter = 0;
        // compPoints.innerHTML = compPointsCounter;

        buttons.forEach(btns => btns.disabled=false);
        restart.setAttribute("style", "display: none");

        myChoice.innerHTML = "";
        compChoice.innerHTML = "";

    })

}



function checkIfLose () {


    if (compPointsCounter === 1) {
        alert("Sorry, but you are a loser!")


        //Checka om poäng tillräckligt högt för att lägga till i db.
        if(myPoints.innerHTML >= 1) {
            writeUserData(Math.floor(Math.random() * 100), myName.innerHTML, myPoints.innerHTML);
        }
        

        buttons.forEach(btns => btns.disabled=true);
        restart.setAttribute("style", "display: block");
        myPointsCounter = 0;
        myPoints.innerHTML = myPointsCounter;
        restartGame();
    }

    

}




function addWinPoints () {

    

    if (myChoice.innerHTML == "✊🏼" && compChoice.innerHTML == "✌🏼") {
        myPointsCounter ++; 
        myPoints.innerHTML = myPointsCounter;


    } else if (myChoice.innerHTML == "✊🏼" && compChoice.innerHTML == "✋🏼") {
        compPointsCounter ++;
        // compPoints.innerHTML = compPointsCounter;

    } else if (myChoice.innerHTML == "✌🏼" && compChoice.innerHTML == "✊🏼") {
        compPointsCounter ++;
        // compPoints.innerHTML = compPointsCounter;
    } else if (myChoice.innerHTML == "✌🏼" && compChoice.innerHTML == "✋🏼") {
        myPointsCounter ++; 
        myPoints.innerHTML = myPointsCounter;
    } else if (myChoice.innerHTML == "✋🏼" && compChoice.innerHTML == "✊🏼") {
        myPointsCounter ++; 
        myPoints.innerHTML = myPointsCounter;
    } else if (myChoice.innerHTML == "✋🏼" && compChoice.innerHTML == "✌🏼") {
        compPointsCounter ++;
        // compPoints.innerHTML = compPointsCounter;
    } 


    setTimeout(() => {
        checkIfLose();
    }, 200);

}




function compMakeChoice () {
    const choicesArray = ["✊🏼", "✌🏼", "✋🏼"];

    setTimeout(() => {
      compChoice.innerHTML = choicesArray[Math.floor(Math.random() * 3)];
      addWinPoints();
    }, 1200);


  

    
}





function makeChoice () {

    buttons.forEach(btns => btns.addEventListener("click", (e) => {

        myChoice.innerHTML = "";
        compChoice.innerHTML = "";

        myChoice.innerHTML = e.target.value; 
        compMakeChoice();
       
    }));
}



function setName () {

    saveNameBtn.addEventListener("click", (e) => {
        myName.innerHTML = inputField.value;
      

        theGame.setAttribute("style", "display: block");
        yourName.setAttribute("style", "display: none");

     
       

        makeChoice();



    });
}




function addScore() {

}






setName();
