function addData() {
    var email = document.getElementById("email").value;
    var first = document.getElementById("first").value;
    var last = document.getElementById("last").value;
    var birth = document.getElementById("birth").value;
    var mobile = document.getElementById("mobile").value;
    alert("in add data");
    var db = firebase.firestore();
    // var index = i.toString();
    db.collection("users").doc(email).set({
            email: email,
            first: first,
            last: last,
            birth: birth,
            mobile: mobile
        })
        .then(function() {
            alert("One record inserted");
            console.log("Document successfully written!");
            window.location.href = "index.html";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    db.collection("admin").doc(email).set({
            email: email,
            first: first,
            last: last,
            birth: birth,
            mobile: mobile,
            type: "user"
        })
        .then(function() {
            alert("One record inserted");
            console.log("Document successfully written!");
            window.location.href = "index.html";
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    // db.collection("users").add({
    //         first: first,
    //         last: last,
    //         birth: birth,
    //         email: email
    //     })
    //     .then(function(docRef) {
    //         alert("One record inserted");
    //         index = docRef.id;
    //         //console.log(id);
    //         console.log("Document written with ID: ", docRef.id);
    //         window.location.href = "index.html";
    //     })
    //     .catch(function(error) {
    //         console.error("Error adding document: ", error);
    //     });
}

function getData() {
    var email = document.getElementById("email").value;
    var db = firebase.firestore();
    var getdata = document.getElementById("getdata");
    console.log("Hey");

    db.collection("users").where("email", "==", email)
        .get()
        .then(function(querySnapshot) {
            console.log('In function');
            querySnapshot.forEach(function(doc) {
                // console.log(`${doc.data()}`);
                getdata.innerHTML = `${doc.data().first} ${doc.data().last} ${doc.data().birth} `;
                // console.log(`${doc.id} => ${doc.data().first}`);

                // console.log(doc.id, " => ", doc.data());
            });
        })


}