const addUserBtn = document.getElementById('add-person');
const doubleBtn = document.getElementById('double-money');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateSumBtn = document.getElementById('calculate-sum');
const main = document.getElementById('main');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  // clear main element
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatCurrency(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatCurrency(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  data = data.map(item => {
    return { ...item, money: item.money * 2 };
  });

  updateDOM();
}

function showMillionaire() {
  data = data.filter(item => {
    return item.money >= 1000000;
  });
  updateDOM();
}

function sortByRichest() {
  data.sort((user1, user2) => {
    return user2.money - user1.money;
  });

  updateDOM();
}

function calculateWealth() {
  const totalWealth = data.reduce((acc, item) => (acc += item.money), 0);
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3><strong>Total Wealth: </strong>${formatCurrency(
    totalWealth
  )}</h3>`;
  main.appendChild(wealthEl);
}

// addUser
addUserBtn.addEventListener('click', getRandomUser);

// MAP
doubleBtn.addEventListener('click', doubleMoney);

// FILTER
showMillionaireBtn.addEventListener('click', showMillionaire);

// SORT
sortBtn.addEventListener('click', sortByRichest);

// REDUCE
calculateSumBtn.addEventListener('click', calculateWealth);
