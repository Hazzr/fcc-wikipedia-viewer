var api = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
var cb = '&callback=JSON_CALLBACK';

$(document).ready(function() {
  $('#search-form').submit(function(e) {
    loadResults($('#search-text').val());
    e.preventDefault();
  });
});

function displayResults(json) {
  $.each(json, constructEntry);
}

function constructEntry(key, val) {
  if (key == "query") {
    for (var idx in val.pages) {
      var title = val.pages[idx].title;
      var synopsis = val.pages[idx].extract;
      var curid = val.pages[idx].pageid;
      $('.entries').append('<a href="http://en.wikipedia.org/?curid=' + curid + '" class="entry-link" target="_blank  "><div class="col-xs-12' + ' entry"><div class="entry-title"><h3>' + title + '</h3></div><div ' + 'class="entry-synopsis"><p>' + synopsis + '</p></div></div></a>');
    }
  }
}

function loadResults(searchString) {
  $('.entries').empty();
  $.ajax({
    type: 'GET',
    url: api + searchString + cb,
    async: false,
    jsonpCallback: 'jsonCallback',
    contentType: "application/json",
    dataType: 'jsonp',
    success: displayResults,
    error: function(e) {
      console.log(e.message);
    }
  });
}
