import requestLogin from './js/requestLogin.js'
import {receivedNegativeResponse} from './js/getRequestResponse.js'

const inputLogin = document.getElementById("login");
const inputPassword = document.getElementById("password");
const btn = document.querySelector(".authorization__button");
const authorizationForm = document.querySelector(".authorization__form");
const authorizationWrapper = document.querySelector(".authorization-wrap");



const authorizationResult = document.querySelector(".authorization__result");

authorizationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await requestLogin(inputLogin.value, inputPassword.value);
  if (result.status !== "ok") {
    receivedNegativeResponse(result, inputLogin,inputPassword,authorizationResult )
  } else {
    document.cookie = `token=${result.token}`;
    inputLogin.setAttribute("style", "border-color:#43A470;");
    inputPassword.setAttribute("style", "border-color:#43A470;");
    authorizationResult.innerHTML = `<img src="./src/img/загрузка.gif">`;
    setTimeout(() => {
      authorizationForm.remove();
      authorizationWrapper.innerHTML = `
                <img src="./src/img/flower.png" alt="авторизация-лого">
                <h2 class="authorization__title">Добро пожаловать!</h2>
                <p class="authorization__welcome">${result.user["name"]}, Вы успешно авторизованы</p>
                `;
    }, 1000);
    
  }
});
