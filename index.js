import { catsData } from './data.js'

const emotionsRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionsRadios.addEventListener('change', highlightSelectedOption)

getImageBtn.addEventListener('click', renderCat)

memeModalCloseBtn.addEventListener('click', closeModal)

function getEmotionsArray(cats) {
  const emotionsArray = []
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion)
      }
    }
  }
  return emotionsArray
}

getEmotionsArray(catsData)

function renderEmotionsRadios(cats) {
  let radioItems = ''
  const emotions = getEmotionsArray(cats)
  for (let emotion of emotions) {
    radioItems += `<div class="radio">
           <label for="${emotion}">${emotion}</label>
           <input
           type="radio"
           id="${emotion}"
           value="${emotion}"
           name="emotions">
        </div>`
  }
  emotionsRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

function highlightSelectedOption(e) {
  const radios = document.getElementsByClassName('radio')
  for (let radio of radios) {
    radio.classList.remove('highlight')
  }
  document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value
    const isGif = gifsOnlyOption.checked

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif) {
        return cat.emotionTags.includes(selectedEmotion) && cat.isGif
      } else {
        return cat.emotionTags.includes(selectedEmotion)
      }
    })
    return matchingCatsArray
  }
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray()

  if (catsArray.length === 1) {
    return catsArray[0]
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length)
    return catsArray[randomNumber]
  }
}

function renderCat() {
  const catObject = getSingleCatObject()
  memeModal.style.display = 'flex'
  memeModalInner.innerHTML = `<img src="./images/${catObject.image}" alt="${catObject.alt}" class="cat-img">`
}

function closeModal() {
  memeModal.style.display = 'none'
}
