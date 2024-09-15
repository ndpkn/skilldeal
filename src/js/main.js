// Блок кода страны для формы номера

import intlTelInput from 'intl-tel-input/intlTelInputWithUtils'
import 'intl-tel-input/build/css/intlTelInput.css'

const forms = document.querySelectorAll('form') // Select all forms on the page
const errorMap = [
  'Невірний номер / Неправильный номер',
  'Недійсний код країни / Недействительный код страны',
  'Занадто короткий / Слишком короткий',
  'Занадто довгий / Слишком длинный',
  'Невірний номер / Неправильный номер',
]

forms.forEach(form => {
  const input = form.querySelector('#phone') // Select the phone input within each form
  const button = form.querySelector('#submit') // Select the submit button within each form
  const errorMsg = form.querySelector('#error-msg') // Select the error message element within each form
  const nameInput = form.querySelector('#name') // Select the name input within each form

  // Initialize intlTelInput for each form
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

  // Define reset and showError functions for each form
  const reset = () => {
    input.classList.remove('error')
    errorMsg.innerHTML = ''
    errorMsg.classList.add('hide')
  }

  const showError = msg => {
    input.classList.add('error')
    errorMsg.innerHTML = msg
    errorMsg.classList.remove('hide')
  }

  // Add event listeners for each form
  button.addEventListener('click', e => {
    e.preventDefault()
    reset()
    if (!input.value.trim()) {
      showError("Обов'язково / Обязательно")
    } else if (iti.isValidNumberPrecise()) {
      // Send form data to server-side script
      const formData = new FormData(form)
      formData.append('name', nameInput.value)
      formData.append('phone', input.value)
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`)
      // })
    } else {
      const errorCode = iti.getValidationError()
      const msg = errorMap[errorCode] || 'Невірний номер / Неправильный номер'
      showError(msg)
    }
  })

  input.addEventListener('change', reset)
  input.addEventListener('keyup', reset)
})

const intSearchInputs = document.querySelectorAll('.iti__search-input')

intSearchInputs.forEach(intSearchInput =>
  intSearchInput.setAttribute('placeholder', 'Пошук / Поиск'),
)

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
