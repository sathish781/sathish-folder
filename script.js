// Switch between login and registration
function toggleForm() {
  const registerBox = document.getElementById('registerBox');
  const loginBox = document.querySelector('.form-box');
  registerBox.classList.toggle('hidden');
  loginBox.classList.toggle('hidden');
}

// Save users in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('regUsername').value;
      const password = document.getElementById('regPassword').value;
      
      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.username === username)) {
        alert("Username already exists!");
        return;
      }

      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert("Registration successful! Please login.");
      toggleForm();
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const password = document.getElementById('loginPassword').value;

      let users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = "profile.html";
      } else {
        alert("Invalid username or password!");
      }
    });
  }

  // Profile page form save
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', e => {
      e.preventDefault();
      const profile = {
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        height: document.getElementById('height').value,
        weight: document.getElementById('weight').value,
        goal: document.getElementById('goal').value,
        allergies: document.getElementById('allergies').value
      };
      localStorage.setItem('userProfile', JSON.stringify(profile));
      window.location.href = "dashboard.html";
    });
  }

  // Dashboard: Load recommendations
  const mealGrid = document.getElementById('mealGrid');
  if (mealGrid) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      window.location.href = "index.html";
      return;
    }
    document.getElementById('welcomeUser').innerText = `Hello, ${loggedInUser}!`;

    fetch("meals.json")
      .then(res => res.json())
      .then(meals => {
        displayMeals(meals);

        const filter = document.getElementById('filterCategory');
        filter.addEventListener('change', () => {
          const category = filter.value;
          if (category === "all") {
            displayMeals(meals);
          } else {
            const filtered = meals.filter(m => m.category === category);
            displayMeals(filtered);
          }
        });
      });
  }
});

// Display meals dynamically
function displayMeals(meals) {
  const mealGrid = document.getElementById('mealGrid');
  mealGrid.innerHTML = '';
  meals.forEach(meal => {
    const div = document.createElement('div');
    div.className = "meal-card";
    div.innerHTML = `
      <h3>${meal.name}</h3>
      <p><strong>Category:</strong> ${meal.category}</p>
      <p>Calories: ${meal.calories} kcal</p>
      <p>Protein: ${meal.protein}g | Carbs: ${meal.carbs}g | Fat: ${meal.fat}g</p>
      <p><strong>Recipe:</strong> ${meal.recipe}</p>
    `;
    mealGrid.appendChild(div);
  });
}

// Logout function
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = "index.html";
}
