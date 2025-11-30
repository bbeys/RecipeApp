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
