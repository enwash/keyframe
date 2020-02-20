function parseDate(s) {
    return s.split('-').reverse().join('/');
}

window.onload = function() {
    var article = false;
    var searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('p')) {
        article = searchParams.get('p');
    }
    if (article) {
        $.get("https://keyframeblog.000webhostapp.com/get_html.php", {'filename': article}, function (a) {
            $.getJSON("https://keyframeblog.000webhostapp.com/get_meta.php", {'filename': article}, function (s) {
                $('#loading')[0].remove();
                $(".frame")[0].innerHTML +=
                    a +
                    `<p id="date">Published ${parseDate(s['date'])} by <a href="author?p=${s['author']}">${s['author']}</a></p>`;
                document.title = s['title'];
                $('meta[name=description]').remove();
                $('head').append(`<meta name="description" content=${s['title']}>`);
            });
        });
    }
    else {
        $(".frame")[0].innerHTML = `<h1>404</h1><p>Sorry, we had some trouble fetching your content. Please try again later!</p>`
    }
}