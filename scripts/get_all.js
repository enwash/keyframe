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
    $.getJSON('https://keyframeblog.000webhostapp.com/get_json.php', {}, function(jsonData) {
        $('#loading')[0].remove();
        jsonData.forEach(e => {
            addArticle(e);
        })
    });
}