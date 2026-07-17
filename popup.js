const extractBtn = document.getElementById("extractBtn");
const sendBtn = document.getElementById("sendBtn");
const result = document.getElementById("result");

let selectedText = "";

extractBtn.addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.tabs.sendMessage(
        tab.id,
        { action: "GET_SELECTED_TEXT" },
        (response) => {

            if (chrome.runtime.lastError) {
                result.textContent = chrome.runtime.lastError.message;
                return;
            }

            selectedText = response?.selectedText || "";

            result.textContent =
                selectedText || "Nothing selected.";

        }
    );

});


sendBtn.addEventListener("click", async () => {

    if (!selectedText) {

        alert("Please highlight text first.");

        return;

    }

    const response = await fetch(
        "http://localhost:5678/webhook-test/highlight",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                text: selectedText,

                timestamp: new Date().toISOString()

            })
        }
    );

    const data = await response.json();

    alert("Sent successfully!");

    console.log(data);

});