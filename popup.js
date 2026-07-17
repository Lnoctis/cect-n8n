const sendBtn = document.getElementById("sendBtn");
const result = document.getElementById("result");

let selectedText = "";

async function loadSelectedText() {

    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.tabs.sendMessage(
        tab.id,
        { action: "GET_SELECTED_TEXT" },
        (response) => {

            if (chrome.runtime.lastError) {
                result.textContent = "Unable to read this page.";
                return;
            }

            selectedText = response?.selectedText || "";

            result.textContent =
                selectedText || "Nothing selected.";

        }
    );

}

// Automatically load highlighted text when popup opens
loadSelectedText();

sendBtn.addEventListener("click", () => {

    if (!selectedText) {
        alert("Please highlight text first.");
        return;
    }

    chrome.runtime.sendMessage(
        {
            action: "SEND_TO_N8N",
            text: selectedText
        },
        (response) => {

            if (response.success) {

                alert("Sent successfully!");

                console.log(response.data);

            } else {

                alert(response.error);

            }

        }
    );

});