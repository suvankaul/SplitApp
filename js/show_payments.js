function borrowers() {
    var email = document.getElementById("email").value;
    var db = firebase.firestore();
    db.collection("users").doc(email).collection("borrower")
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
                document.getElementById("borrowers").appendChild(para);
                console.log(doc.id, doc.data());
            });
        });
}

function lenders() {
    var email = document.getElementById("email").value;
    var db = firebase.firestore();
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
                console.log(doc.id, doc.data());
            });
        });
}

borrowers();
lenders();