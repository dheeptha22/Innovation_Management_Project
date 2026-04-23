/* STORAGE */
let users = JSON.parse(localStorage.getItem("users")) || [];
let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

/* ================= USER REGISTER ================= */
function registerUser(){

let name = document.getElementById("uname").value;
let phone = document.getElementById("uphone").value;
let photo = document.getElementById("uphoto").files[0];

if(!name || !phone || !photo){
alert("Fill all details");
return;
}

let reader = new FileReader();

reader.onload = function(){

let user = {
name: name,
phone: phone,
photo: reader.result
};

users.push(user);
localStorage.setItem("users", JSON.stringify(users));

document.getElementById("result").innerHTML = `
<h3 style="color:green;">Registered Successfully</h3>
<p>Your account has been created.</p>

<a href="../index.html">
<button>Go to Home</button>
</a>
`;

};

reader.readAsDataURL(photo);
}

/* ================= VOLUNTEER REGISTER ================= */
function registerVolunteer(){

let name = document.getElementById("vname").value;
let phone = document.getElementById("vphone").value;
let photo = document.getElementById("vphoto").files[0];

if(!name || !phone || !photo){
alert("Fill all details");
return;
}

let reader = new FileReader();

reader.onload = function(){

let volunteer = {
name: name,
phone: phone,
photo: reader.result
};

volunteers.push(volunteer);
localStorage.setItem("volunteers", JSON.stringify(volunteers));

document.getElementById("result").innerHTML = `
<h3 style="color:green;">Volunteer Registered Successfully</h3>

<img src="${reader.result}" width="100">

<p>Name: ${name}</p>
<p>Phone: ${phone}</p>

<br>

<a href="../index.html">
<button>Go to Home</button>
</a>
`;

};

reader.readAsDataURL(photo);
}

/* ================= LOGIN ================= */
function loginUser(){

let phone = document.getElementById("phone").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

let user = users.find(u => u.phone === phone);

if(user){

localStorage.setItem("currentUser", JSON.stringify(user));

window.location.href = "user-dashboard.html";

}else{

document.getElementById("result").innerHTML =
"<p style='color:red;'>User not found. Please register.</p>";

}
}

/* ================= LOAD USER IN DASHBOARD ================= */
function loadUser(){

let user = JSON.parse(localStorage.getItem("currentUser"));

if(user){

document.getElementById("userInfo").innerHTML = `
<img src="${user.photo}" width="80" style="border-radius:50%">
<h3>${user.name}</h3>
<p>${user.phone}</p>
`;

}else{

window.location.href = "login.html";

}
}

/* ================= LOGOUT ================= */
function logout(){

localStorage.removeItem("currentUser");
window.location.href = "../index.html";

}

/* ================= SOS ================= */
function sendSOS(){

let volunteers = JSON.parse(localStorage.getItem("volunteers")) || [];

if(volunteers.length === 0){
alert("No volunteers available");
return;
}

let v = volunteers[0];

document.getElementById("status").innerHTML =
"Contacting volunteer: " + v.name;

if(navigator.onLine){

navigator.geolocation.getCurrentPosition(function(pos){

alert("Location shared with volunteer");

window.location.href = "tel:" + v.phone;

});

}
else{

alert("No internet. Calling directly");

window.location.href = "tel:" + v.phone;

}

}