// ========================================
// MONK HEALTH - GOOGLE APPS SCRIPT BACKEND
// ========================================

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const VALID_USERS = {
    'monk': 'health123',  // Demo user (CHANGE IN PRODUCTION)
    // Add more users as needed
};

// ========================================
// MAIN ENTRY POINT
// ========================================

function doPost(e) {
    try {
        const params = e.postData.contents ? JSON.parse(e.postData.contents) : e.parameter;
        const action = params.action;

        let response = {};

        switch(action) {
            case 'authenticate':
                response = authenticateUser(params.userId, params.password);
                break;
            case 'saveHealthData':
                response = saveHealthData(params);
                break;
            case 'saveFoodData':
                response = saveFoodData(params);
                break;
            case 'saveExpenseData':
                response = saveExpenseData(params);
                break;
            case 'getHealthData':
                response = getHealthData(params.userId, params.date);
                break;
            case 'getFoodData':
                response = getFoodData(params.userId, params.date);
                break;
            case 'getExpenseData':
                response = getExpenseData(params.userId, params.date);
                break;
            case 'getMonthlyData':
                response = getMonthlyData(params.userId, params.month);
                break;
            default:
                response = { success: false, message: 'Unknown action' };
        }

        return ContentService.createTextOutput(JSON.stringify(response))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            message: 'Server error: ' + error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// ========================================
// AUTHENTICATION
// ========================================

function authenticateUser(userId, password) {
    if (!userId || !password) {
        return { success: false, message: 'Please enter both ID and password' };
    }

    if (VALID_USERS[userId] && VALID_USERS[userId] === password) {
        const token = Utilities.getUuid();
        const cache = CacheService.getUserCache();
        cache.put(token, userId, 3600); // 1 hour expiry

        return {
            success: true,
            message: 'Authentication successful',
            token: token,
            userName: userId.charAt(0).toUpperCase() + userId.slice(1)
        };
    }

    return { success: false, message: 'Invalid credentials' };
}

// ========================================
// DATA MANAGEMENT - HEALTH
// ========================================

function saveHealthData(data) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = ss.getSheetByName('Health_Data');

        if (!sheet) {
            sheet = ss.insertSheet('Health_Data');
            addHealthHeaders(sheet);
        }

        const row = [
            data.userId,
            data.date,
            data.wakeupTime,
            data.sleepTime,
            data.hiitDuration,
            data.cardioDuration,
            data.totalActiveMinutes,
            data.steps,
            data.waterIntake,
            data.weight,
            data.sleepDuration,
            data.bloodPressure,
            new Date()
        ];

        sheet.appendRow(row);

        return { success: true, message: 'Health data saved successfully' };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function getHealthData(userId, date) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = ss.getSheetByName('Health_Data');

        if (!sheet) {
            return { success: false, message: 'No health data found' };
        }

        const data = sheet.getDataRange().getValues();
        const result = [];

        for (let i = 1; i < data.length; i++) {
            if (data[i][0] === userId && data[i][1] === date) {
                result.push({
                    userId: data[i][0],
                    date: data[i][1],
                    wakeupTime: data[i][2],
                    sleepTime: data[i][3],
                    hiitDuration: data[i][4],
                    cardioDuration: data[i][5],
                    totalActiveMinutes: data[i][6],
                    steps: data[i][7],
                    waterIntake: data[i][8],
                    weight: data[i][9],
                    sleepDuration: data[i][10],
                    bloodPressure: data[i][11]
                });
            }
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function addHealthHeaders(sheet) {
    const headers = [
        'User ID',
        'Date',
        'Wake-up Time',
        'Sleep Time',
        'HIIT Duration (min)',
        'Cardio Duration (min)',
        'Total Active Minutes',
        'Steps',
        'Water Intake (L)',
        'Weight (kg)',
        'Sleep Duration (h)',
        'Blood Pressure',
        'Timestamp'
    ];
    sheet.appendRow(headers);
}

// ========================================
// DATA MANAGEMENT - FOOD
// ========================================

function saveFoodData(data) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = ss.getSheetByName('Food_Data');

        if (!sheet) {
            sheet = ss.insertSheet('Food_Data');
            addFoodHeaders(sheet);
        }

        // Save each food item
        const foodItems = Array.isArray(data.foodItems) ? data.foodItems : [data];

        foodItems.forEach(item => {
            const row = [
                data.userId,
                data.date,
                item.name,
                item.time,
                item.category,
                item.type,
                item.quantity,
                item.calories,
                item.sugarLevel,
                item.healthy,
                item.avoided,
                item.notes,
                new Date()
            ];
            sheet.appendRow(row);
        });

        return { success: true, message: 'Food data saved successfully' };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function getFoodData(userId, date) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = ss.getSheetByName('Food_Data');

        if (!sheet) {
            return { success: false, message: 'No food data found' };
        }

        const data = sheet.getDataRange().getValues();
        const result = [];

        for (let i = 1; i < data.length; i++) {
            if (data[i][0] === userId && data[i][1] === date) {
                result.push({
                    name: data[i][2],
                    time: data[i][3],
                    category: data[i][4],
                    type: data[i][5],
                    quantity: data[i][6],
                    calories: data[i][7],
                    sugarLevel: data[i][8],
                    healthy: data[i][9],
                    avoided: data[i][10],
                    notes: data[i][11]
                });
            }
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function addFoodHeaders(sheet) {
    const headers = [
        'User ID',
        'Date',
        'Food Item',
        'Time',
        'Meal Type',
        'Type',
        'Quantity (g)',
        'Calories',
        'Sugar Level',
        'Healthy',
        'Could be avoided',
        'Notes',
        'Timestamp'
    ];
    sheet.appendRow(headers);
}

// ========================================
// DATA MANAGEMENT - EXPENSE
// ========================================

function saveExpenseData(data) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        let sheet = ss.getSheetByName('Expense_Data');

        if (!sheet) {
            sheet = ss.insertSheet('Expense_Data');
            addExpenseHeaders(sheet);
        }

        // Save each expense item
        const expenseItems = Array.isArray(data.expenses) ? data.expenses : [data];

        expenseItems.forEach(item => {
            const row = [
                data.userId,
                data.date,
                item.amount,
                item.category,
                item.time,
                item.description,
                new Date()
            ];
            sheet.appendRow(row);
        });

        return { success: true, message: 'Expense data saved successfully' };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function getExpenseData(userId, date) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const sheet = ss.getSheetByName('Expense_Data');

        if (!sheet) {
            return { success: false, message: 'No expense data found' };
        }

        const data = sheet.getDataRange().getValues();
        const result = [];

        for (let i = 1; i < data.length; i++) {
            if (data[i][0] === userId && data[i][1] === date) {
                result.push({
                    amount: data[i][2],
                    category: data[i][3],
                    time: data[i][4],
                    description: data[i][5]
                });
            }
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

function addExpenseHeaders(sheet) {
    const headers = [
        'User ID',
        'Date',
        'Amount (₹)',
        'Category',
        'Time',
        'Description',
        'Timestamp'
    ];
    sheet.appendRow(headers);
}

// ========================================
// MONTHLY DATA RETRIEVAL
// ========================================

function getMonthlyData(userId, month) {
    try {
        const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
        const result = {
            health: [],
            food: [],
            expenses: []
        };

        // Get health data for the month
        const healthSheet = ss.getSheetByName('Health_Data');
        if (healthSheet) {
            const data = healthSheet.getDataRange().getValues();
            for (let i = 1; i < data.length; i++) {
                if (data[i][0] === userId && data[i][1].startsWith(month)) {
                    result.health.push({
                        date: data[i][1],
                        steps: data[i][7],
                        weight: data[i][9],
                        sleepDuration: data[i][10]
                    });
                }
            }
        }

        // Get food data for the month
        const foodSheet = ss.getSheetByName('Food_Data');
        if (foodSheet) {
            const data = foodSheet.getDataRange().getValues();
            for (let i = 1; i < data.length; i++) {
                if (data[i][0] === userId && data[i][1].startsWith(month)) {
                    result.food.push({
                        date: data[i][1],
                        name: data[i][2],
                        calories: data[i][7]
                    });
                }
            }
        }

        // Get expense data for the month
        const expenseSheet = ss.getSheetByName('Expense_Data');
        if (expenseSheet) {
            const data = expenseSheet.getDataRange().getValues();
            for (let i = 1; i < data.length; i++) {
                if (data[i][0] === userId && data[i][1].startsWith(month)) {
                    result.expenses.push({
                        date: data[i][1],
                        amount: data[i][2],
                        category: data[i][3]
                    });
                }
            }
        }

        return { success: true, data: result };
    } catch (error) {
        return { success: false, message: error.toString() };
    }
}

// ========================================
// UTILITY - TEST FUNCTION (for deployment)
// ========================================

function testGAS() {
    Logger.log('Google Apps Script deployment test');
    Logger.log('Spreadsheet ID: ' + SPREADSHEET_ID);
    Logger.log('Valid users configured: ' + Object.keys(VALID_USERS).length);
}
