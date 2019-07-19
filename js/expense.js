function add_people() {
    var people = document.getElementById("people").value;
    var p = parseInt(people);
    var element = document.getElementById("people_div");
    for (var i = 1; i <= people; i++) {

        var para = document.createElement("input");
        para.setAttribute("placeholder", "Add email");
        para.setAttribute("id", i.toString());
        console.log(para.getAttribute("id"));
        element.appendChild(para);
    }
}

function add_expense() {
    var email = document.getElementById("email").value;
    var people = document.getElementById("people").value;
    var amt = document.getElementById("amt").value;
    var ind_amt = parseInt(amt) / people;
    //console.log(people);
    var db = firebase.firestore();
    //var add_people = db.collection("users").doc(email).collection('borrowers');
    var add_people = db.collection("users").doc(email);
    for (var i = 1; i <= people; i++) {
        var e = document.getElementById(i.toString()).value.toString();
        console.log(e);
        //console.log(e.value);
        add_people.collection("borrower").doc(e).set({
                amt: ind_amt
            })
            .then(function() {
                alert("One record inserted");
                console.log("Document successfully written!");
                window.location.href = "index.html";
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });
        var lenders = db.collection("users").doc(e);
        lenders.collection("lender").doc(email).set({
                amt: ind_amt
            })
            .then(function() {
                alert("One record inserted");
                console.log("Document successfully written!");
                window.location.href = "index.html";
            })
            .catch(function(error) {
                console.error("Error writing document: ", error);
            });

    }
}