function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    let query = document.getElementById("query").value;
    let retrievedObject = localStorage.getItem('uniqueId');

    let body = {
        q: query,
        by: retrievedObject
    };


    const Http = new XMLHttpRequest();
    const url = '/submit';
    Http.open("POST", url, true);
    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.onreadystatechange = function() {
        if (Http.readyState === 4 && Http.status === 200) {
            let queryResult = document.getElementById("queryResult");
            queryResult.value = Http.responseText;
        } else if (Http.readyState === 4 && Http.status === 400) {
            alert("Another user session is still active");
        }
    };
    Http.send(JSON.stringify(body));
    return false;
}

window.onload = function generateUid() {
    let date = new Date();
    let timestamp = date.getTime();
    let retrievedObject = localStorage.getItem('uniqueId');
    if (!retrievedObject) {
        localStorage.setItem('uniqueId', timestamp);   
    }
};

let form = document.getElementById('submitForm');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}

