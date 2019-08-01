//Add event listener to the register button on modal
const btnRegister = document.getElementById("register");
//Get user information
const txtEmail = document.getElementById("userEmail");
const txtPassword = document.getElementById("userPassword");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");

// Get the modal
const modal = document.getElementById("myModal");
// Get the button that opens the modal
const btn = document.getElementById("registerUser");
// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal
btn.onclick = function() {
 modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
 modal.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
 if (event.target == modal) {
   modal.style.display = "none";
 }
};

//Function Login
const loginUser = () => {
 var email = txtEmail.value;
 var password = txtPassword.value;
 firebase.auth().signInWithEmailAndPassword(email, password)
 .then(function() {
   console.log("sesion iniciada");
 })
 .catch(function(error) {
   var errorCode = error.code;
   var errorMessage = error.message;
   //console.log("Necesitas Registrarte primero");
   console.log(errorMessage);
   console.log(errorCode);
 });
}

/* Register if the user is new. */
const RegisterNew = () => {
 const email = txtEmail.value;
 const password = txtPassword.value;
 firebase.auth().createUserWithEmailAndPassword(email, password)
 .then(() => {
   console.log("Registro exitoso");
 })
 .catch(error => {
   const errorCode = error.code;
   const errorMessage = error.message;
   console.log(errorMessage);
   console.log(errorCode);
 });
}

//Logout Cerrar sesión de un usuario
const logoutUser = () => {
 firebase.auth().signOut()
 .then(function() {
   // Sign-out successful.
   console.log("logout");
 })
 .catch(function(error) {
   console.log("an error ocurred");
 });
}

//Register
btnRegister.addEventListener("click", RegisterNew);
//Login
btnLogin.addEventListener("click", loginUser);
//LogOut
btnLogout.addEventListener("click", logoutUser);
