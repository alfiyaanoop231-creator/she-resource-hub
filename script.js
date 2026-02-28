function showMessage() {
    alert("Your request has been submitted safely 💜");
}

function showEmergency() {
    alert("Call 181 (Women Helpline) immediately!");
}

function searchContent() {
    let input = document.getElementById("search").value.toLowerCase();
    let content = document.querySelector(".content");
    if (content.innerText.toLowerCase().includes(input)) {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}
