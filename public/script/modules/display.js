import * as variables from './variables.js';


var body = document.body;

export async function displayLoading() {

  variables.loadingscherm.classList.add("display");
  body.classList.add("hidden");

  // to stop loading after some time
  setTimeout(() => {
    variables.loadingscherm.classList.remove("display");
    body.classList.remove("hidden");
  }, 5000);

}

export function searchLoading() {

  variables.h2.innerHTML = '';
  variables.ul.innerHTML = '';

  variables.ul.style.display = "flex";

  variables.ul.innerHTML = `
  <li class="geenResulteten">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </li>`
}

export function errorscreen() {
  const errorscreen =`
  <div class="loading">
    <span></span>
      <span></span>
      <span></span>
  </div>
  `;
  return errorscreen;
}


