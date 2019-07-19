function borrowers() {
    var email = document.getElementById("email").value;
    var db = firebase.firestore();
    document.getElementById("borrowers").innerHTML = "";
    db.collection("users").doc(email).collection("borrower")
        .get()
        .then(function(querySnapshot) {
            console.log('In function');
            querySnapshot.forEach(function(doc) {
                var data = doc.data().amt;
                console.log(data);
                var para = document.createElement("p");

                data_text = doc.id + " " + data.toString();
                var para_text = document.createTextNode(data_text)
                para.appendChild(para_text);
                document.getElementById("borrowers").appendChild(para);
                // data_text = "";
                console.log(doc.id, doc.data());
            });
        });

}

function lenders() {
    var email = document.getElementById("email").value;
    var db = firebase.firestore();
    document.getElementById("lenders").innerHTML = "";
    db.collection("users").doc(email).collection("lender")
        .get()
        .then(function(querySnapshot) {
            console.log('In function');
            querySnapshot.forEach(function(doc) {
                var data = doc.data().amt;
                console.log(data);
                var para = document.createElement("p");
                var data_text = doc.id + " " + data.toString();
                var para_text = document.createTextNode(data_text)
                para.appendChild(para_text);
                document.getElementById("lenders").appendChild(para);
                data_text = "";
                console.log(doc.id, doc.data());
            });
        });
}

borrowers();
lenders();