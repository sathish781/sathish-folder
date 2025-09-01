// Fruit Data
const fruitData = {
  "Apple": { calories: 95, vitamins: "Vitamin C, Fiber", benefit: "Good for heart & digestion" },
  "Banana": { calories: 105, vitamins: "Vitamin B6, Potassium", benefit: "Boosts energy & brain function" },
  "Orange": { calories: 62, vitamins: "Vitamin C, Folate", benefit: "Strengthens immunity" },
  "Mango": { calories: 99, vitamins: "Vitamin A, Vitamin C", benefit: "Improves skin & eye health" },
  "Strawberry": { calories: 32, vitamins: "Vitamin C, Antioxidants", benefit: "Good for skin & reduces inflammation" }
};

// Function to show fruit info
function showFruit(fruit) {
  const details = fruitData[fruit];
  document.getElementById("fruitDetails").innerHTML = `
    <h3>${fruit}</h3>
    <p><strong>Calories:</strong> ${details.calories}</p>
    <p><strong>Vitamins:</strong> ${details.vitamins}</p>
    <p><strong>Health Benefit:</strong> ${details.benefit}</p>
  `;
}
