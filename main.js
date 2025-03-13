document.addEventListener("DOMContentLoaded", function () {
    let chat = document.getElementById("chat");
    let userInputField = document.getElementById("user-input");
    let sendButton = document.getElementById("send-btn");

    async function sendMessage() {
        let userInput = userInputField.value.trim();
        if (userInput === "") return;

        chat.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
        userInputField.value = "";

        try {
            let response = await fetch("https://chatbot-backend-n7vl.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput }),
            });

            let data = await response.json();
            chat.innerHTML += `<div><strong>Bot:</strong> ${data.reply}</div>`;
        } catch (error) {
            chat.innerHTML += `<div><strong>Bot:</strong> Error! Try again.</div>`;
        }

        chat.scrollTop = chat.scrollHeight; // Auto-scroll to the latest message
    }

    sendButton.addEventListener("click", sendMessage);
    userInputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
