// Client helper: serialize the search form and navigate to /recipes
;(function () {
  const form = document.getElementById('searchForm');
  if (!form) return;

  function buildAndGo() {
    try {
      const params = new URLSearchParams();

      // Ingredients (checkboxes)
      form.querySelectorAll('input[name="ingredients"]:checked').forEach((el) => params.append('ingredients', el.value));

      // Dietary (checkboxes)
      form.querySelectorAll('input[name="dietary"]:checked').forEach((el) => params.append('dietary', el.value));

      // Multi-selects (mealType, cuisine)
      const addSelectValues = (name) => {
        const sel = form.querySelector(`[name="${name}"]`);
        if (!sel) return;
        Array.from(sel.selectedOptions).forEach(o => params.append(name, o.value));
      };
      addSelectValues('mealType');
      addSelectValues('cuisine');

      // Prep time (single-select)
      const prep = form.querySelector('[name="prepTime"]');
      if (prep && prep.value) params.set('prepTime', prep.value);

      const url = '/recipes' + (params.toString() ? ('?' + params.toString()) : '');
      window.location.href = url;
    } catch (err) {
      console.error('search form error', err);
      // fallback to native submit
      form.submit();
    }
  }

  // Submit handler acts as a safety net
  form.addEventListener('submit', function (e) { e.preventDefault(); buildAndGo(); });

  // Show recipes button explicitly triggers the same behavior
  const showBtn = document.getElementById('showBtn');
  if (showBtn) showBtn.addEventListener('click', (e) => { e.preventDefault(); buildAndGo(); });
})();
