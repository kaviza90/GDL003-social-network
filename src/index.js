// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("registerUser");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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

//Add event listener to the register button on modal
var btnRegister = document.getElementById("register");
//Get user information 
var txtEmail = document.getElementById("userEmail");
var txtPassword = document.getElementById("userPassword");
var btnLogin = document.getElementById("login");
var btnLogout = document.getElementById("logout");

var auth = firebase.auth();

//Function Login
const loginUser = () => {
  var email = txtEmail.value;
  var pass = txtPassword.value;
  auth.signInWithEmailAndPassword(email, pass)
  .then(() => {
    console.log("sesion iniciada");
  })
  .catch( error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Necesitas Registrarte primero");
    console.log(errorMessage);
    console.log(errorCode);
  });
}

//Login
btnLogin.addEventListener("click", loginUser);

/* Register if the user is new.*/
const RegisterNew = () => {
  var email = txtEmail.value;
  var password = txtPassword.value;
  auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
    console.log("Registro exitoso");
  })
  .catch( error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);
  })
}

btnRegister.addEventListener("click", RegisterNew);

//Logout Cerrar sesión de un usuario
const logoutUser = () => {
  auth.signOut();
};

btnLogout.addEventListener("click", logoutUser);

//Detectar si ya esta Logeado
auth.onAuthStateChanged(user =>{
  if (user){
    console.log(user);
    console.log("Ha sido registrado exitosamente");
    //btnLogout.style.display = "block";
  } else {
    console.log("No estas Registrado");
    btnLogout.style.display = "none";
  }
});