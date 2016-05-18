var yolo = "customer";

function role_specification(spe)
{
	yolo = spe;
}

function sign_up() {
	$('.switch').css('display','inherit');
  var inputs = document.querySelectorAll('.input_form_sign');
document.querySelectorAll('.ul_tabs > li')[0].className=""; 
document.querySelectorAll('.ul_tabs > li')[1].className="active"; 
  
  for(var i = 0; i < inputs.length ; i++  ) {
if(i == 2  ){

}else{  
document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
}
}

setTimeout( function(){
for(var d = 0; d < inputs.length ; d++  ) {
 document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block active_inp";  
   }

 },100 );
 document.querySelector('.link_forgot_pass').style.opacity = "0";
   document.querySelector('.link_forgot_pass').style.top = "-5px";
   document.querySelector('.btn_sign').innerHTML = "SIGN UP";
  document.getElementById('sign').onclick = function() {connexion_api_sign_up();}
  setTimeout(function(){

 document.querySelector('.terms_and_cons').style.opacity = "1";
  document.querySelector('.terms_and_cons').style.top = "5px";
 
  },500);
  setTimeout(function(){
    document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_none";
 document.querySelector('.terms_and_cons').className = "terms_and_cons d_block";
  },450);
}



function sign_in(){
	$('.switch').css('display','none');
  var inputs = document.querySelectorAll('.input_form_sign');
document.querySelectorAll('.ul_tabs > li')[0].className = "active"; 
document.querySelectorAll('.ul_tabs > li')[1].className = ""; 
  
  for(var i = 0; i < inputs.length ; i++  ) {
switch(i) {
    case 0:
 console.log(inputs[i].name);
        break;
    case 2:
 console.log(inputs[i].name);
    default: 
document.querySelectorAll('.input_form_sign')[i].className = "input_form_sign d_block";
}
}

setTimeout( function(){
for(var d = 0; d < inputs.length ; d++  ) {
switch(d) {
    case 0:
 console.log(inputs[d].name);
		break;
    case 2:
 console.log(inputs[d].name);
 
    default:
 document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign d_block";  
 document.querySelectorAll('.input_form_sign')[2].className = "input_form_sign d_block active_inp";
   }
  }
 },100 );

 document.querySelector('.terms_and_cons').style.opacity = "0";
  document.querySelector('.terms_and_cons').style.top = "-5px";

  setTimeout(function(){
 document.querySelector('.terms_and_cons').className = "terms_and_cons d_none"; 
document.querySelector('.link_forgot_pass').className = "link_forgot_pass d_block";

 },500);

  setTimeout(function(){

 document.querySelector('.link_forgot_pass').style.opacity = "1";
   document.querySelector('.link_forgot_pass').style.top = "5px";
    

for(var d = 0; d < inputs.length ; d++  ) {

switch(d) {
    case 0:
 console.log(inputs[d].name);
        break;
    case 2:
 console.log(inputs[d].name);
         break;
    default:
 document.querySelectorAll('.input_form_sign')[d].className = "input_form_sign";  
}
  }
   },1500);
 document.querySelector('.btn_sign').innerHTML = "SIGN IN";
document.getElementById('sign').onclick = function(){connexion_api_sign_in();}  
}


window.onload =function(){
  document.querySelector('.cont_centrar').className = "cont_centrar cent_active";
}

function connexion_api_sign_in()
{

var usern = document.forms["form_sign"].elements["name_us"].value;
var pass = document.forms["form_sign"].elements["pass_us"].value;

$.ajax({
    type: "POST",
    url: "http://localhost:8080/api/session",
    dataType: 'json',
	contentType: "application/json",
	data: JSON.stringify({"username":usern, "password":pass}),
    async: true,
    success : function(data) {
        console.log(data);
        window.location.assign("../website-Foodies/index.html");
    },
    error: function (data)
    {
        alert("Username or Password incorrect ! Try again !");
    }
});
}

function connexion_api_sign_up()
{
var usern = document.forms["form_sign"].elements["name_us"].value;
var email = document.forms["form_sign"].elements["emauil_us"].value;
var pass = document.forms["form_sign"].elements["pass_us"].value;
var specification = yolo;

$.ajax({
    type: "POST",
    url: "http://localhost:8080/api/users",
    dataType: 'json',
	contentType: "application/json",
	data: JSON.stringify({"username":usern, "email":email, "password":pass, "role":specification}),
    async: true,
    success : function(data) {
        console.log(data);
        window.location.reload();
    },
    error: function (data)
    {
        alert("Error in sign up ! Try again !");
    }
});
}