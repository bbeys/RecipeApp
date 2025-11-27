// Copy the current page full URL into the clipboard
;(function () {
  const btn = document.getElementById('copyBtn');
  const feedback = document.getElementById('copyFeedback');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      if (feedback) {
        feedback.classList.remove('hidden');
        setTimeout(() => feedback.classList.add('hidden'), 2000);
      }
    } catch (err) {
      // fallback: show the URL in prompt
      window.prompt('Copy this URL', window.location.href);
    }
  });
})();

// favorite toggle handler
;(function () {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.fav-btn');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    try {
      const res = await fetch(`/recipes/${id}/favorite`, { method: 'POST', headers: { 'Content-Type':'application/json' } });
      const json = await res.json();
      if (json && json.success) {
        btn.classList.toggle('favorited', json.favorited);
      } else if (json && json.error) {
        alert(json.error);
      }
    } catch (err) {
      alert('Action failed — are you logged in?');
    }
  });
})();
