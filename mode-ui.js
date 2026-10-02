(() => {
  const apply = () => {
    const locus = document.querySelector('.mode.active')?.dataset.mode === 'locus';
    document.querySelector('.axis-x').textContent = locus ? 'Re(z)' : 'x';
    document.querySelector('.axis-y').textContent = locus ? 'Im(z)' : 'y';
    document.querySelector('.plot-badge').style.display = locus ? 'flex' : 'none';
    document.querySelector('.status-bar span:last-child').innerHTML = locus ? 'RE: REAL <b>·</b> IM: IMAGINARY' : 'X: INPUT <b>·</b> Y: OUTPUT';
  };
  document.querySelectorAll('.mode,.preset').forEach(el => el.addEventListener('click', () => setTimeout(apply, 0)));
  apply();
})();

