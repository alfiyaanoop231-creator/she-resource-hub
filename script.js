function login() {
    let role = document.getElementById("role").value;
    let username = document.getElementById("username").value;
    let message = document.getElementById("loginMessage");

    if (role === "" || username === "") {
        message.innerHTML = "Please select role and enter name!";
        message.style.color = "red";
    } else {
        message.innerHTML = "";
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
    }
}

function toggleMode() {
    document.body.classList.toggle("dark");
}

function searchContent() {
    let input = document.getElementById("search").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let text = cards[i].innerText.toLowerCase();
        if (text.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
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
    }
}
