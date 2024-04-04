const myForm = document.querySelector('.form');
const completedState = document.querySelector('.completed_state');
const completeBtn = document.querySelector('.btn.complete');
const inputs = document.querySelectorAll('input');
const errorMsgs = document.querySelectorAll('.error_msg');
const currentYear = new Date().getFullYear();

function fillCard() {
  const nameInput = document.querySelector('#name');
  const userName = document.querySelector('.user_name');
  const numberInput = document.querySelector('#number');
  const cardNumber = document.querySelector('.card_number');
  const expMonthInput = document.querySelector('#exp_month');
  const expMonth = document.querySelector('.month');
  const expYearInput = document.querySelector('#exp_year');
  const expYear = document.querySelector('.year');
  expYearInput.min = currentYear;
  const cvcInput = document.querySelector('#cvc');
  const cvc = document.querySelector('.cvc_field');

  numberInput.addEventListener('input', function () {
    if (this.value.length > 16) {
      this.value = this.value.slice(0, 16);
      /* prevent user from exceding maxlength of the card number */
    }
    const inputValue = numberInput.value;
    const formattedValue = inputValue.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
    cardNumber.textContent = formattedValue;
  });

  expMonthInput.addEventListener('input', () => {
    expMonth.textContent = expMonthInput.value;
  });
  expYearInput.addEventListener('input', () => {
    expYear.textContent = `/${expYearInput.value}`;
  });
  nameInput.addEventListener('input', () => {
    userName.textContent = nameInput.value;
  });
  cvcInput.addEventListener('input', function () {
    if (this.value > 3) {
      this.value = this.value.slice(0, 3);
    }
    cvc.textContent = cvcInput.value;
  });
}

function showError(index, errMsg) {
  inputs[index].classList.add('error');
  errorMsgs[index].classList.add('error');
  errorMsgs[index].textContent = errMsg;
}

function removeError(index) {
  inputs[index].classList.remove('error');
  errorMsgs[index].classList.remove('error');
}

function handleInputBlur(index) {
  if (inputs[index].value.trim() === '') {
    showError(index);
  }
}

function isValidName(name) {
  const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
  return nameRegex.test(name);
}

function submitForm(isValid) {
  if (isValid) {
    myForm.classList.add('hide');
    completedState.classList.remove('hide');
  }
}

myForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let isValid = true;

  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      showError(index, 'can\'t be blank');
      isValid = false;
    } else if (input.id === 'name' && !isValidName(input.value)) {
      showError(index, 'invalid name');
      isValid = false;
    } else if (input.id === 'exp_month' && (input.value < 1 || input.value > 12)) {
      showError(index, 'invalid month');
      isValid = false;
    } else if (input.id === 'exp_year' && (input.value < currentYear)) {
      showError(index, 'invalid year');
      isValid = false;
    }
  });

  submitForm(isValid);
});

inputs.forEach((input, index) => {
  input.addEventListener('focus', () => removeError(index));
  input.addEventListener('blur', () => handleInputBlur(index));
});

completeBtn.addEventListener('click', () => {
  myForm.reset();
  myForm.classList.remove('hide');
  completedState.classList.add('hide');
});

fillCard();
