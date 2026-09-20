    const recipes = {    
    
    1:{
        title: "Fruit Salad",
        ingredients: ["Mixed fruits", "Mint leaves", "Honey drizzle"],
        recipe: "Chop fruits. Toss with mint and drizzle honey. Serve chilled."
    },
    
    2: {
        title: "Grilled Veggies",
        ingredients: ["Broccoli, zucchini, bell peppers", "Olive oil", "Salt & pepper"],
        recipe: "Chop veggies. Brush with olive oil and grill until tender."
    },
    
    3: {
        title: "Chia Pudding",
        ingredients: ["3 tbsp chia seeds", "1 cup almond milk", "Honey to taste"],
        recipe: "Mix chia seeds with almond milk. Refrigerate for 4 hours. Sweeten with honey."
    },
    
    4: {
        title: "Oatmeal Bowl",
        ingredients: ["1 cup oats", "2 cups milk", "Fruit toppings", "Cinnamon"],
        recipe: "Cook oats with milk. Serve in bowl with fruit and cinnamon on top."
    },
    
    5: {
        title: "Grilled Salmon",
        ingredients: ["Salmon fillet", "Lemon", "Olive oil", "Herbs"],
        recipe: "Brush salmon with olive oil and herbs. Grill until cooked. Serve with lemon."
    },
    
    6: {
        title: "Quinoa Bowl",
        ingredients: ["1 cup quinoa", "1 cup veggies", "1 tsp olive oil", "Salt & pepper"],
        recipe: "Cook quinoa. Sauté veggies. Mix together with olive oil and seasoning."
    },
    
    7: {
        title: "Avocado Salad",
        ingredients: ["1 avocado", "2 cups greens", "1 tbsp olive oil", "Salt & pepper"],
        recipe: "Cut avocado and mix with greens. Drizzle olive oil and season. Serve fresh."
    },
    
    8:  {
        title: "Smoothie Bowl",
        ingredients: ["1 banana", "1 cup berries", "1/2 cup yogurt", "Granola for topping"],
        recipe: "Blend banana, berries, and yogurt. Pour into bowl and top with granola."
    },
    
    
};

function openModal(id) {
    document.getElementById('modal-title').innerText = recipes[id].title;
    const ingList = document.getElementById('modal-ingredients');
    ingList.innerHTML = '';
    recipes[id].ingredients.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ingList.appendChild(li);
    });
    document.getElementById('modal-recipe').innerText = recipes[id].recipe;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}          