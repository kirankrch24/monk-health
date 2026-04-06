// APP STATE
const appState = {
    userId: null,
    userName: null,
    currentDate: new Date().toISOString().split('T')[0],
    healthData: [],
    foodData: [],
    expenseData: [],
    goals: {
        targetWeight: 75,
        dailyStepsGoal: 10000,
        budgetLimit: 500,
        targetCalories: 2000
    },
    foodEntryCount: 1,
    expenseEntryCount: 1,
    charts: {}
};

// INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!sessionStorage.getItem('userID')) {
        window.location.href = 'index.html';
        return;
    }

    appState.userId = sessionStorage.getItem('userID');
    appState.userName = sessionStorage.getItem('userName') || appState.userId;

    // Set up UI
    initializeUI();
    loadData();
    setupEventListeners();
    updateDashboard();
});

function initializeUI() {
    // Set user info
    document.getElementById('userName').textContent = appState.userName;
    document.getElementById('userInitial').textContent = appState.userName.charAt(0).toUpperCase();

    // Set today's date
    const todayDate = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = todayDate;

    // Load goals from localStorage
    const savedGoals = localStorage.getItem(`goals_${appState.userId}`);
    if (savedGoals) {
        appState.goals = JSON.parse(savedGoals);
    }

    // Initialize food entries
    addFoodEntry();

    // Initialize expense entries
    addExpenseEntry();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const view = link.dataset.view;
            switchView(view);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    });

    // Form submission
    document.getElementById('mainForm').addEventListener('submit', handleFormSubmit);

    // Add food entry button
    document.getElementById('addFoodBtn').addEventListener('click', (e) => {
        e.preventDefault();
        addFoodEntry();
    });

    // Add expense entry button
    document.getElementById('addExpenseBtn').addEventListener('click', (e) => {
        e.preventDefault();
        addExpenseEntry();
    });

    // Save goals button
    document.getElementById('saveGoalsBtn').addEventListener('click', saveGoals);

    // Auto-calculate sleep duration
    document.getElementById('wakeupTime').addEventListener('change', calculateSleepDuration);
    document.getElementById('sleepTime').addEventListener('change', calculateSleepDuration);

    // Auto-calculate total active minutes
    document.getElementById('hiitDuration').addEventListener('change', calculateTotalActiveMinutes);
    document.getElementById('cardioDuration').addEventListener('change', calculateTotalActiveMinutes);

    // Food entries auto-calculation
    document.addEventListener('change', (e) => {
        if (e.target.name === 'foodQuantity' || e.target.name === 'foodType') {
            calculateFoodCalories(e.target);
        }
        if (e.target.name === 'foodAmount' || e.target.name === 'foodCategory') {
            updateExpenseTotal();
        }
    });
}

function switchView(viewName) {
    // Hide all views
    document.querySelectorAll('.content-wrapper').forEach(view => {
        view.classList.remove('active');
    });

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected view
    const viewMap = {
        'dashboard': 'dashboardView',
        'entry': 'entryView',
        'visualization': 'visualizationView',
        'goals': 'goalsView'
    };

    const viewId = viewMap[viewName];
    if (viewId) {
        document.getElementById(viewId).classList.add('active');
        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        // Update page title
        const titles = {
            'dashboard': 'Dashboard',
            'entry': 'Add Entry',
            'visualization': 'Data Visualization',
            'goals': 'Goals'
        };
        document.getElementById('pageTitle').textContent = titles[viewName];

        // Initialize charts when visualization view is opened
        if (viewName === 'visualization') {
            setTimeout(() => {
                initializeCharts();
            }, 100);
        }

        // Load goals data when goals view is opened
        if (viewName === 'goals') {
            loadGoalsUI();
        }
    }
}

