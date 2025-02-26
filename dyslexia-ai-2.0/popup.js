document.addEventListener("DOMContentLoaded", () => {
  const fontSizeSlider = document.getElementById("fontSize");
  const fontFamilySelect = document.getElementById("fontFamily");

  document
    .getElementById("bold")
    .addEventListener("click", () => sendMessage("bold"));
  document
    .getElementById("italic")
    .addEventListener("click", () => sendMessage("italic"));
  document
    .getElementById("underline")
    .addEventListener("click", () => sendMessage("underline"));

  fontSizeSlider.addEventListener("input", () =>
    sendMessage("changeFontSize", fontSizeSlider.value)
  );
  fontFamilySelect.addEventListener("change", () =>
    sendMessage("changeFontFamily", fontFamilySelect.value)
  );
});

function sendMessage(action, value = null) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: modifyContent,
      args: [action, value],
    });
  });
}

function modifyContent(action, value) {
  if (action === "changeFontSize") {
    document.body.style.fontSize = value + "px";
  }
  if (action === "changeFontFamily") {
    document.body.style.fontFamily = value;
  }
  if (action === "bold") {
    document.execCommand("bold");
  }
  if (action === "italic") {
    document.execCommand("italic");
  }
  if (action === "underline") {
    document.execCommand("underline");
  }
}
