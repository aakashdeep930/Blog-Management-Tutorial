var firebaseConfig = {
    apiKey: "AIzaSyA3NIph_WgKlXUEKyHteCINUhzWbhxdXSo",
    authDomain: "fir-webapp-a037c.firebaseapp.com",
    databaseURL: "https://fir-webapp-a037c.firebaseio.com",
    projectId: "fir-webapp-a037c",
    storageBucket: "fir-webapp-a037c.appspot.com",
    messagingSenderId: "945227812412",
    appId: "1:945227812412:web:e5676319f69d98315f3d39",
    measurementId: "G-B08N7DVV6J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  //Persistence Log In
  firebase.auth.Auth.Persistence.LOCAL;

  //FireBase Authentication
  //Sign-in
  $("#btn-login").click(function()
  {
     var email = $("#email").val();
     var password = $("#password").val();
     if(email !="" && password !="")
     {
        //Connecting it with firebase
        var result = firebase.auth().signInWithEmailAndPassword(email,password);
       
        result.catch(function(error)
        {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode);
          console.log(errorMessage);

          window.alert("Message : " + errorMessage);
        });
     }   
     else
     {
         window.alert("Form is incomplete. Please fill out   fields");
     }
  });

  //Sign-up
  $("#btn-signup").click(function()
  {
     var email = $("#email").val();
     var password = $("#password").val();
     var cPassword = $("#confirmPassword").val();

     if(email !="" && password !="" && cPassword !="")
     {
        //Connecting it with firebase
        if(password == cPassword)
        {
            var result = firebase.auth().createUserWithEmailAndPassword(email,password);
        
            result.catch(function(error)
            {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message : " + errorMessage);
            });
        }
        else
        {
            window.alert("Password are not same"); 
        }
     }   
     else
     {
         window.alert("Form is incomplete. Please fill out   fields");
     }
  });

  //Reset Password
  $("#btn-resetPassword").click(function()
  {
      var auth = firebase.auth();
      var email = $('#email').val();
      
      if(email !='')
      {
             auth.sendPasswordResetEmail(email).then(function(){
             windows.alert("Email has been sent to you");   
                 
          })   //By defualt reset email    
        .catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message : " + errorMessage);
        });    
      }
      else
      {
        window.alert("Please enter your email");
      }
  });



  //Logout
  $("#btn-logout").click(function()
  {
      firebase.auth().signOut().then(function(){
          console.log("Logout Successful");
      });
  });

  //Update
  $("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var gender = $("#gender").val();
    var country = $("#country").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && sName!="" && phone!="" && country!="" && gender!="" && bio!="" && address!="")
    {
      //Javascript Object
      var userData = 
      {
          "phone": phone,
          "address": address,
          "bio": bio,
          "firstName": fName,
          "secondName": sName,
          "country": country,
          "gender": gender,
      };

      usersRef.set(userData, function(error)
      { 
         if(error)
         {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message : " + errorMessage);
         }
         else
         {
            window.location.href = "MainPage.html";
         }
      });

    }
    else
    {
        window.alert("Form is incomplete. Please fill out   fields"); 
    }
  });