// FORM HANDLING
function addFoodEntry() {
    const container = document.getElementById('foodEntries');
    const entryId = appState.foodEntryCount;
    appState.foodEntryCount++;

    const foodEntry = document.createElement('div');
    foodEntry.style.cssText = 'background: #f9f9f9; border: 1px solid #e0e0e0; padding: 16px; border-radius: 6px; margin-bottom: 12px;';
    foodEntry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="color: #121212; margin: 0;">Food Item ${entryId}</h4>
            <button type="button" class="remove-btn" data-entry="${entryId}" style="background: rgba(255, 75, 75, 0.2); border: 1px solid rgba(255, 75, 75, 0.5); color: #ff6b6b; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remove</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            <div class="form-group">
                <label>Food Item Name</label>
                <input type="text" class="foodName" data-entry="${entryId}" placeholder="e.g., Chicken Rice">
            </div>
            <div class="form-group">
                <label>Time of Eating</label>
                <input type="time" class="foodTime" data-entry="${entryId}">
            </div>
            <div class="form-group">
                <label>Meal Type</label>
                <select class="foodCategory" name="foodCategory" data-entry="${entryId}">
                    <option value="">Select meal type</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                </select>
            </div>
            <div class="form-group">
                <label>Type</label>
                <select class="foodType" name="foodType" data-entry="${entryId}">
                    <option value="">Select type</option>
                    <option value="homeCooked">Home Cooked</option>
                    <option value="outsideFood">Outside Food</option>
                </select>
            </div>
            <div class="form-group">
                <label>Quantity (grams)</label>
                <input type="number" class="foodQuantity" name="foodQuantity" data-entry="${entryId}" min="0" placeholder="0">
            </div>
            <div class="form-group">
                <label>Calories (auto)</label>
                <input type="number" class="foodCalories" data-entry="${entryId}" readonly style="background: #e0e0e0;" placeholder="Auto-calculated">
            </div>
            <div class="form-group">
                <label>Sugar Level Estimate</label>
                <select class="foodSugar" data-entry="${entryId}">
                    <option value="">Select level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-group">
                <label>Healthy?</label>
                <select class="foodHealthy" data-entry="${entryId}">
                    <option value="">Assessment</option>
                    <option value="yes">Yes - Healthy</option>
                    <option value="no">No - Unhealthy</option>
                </select>
            </div>
            <div class="form-group">
                <label>Could it be avoided?</label>
                <select class="foodAvoided" data-entry="${entryId}">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Notes</label>
                <textarea class="foodNotes" data-entry="${entryId}" placeholder="Additional notes..."></textarea>
            </div>
        </div>
    `;

    container.appendChild(foodEntry);

    // Add remove button listener
    foodEntry.querySelector('.remove-btn').addEventListener('click', () => {
        foodEntry.remove();
    });
}

function addExpenseEntry() {
    const container = document.getElementById('expenseEntries');
    const entryId = appState.expenseEntryCount;
    appState.expenseEntryCount++;

    const expenseEntry = document.createElement('div');
    expenseEntry.style.cssText = 'background: #f9f9f9; border: 1px solid #e0e0e0; padding: 16px; border-radius: 6px; margin-bottom: 12px;';
    expenseEntry.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <h4 style="color: #121212; margin: 0;">Expense ${entryId}</h4>
            <button type="button" class="remove-expense" data-entry="${entryId}" style="background: rgba(255, 75, 75, 0.2); border: 1px solid rgba(255, 75, 75, 0.5); color: #ff6b6b; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remove</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
            <div class="form-group">
                <label>Amount Spent (₹)</label>
                <input type="number" class="expenseAmount" name="foodAmount" data-entry="${entryId}" min="0" step="0.01" placeholder="0">
            </div>
            <div class="form-group">
                <label>Category</label>
                <select class="expenseCategory" name="foodCategory" data-entry="${entryId}">
                    <option value="">Select category</option>
                    <option value="necessary">Necessary</option>
                    <option value="extra">Extra</option>
                    <option value="food">Food</option>
                    <option value="lifestyle">Lifestyle</option>
                </select>
            </div>
            <div class="form-group">
                <label>Time</label>
                <input type="time" class="expenseTime" data-entry="${entryId}">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Description</label>
                <input type="text" class="expenseDescription" data-entry="${entryId}" placeholder="e.g., Coffee, Groceries...">
            </div>
        </div>
    `;

    container.appendChild(expenseEntry);

    // Add remove button listener
    expenseEntry.querySelector('.remove-expense').addEventListener('click', () => {
        expenseEntry.remove();
    });
}

