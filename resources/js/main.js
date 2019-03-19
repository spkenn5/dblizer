function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    var query = document.getElementById("query").value;
    
    body = {
        q: query
    };

    const Http = new XMLHttpRequest();
    const url='http://localhost:8000/submit';    
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.onreadystatechange = function() {
        if(Http.readyState == 4 && Http.status == 200) {
            var queryResult = document.getElementById("queryResult");
            queryResult.value = Http.responseText;
        }
    }
    Http.send(JSON.stringify(body));
    return false;
}

var form = document.getElementById('submitForm');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}