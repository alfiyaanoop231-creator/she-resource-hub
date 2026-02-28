// LOGIN
function login() {
    let role = document.getElementById("role").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("loginMessage");

    if (role === "" || username === "" || password === "") {
        message.innerHTML = "Please fill all fields!";
        message.style.color = "red";
    } else {
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        setGreeting();

        // Admin Panel
        if (role === "Admin") {
            document.getElementById("adminPanel").style.display = "block";
            loadComplaints();
        } else {
            document.getElementById("adminPanel").style.display = "none";
        }
    }
}

// SHOW/HIDE PASSWORD
function togglePassword() {
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

// DARK MODE
function toggleMode() {
    document.body.classList.toggle("dark");
}

// GREETING
function setGreeting() {
    let hour = new Date().getHours();
    let greet;

    if (hour < 12) greet = "Good Morning ☀️";
    else if (hour < 18) greet = "Good Afternoon 🌤️";
    else greet = "Good Evening 🌙";

    document.getElementById("greeting").innerHTML = greet;
}

// SEARCH
function searchContent() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let text = cards[i].innerText.toLowerCase();
        if (text.includes(input)) {
            cards[i].style.display = "block";
            cards[i].style.border = "2px solid #d81b60";
        } else {
            cards[i].style.display = "none";
        }
    }
}

// CONTACT FORM
function countChar() {
    let text = document.getElementById("message").value.length;
    document.getElementById("charCount").innerHTML = text + " / 200";
}

function sendMessage() {
    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    if (name === "" || message === "") {
        alert("Please fill all fields!");
    } else {
        alert("Message sent successfully 💜");
        document.getElementById("name").value = "";
        document.getElementById("message").value = "";
        document.getElementById("charCount").innerHTML = "0 / 200";
    }
}

// REPORT COMPLAINTS
function submitComplaint() {
    let complaint = document.getElementById("complaintText").value;
    let msg = document.getElementById("complaintMessage");

    if (complaint === "") {
        msg.innerHTML = "Please write a complaint!";
        msg.style.color = "red";
        return;
    }

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push(complaint);
    localStorage.setItem("complaints", JSON.stringify(complaints));

    msg.innerHTML = "Complaint submitted successfully 💜";
    msg.style.color = "green";
    document.getElementById("complaintText").value = "";

    loadComplaints();
}

// LOAD COMPLAINTS FOR ADMIN
function loadComplaints() {
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let list = document.getElementById("complaintList");
    list.innerHTML = "";

    for (let i = 0; i < complaints.length; i++) {
        let p = document.createElement("p");
        p.innerHTML = "Complaint " + (i + 1) + ": " + complaints[i];
        list.appendChild(p);
    }
}
    