function calculateFoodCalories(element) {
    const entryId = element.dataset.entry;
    const quantity = document.querySelector(`.foodQuantity[data-entry="${entryId}"]`).value || 0;
    const type = document.querySelector(`.foodType[data-entry="${entryId}"]`).value;

    // Simple calorie estimation (calories per gram)
    const calorieFactors = {
        homeCooked: 1.5,  // 1.5 cal/gram
        outsideFood: 2.0   // 2.0 cal/gram
    };

    const factor = calorieFactors[type] || 1.5;
    const calories = Math.round(quantity * factor);

    document.querySelector(`.foodCalories[data-entry="${entryId}"]`).value = calories;
    updateDailyTotalCalories();
}

function updateDailyTotalCalories() {
    let totalCalories = 0;
    document.querySelectorAll('.foodCalories').forEach(input => {
        totalCalories += parseInt(input.value) || 0;
    });
    document.getElementById('dailyTotalCalories').value = totalCalories;
}

function updateExpenseTotal() {
    let totalExpense = 0;
    document.querySelectorAll('.expenseAmount').forEach(input => {
        totalExpense += parseFloat(input.value) || 0;
    });
    document.getElementById('dailyTotalSpent').value = Math.round(totalExpense * 100) / 100;
}

function calculateSleepDuration() {
    const wakeupTime = document.getElementById('wakeupTime').value;
    const sleepTime = document.getElementById('sleepTime').value;

    if (wakeupTime && sleepTime) {
        const wakeup = new Date(wakeupTime);
        const sleep = new Date(sleepTime);
        const durationMs = wakeup - sleep;

        if (durationMs > 0) {
            const hours = Math.round((durationMs / (1000 * 60 * 60)) * 10) / 10;
            document.getElementById('sleepDuration').value = hours;
        } else {
            // Sleep time is next day
            const durationMs2 = (24 * 60 * 60 * 1000) - Math.abs(durationMs);
            const hours = Math.round((durationMs2 / (1000 * 60 * 60)) * 10) / 10;
            document.getElementById('sleepDuration').value = hours;
        }
    }
}

function calculateTotalActiveMinutes() {
    const hiit = parseInt(document.getElementById('hiitDuration').value) || 0;
    const cardio = parseInt(document.getElementById('cardioDuration').value) || 0;
    document.getElementById('totalActiveMinutes').value = hiit + cardio;
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Collect health data
    const healthEntry = {
        date: document.getElementById('date').value,
        wakeupTime: document.getElementById('wakeupTime').value,
        sleepTime: document.getElementById('sleepTime').value,
        hiitDuration: parseInt(document.getElementById('hiitDuration').value) || 0,
        cardioDuration: parseInt(document.getElementById('cardioDuration').value) || 0,
        totalActiveMinutes: parseInt(document.getElementById('totalActiveMinutes').value) || 0,
        steps: parseInt(document.getElementById('steps').value) || 0,
        waterIntake: parseFloat(document.getElementById('waterIntakeLiters').value) || 0,
        weight: parseFloat(document.getElementById('weight').value) || 0,
        sleepDuration: parseFloat(document.getElementById('sleepDuration').value) || 0,
        bloodPressure: document.getElementById('bloodPressure').value || 'N/A'
    };

    // Collect food data
    const foodEntries = [];
    document.querySelectorAll('[data-entry]').forEach(element => {
        const entryId = element.dataset.entry;
        const nameInput = document.querySelector(`.foodName[data-entry="${entryId}"]`);
        if (nameInput) {
            foodEntries.push({
                name: nameInput.value,
                time: document.querySelector(`.foodTime[data-entry="${entryId}"]`).value,
                category: document.querySelector(`.foodCategory[data-entry="${entryId}"]`).value,
                type: document.querySelector(`.foodType[data-entry="${entryId}"]`).value,
                quantity: parseInt(document.querySelector(`.foodQuantity[data-entry="${entryId}"]`).value) || 0,
                calories: parseInt(document.querySelector(`.foodCalories[data-entry="${entryId}"]`).value) || 0,
                sugarLevel: document.querySelector(`.foodSugar[data-entry="${entryId}"]`).value,
                healthy: document.querySelector(`.foodHealthy[data-entry="${entryId}"]`).value,
                avoided: document.querySelector(`.foodAvoided[data-entry="${entryId}"]`).value,
                notes: document.querySelector(`.foodNotes[data-entry="${entryId}"]`).value
            });
        }
    });

    // Collect expense data
    const expenseEntries = [];
    document.querySelectorAll('.expenseAmount').forEach(element => {
        const entryId = element.dataset.entry;
        expenseEntries.push({
            amount: parseFloat(element.value) || 0,
            category: document.querySelector(`.expenseCategory[data-entry="${entryId}"]`).value,
            time: document.querySelector(`.expenseTime[data-entry="${entryId}"]`).value,
            description: document.querySelector(`.expenseDescription[data-entry="${entryId}"]`).value
        });
    });

    // Save to localStorage
    const dataKey = `data_${appState.userId}_${healthEntry.date}`;
    const allData = {
        health: healthEntry,
        food: foodEntries.filter(f => f.name),
        expenses: expenseEntries.filter(e => e.amount > 0)
    };

    localStorage.setItem(dataKey, JSON.stringify(allData));

    // Show success message
    showSuccessMessage('✅ Data saved successfully!');

    // Reset form
    document.getElementById('mainForm').reset();
    document.getElementById('date').value = new Date().toISOString().split('T')[0];
    
    // Re-initialize entries
    document.getElementById('foodEntries').innerHTML = '';
    document.getElementById('expenseEntries').innerHTML = '';
    appState.foodEntryCount = 1;
    appState.expenseEntryCount = 1;
    addFoodEntry();
    addExpenseEntry();

    // Update dashboard
    updateDashboard();
}

