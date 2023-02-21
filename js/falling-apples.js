const magicWords = {
    creatures: {
    category: 'Magical Creatures',    
    words: [      
        'Dragon',      
        'Unicorn',      
        'Phoenix',      
        'Goblin',      
        'Gnome',      
        'Merfolk',      
        'Minotaur',      
        'Cyclops',      
        'Witch',      
        'Vampire'    
    ]
  },
  objects: {
    category: 'Magical Objects',
    words: [
      'Wand',
      'Amulet',
      'Ring',
      'Potion',
      'Chalice',
      'Cauldron',
      'Talisman',
      'Mirror',
      'Scepter'
    ]
  },
  places: {
    category: 'Magical Places',
    words: [
      'Forest',
      'Dungeon',
      'Castle',
      'Tower',
      'Cave',
      'Island',
      'Mountain',
      'Valley',
      'River',
      'Lake'
    ]
  },
  terms: {
    category: 'Magical Terms',
    words: [
      'Incantation',
      'Alchemy',
      'Enchantment',
      'Apparition',
      'Illusion',
      'Summoning',
      'Banishment',
      'Divination',
      'Necromancy',
      'Conjuring'
    ]
  },


};

function chooseWord(object) {
    const list = magicWords[object].words
    let i = Math.floor(Math.random() * list.length)
    return list[i]

}

function generateHolderList(word) {
    const letterHolderList = []
    for (let letter in word) {
        if (letter === ' ') {
            letterHolderList.push(' ')
        } else {
            letterHolderList.push('_')
        }
    }
    return letterHolderList

}



function lettersInWords(word, letter) {
    let indices = [];
    let wordLower = word.toLowerCase();
    let letterLower = letter.toLowerCase();
  
    for (let i = 0; i < wordLower.length; i++) {
      if (wordLower[i] === letterLower) {
        indices.push(i);
      }
    }
  
    return indices;
  }

const form = document.getElementById("game__form");
const categoriesDiv = document.getElementById("game__categories-container");

form.addEventListener("submit", event => {
  event.preventDefault();
  categoriesDiv.style.display = "block";
  form.style.display = 'none'
  choseCategory()
});

function choseCategory() {
document.getElementById('game__categories-container').style.display = 'block'
document.getElementById('game__play').style.display = 'none'
  

const categoryButtons = document.querySelector('#game__categories');


for (let category in magicWords) {
  let button = document.createElement('button');
  button.innerText = magicWords[category].category;
  button.classList.add("game__button-category");
  button.classList.add("game__category-sizer");
  button.value = category;
  button.addEventListener("click", () => {
    game(category)})
  button.addEventListener("click", () => {
    categoryButtons.replaceChildren()
  });
  categoryButtons.appendChild(button);


}
}


