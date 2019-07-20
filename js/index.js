firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("logout").style.display = "block";
        //document.getElementById("response").style.display = "none";
        document.getElementById("user_para").style.display = "block";
        document.getElementById("login_button").style.display = "none";
        document.getElementById("register_button").style.display = "none";

        var user = firebase.auth().currentUser;
        console.log(user);
        if (user != null) {

            var email_id = user.email;
            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

        }

    } else {
        // No user is signed in.
        document.getElementById("login_div").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("login_button").style.display = "block";
        document.getElementById("register_button").style.display = "block";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("user_para").style.display = "none";
    }
});

function login() {

    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    var user1 = firebase.auth().currentUser;
    console.log(user1);

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);
        // ...
    });
}

function register() {
    var userEmail = document.getElementById("email").value;
    var userPass = document.getElementById("password").value;
    var database = firebase.database();
    alert("User Registered");
    console.log("in registegit merge origin/master --allow-unrelated-historiesr");

    // var userId = firebase.database().ref().child('users').push().key;
    // firebase.database().ref('users/' + userId).set({
    //     userId: userId,
    //     userEmail: userEmail,
    //     userPass: userPass
    // });

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        alert("Error : " + errorMessage);
    });

}

function logout() {
    //window.location.href = "index.html";
    firebase.auth().signOut();
    //window.location.href = "index.html";
}