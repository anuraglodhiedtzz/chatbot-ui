document.addEventListener("DOMContentLoaded", function () {
    let chat = document.getElementById("chat");
    let userInputField = document.getElementById("user-input");
    let sendButton = document.getElementById("send-btn");

    async function sendMessage() {
        let userInput = userInputField.value.trim();
        if (userInput === "") return;

        // Append user message
        chat.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;
        userInputField.value = "";

        // Auto-scroll
        chat.scrollTop = chat.scrollHeight;

        try {
            let response = await fetch("https://chatbot-backend.onrender.com/chat", { // Ensure this matches your backend route
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

        // Auto-scroll again
        chat.scrollTop = chat.scrollHeight;
    }

    sendButton.addEventListener("click", sendMessage);
    userInputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});
