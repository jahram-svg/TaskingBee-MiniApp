/* =========================================
   TASKINGBEE MINI APP
   HOME SCREEN INTERACTIONS
========================================= */

// Telegram Mini App
const tg = window.Telegram?.WebApp;

// Initialize Telegram WebApp when available
if (tg) {
    tg.ready();
    tg.expand();
}


// =========================================
// DEMO DATA
// =========================================

let miningSeconds = (14 * 60 * 60) + (32 * 60) + 18;

let miningActive = true;

let dailyAds = 0;

let tbcBalance = 12.8400;

let taskPoints = 1250.50;


// =========================================
// TELEGRAM USER
// =========================================

function loadTelegramUser() {

    if (
        tg &&
        tg.initDataUnsafe &&
        tg.initDataUnsafe.user
    ) {

        const user = tg.initDataUnsafe.user;

        const firstName =
            user.first_name || "Bee";

        const nameElement =
            document.querySelector(".user-area h2");

        if (nameElement) {

            nameElement.innerHTML =
                `Hello, ${firstName}! 👋`;

        }

    }

}


// =========================================
// FORMAT TIME
// =========================================

function formatTime(seconds) {

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor((seconds % 3600) / 60);

    const secs =
        seconds % 60;

    return [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(secs).padStart(2, "0")
    ].join(" : ");

}


// =========================================
// MINING TIMER
// =========================================

function updateMiningTimer() {

    const timer =
        document.querySelector(".timer strong");

    if (!timer) return;

    if (miningSeconds <= 0) {

        miningActive = false;

        timer.textContent = "READY";

        return;
    }

    timer.textContent =
        formatTime(miningSeconds);

    miningSeconds--;

}


// Start timer
setInterval(
    updateMiningTimer,
    1000
);

updateMiningTimer();


// =========================================
// CLAIM BUTTON
// =========================================

const claimButton =
    document.querySelector(".claim-btn");

if (claimButton) {

    claimButton.addEventListener(
        "click",
        function () {

            if (miningSeconds > 0) {

                showMessage(
                    "⏳ Mining is still active.\n\nCome back when your 24-hour cycle is complete."
                );

                return;
            }


            showMessage(
                "📺 Watch the sponsored ad to claim your 0.8 TBC."
            );

        }
    );

}


// =========================================
// QUICK ACTIONS
// =========================================

const actionCards =
    document.querySelectorAll(".action-card");


actionCards.forEach(
    function (card, index) {

        card.addEventListener(
            "click",
            function () {

                if (index === 0) {

                    showMessage(
                        "📺 Daily Ads\n\nWatch up to 10 sponsored ads every day and earn additional TBC."
                    );

                }

                else if (index === 1) {

                    showMessage(
                        "📋 Tasks\n\nComplete available tasks and earn Task Points."
                    );

                }

                else if (index === 2) {

                    showMessage(
                        "👥 Referrals\n\nInvite friends and earn TBC from qualified referrals."
                    );

                }

                else if (index === 3) {

                    showMessage(
                        "🚀 Mining Boost\n\nIncrease your mining power with an optional boost."
                    );

                }

            }
        );

    }
);


// =========================================
// BOTTOM NAVIGATION
// =========================================

const navItems =
    document.querySelectorAll(".nav-item");


navItems.forEach(
    function (item, index) {

        item.addEventListener(
            "click",
            function () {

                navItems.forEach(
                    function (nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );

                item.classList.add("active");


                if (index === 0) {

                    return;

                }

                if (index === 1) {

                    showMessage(
                        "⛏️ Mining\n\nYour mining dashboard will appear here."
                    );

                }

                if (index === 2) {

                    showMessage(
                        "📋 Tasks\n\nYour Task Marketplace will appear here."
                    );

                }

                if (index === 3) {

                    showMessage(
                        "👥 Referrals\n\nYour referral dashboard will appear here."
                    );

                }

                if (index === 4) {

                    showMessage(
                        "💰 Wallet\n\nYour wallet and withdrawal options will appear here."
                    );

                }

            }
        );

    }
);


// =========================================
// TBC BALANCE
// =========================================

const balanceArrow =
    document.querySelector(".balance-arrow");


if (balanceArrow) {

    balanceArrow.addEventListener(
        "click",
        function () {

            showMessage(
                `💰 TBC Balance\n\n${tbcBalance.toFixed(4)} TBC\n\n≈ $${tbcBalance.toFixed(2)}\n\nYour complete TBC wallet will be available here.`
            );

        }
    );

}


// =========================================
// REFERRAL MILESTONE
// =========================================

const milestoneButton =
    document.querySelector(".milestone-btn");


if (milestoneButton) {

    milestoneButton.addEventListener(
        "click",
        function () {

            showMessage(
                "🎁 Referral Milestones\n\n" +
                "100 qualified active referrals → +4 TBC\n\n" +
                "1,000 qualified active referrals → +8 TBC"
            );

        }
    );

}


// =========================================
// NOTIFICATION
// =========================================

const notificationButton =
    document.querySelector(".notification-btn");


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            showMessage(
                "🔔 Notifications\n\nNo new notifications."
            );

        }
    );

}


// =========================================
// MESSAGE SYSTEM
// =========================================

function showMessage(message) {

    if (
        tg &&
        typeof tg.showAlert === "function"
    ) {

        tg.showAlert(message);

        return;
    }


    alert(message);

}


// =========================================
// INITIALIZE
// =========================================

loadTelegramUser();

console.log(
    "🐝 TaskingBee Mini App initialized"
);