function showSuccessMessage(message) {
    const msgDiv = document.getElementById('successMessage');
    msgDiv.textContent = message;
    msgDiv.style.display = 'block';
    setTimeout(() => {
        msgDiv.style.display = 'none';
    }, 3000);
}

// DASHBOARD & DATA MANAGEMENT
function loadData() {
    // Load data from localStorage
    const allKeys = Object.keys(localStorage);
    const userKeys = allKeys.filter(key => key.startsWith(`data_${appState.userId}_`));

    userKeys.forEach(key => {
        const data = JSON.parse(localStorage.getItem(key));
        if (data.health) appState.healthData.push(data.health);
        if (data.food) appState.foodData.push(...data.food);
        if (data.expenses) appState.expenseData.push(...data.expenses);
    });
}

function updateDashboard() {
    const today = new Date().toISOString().split('T')[0];
    const todayData = Object.keys(localStorage)
        .filter(key => key.startsWith(`data_${appState.userId}_${today}`))
        .map(key => JSON.parse(localStorage.getItem(key)));

    let todayHealth = null;
    let todayFood = [];
    let todayExpenses = [];

    if (todayData.length > 0) {
        todayHealth = todayData[0].health;
        todayFood = todayData[0].food || [];
        todayExpenses = todayData[0].expenses || [];
    }

    // Update stat cards
    if (todayHealth) {
        document.getElementById('todaySteps').textContent = todayHealth.steps.toLocaleString();
        document.getElementById('stepsProgress').style.width = Math.min((todayHealth.steps / appState.goals.dailyStepsGoal) * 100, 100) + '%';

        document.getElementById('todaySleep').textContent = todayHealth.sleepDuration + 'h';
        document.getElementById('sleepProgress').style.width = Math.min((todayHealth.sleepDuration / 8) * 100, 100) + '%';

        document.getElementById('currentWeight').textContent = todayHealth.weight;
    }

    // Update calories
    const totalCalories = todayFood.reduce((sum, food) => sum + (food.calories || 0), 0);
    document.getElementById('todayCalories').textContent = totalCalories;
    document.getElementById('caloriesProgress').style.width = Math.min((totalCalories / appState.goals.targetCalories) * 100, 100) + '%';

    // Update water
    if (todayHealth) {
        document.getElementById('waterIntake').textContent = todayHealth.waterIntake;
    }

    // Update spending
    const totalSpent = todayExpenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
    document.getElementById('todaySpent').textContent = '₹' + Math.round(totalSpent);
    document.getElementById('spendProgress').style.width = Math.min((totalSpent / appState.goals.budgetLimit) * 100, 100) + '%';

    // Update insights
    updateInsights(todayHealth, todayFood, todayExpenses);
}

