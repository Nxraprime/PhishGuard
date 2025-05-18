
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url || changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: checkPhishingURL,
        });
    }
});

function checkPhishingURL() {
    const phishingKeywords = [
        "free-gift", "login-update", "secure-verify", "bank-alert", "account-suspend",
        "confirm-password", "urgent-security", "reset-now", "limited-offer", "get-prize"
    ];
    const url = window.location.href;
    const suspicious = phishingKeywords.some(keyword => url.includes(keyword));

    if (suspicious) {
        alert("⚠️ WARNING: This site may be a phishing attempt. Proceed with caution!");
    }
}
