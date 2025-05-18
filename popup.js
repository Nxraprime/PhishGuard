// Same heuristic phishing check as in background.js
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

  const ipPattern = /https?:\/\/(\d{1,3}\.){3}\d{1,3}/;
  if (ipPattern.test(url)) return true;

  return false;
}

document.getElementById('checkBtn').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const currentUrl = tabs[0].url;
    const statusDiv = document.getElementById('status');

    if (isPhishingURL(currentUrl)) {
      statusDiv.style.color = 'red';
      statusDiv.innerText = '⚠️ This URL looks suspicious!';
    } else {
      statusDiv.style.color = 'limegreen';
      statusDiv.innerText = '✔️ This URL appears safe.';
    }
  });
});
