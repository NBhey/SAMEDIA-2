const inputLogin = document.getElementById("login");
const inputPassword = document.getElementById("password");
const btn = document.querySelector(".authorization__button");
const authorizationForm = document.querySelector(".authorization__form");
const authorizationWrapper = document.querySelector(".authorization-wrap");

async function requestLogin(login, password) {
  const response = await fetch(
    `https://test-works.pr-uni.ru/api/login/index.php?login=${login}&password=${password}`
  );
  const data = await response.json();
  if (data.status === "ok") {
    document.cookie = `token=${data.token}`;
  }
  return data;
}

const authorizationResult = document.querySelector(".authorization__result");

authorizationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const result = await requestLogin(inputLogin.value, inputPassword.value);
  if (result.status === "ok") {
    inputLogin.setAttribute("style", "color:#43A470; border-color:#43A470;");
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
  } else {
    inputLogin.classList.add("authorization__failure");
    inputPassword.classList.add("authorization__failure");
    authorizationResult.innerHTML = `${result.errorMessage}`;
  }
});
