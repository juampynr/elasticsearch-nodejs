/**
 * Adds behaviors to toggle facets.
 */
var Anchors = document.getElementsByClassName('facet');

// Loop facets and add a click listener.
for (var i = 0; i < Anchors.length ; i++) {
  Anchors[i].addEventListener('click',
    function (event) {
      event.preventDefault();
      var value = this.getAttribute('data-value');
      // Either set a hidden field with the facet value or set it to an empty string.
      var old_value = document.getElementById('type').getAttribute('value');
      if ((old_value.length === undefined) || (old_value === '')) {
        document.getElementById('type').setAttribute('value', value);
      }
      else {
        document.getElementById('type').setAttribute('value', '');
      }
      // Finally, submit the form.
      document.getElementById("search_form").submit();
    },
    false);
}
