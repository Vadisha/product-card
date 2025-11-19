const productCards = document.querySelectorAll('.card-container');
const changeCollorAllButton = document.querySelector('#change-color-all-card');
const greenCollorHash = '#00FF00';
const blueCollorHash = '#2e2eccff';

changeCollorAllCardButton.addEventListener('click', () => {
  productCards.forEach((card) => card.style.backgroundColor = greenCollorHash)
})


const productCard = document.querySelector('.card-container');
const changeCollorFirstButton = document.querySelector('#change-color-first-card');
changeCollorFirstCardButton.addEventListener('click', () => {
  firstProductCard.card.style.backgroundColor = blueCollorHash;
})