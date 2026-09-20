document.getElementById('bmiForm').addEventListener('submit', function(e){
    e.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    if(!weight || !heightCm) return alert('Please enter valid numbers');

    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    let category = '';
    let tips = [];

    if(bmi < 18.5){
        category = 'Underweight';
        tips = [
            "Include more ghee, nuts, and milk in your diet.",
            "Try Ashwagandha and Shatavari for healthy weight gain.",
            "Eat frequent small meals and include healthy oils."
        ];
    } else if(bmi >= 18.5 && bmi < 24.9){
        category = 'Normal';
        tips = [
            "Maintain balanced diet with all six tastes (sweet, sour, salty, bitter, pungent, astringent).",
            "Use Triphala for digestive support.",
            "Practice yoga and meditation for overall wellness."
        ];
    } else if(bmi >= 25 && bmi < 29.9){
        category = 'Overweight';
        tips = [
            "Avoid heavy, oily foods; favor light meals with vegetables and legumes.",
            "Include turmeric and cinnamon in your diet for metabolism.",
            "Practice daily Kapalabhati or Surya Namaskar yoga."
        ];
    } else {
        category = 'Obese';
        tips = [
            "Focus on high-fiber, low-fat meals; avoid sugar and refined grains.",
            "Consider Guggulu or Triphala supplements after consulting a practitioner.",
            "Daily brisk walking and yoga is essential."
        ];
    }

    document.getElementById('bmiValue').innerText = bmi;
    document.getElementById('bmiCategory').innerText = category;

    const tipsList = document.getElementById('ayurvedaTips');
    tipsList.innerHTML = '';
    tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });

    document.getElementById('result').style.display = 'block';
});                   