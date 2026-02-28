  // MULTIPLE ADMINS
let admins = [
    { username: "Admin1", password: "safe2026" },
    { username: "Admin2", password: "protect123" },
    { username: "Admin3", password: "helpme" }
];

// SHOW LOGIN AFTER WELCOME
function showLogin() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
}

// LOGIN
function login() {
    let role = document.getElementById("role").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("loginMessage");

    if(role === "" || username === "" || password === "") {
        message.innerHTML = "Please fill all fields!";
        message.style.color = "red";
        return;
    }

    // Admin login check
    if(role === "Admin") {
        let validAdmin = admins.find(admin => admin.username === username && admin.password === password);
        if(!validAdmin) {
            message.innerHTML = "Invalid Admin username or password!";
            message.style.color = "red";
            return;
        }
    }

    document.getElementById("loginBox").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    setGreeting(username);

    // Admin panel visibility
    if(role === "Admin") {
        document.getElementById("adminPanel").style.display = "block";
        loadComplaints();
        loadMessages();
    } else {
        document.getElementById("adminPanel").style.display = "none";
    }
}

// SHOW/HIDE PASSWORD
function togglePassword() {
    let pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

// DARK MODE
function toggleMode() { document.body.classList.toggle("dark"); }

// GREETING
function setGreeting(username) {
    let hour = new Date().getHours();
    let greet = hour < 12 ? "Good Morning ☀️" : hour < 18 ? "Good Afternoon 🌤️" : "Good Evening 🌙";
    document.getElementById("greeting").innerHTML = greet + (username ? ", " + username : "");
}

// SEARCH
function searchContent() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.getElementsByClassName("card");
    for(let i=0;i<cards.length;i++){
        let text = cards[i].innerText.toLowerCase();
        cards[i].style.display = text.includes(input) ? "block" : "none";
        cards[i].style.border = text.includes(input) ? "2px solid #d81b60" : "none";
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
    if(!name || !message){ alert("Please fill all fields!"); return; }

    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push({name, text: message, role: document.getElementById("role").value});
    localStorage.setItem("messages", JSON.stringify(messages));

    alert("Message sent successfully 💜");
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    document.getElementById("charCount").innerHTML = "0 / 200";
    loadMessages();
}

// COMPLAINTS
function submitComplaint() {
    let complaint = document.getElementById("complaintText").value;
    let category = document.getElementById("category").value;
    let msg = document.getElementById("complaintMessage");
    if(!complaint || !category){ msg.innerHTML="Fill all fields!"; msg.style.color="red"; return; }

    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.push({text: complaint, category: category, status:"Pending", time:new Date().toLocaleString(), role: document.getElementById("role").value});
    localStorage.setItem("complaints", JSON.stringify(complaints));

    msg.innerHTML="Complaint submitted successfully 💜"; msg.style.color="green";
    document.getElementById("complaintText").value="";
    document.getElementById("category").value="";
    loadComplaints();
}

// LOAD & MANAGE COMPLAINTS
function loadComplaints(){
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    let list = document.getElementById("complaintList");
    list.innerHTML="";
    complaints.forEach((c,i)=>{
        let p=document.createElement("p");
        p.innerHTML=`Complaint ${i+1} [${c.time}] (${c.category}, ${c.status}): ${c.text} 
        <button onclick="deleteComplaint(${i})">Delete</button> 
        <button onclick="resolveComplaint(${i})">Resolve</button>`;
        list.appendChild(p);
    });
}

function deleteComplaint(index){
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints.splice(index,1);
    localStorage.setItem("complaints", JSON.stringify(complaints));
    loadComplaints();
}

function resolveComplaint(index){
    let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
    complaints[index].status = "Resolved";
    localStorage.setItem("complaints", JSON.stringify(complaints));
    loadComplaints();
}

// LOAD MESSAGES
function loadMessages(){
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let list = document.getElementById("messagesList");
    list.innerHTML="";
    messages.forEach((m,i)=>{
        let p=document.createElement("p");
        p.innerHTML=`<b>${m.name} (${m.role})</b>: ${m.text} 
        <button onclick="deleteMessage(${i})">Delete</button>`;
        list.appendChild(p);
    });
}

function deleteMessage(index){
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.splice(index,1);
    localStorage.setItem("messages", JSON.stringify(messages));
    loadMessages();
}
