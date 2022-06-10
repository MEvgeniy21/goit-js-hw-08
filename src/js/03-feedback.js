import debounce from 'lodash.debounce';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
  submit: document.querySelector('button[type="submit"]'),
};
const tempFormState = {};
const LOCALSTORAGE_KEY = 'feedback-form-state';
const persistedFormState = localStorage.getItem(LOCALSTORAGE_KEY);

if (persistedFormState) {
  setFormStateFromLS(JSON.parse(persistedFormState));
}

refs.form.addEventListener('input', debounce(onInput, 500));
refs.submit.addEventListener('click', onClickSubmit);

function onInput(event) {
  const ATTRIBUTE_VALUE = event.target.getAttribute('name');
  if (ATTRIBUTE_VALUE) {
    tempFormState[ATTRIBUTE_VALUE] = event.target.value;
  }
  saveFormStateToLS(tempFormState);
}

function onClickSubmit(event) {
  event.preventDefault();
  if (!Object.keys(tempFormState).length) {
    return console.log('Поля формы пустые');
  }
  console.log(tempFormState);
  resetFormState();
}

function saveFormStateToLS(state) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
}

function setFormStateFromLS(state) {
  Object.assign(tempFormState, state);
  if (state.email) {
    refs.email.value = state.email;
  }
  if (state.message) {
    refs.message.value = state.message;
  }
}

function resetFormState() {
  for (const prop of Object.keys(tempFormState)) {
    delete tempFormState[prop];
  }
  localStorage.removeItem(LOCALSTORAGE_KEY);
  refs.form.reset();
}
