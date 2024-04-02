let currentState = "start";

let gameData = {
  start: {
    text: "You wake up on a deserted island, surrounded by wreckage. What will you do?",
    choices: ["Explore the Beach", "Search for Shelter"],
    consequences: ["exploreBeach", "searchShelter"],
    image: "https://t3.ftcdn.net/jpg/00/64/16/84/360_F_64168411_KE6FpZ0VhLElbPn7f6eztY7WmbvhpMWz.jpg",
  },
  exploreBeach: {
    text: "You explore the beach and find some useful supplies washed ashore. What's your next move?",
    choices: ["Build a Raft", "Climb the Cliff"],
    consequences: ["buildRaft", "climbCliff"],
    image: "https://www.shutterstock.com/image-photo/colorful-kayaks-on-tropical-beach-260nw-1465283042.jpg",
  },
 
  exploreCave: {
    text: "You explore the cave and find a hidden treasure. Congratulations!",
    choices: ["Ending 2"],
    image: "https://www.rd.com/wp-content/uploads/2020/05/GettyImages-638387674.jpg",
  },
  buildShelterOutside: {
    text: "You build a shelter outside and survive until rescue arrives. Congratulations!",
    choices: ["Ending 3"],
    image: "https://www.shutterstock.com/image-photo/refugee-handmade-shelter-by-sea-260nw-1082830451.jpg",
  },
  exploreIsland: {
    text: "You explore the island and find a hidden cave. What lies within?",
    choices: ["Enter the Cave", "Return to the Beach"],
    consequences: ["enterCave", "returnBeach"],
    image: "https://www.aleenta.com/wp-content/uploads/Eight-Islands-to-Explore.jpg",
  },
  restRecuperate: {
    text: "You rest and recuperate, preparing for further adventures. Congratulations!",
    choices: ["Ending 5"],
    image: "https://t4.ftcdn.net/jpg/06/02/12/03/360_F_602120398_1QjkOmGYJyAvZmRX6FflXtXGxtMKo2CL.jpg",
  },
 

};

function startGame() {
  currentState = "start";
  updatePage();
}

function updatePage() {
  let stage = gameData[currentState];
  document.getElementById("story-text").innerText = stage.text;

  let choicesList = document.getElementById("choices");
  choicesList.innerHTML = "";
  for (let i = 0; i < stage.choices.length; i++) {
    let choice = document.createElement("button");
    choice.innerText = stage.choices[i];
    choice.addEventListener("click", function () {
      currentState = stage.consequences[i];
      updatePage();
    });
    choicesList.appendChild(choice);
  }

  document.getElementById("story-image").src = stage.image;
}

startGame();
