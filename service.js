const cardElements = document.querySelectorAll(".card");

const dateOutput = document.getElementById("output-date");
const titleOutput = document.getElementById("output-title");
const numberOutput = document.getElementById("output-number");

const loveDisplay = document.getElementById("show-love");
const coinsDisplay = document.getElementById("show-coins");
const copyDisplay = document.getElementById("show-copy");

let loveCount = 0;
let coinCount = 100;
let copyCount = 0;

loveDisplay.innerText = loveCount;
coinsDisplay.innerText = coinCount;
copyDisplay.innerText = copyCount;

function refreshDisplay() {
    loveDisplay.innerText = loveCount;
    if (coinCount < 0) {
        coinsDisplay.innerText = 0;
    } else {
        coinsDisplay.innerText = coinCount;
    }
    copyDisplay.innerText = copyCount;
}

const callLog = [];
const logList = document.getElementById("historyList");

function showLog() {
    logList.innerHTML = "";
    callLog.forEach((entry, idx) => {
        const logDiv = document.createElement("div");
        logDiv.classList.add(
            "history-item",
            "flex",
            "justify-between",
            "items-center",
            "pb-2"
        );

        logDiv.innerHTML = `
            <div  class="bg-gray-100 flex w-full rounded-md justify-between px-6 py-2">
            <div>
                <strong>${entry.title}</strong><br>
                <span class="text-gray-600">${entry.number}</span>
            </div>
            <p class="text-gray-800 text-[16px]">${entry.date}</p>
            </div>
        `;
        logList.appendChild(logDiv);
    });
}

cardElements.forEach((cardEl) => {
    const copyButton = cardEl.querySelector(".copy-btn");
    const callButton = cardEl.querySelector(".call-btn");
    const loveButton = cardEl.querySelector(".love-count");

    loveButton.addEventListener("click", () => {
        loveCount++;
        refreshDisplay();
    });

    copyButton.addEventListener("click", () => {
        const phoneNumber = cardEl.querySelector(".number").innerText;
        navigator.clipboard.writeText(phoneNumber);

        copyCount++;
        alert(`Number ${phoneNumber} copied to clipboard!`);
        refreshDisplay();
        console.log("Number copied:", phoneNumber);
    });

    callButton.addEventListener("click", () => {
        const phoneNumber = cardEl.querySelector(".number").innerText;
        const cardTitle = cardEl.querySelector(".title").innerText;

        coinCount -= 20;
        if (coinCount < 0) {
            coinCount = 0;
            alert("Not enough coins! Minimum 20 coins required.");
            return;
        } else {
            alert(`Calling ${cardTitle} ${phoneNumber}...`);
            refreshDisplay();
        }

        const now = new Date();
        const timeString = now.toLocaleTimeString();

        callLog.push({ title: cardTitle, number: phoneNumber, date: timeString });

        showLog();
    });
});

const clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener("click", () => {
    callLog.length = 0;
    showLog();
});