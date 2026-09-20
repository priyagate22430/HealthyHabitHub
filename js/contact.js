document.getElementById('contactForm').addEventListener('submit', function(e){
    e.preventDefault();

    // For now, just show a success message
    document.getElementById('successMsg').style.display = 'block';

    // Clear form
    this.reset();
});   