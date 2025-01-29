let money = 0;
let earningsPerClick = 1;
let businesses = [];
let upgrades = [];
let prestigeLevel = 0;
let offlineEarnings = 0;
let achievements = 0;

// Handle earning money
const earnMoney = () => {
    money += earningsPerClick;
    document.getElementById('money').innerText = `Money: $${money}`;
    checkAchievements();
};

// Handle business purchase
const buyBusiness = () => {
    if (money >= 100) {
        money -= 100;
        earningsPerClick += 5;
        document.getElementById('earn-rate').innerText = `Earnings per click: $${earningsPerClick}`;
        updateBusinesses();
    }
};

// Handle prestige
const prestige = () => {
    prestigeLevel += 1;
    earningsPerClick = 1;
    money = 0;
    document.getElementById('money').innerText = `Money: $${money}`;
    document.getElementById('earn-rate').innerText = `Earnings per click: $${earningsPerClick}`;
    document.getElementById('prestige-btn').style.display = 'none';
    alert(`Prestige complete! You've reached level ${prestigeLevel}`);
};

// Add businesses to the game
const updateBusinesses = () => {
    const businessesContainer = document.getElementById('businesses');
    businessesContainer.innerHTML = `<p>You have ${businesses.length} businesses.</p>`;
    const businessBtn = document.createElement('button');
    businessBtn.innerText = "Buy a Business for $100";
    businessBtn.onclick = buyBusiness;
    businessesContainer.appendChild(businessBtn);
};

// Handle offline earnings
const applyOfflineEarnings = () => {
    offlineEarnings += Math.floor(money * 0.1);  // Assume 10% of current money as offline earnings
    document.getElementById('offline-earnings').innerText = `$${offlineEarnings}`;
};

// Check and reward achievements
const checkAchievements = () => {
    if (money >= 1000 && achievements === 0) {
        achievements++;
        document.getElementById('achievement-message').innerText = 'Achievement unlocked: You earned $1000!';
    }
};

// Update the UI periodically
setInterval(() => {
    applyOfflineEarnings();
}, 5000);

// Event listeners for buttons
document.getElementById('click-btn').onclick = earnMoney;
document.getElementById('prestige-btn').onclick = prestige;

updateBusinesses();  // Initialize with first business button