function game(category) {

  const wordHeadline = document.getElementById('game__word')
  const categoryHeadline = document.getElementById('game__choosen-category')
  const letterHolderHeadline = document.getElementById('game__letter-holder')
  const chancesHeadline = document.getElementById('game__chances')
  const UsedLettersHeadline = document.getElementById('game__letter-list')
  const OffComment = document.getElementById('game__comment')
  let word = chooseWord(category)
  const letterHolderContainer = document.querySelector('#game__letter-holder');
  const gameForm = document.getElementById('game__form-container')
  const gameComment = document.getElementById('game__comment')
  const gameUsedLetters = document.getElementById('game__used-letters')
  const container = document.getElementById('game__down-container')

  let letterHolder = generateHolderList(word)
  let usedLetters = []
  let chances = 8
  console.log(word)
  console.log(letterHolder)
  console.log(usedLetters)

  document.getElementById('game__categories-container').style.display = 'none'
  document.getElementById('game__play').style.display = 'grid'

  gameForm.style.display = 'block'
  gameComment.style.display = 'block'
  gameUsedLetters.style.display = 'block'

  categoryHeadline.innerText = magicWords[category].category
  chancesHeadline.innerHTML = chances
  UsedLettersHeadline.innerHTML = usedLetters

  function updateLetters(word) {
    letterHolderContainer.innerHTML = '';
    for (let letter of word) {
      let sign = document.createElement('div');
      sign.classList.add('game__letter')
      sign.innerHTML = letter
      letterHolderContainer.appendChild(sign)
  } }

  function commentWhenCoolGues(letter, IndexesList) {
    let timesOccur = IndexesList.length 
    let time = 'time'
    if (timesOccur > 1) {
      time = 'times'
    }
    let newPar = document.createElement('p');
    let string = `The letter <strong>${letter}</strong> appears ${timesOccur} ${time}.`
    newPar.innerHTML = string
    return string

  }

  function dropdownRandomCrystal(trial) {
    let crystal = document.getElementById(`game__crystal-id-${trial}`)
    crystal.style.animation = 'falling-with-bounce 0.5s steps(7) forwards';
  }

  function tryAgain(score) {
    gameForm.style.display = 'none'
    gameComment.style.display = 'none'
    gameUsedLetters.style.display = 'none'
    container.classList.add('game__container-after-game')
    const text = document.createElement('p')
    
    let innerText
    let classColor
    if (score === 'win') {
      innerText = 'You win! Grats!! 🧙 🧙 '
      classColor = 'game__green-win'
    } else {
      console.log(letterHolderContainer)
      console.log(word)
      updateLetters(word)



      innerText = 'You lose.. 😭😭'
      classColor = 'game__red-lose'

    }
    const finalLettersWinOrLose = document.querySelectorAll('.game__letter');
    finalLettersWinOrLose.forEach(letter => {
      letter.classList.add(classColor)});
    text.innerHTML =  innerText
    container.appendChild(text)
    OffComment.innerHTML = ''
    usedLetters = []

    const tryAgainButton = document.createElement('button')
    tryAgainButton.innerHTML = 'Try Again'
    tryAgainButton.classList.add('game__button-try')
    tryAgainButton.addEventListener('click', choseCategory)
    tryAgainButton.addEventListener('click', (event) => {
      text.remove()
      event.target.remove()
      

    })
    container.appendChild(tryAgainButton)

    
    


    
  }


  updateLetters(letterHolder)
  document.getElementById('game__try-letter').addEventListener('submit', function(event) {
    event.preventDefault();
    const letter = document.getElementById('letter').value;
    if (usedLetters.includes(letter.toLowerCase())) {
        OffComment.innerHTML = 'No repeating letters!' 
    } else {
        usedLetters.push(letter.toLowerCase())
        UsedLettersHeadline.innerHTML = usedLetters
        toCheck = lettersInWords(word, letter)
        OffComment.innerHTML = commentWhenCoolGues(letter, toCheck)
        if (toCheck.length !== 0) {
            toCheck.forEach(index => {
                letterHolder[index] = word[index]})
              } else {
            OffComment.innerHTML = 'No match 🥶';
            dropdownRandomCrystal(chances) 
            chances--;
            chancesHeadline.textContent = chances; }

        updateLetters(letterHolder)
        if (letterHolder.join('') === word) {
          const win = 'win'
          return tryAgain(win)
        } 
        else if (chances <= 0) {
            const lose = 'lose'
            return tryAgain(lose)
          }

        }
      event.target.reset()
    })



}


function appendCrystals() {
  let counter = 0;
  const container = document.querySelector('#game__crystals-container');
  const maxRangePercentVertical = 5; // The maximum range for the random offset in percentage
  const maxRangePercentHorizontal = 35
  const containerWidth = 82; // The width of the container in percentage
  const listOfIds = [2, 4, 1, 3, 5, 8, 7, 6]
  while (counter < 8) {
    let crystal = document.createElement('img');
    let id = listOfIds[counter]
    crystal.setAttribute(
      'src',
      'resources/g2p0oezb624vd8ib8696u3jfd8pgnwpf.png',
    );
    crystal.classList.add('game__crystals-item');
    crystal.setAttribute('id', `game__crystal-id-${id}`)
    let left = (counter * (containerWidth / 8)) + (Math.random() * maxRangePercentVertical - (maxRangePercentVertical / 2)) + 10 + "%";
    let top = (Math.random() * maxRangePercentHorizontal - (maxRangePercentHorizontal / 2)) * 0.6 + 12 + "%";
    let number = (Math.random() * 20) 
    let second = (Math.random() * 4) + 2
    crystal.style.top = top;
    crystal.style.left = left;
    crystal.style.transform =`rotate(${number}deg)`
    container.appendChild(crystal);
    counter++;
  }
}

appendCrystals()



