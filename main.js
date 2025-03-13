function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    let chat = document.getElementById("chat");
    let userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chat.innerHTML += userMessage;

    // Dummy bot response
    setTimeout(() => {
        let botMessage = `<div><strong>Bot:</strong> Hello! How can I assist you?</div>`;
        chat.innerHTML += botMessage;
    }, 1000);

    document.getElementById("user-input").value = "";
}
