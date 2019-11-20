/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateData } from './updateSettings'

// DOM elemets
const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form--login')
const updateLoginForm = document.querySelector('.form-user-data')
const updatePasswordForm = document.querySelector('.form-user-password')
const logOutBtn = document.querySelector('.nav__el--logout')

//DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations)
}

if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password)
  })
};

if (updateLoginForm) {
  updateLoginForm.addEventListener('submit', e => {
    e.preventDefault()
    const form = new FormData()
    form.append('name', document.getElementById('name').value)
    form.append('email', document.getElementById('email').value)
    form.append('photo', document.getElementById('photo').files[0])

    updateData(form, 'data')
  })
}

if (updatePasswordForm) {
  updatePasswordForm.addEventListener('submit', async e => {
    e.preventDefault()
    const oldPassword = document.getElementById('password-current').value
    const password = document.getElementById('password').value
    const passwordConfirm = document.getElementById('password-confirm').value
    await updateData({ oldPassword, password, passwordConfirm }, 'password')

    document.getElementById('password-current').value = ''
    document.getElementById('password').value = ''
    document.getElementById('password-confirm').value = ''
  })
}

if (logOutBtn) logOutBtn.addEventListener('click', logout)
