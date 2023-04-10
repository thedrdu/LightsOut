const divs = document.querySelectorAll('#grid-container div');
const lightState = {
    on: 'https://i.imgur.com/PSuDKse.png',
    off: 'https://i.imgur.com/XTGyvnc.png',
};

function randomizeLights(){
    divs.forEach(function(div){
        if(Math.random() >= 0.5){
            div.classList.add("on");
            div.classList.remove("off");
        }
        else{
            div.classList.add("off");
            div.classList.remove("on");
        }
        const currentState = div.classList.contains("on") ? "on" : "off";
        div.getElementsByTagName('img')[0].src = lightState[currentState];
    });
}

function toggleImages(div){
    div.classList.toggle("on");
    div.classList.toggle("off");

    const x = parseInt(div.id.slice(0, 1));
    const y = parseInt(div.id.slice(1, 2));
  
    const adjacentDivs = [
        document.getElementById(String(x-1) + String(y)), // left
        document.getElementById(String(x+1) + String(y)), // right
        document.getElementById(String(x) + String(y-1)), // top
        document.getElementById(String(x) + String(y+1)) // bottom
    ];
  
    adjacentDivs.forEach(function(adjacentDiv){
        if(adjacentDiv){ //check if adjacent div exists
            adjacentDiv.classList.toggle("on");
            adjacentDiv.classList.toggle("off");

        const currentState = adjacentDiv.classList.contains("on") ? "on" : "off";
        adjacentDiv.getElementsByTagName('img')[0].src = lightState[currentState];
        }
    });

    const currentState = div.classList.contains("on") ? "on" : "off";
    div.getElementsByTagName('img')[0].src = lightState[currentState];
}

function handleKeyPress(e){
    if(e.key == "r"){
        randomizeLights();
    }
}

//initialize the game
divs.forEach(function(div){
    div.addEventListener('click', function() {
        console.log(`The div with id ${div.id} was clicked!`);
        toggleImages(div);
    });
});

window.addEventListener('keydown', function (e) {
    console.log(`The ${e.key} key was pressed!`);
    handleKeyPress(e);
}, false);

randomizeLights();