chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action !== "SEND_TO_N8N") {
        return;
    }

    async function sendData() {

        try {

            const response = await fetch(
                "http://localhost:5678/webhook-test/highlight",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        text: request.text,

                        timestamp: new Date().toISOString()

                    })

                }
            );

            const data = await response.json();

            sendResponse({
                success: true,
                data: data
            });

        } catch (error) {

            sendResponse({
                success: false,
                error: error.message
            });

        }

    }

    sendData();

    return true;

});