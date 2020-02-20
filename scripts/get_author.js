var articles = [];

function parseDate(s) {
    return s.split('-').reverse().join('/');
}

function addArticle(s) {
    $(".articles")[0].innerHTML +=`<a href="read.html?p=${s['filename']}" class="article">
    <h2>${s['title']}</h2>
    <p class="date">${parseDate(s['date'])}</p>
    </a>`;
}

window.onload = function() {
    var author = false;
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('p')) {
        author = searchParams.get('p');
        $('#authorTitle')[0].innerHTML = "Posts by " + author;
    }
    $.getJSON('https://keyframeblog.000webhostapp.com/get_from_author.php', {'author':author}, function(jsonData) {
        $('#loading')[0].remove();
        jsonData.forEach(e => {
            addArticle(e);
        })
    });
}