// Initialize Supabase Client
const supabaseUrl = "https://ejbxrnlrycfevphstvcv.supabase.co";  // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9";  // Replace with your Supabase anon key
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Game Variables
let money = 0;
let moneyPerClick = 1;
let upgrade1Purchased = false;
let upgrade2Purchased = false;
let managerEnabled = false;

// DOM Elements
const moneyDisplay = document.getElementById('moneyDisplay');
const moneyPerClickDisplay = document.getElementById('moneyPerClick');
const errorMessage = document.getElementById('errorMessage');

// Update the display of money
function updateMoneyDisplay() {
    moneyDisplay.textContent = money;
    moneyPerClickDisplay.textContent = moneyPerClick;
}

// Error Handling
function showError(message) {
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
}

// Earn Money Function
function earnMoney() {
    money += moneyPerClick;
    updateMoneyDisplay();
}

// Purchase Upgrade 1 (cost 10)
function purchaseUpgrade() {
    if (money < 10) {
        showError("You don't have enough money for this upgrade!");
    } else if (!upgrade1Purchased) {
        money -= 10;
        moneyPerClick += 1;
        upgrade1Purchased = true;
        updateMoneyDisplay();
    }
}

// Purchase Upgrade 2 (cost 50)
function purchaseUpgrade2() {
    if (money < 50) {
        showError("You don't have enough money for this upgrade!");
    } else if (!upgrade2Purchased) {
        money -= 50;
        moneyPerClick += 5;
        upgrade2Purchased = true;
        updateMoneyDisplay();
    }
}

// Hire Manager (cost 100)
function hireManager() {
    if (money < 100) {
        showError("You don't have enough money to hire a manager!");
    } else if (!managerEnabled) {
        money -= 100;
        managerEnabled = true;
        updateMoneyDisplay();
        setInterval(() => {
            money += 1; // Auto earn money per second
            updateMoneyDisplay();
        }, 1000); // Manager auto-earn every second
    }
}

// Google Login function
function googleLogin() {
    supabase.auth.signInWithOAuth({
        provider: 'google',
    }).then((response) => {
        if (response.error) {
            showError("Error during Google login: " + response.error.message);
        } else {
            alert("Login successful!");
            document.getElementById('googleLoginBtn').style.display = "none";
            document.getElementById('logoutBtn').style.display = "inline-block";
            document.getElementById('gameScreen').style.display = "block"; // Show game screen after login
            const user = response.user;
            console.log("User logged in:", user);
        }
    });
}

// Logout function
function logout() {
    supabase.auth.signOut().then(() => {
        alert("Logged out successfully!");
        location.reload(); // Refresh the page
    }).catch((err) => {
        showError("Error logging out: " + err.message);
    });
}

// Initial setup
document.getElementById('googleLoginBtn').style.display = "inline-block"; // Show Google Login button initially
document.getElementById('gameScreen').style.display = "none"; // Hide the game screen until logged in
document.getElementById('logoutBtn').style.display = "none"; // Hide logout button initially