function updateInsights(health, food, expenses) {
    const insights = [];

    if (health) {
        if (health.steps < appState.goals.dailyStepsGoal) {
            insights.push(`👣 You walked ${appState.goals.dailyStepsGoal - health.steps} fewer steps than your goal.`);
        } else {
            insights.push(`✅ Great job! You exceeded your daily step goal by ${health.steps - appState.goals.dailyStepsGoal} steps.`);
        }

        if (health.sleepDuration < 7) {
            insights.push(`😴 You got ${health.sleepDuration}h of sleep. Aim for 8 hours.`);
        } else {
            insights.push(`🌙 Excellent sleep duration: ${health.sleepDuration}h`);
        }

        if (health.waterIntake < 3) {
            insights.push(`💧 Drink more water! Target: 3L, Current: ${health.waterIntake}L`);
        }
    }

    if (food.length > 0) {
        const highSugarCount = food.filter(f => f.sugarLevel === 'high').length;
        if (highSugarCount > 0) {
            insights.push(`⚠️ High sugar intake detected: ${highSugarCount} item(s) with high sugar.`);
        }

        const unHealthyCount = food.filter(f => f.healthy === 'no').length;
        if (unHealthyCount > 0) {
            insights.push(`🍔 Consider healthier options: ${unHealthyCount} unhealthy item(s) consumed.`);
        }
    }

    if (expenses.length > 0) {
        const totalSpent = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
        if (totalSpent > appState.goals.budgetLimit) {
            insights.push(`💰 Budget exceeded! Spent ₹${totalSpent} vs limit ₹${appState.goals.budgetLimit}`);
        }
    }

    const insightsDiv = document.getElementById('insightsContainer');
    if (insights.length === 0) {
        insightsDiv.innerHTML = '<p style="color: #666;">No data yet. Add an entry to see insights!</p>';
    } else {
        insightsDiv.innerHTML = insights.map(i => `<p>• ${i}</p>`).join('');
    }
}

// CHARTS
function initializeCharts() {
    const chartCanvas = document.getElementById('weightChart');
    if (!chartCanvas) return;

    // Get last 30 days data
    const last30Days = getLast30DaysData();

    // Weight Chart
    if (appState.charts.weightChart) {
        appState.charts.weightChart.destroy();
    }
    appState.charts.weightChart = new Chart(chartCanvas, {
        type: 'line',
        data: {
            labels: last30Days.dates,
            datasets: [{
                label: 'Weight (kg)',
                data: last30Days.weights,
                borderColor: '#333333',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                },
                x: {
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                }
            }
        }
    });

    // Steps Chart
    const stepsCanvas = document.getElementById('stepsChart');
    if (appState.charts.stepsChart) {
        appState.charts.stepsChart.destroy();
    }
    appState.charts.stepsChart = new Chart(stepsCanvas, {
        type: 'bar',
        data: {
            labels: getLast7DaysData().dates,
            datasets: [{
                label: 'Steps',
                data: getLast7DaysData().steps,
                backgroundColor: '#333333',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                },
                x: {
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                }
            }
        }
    });

    // Calories Chart
    const caloriesCanvas = document.getElementById('caloriesChart');
    if (appState.charts.caloriesChart) {
        appState.charts.caloriesChart.destroy();
    }
    appState.charts.caloriesChart = new Chart(caloriesCanvas, {
        type: 'line',
        data: {
            labels: getLast7DaysData().dates,
            datasets: [{
                label: 'Calories',
                data: getLast7DaysData().calories,
                borderColor: '#333333',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                },
                x: {
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                }
            }
        }
    });

    // Expense Pie Chart
    const expenseCanvas = document.getElementById('expenseChart');
    if (appState.charts.expenseChart) {
        appState.charts.expenseChart.destroy();
    }

    const today = new Date().toISOString().split('T')[0];
    const todayExpenses = Object.keys(localStorage)
        .filter(key => key.startsWith(`data_${appState.userId}_${today}`))
        .map(key => JSON.parse(localStorage.getItem(key))[0]?.expenses || [])
        .flat();

    const expenseByCategory = {};
    todayExpenses.forEach(exp => {
        expenseByCategory[exp.category] = (expenseByCategory[exp.category] || 0) + exp.amount;
    });

    appState.charts.expenseChart = new Chart(expenseCanvas, {
        type: 'doughnut',
        data: {
            labels: Object.keys(expenseByCategory),
            datasets: [{
                data: Object.values(expenseByCategory),
                backgroundColor: ['#121212', '#444444', '#777777', '#aaaaaa']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#666666' } }
            }
        }
    });

    // Sleep Chart
    const sleepCanvas = document.getElementById('sleepChart');
    if (appState.charts.sleepChart) {
        appState.charts.sleepChart.destroy();
    }
    appState.charts.sleepChart = new Chart(sleepCanvas, {
        type: 'radar',
        data: {
            labels: getLast7DaysData().dates,
            datasets: [{
                label: 'Sleep Hours',
                data: getLast7DaysData().sleep,
                borderColor: '#333333',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#666666' } }
            },
            scales: {
                r: {
                    grid: { color: '#e0e0e0' },
                    ticks: { color: '#666666' }
                }
            }
        }
    });
}

function getLast30DaysData() {
    const dates = [];
    const weights = [];

    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr.slice(5)); // MM-DD format

        const dataKey = `data_${appState.userId}_${dateStr}`;
        const data = localStorage.getItem(dataKey);
        if (data) {
            const weight = JSON.parse(data)?.health?.weight || null;
            weights.push(weight);
        } else {
            weights.push(null);
        }
    }

    return { dates, weights };
}

