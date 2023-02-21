const predictions = [
    "Your noun will verb with splendor and radiance.",
    "An verb of enchantment and mystery shall noun you.",
    "A noun of grandeur and prestige shall verb you.",
    "You shall verb a life of noun and euphoria.",
    "A verb of felicity and noun shall locate you.",
    "Prosperity and opulence shall verb your noun.",
    "A noun of affluence and success shall verb you.",
    "A verb of secrecy and daring awaits your noun.",
    "The noun of your aspirations shall verb in your future.",
    "A verb of adoration and bliss shall noun your heart.",
    "Your noun shall verb with exhilaration and thrill.",
    "You shall verb a realm of noun and mystique.",
    "A noun of serenity and calm shall verb your soul.",
    "The noun of your future shall verb with prospects.",
    "A verb of authority and prestige shall noun you.",
    "A noun of elegance and poise shall verb your life.",
    "A verb of mirth and cheer shall noun your days.",
    "Your noun shall verb with a novel and exciting saga.",
    "You shall verb a noun of riches and treasure.",
    "A verb of assurance and motivation shall noun you."
  ];
  
const nouns = [
    "odyssey",
    "expedition",
    "chance",
    "prodigy",
    "benefaction",
    "phantasm",
    "hoard",
    "endowment",
    "curiosity",
    "fairy tale"
  ];
  
const verbs = [
    "anticipate",
    "illuminate",
    "enfold",
    "endow",
    "embellish",
    "kindle",
    "encircle",
    "confer",
    "steer",
    "metamorphose"
  ];

  const warnings = [
    "Do you dare to challenge fate? Proceed with caution.",
    "Are you willing to incur the wrath of the stars? Think twice.",
    "Do you seek to test the bounds of destiny? Proceed at your own risk.",
    "Do you want to dance with the devil? Don't say I didn't warn you.",
    "Do you believe you can outwit the universe? Be prepared to pay the price.",
    "Do you seek to alter the course of your future? The cost may be higher than you think.",
    "Do you dare to toy with destiny? The consequences could be dire.",
    "Do you think you can cheat death? You may live to regret it.",
    "Do you want to play with fire? The inferno may consume you.",
    "Do you want to upset the natural order of things? Brace yourself for the fallout."
   ];


const fortuneTellerShouts = [
    "Discover your destiny and unlock the secrets of the universe!",
    "Unleash the power within and let me guide you to success!",
    "Find clarity in the chaos and unlock your full potential!",
    "Unlock the secrets of your past, present, and future!",
    "Discover the path to true happiness and success!",
    "Find the answers you seek and unlock your inner peace!",
    "The future is yours for the taking - let me show you how!",
    "Take control of your life and unlock your true potential!",
    "Find the path to love, happiness, and success!",
    "Discover the secrets to unlocking your inner power!",
    "Unleash the power of the universe and find success!",
    "Find the answers you've been seeking and unlock your potential!",
    "Unlock the secrets of your soul and find true happiness!",
    "Discover the key to unlocking your inner strength!",
    "Find the path to abundance, wealth, and success!",
    "Unlock the power of your subconscious and achieve greatness!",
    "Find the answers to life's biggest questions and unlock your potential!",
    "Discover the secret to unlocking your full potential!",
    "Unlock the power of the universe and achieve success!",
    "Find the key to unlocking your inner peace and happiness!"
  ];
  
function generatePrediction() {
    const predictionIndex = Math.floor(Math.random() * predictions.length);
    const nounIndex = Math.floor(Math.random() * nouns.length);
    const verbIndex = Math.floor(Math.random() * verbs.length);
    return predictions[predictionIndex].replace("noun", nouns[nounIndex]).replace("verb", verbs[verbIndex]);
  }


function generateWarnings() {
    const index = Math.floor(Math.random() * warnings.length)
    return warnings[index] + ' Arrive at dawn.'
}


// Get the current date and number of times a fortune has been generated today
let date = new Date();
let currentDate = date.toDateString();
let storedDate = localStorage.getItem('date');
let storedCount = parseInt(localStorage.getItem('count')) || 0;

// Check if the stored date matches the current date
// If not, reset the stored count to 0
if (storedDate !== currentDate) {
  storedCount = 0;
  localStorage.setItem('date', currentDate);
}


displaySentences = () => {
  
  setTimeout(() => {
    let fortuneElement = document.getElementById("fortune-prediction")
    index = Math.floor(Math.random() * fortuneTellerShouts.length)

    fortuneElement.innerHTML = fortuneTellerShouts[index];
    fortuneElement.classList.remove("fade-out");
    setTimeout(() => {
      fortuneElement.classList.add("fade-out");
    }, 5000);
  }, 200);
}

let randomInterval = Math.floor(Math.random() * (8000 - 5000 + 1)) + 5000;

let intervalId;

let startInterval = () => {
  intervalId = setInterval(displaySentences, randomInterval);
}

let stopInterval = () => {
  clearInterval(intervalId);
}

let generateButton = document.getElementById('generate-fortune')

generateButton.addEventListener('click', function() {
  stopInterval();
  displayPrediction();
});

startInterval();


function displayPrediction() {
    clearInterval(intervalId);
    let fortuneElement = document.getElementById("fortune-prediction")
    fortuneElement.classList.add("fade-out");

    setTimeout(() => {
        if (storedCount < 3) {
      fortuneElement.innerHTML = generatePrediction();
      storedCount++;
      localStorage.setItem('count', storedCount);
        } else {
        fortuneElement.innerHTML = generateWarnings();
        }
      fortuneElement.classList.remove("fade-out");
    }, 300);
    setTimeout(() => {
      fortuneElement.classList.add("fade-out");
    }, 10000);
    };





