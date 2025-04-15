import { url } from "./hp.js";

const cards = document.querySelector(".cards");
const houseSelect = document.querySelector(".list_of_schools");
const inputName = document.querySelector(".input_name");

let hp = [];

const data = fetch(url);
data
  .then((res) => res.json())
  .then((res) => {
    hp = res;
    renderCardsList(hp);
    schoolOptionSelect(hp)
  });

houseSelect.addEventListener("change", () => serchByNameAndHouse(hp));

inputName.addEventListener("input", () => serchByNameAndHouse(hp));

/* renderCardsList(hp); */
/* schoolOptionSelect(hp); */

function serchByNameAndHouse(arr) {
  let personName = inputName.value.toLowerCase().trim();
  let selectedHouse = houseSelect.value.toLowerCase();

  let filtered = arr
    .filter((el) => el.name.toLowerCase().includes(personName))
    .filter(
      (el) =>
        el.house.toLowerCase() === selectedHouse || selectedHouse === "all"
    );
  renderCardsList(filtered);
}

function renderCardsList(arr) {
  cards.innerHTML = "";

  arr.forEach((el) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img
              class="card__img"
              src=${el.image}
              alt="hero"
              width="334"
              height="350"
            />
            <ul class="card__list">
              <li class="card__title">${el.name || "Unknown"}</li>
              <li class="card__item">Actor: ${el.actor || "Unknown"}</li>
              <li class="card__item">Gender: ${el.gender || "Unknown"}</li>
              <li class="card__item">House: ${el.house || "Unknown"}</li>
              <li class="card__item">Wand core: ${
                el.wand.core || "Unknown"
              }</li>
              <li class="card__item">Alive: ${el.alive ? "yes" : "no"}</li>
            </ul>`;
    cards.append(card);
  });
}

function schoolOptionSelect(arr) {
  let houses = [...new Set(arr.map((el) => el.house))];

  houseSelect.innerHTML = `<option value="all" selected>All</option>`; // сбрасываем старые options

  houses.forEach((house) => {
    // проверяем, чтобы house не был пустой строкой
    let option = document.createElement("option");
    option.value = house;
    option.textContent = house || "Unknown";
    houseSelect.append(option);
  });
}

/* Нужно сформировать option (выподающий список) 

ПОЧИТАТЬ ТЕМУ всплытие и погружение*/