function getLast7DaysData() {
    const dates = [];
    const steps = [];
    const calories = [];
    const sleep = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        dates.push(dateStr.slice(5));

        const dataKey = `data_${appState.userId}_${dateStr}`;
        const data = localStorage.getItem(dataKey);

        if (data) {
            const parsed = JSON.parse(data);
            steps.push(parsed?.health?.steps || 0);
            sleep.push(parsed?.health?.sleepDuration || 0);

            const totalCalories = (parsed?.food || []).reduce((sum, f) => sum + (f.calories || 0), 0);
            calories.push(totalCalories);
        } else {
            steps.push(0);
            calories.push(0);
            sleep.push(0);
        }
    }

    return { dates, steps, calories, sleep };
}

// GOALS
function saveGoals() {
    appState.goals = {
        targetWeight: parseFloat(document.getElementById('targetWeight').value) || 75,
        dailyStepsGoal: parseInt(document.getElementById('dailyStepsGoal').value) || 10000,
        budgetLimit: parseInt(document.getElementById('budgetLimit').value) || 500,
        targetCalories: parseInt(document.getElementById('targetCalories').value) || 2000
    };

    localStorage.setItem(`goals_${appState.userId}`, JSON.stringify(appState.goals));
    showSuccessMessage('✅ Goals saved successfully!');
    updateDashboard();
}

function loadGoalsUI() {
    document.getElementById('targetWeight').value = appState.goals.targetWeight;
    document.getElementById('dailyStepsGoal').value = appState.goals.dailyStepsGoal;
    document.getElementById('budgetLimit').value = appState.goals.budgetLimit;
    document.getElementById('targetCalories').value = appState.goals.targetCalories;

    // Show progress
    const goalsContainer = document.getElementById('goalsContainer');
    goalsContainer.innerHTML = `
        <div class="stat-card" style="border: 1px solid #e0e0e0;">
            <div class="stat-label">Target Weight</div>
            <div class="stat-value">${appState.goals.targetWeight} kg</div>
        </div>

        <div class="stat-card" style="border: 1px solid #e0e0e0;">
            <div class="stat-label">Daily Steps Goal</div>
            <div class="stat-value">${appState.goals.dailyStepsGoal.toLocaleString()}</div>
        </div>

        <div class="stat-card" style="border: 1px solid #e0e0e0;">
            <div class="stat-label">Daily Budget</div>
            <div class="stat-value">₹${appState.goals.budgetLimit}</div>
        </div>

        <div class="stat-card" style="border: 1px solid #e0e0e0;">
            <div class="stat-label">Target Calories</div>
            <div class="stat-value">${appState.goals.targetCalories}</div>
        </div>
    `;
}
