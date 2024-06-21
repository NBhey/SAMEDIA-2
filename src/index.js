import requestLogin from "./js/requestLogin.js";
import { receivedNegativeResponse } from "./js/getRequestResponse.js";

const inputLogin = document.getElementById("login");
const inputPassword = document.getElementById("password");
const authorizationForm = document.querySelector(".authorization__form");
const authorizationWrapper = document.querySelector(".authorization-wrap");

const authorizationResult = document.querySelector(".authorization__result");

authorizationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await requestLogin(inputLogin.value, inputPassword.value);
  if (result.status !== "ok") {
    receivedNegativeResponse(
      result,
      inputLogin,
      inputPassword,
      authorizationResult
    );
  } else {
    document.cookie = `token=${result.token}`;
    authorizationResult.innerHTML = `<img src="./src/img/загрузка.gif">`;
    if (
      inputLogin.classList.contains("authorization__failure") &&
      inputPassword.classList.contains("authorization__failure")
    ) {
      inputLogin.classList.remove("authorization__failure");
      inputPassword.classList.remove("authorization__failure");
    }
    inputLogin.classList.add("authorization__succsess");
    inputPassword.classList.add("authorization__succsess");

    setTimeout(() => {
      authorizationForm.remove();
      authorizationWrapper.innerHTML = `
                <img src="./src/img/flower.png" alt="авторизация-лого">
                <h2 class="authorization__title">Добро пожаловать!</h2>
                <p class="authorization__welcome">${result.user["name"]}, Вы успешно авторизованы</p>
                `;
    }, 500);
  }
});
