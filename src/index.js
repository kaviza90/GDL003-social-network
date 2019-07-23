<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/6.3.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#config-web-app -->


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDF1XiDAijYoqmcfmzKIs9EAb2DkOHIrY8",
    authDomain: "red-sorora-7c6fc.firebaseapp.com",
    databaseURL: "https://red-sorora-7c6fc.firebaseio.com",
    projectId: "red-sorora-7c6fc",
    storageBucket: "",
    messagingSenderId: "210204876902",
    appId: "1:210204876902:web:739809e95c8f138c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{498063954299569}',
      cookie     : true,
      xfbml      : true,
      version    : '{v3.3}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


