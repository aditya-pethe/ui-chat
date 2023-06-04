
document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('.project-card').classList.toggle('dark-mode');
});
