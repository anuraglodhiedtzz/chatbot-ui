async function sendMessage() {  
    let userInputField = document.getElementById("user-input");
    let chat = document.getElementById("chat");
    
    let userInput = userInputField.value.trim();
    if (userInput === "") return;

    chat.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;
    userInputField.value = "";

    chat.scrollTop = chat.scrollHeight;

    try {
        let response = await fetch("https://chatbot-backend.onrender.com/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userInput }),
        });

        if (!response.ok) throw new Error("Network response was not ok");

        let data = await response.json();
        chat.innerHTML += `<div class="bot-message"><strong>Bot:</strong> ${data.reply}</div>`;
    } catch (error) {
        console.error("Fetch error:", error);
        chat.innerHTML += `<div class="bot-message error"><strong>Bot:</strong> Error! Try again.</div>`;
    }

    chat.scrollTop = chat.scrollHeight;
}

// Ensure everything runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    let sendButton = document.getElementById("send-btn");
    let userInputField = document.getElementById("user-input");

    sendButton.addEventListener("click", sendMessage);
    userInputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
