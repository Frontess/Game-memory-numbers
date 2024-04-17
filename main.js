
// объявляем глобальную переменную (шаблон) и вводим два свойства/состояния
class Card {
  _open = false
  _success = false
  //конструктор - функция которая будет вызвана при создании экземпляра класса
  constructor(container, number, action) {
      this.card = document.createElement('div')
      this.card.classList.add('card')
      this.card.textContent = number
      this.number = number

      //добавляем к карточке событие, чтобы при клике карточка открывалась если она не была открыта
      this.card.addEventListener('click', () => {
        if (this.open == false && this.success == false) {
          this.open = true
          // создаем колбэк функцию для реакции при открытии карточки
          action(this)
        }
      })
    // куда мы добавляем карточки
      container.append(this.card)
  }
  // для состояния открытой карточки и для выделенной карточки изменение класса в зависимости от свойства
  set open(value) {
    this._open = value
    value ? this.card.classList.add('open') : this.card.classList.remove('open')
  }
  get open() {
    return this._open
  }
  set success(value) {
    this._success = value
    value ? this.card.classList.add('success') : this.card.classList.remove('success')
  }
  get success() {
    return this._open
  }
}

// код игрового процесса

    function startGame(container, cardsCount) {
      let cardsNumberArray = [],
      cardArray = [],
      // для логики игры создаем две новые переменные
      firstCard = null,
      secondCard = null

    for (let num = 1; num <= cardsCount / 2; num++) {
      cardsNumberArray.push(num)
      cardsNumberArray.push(num)
    }

    cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5)

    for(const cardNumber of cardsNumberArray) {
      cardArray.push(new Card(container, cardNumber, flip))
    }

    // делаем проверку на совпадание или несовпадение цифр
    function flip(card) {
      if(firstCard !== null && secondCard !== null) {
        if(firstCard.number !== secondCard.number) {
          firstCard.open = false
          secondCard.open = false
          firstCard = null
          secondCard = null
        }
      }
      // заполняем открытые карточки
      if(firstCard == null){
        firstCard = card
      } else {
        if(secondCard == null) {
          secondCard = card
        }
      }
      // сравниваем значение двух открытых карточек. если цифры совпали, то оставляем открытыми
      if(firstCard !== null && secondCard !== null) {
        if(firstCard.number === secondCard.number) {
          firstCard.success = true
          secondCard.success = true
          firstCard = null
          secondCard = null
        }
      }

      if(document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
        alert('Winner!')
        container.innerHTML = ''
        cardsNumberArray = []
        cardArray = []
        firstCard = null
        secondCard = null

        startGame(container, cardsCount)
      }
    }
  }

startGame(document.getElementById('game'), 16);
