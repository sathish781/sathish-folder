const form = document.getElementById('authForm');
const nameInput = document.getElementById('name');
const pwInput = document.getElementById('password');
const ageInput = document.getElementById('age');
const goalSelect = document.getElementById('goal');
const goalOther = document.getElementById('goalOther');
const msg = document.getElementById('msg');

const dashboard = document.getElementById('dashboard');
const userName = document.getElementById('userName');
const userAge = document.getElementById('userAge');
const userGoal = document.getElementById('userGoal');
const signoutBtn = document.getElementById('signoutBtn');
const editBtn = document.getElementById('editBtn');
const logoutBtn = document.getElementById('logoutBtn');
const togglePw = document.getElementById('togglePw');

const suggestions = document.getElementById('suggestions');
const fruitList = document.getElementById('fruitList');

const STORAGE_KEY = 'fruitfit_user_v1';

// Toggle password visibility
togglePw.addEventListener('click', () => {
  if (pwInput.type === 'password') { pwInput.type = 'text'; togglePw.textContent = 'Hide'; }
  else { pwInput.type = 'password'; togglePw.textContent = 'Show'; }
});

function loadUser(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    return JSON.parse(raw);
  }catch(e){ return null; }
}
function saveUser(u){ localStorage.setItem(STORAGE_KEY, JSON.stringify(u)); }

function showDashboard(u){
  userName.textContent = u.name;
  userAge.textContent = u.age;
  userGoal.textContent = u.goal || '-';
  dashboard.classList.remove('hidden');
  form.classList.add('hidden');
  logoutBtn.classList.remove('hidden');
  showSuggestions(u.goal);
}
function showForm(){
  dashboard.classList.add('hidden');
  suggestions.classList.add('hidden');
  form.classList.remove('hidden');
  logoutBtn.classList.add('hidden');
}

function showSuggestions(goal){
  fruitList.innerHTML = '';
  let fruits = [];
  if(goal === 'skin_care'){
    fruits = ['Papaya','Orange','Blueberries','Avocado'];
  } else if(goal === 'weight_loss'){
    fruits = ['Apple','Grapefruit','Strawberry','Watermelon'];
  } else if(goal === 'weight_gain'){
    fruits = ['Banana','Mango','Dates','Coconut'];
  } else if(goal === 'general_health'){
    fruits = ['Apple','Banana','Orange','Grapes'];
  } else {
    fruits = ['Mixed Fruits','Seasonal Fruits'];
  }
  fruits.forEach(f=>{
    const li = document.createElement('li');
    li.innerHTML = `🍏 <span>${f}</span>`;
    fruitList.appendChild(li);
  });
  suggestions.classList.remove('hidden');
}

const existing = loadUser();
if(existing){ showDashboard(existing); }

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  msg.textContent = '';
  const name = nameInput.value.trim();
  const pw = pwInput.value;
  const age = Number(ageInput.value);
  let goal = goalSelect.value;
  if(goal === ''){ msg.textContent = 'Please choose a goal.'; return; }
  if(goal === 'other'){
    const other = goalOther.value.trim();
    goal = other || 'Other';
  }
  if(!name){ msg.textContent = 'Name is required.'; return; }
  if(!pw || pw.length < 4){ msg.textContent = 'Password must be at least 4 characters.'; return; }
  if(!age || age < 5){ msg.textContent = 'Enter a valid age (5+).'; return; }

  const user = { name, password: pw, age, goal, created: new Date().toISOString() };
  saveUser(user);
  showDashboard(user);
  msg.style.color = 'green';
  msg.textContent = 'Saved — welcome!';
  setTimeout(()=> msg.textContent = '', 2000);
});

signoutBtn.addEventListener('click', ()=>{ showForm(); });
logoutBtn.addEventListener('click', ()=>{
  localStorage.removeItem(STORAGE_KEY);
  nameInput.value = '';
  pwInput.value = '';
  ageInput.value = '';
  goalSelect.value = '';
  goalOther.value = '';
  msg.style.color = '#9b2b2b';
  msg.textContent = 'Logged out and cleared saved data.';
  showForm();
});
editBtn.addEventListener('click', ()=>{
  const u = loadUser();
  if(!u) return;
  nameInput.value = u.name || '';
  pwInput.value = u.password || '';
  ageInput.value = u.age || '';
  goalSelect.value = ['skin_care','weight_loss','weight_gain','general_health'].includes(u.goal) ? u.goal : 'other';
  goalOther.value = goalSelect.value==='other'? u.goal: '';
  showForm();
});
