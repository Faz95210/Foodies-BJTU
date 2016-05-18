function connexion_api_sign_in()
{
console.log("connexion api sign start");

var usern = document.forms["form_sign"].elements["name_us"].value;
var pass = document.forms["form_sign"].elements["pass_us"].value;

xhr = new XMLHttpRequest();
var url = "http://localhost:8080/api/session";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
 
xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
}
var data = JSON.stringify({"username":usern,"password":pass});
xhr.send(data);
console.log("fin de fonction");
}

function connexion_api_sign_up()
{
var usern = document.forms["form_sign"].elements["name_us"].value;
var email = document.forms["form_sign"].elements["emauil_us"].value;
var pass = document.forms["form_sign"].elements["pass_us"].value;

xhr = new XMLHttpRequest();
var url = "http://localhost:8080/api/users";
xhr.open("POST", url, true);
xhr.setRequestHeader("Content-type", "application/json");
 
xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && xhr.status == 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json);
    }
}
var data = JSON.stringify({"username":usern, "email":email, "password":pass});
xhr.send(data);
}