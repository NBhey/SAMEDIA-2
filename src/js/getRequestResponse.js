export function receivedNegativeResponse(result, login, password, el){
    login.classList.add("authorization__failure");
    password.classList.add("authorization__failure");
    el.innerHTML = `${result.errorMessage}`;
}