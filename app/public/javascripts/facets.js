/**
 * Adds behaviors to toggle facets.
 */
const Anchors = document.getElementsByClassName('facet');

Anchors.forEach(anchor => {
  anchor.addEventListener('click', (event) => {
      event.preventDefault();
      const value = this.getAttribute('data-value');
      const oldValue = document.getElementById('type').getAttribute('value');
      if (!oldValue || oldValue.length === 0) {
        document.getElementById('type').setAttribute('value', value);
      }
      else {
        document.getElementById('type').setAttribute('value', '');
      }
      document.getElementById("search_form").submit();
    },
    false);
});
