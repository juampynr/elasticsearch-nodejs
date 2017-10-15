/**
 * Adds behaviors to toggle facets.
 */
var Anchors = document.getElementsByClassName('facet');

for (var i = 0; i < Anchors.length ; i++) {
  Anchors[i].addEventListener('click',
    function (event) {
      event.preventDefault();
      var value = this.getAttribute('data-value');
      var old_value = document.getElementById('type').getAttribute('value');
      if ((old_value.length === undefined) || (old_value === '')) {
        document.getElementById('type').setAttribute('value', value);
      }
      else {
        document.getElementById('type').setAttribute('value', '');
      }
      document.getElementById("search_form").submit();
    },
    false);
}
