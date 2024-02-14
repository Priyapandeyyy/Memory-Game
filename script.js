const section = document.querySelector('section');
const playerLivesCount = document.querySelector("span");
let playerLives = 8;

playerLivesCount.textContent = playerLives;

// Generate the data
const getData = () => [
    { imgSrc: "./Images/photo(1).png", name: "photo(1)"},
    { imgSrc: "./Images/photo(2).jpg", name: "photo(2)"},
    { imgSrc: "./Images/photo(3).jpg", name: "photo(3)"},
    { imgSrc: "./Images/photo(4).webp", name: "photo(4)"},
    { imgSrc: "./Images/photo(5).jpg", name: "photo(5)"},
    { imgSrc: "./Images/photo(6).jpg", name: "photo(6)"},
    { imgSrc: "./Images/photo(7).jpg", name: "photo(7)"},
    { imgSrc: "./Images/photo(8).jpg", name: "photo(8)"},
    { imgSrc: "./Images/photo(1).png", name: "photo(1)"},
    { imgSrc: "./Images/photo(2).jpg", name: "photo(2)"},
    { imgSrc: "./Images/photo(3).jpg", name: "photo(3)"},
    { imgSrc: "./Images/photo(4).webp", name: "photo(4)"},
    { imgSrc: "./Images/photo(5).jpg", name: "photo(5)"},
    { imgSrc: "./Images/photo(6).jpg", name: "photo(6)"},
    { imgSrc: "./Images/photo(7).jpg", name: "photo(7)"},
    { imgSrc: "./Images/photo(8).jpg", name: "photo(8)"},
];

//  Randomization

const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() -0.5);
    return cardData;
};

// Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();
    
    // Generate HTML
    cardData.forEach((item, index) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";

        // Attach the info to the cards

        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        // Attach the cards to the section
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.addEventListener('click', (e) => {
            card.classList.toggle("toggleCard");
            checkCard(e);
        });
    });
};

// Check Cards

const checkCard = (e) => {
    console.log(e);
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    
    if(flippedCards.length === 2){
        if(
            flippedCards[0].getAttribute("name") === 
        flippedCards[1].getAttribute("name")
        ) {
            console.log("match");
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else{
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives === 0){
                restart("👎 try again");
            }
        }
    }
    // Run a check to see if we win the game
    if(toggleCard.length === 16){
        restart("✌️ you won");
    }
};

// Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = "none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        // Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
        faces[index].src = item.imgSrc;
        cards[index].setAttribute("name", item.name);
        section.style.pointerEvents = "all";
        }, 1000);
    }); 
    playerLives = 8;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();