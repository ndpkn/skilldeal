// Блок кода страны для формы номера

import intlTelInput from 'intl-tel-input/intlTelInputWithUtils'
import 'intl-tel-input/build/css/intlTelInput.css'

const forms = document.querySelectorAll('form') // Select all forms on the page
const { pathname } = window.location

const errorMap = pathname.includes('ua')
  ? [
      'Невірний номер',
      'Недійсний код країни',
      'Занадто короткий',
      'Занадто довгий',
      'Невірний номер ',
    ]
  : [
      'Неправильный номер',
      'Недействительный код страны',
      'Слишком короткий',
      'Слишком длинный',
      'Неправильный номер',
    ]

forms.forEach(form => {
  const input = form.querySelector('#phone')
  const button = form.querySelector('#submit')
  const errorMsg = form.querySelector('#error-msg')
  const successMsg = form.querySelector('#success-msg')
  const nameInput = form.querySelector('#name')

  const iti = intlTelInput(input, {
    initialCountry: 'ua',
    onlyCountries: [
      'al',
      'ad',
      'at',
      'by',
      'be',
      'ba',
      'bg',
      'hr',
      'cz',
      'dk',
      'ee',
      'fo',
      'fi',
      'fr',
      'de',
      'gi',
      'gr',
      'va',
      'hu',
      'is',
      'ie',
      'it',
      'lv',
      'li',
      'lt',
      'lu',
      'mk',
      'mt',
      'md',
      'mc',
      'me',
      'nl',
      'no',
      'pl',
      'pt',
      'ro',
      'ru',
      'sm',
      'rs',
      'sk',
      'si',
      'es',
      'se',
      'ch',
      'ua',
      'gb',
    ],
    utilsScript: '/intl-tel-input/js/utils.js?1725646185594',
  })

  const reset = () => {
    input.classList.remove('error')
    errorMsg.innerHTML = ''
    errorMsg.classList.add('hide')
    successMsg.innerHTML = ''
    successMsg.classList.add('hide')
  }

  const showError = msg => {
    input.classList.add('error')
    errorMsg.innerHTML = msg
    errorMsg.classList.remove('hide')
  }

  const showSuccess = msg => {
    input.classList.add('success')
    successMsg.innerHTML = msg
    successMsg.classList.remove('hide')
  }

  let timesSubmitted = 0
  let Timer = null
  const timeCounter = 60 * 1000

  button.addEventListener('click', e => {
    e.preventDefault()
    reset()

    const lastSubmitTime = localStorage.getItem('formSubmittedAt')
    const currentTime = new Date().getTime()

    if (lastSubmitTime !== null) {
      const timeDiff = currentTime - lastSubmitTime
      if (timeDiff < timeCounter) {
        showError(
          pathname.includes('ua')
            ? 'Ви можете надсилати дані не частіше 1 разу на хвилину!'
            : 'Вы можете отправлять данные не чаще 1 раза в минуту!',
        )
        return
      }
    }

    if (timesSubmitted < 1) {
      if (!input.value.trim()) {
        showError(pathname.includes('ua') ? "Обов'язково" : 'Обязательно')
      } else if (iti.isValidNumberPrecise()) {
        const formData = {
          name: nameInput.value,
          phone: input.value,
        }
        sendMessage(`${formData.name}: ${formData.phone}`)
        showSuccess(
          pathname.includes('ua')
            ? "Заявку надіслано. Ми зв'яжемося з вами найближчим часом."
            : 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.',
        )
        localStorage.setItem('formSubmittedAt', currentTime)
        timesSubmitted += 1
      } else {
        const errorCode = iti.getValidationError()
        const msg =
          errorMap[errorCode] || pathname.includes('ua')
            ? 'Невірний номер'
            : 'Неправильный номер'
        showError(msg)
      }

      if (Timer === null) {
        Timer = setTimeout(() => {
          if (timesSubmitted > 0) {
            showError(' ')
          }
          timesSubmitted = 0
          localStorage.setItem('formSubmittedAt', null)
        }, timeCounter)
      }
    } else {
      showError(
        pathname.includes('ua')
          ? 'Ви можете надсилати дані не частіше 1 разу на хвилину!'
          : 'Вы можете отправлять данные не чаще 1 раза в минуту!',
      )
    }
  })

  input.addEventListener('change', reset)
  input.addEventListener('keyup', reset)
})

const intSearchInputs = document.querySelectorAll('.iti__search-input')
intSearchInputs.forEach(intSearchInput => {
  intSearchInput.setAttribute('placeholder', 'Пошук / Поиск')
})

// Плавная прокрутка к якорю
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  // eslint-disable-next-line func-names
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    })
  })
})

// Липкое меню
const bottomHeader = document.querySelector('.bottomHeader')
const topHeader = document.querySelector('.topHeader')
const topHeaderHeight = topHeader.clientHeight
const header = document.querySelector('header')
const headerHeight = header.clientHeight

window.addEventListener('scroll', () => {
  const scrollHeight = topHeaderHeight + 10
  header.setAttribute('style', `height:${headerHeight}px`)

  if (window.scrollY > scrollHeight) {
    bottomHeader.classList.add('sticky')
  } else {
    bottomHeader.classList.remove('sticky')
  }
})

// SEND TO TELEGRAM

const tg = {
  token: '7527002571:AAF0uvF7QAkYBkj784rrWluIf_4dEA7iOEM',
  chat_id: '-4512534374',
}

/**
 * By calling this function you can send message to a specific user
 * @param {String} the text to send
 *
 */
const sendMessage = text => {
  const url = `https://api.telegram.org/bot${tg.token}/sendMessage?chat_id=${tg.chat_id}&text=${text}`
  const xht = new XMLHttpRequest()
  xht.open('GET', url)
  xht.send()
}
