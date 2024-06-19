export default async function requestLogin(login, password) {
    const response = await fetch(
      `https://test-works.pr-uni.ru/api/login/index.php?login=${login}&password=${password}`
    );
    const data = await response.json();
    return data;
  }