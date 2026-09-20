document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault();

    // For now, just show success message
    document.getElementById('loginMsg').style.display = 'block';

    // Reset form
    this.reset();
});     