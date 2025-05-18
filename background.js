// Simple heuristic phishing check function
function isPhishingURL(url) {
  const suspiciousKeywords = ["login", "secure", "update", "verify", "account", "bank", "confirm", "password"];
  const suspiciousDomains = ["bit.ly", "tinyurl.com", "freegift", "secure-login"];

  const lowerUrl = url.toLowerCase();

  for (let word of suspiciousKeywords) {
    if (lowerUrl.includes(word)) return true;
  }

  for (let domain of suspiciousDomains) {
    if (lowerUrl.includes(domain)) return true;
  }

  // Check if URL uses IP address instead of domain
  const ipPattern = /https?:\/\/(\d{1,3}\.){3}\d{1,3}/;
  if (ipPattern.test(url)) return true;

  return false;
}

// Listen for tab updates to check URLs
chrome.webNavigation.onCompleted.addListener(({tabId, url}) => {
  if (isPhishingURL(url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      function: showWarning
    });
  }
});

function showWarning() {
  if (!document.getElementById('phishguard-warning')) {
    const warningDiv = document.createElement('div');
    warningDiv.id = 'phishguard-warning';
    warningDiv.style.position = 'fixed';
    warningDiv.style.top = '0';
    warningDiv.style.left = '0';
    warningDiv.style.right = '0';
    warningDiv.style.backgroundColor = 'red';
    warningDiv.style.color = 'white';
    warningDiv.style.fontSize = '18px';
    warningDiv.style.textAlign = 'center';
    warningDiv.style.padding = '10px';
    warningDiv.style.zIndex = '999999';
    warningDiv.innerText = '⚠️ Warning: This website may be a phishing site! Be cautious.';

    document.body.prepend(warningDiv);
  }
}
