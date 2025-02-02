function add_people() {
    console.log(firebase.auth().currentUser.email);
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
    var ind_amt = parseInt(amt) / (parseInt(people) + 1);
    var prev_bal, final_amt;
    //console.log(people);
    var db = firebase.firestore();
    //var add_people = db.collection("users").doc(email).collection('borrowers');
    var add_people = db.collection("users").doc(firebase.auth().currentUser.email);
    for (var i = 1; i <= people; i++) {
        var e = document.getElementById(i.toString()).value.toString();
        console.log(e);
        //console.log(e.value);

        add_people.collection("borrower").doc(e).get().then(function(queryField) {
            console.log(queryField.data());
            if (queryField.data() == undefined) {
                console.log("Its working")
                prev_bal = 0;
            } else {
                console.log(queryField.data());
                prev_bal = queryField.data().amt;
            }
            final_amt = ind_amt + prev_bal;
            add_people.collection("borrower").doc(e).set({
                    amt: final_amt
                })
                .then(function() {
                    alert("One record inserted");
                    console.log("Document successfully written!");
                    //window.location.href = "index.html";
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            var lenders = db.collection("users").doc(e);
            lenders.collection("lender").doc(firebase.auth().currentUser.email).set({
                    amt: final_amt
                })
                .then(function() {
                    alert("One record inserted");
                    console.log("Document successfully written!");
                    //window.location.href = "index.html";
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        })
    }
}

function clear_expense() {
    var email = document.getElementById("email").value;
    var settle_email = document.getElementById("settle_email").value.toString();
    console.log(settle_email);
    var settle_amt = parseInt(document.getElementById("settle_amt").value);
    console.log(settle_amt);
    var db = firebase.firestore();
    var user = db.collection("users").doc(settle_email);
    // var borrowed_amt = user.collection("borrower").doc(settle_email).getValue("amt");
    // console.log(borrowed_amt);
    user.collection("borrower").doc(email).get().then(function(myField) {
        var borrowed_amt = myField.data().amt;
        var remaining_amt;
        console.log(borrowed_amt);
        if (borrowed_amt == 0) {
            alert("You do not owe " + settle_email + " anything for now. Returing " + settle_amt + " back to you.");
        } else {
            if (settle_amt > borrowed_amt) {
                remaining_amt = 0;
                var return_amt = settle_amt - borrowed_amt;
                alert("You owed only " + borrowed_amt + " to " + settle_email + ". Returning amount back " + return_amt + " to you.");
            } else {
                remaining_amt = borrowed_amt - settle_amt;
            }
            console.log(remaining_amt);

            user.collection("borrower").doc(email).set({
                    amt: remaining_amt
                })
                .then(function() {
                    alert("One record inserted");
                    console.log("Document successfully written!");
                    //window.location.href = "index.html";
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            var lenders = db.collection("users").doc(email);
            lenders.collection("lender").doc(settle_email).set({
                    amt: remaining_amt
                })
                .then(function() {
                    alert("One record inserted");
                    console.log("Document successfully written!");
                    //window.location.href = "index.html";
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });

        }


    });
}