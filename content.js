chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "GET_SELECTED_TEXT") {

        sendResponse({
            selectedText: window.getSelection().toString()
        });

    }

});