//Add event listener to the register button on modal
const btnRegister = document.getElementById("register");
//Get user information
const txtEmail = document.getElementById("userEmail");
const txtPassword = document.getElementById("userPassword");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");
//let messageKey="";

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
 firebase.auth().signInWithEmailAndPassword(email, password)
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

//Detectar si ya esta Logeado
firebase.auth().onAuthStateChanged(user =>{
  if (user){
    console.log(user);
    console.log("Has iniciado sesion " + user.email);
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
const addMessage = () => {
    //let date = new Date();
    //let currentDate = date.getTime;
    const newMessage = document.getElementById("comentarios").value;
    if (newMessage.length==0){          //Si no existe nada en comentarios
      console.log("Empty Fields");
    }else{
      let messageBD = db.ref('mensajes').push({
      mensaje : newMessage
     })
     key = messageBD.key;
     document.getElementById("comentarios").value= '';
    };
 };

 document.getElementById("btnmessage").addEventListener("click", addMessage);

 //Mostrar Datos en Pantalla HTML de Firebase
 const readyAdd = () => {
   db.ref('mensajes').on('child_added', function(data){
    console.log(data.val());
    let messageKey = data.key;
    let date = Date();
    console.log("La clave del mensaje es "+ messageKey);
    document.getElementById("chat").innerHTML += 
      " " +
       `<p> ${date}
          <input type="text" class="text" id="text${data.key}" value="${data.val().mensaje}" disabled>
          <button id="btnEdit${data.key}" onclick="editMessage('${messageKey}','${data.val().mensaje}')" class="boton">Editar</button>
        </p>`;
    /*document.getElementById("btnEdit").addEventListener("click", function(){
      editMessage(messageKey);
    });*/
   });
 };

 document.addEventListener('DOMContentLoaded', readyAdd);
  

  //Eliminar mensaje en Firebase
 const editMessage = (keyMessage) => {
    document.getElementById("text"+ keyMessage).disabled = false;
    let messageEdit = document.getElementById("text"+ keyMessage).value;
    db.ref('mensajes/'+ keyMessage).update({
      mensaje : messageEdit
     })
    // console.log("Mensaje editado "+ messageEdit);
    console.log("Mensaje editado:" + keyMessage);
    //location.reload();
 };

   //Eliminar Datos en Pantalla HTML
   /*const readyEdit = () => {
    db.ref('mensajes/' + messageKey).on('child_update', function(data){
     console.log(data.val() + " Ha eliminado comentario");
    });
   };*/
