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
  searchShelter: {
    text: "You search for shelter and stumble upon an old cave. What will you do?",
    choices: ["Explore the Cave", "Build a Shelter Outside"],
    consequences: ["exploreCave", "buildShelterOutside"],
    image: "https://thumbs.dreamstime.com/z/palm-shelters-sunbeds-china-beach-da-nang-vietnam-also-called-non-nuoc-south-sea-marble-74305818.jpg",
  },
  buildRaft: {
    text: "You build a raft and set sail. Where will you go?",
    choices: ["Head North", "Sail East"],
    consequences: ["headNorth", "sailEast"],
    image: "https://thumbs.dreamstime.com/b/raft-sea-wooden-toy-beach-34471062.jpg",
  },
  climbCliff: {
    text: "You climb the cliff and spot a rescue team in the distance. Congratulations!",
    choices: ["Ending 1"],
    image: "https://highexposures.com/blog/wp-content/uploads/2014/02/annie1.jpg",
  },
  exploreCave: {
    text: "You explore the cave and find a hidden treasure. Congratulations!",
    choices: ["Ending 2"],
    image: "https://www.rd.com/wp-content/uploads/2020/05/GettyImages-638387674.jpg",
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
