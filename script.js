const addUserBtn = document.getElementById('add-person');
const doubleBtn = document.getElementById('double-money');
const showMillionaireBtn = document.getElementById('show-millionaire');
const sortBtn = document.getElementById('sort');
const calculateSumBtn = document.getElementById('calculate-sum');

let data = [];

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
}
