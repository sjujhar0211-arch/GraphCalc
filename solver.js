(() => {
  const input = document.getElementById('equation');
  const output = document.getElementById('solution');
  const calcOut = document.getElementById('calculusResult');
  const expression = () => input.value.trim().includes('=') ? input.value.trim().split('=').slice(1).join('=') : input.value.trim();
  const fnFor = text => {
    const js = text.replace(/\^/g, '**').replace(/\bpi\b/gi, 'Math.PI').replace(/\be\b/gi, 'Math.E').replace(/\b(sqrt|sin|cos|tan|abs|log|ln)\s*\(/gi, (_, f) => `Math.${f === 'ln' ? 'log' : f}(`);
    if (!/^[0-9a-z+\-*/().,^\s]+$/i.test(text) || /[a-df-hj-mo-uw-z]/i.test(text.replace(/(?:sqrt|sin|cos|tan|abs|log|ln|pi|e|x)/gi, ''))) throw Error('Use numbers, x, and supported functions only.');
    return x => Function('x', `"use strict"; return (${js})`)();
  };
  function solve() {
    const text = input.value.trim(); if (!text) { output.textContent = 'Enter an expression to see its value and analysis.'; return; }
    const locus = document.querySelector('.mode.active')?.dataset.mode === 'locus';
    if (locus) { const p = text.split('='); output.textContent = p.length === 2 ? `Implicit relation in x and y\n${p[0].trim()} = ${p[1].trim()}\nEach solution (x, y) lies on the plotted locus.` : 'Locus equations need one equals sign.'; return; }
    const expr = expression();
    if (/[xy]/i.test(expr)) { output.textContent = `Function of x\nf(0) is shown on the graph\nExpression: ${expr}`; return; }
    try { output.textContent = `Result\n${Number(fnFor(expr)(0).toFixed(10))}`; } catch (e) { output.textContent = `Cannot solve yet\n${e.message}`; }
  }
  function calculus(type) {
    if (document.querySelector('.mode.active')?.dataset.mode === 'locus') { calcOut.textContent = 'Switch to Function mode to use calculus tools.'; return; }
    try { const f = fnFor(expression()), h = 1e-4;
      if (type === 'derivative') calcOut.textContent = `Derivative at x = 0\nf′(0) ≈ ${((f(h) - f(-h)) / (2*h)).toFixed(8)}`;
      if (type === 'integral') { const a=-Math.PI,b=Math.PI,n=1000,step=(b-a)/n; let total=f(a)+f(b); for(let i=1;i<n;i++) total+=(i%2?4:2)*f(a+i*step); calcOut.textContent=`Definite integral\n∫[-π, π] f(x) dx ≈ ${(total*step/3).toFixed(8)}`; }
      if (type === 'series') { const f0=f(0),d=(f(h)-f(-h))/(2*h),d2=(f(h)-2*f0+f(-h))/(h*h); calcOut.textContent=`Maclaurin preview\nf(x) ≈ ${f0.toFixed(6)} + ${d.toFixed(6)}x + ${(d2/2).toFixed(6)}x² + …`; }
    } catch (e) { calcOut.textContent=e.message; }
  }
  input.addEventListener('input', solve); document.getElementById('plotBtn').addEventListener('click', () => { solve(); calcOut.textContent=''; }); document.querySelectorAll('.mode,.preset').forEach(x => x.addEventListener('click', () => setTimeout(solve, 0))); document.querySelectorAll('[data-calc]').forEach(x => x.addEventListener('click', () => calculus(x.dataset.calc))); solve();
})();

