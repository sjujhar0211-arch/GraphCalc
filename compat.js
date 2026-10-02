(() => {
  const input = document.getElementById('equation');
  const normalize = () => {
    let s = input.value.replace(/\s+/g, '');
    s = s.replace(/(\d|[xy)])(?=(?:[a-zA-Z]|\())/g, '$1*');
    s = s.replace(/(\))(?=\d|[xy(])/g, '$1*');
    input.value = s;
  };
  document.getElementById('plotBtn').addEventListener('click', normalize, true);
  document.querySelectorAll('[data-calc]').forEach(button => button.addEventListener('click', normalize, true));
  input.addEventListener('keydown', e => { if (e.key === 'Enter') normalize(); }, true);
})();

