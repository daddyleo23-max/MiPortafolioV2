// Después del scan + glitters → fade-out
setTimeout(() => {
  document.getElementById('splash').classList.add('fade-out');
}, 2800);

// Al terminar el fade → redirige
document.getElementById('splash').addEventListener('animationend', e => {
  if (e.animationName === 'growFade') window.location.href = 'home.html';
});