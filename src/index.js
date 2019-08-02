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
  const email = txtEmail.value;
  const password = txtPassword.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(function() {
      console.log("Sesion iniciada");
    })
    .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      //console.log("Necesitas Registrarte primero");
      console.log(errorMessage);
      console.log(errorCode);
    });
};

/* Register if the user is new. */
const RegisterNew = () => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("Registro exitoso");
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
    });
};

//Logout Cerrar sesión de un usuario
const logoutUser = () => {
  firebase
    .auth()
    .signOut()
    .then(function() {
      // Sign-out successful.
      console.log("logout");
    })
    .catch(function(error) {
      console.log("an error ocurred");
    });
};

//Detectar si ya esta Logeado
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user);
    console.log("Has iniciado sesion");
    btnLogin.style.display = "none";
    btnRegister.style.display = "none";
  } else {
    console.log("Aun no has iniciado sesion");
    btnLogout.style.display = "none";
  }
});

//Register
btnRegister.addEventListener("click", RegisterNew);
//Login
btnLogin.addEventListener("click", loginUser);
//LogOut
btnLogout.addEventListener("click", logoutUser);

//Agregar Mensajes en Firebase
const DBMessage = () => {
  const userMessage = document.getElementById("comentarios").value;
  console.log(userMessage);
  db.ref("mensajes").push({
    mensaje: userMessage
  });
  document.getElementById("comentarios").value = "";
};
document.getElementById("btnmessage").addEventListener("click", DBMessage);

//Mostrar Datos en Pantalla HTML
const ready = () => {
  db.ref("mensajes").on("child_added", function(data) {
    console.log(data.val());
    document.getElementById("chat").innerHTML +=
      " " + `<p>${data.val().mensaje}</p> <br/>`;
  });
};

document.addEventListener("DOMContentLoaded", ready);
