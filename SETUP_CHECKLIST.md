# Setup Checklist & Configuration Reference

## ✅ PRE-DEPLOYMENT CHECKLIST

### Phase 1: Google Backend Setup
- [ ] Create Google Spreadsheet at https://sheets.google.com
- [ ] Copy Spreadsheet ID from URL
- [ ] Open Google Apps Script (Tools → Script editor)
- [ ] Paste GoogleAppsScript.gs code
- [ ] Replace `YOUR_SPREADSHEET_ID_HERE` with actual ID
- [ ] Review and update VALID_USERS credentials
- [ ] Click Deploy → New deployment → Web app
- [ ] Authorize the script
- [ ] Copy deployment URL
- [ ] Test script with testGAS() function

### Phase 2: Frontend Configuration
- [ ] Update index.html with deployment URL
  - Find: `'YOUR_GAS_WEBAPP_URL_HERE'`
  - Replace with: Your Google Apps Script deployment URL
- [ ] Verify all file names are correct
- [ ] Test HTML in browser locally

### Phase 3: GitHub Repository
- [ ] Create GitHub account (if needed)
- [ ] Create new public repository
- [ ] Clone repository locally or upload files via web
- [ ] Upload files to repository:
  - [ ] index.html
  - [ ] dashboard.html
  - [ ] app.js
  - [ ] README.md
  - [ ] DEPLOYMENT_GUIDE.md

### Phase 4: GitHub Pages Deployment
- [ ] Go to Repository Settings
- [ ] Find "Pages" section
- [ ] Select 'main' branch as source
- [ ] Select '/ (root)' folder
- [ ] Save and wait 1-2 minutes
- [ ] Access site at: https://YOUR_USERNAME.github.io/monk-health

### Phase 5: Testing
- [ ] Access login page
- [ ] Test login with demo credentials (monk / health123)
- [ ] Add health data
- [ ] Add food items
- [ ] Add expenses
- [ ] Check calculations
- [ ] View dashboard
- [ ] Check charts
- [ ] Verify data persistence
- [ ] Logout and login again

---

## 🔧 CONFIGURATION VARIABLES

### In GoogleAppsScript.gs

```javascript
// EDIT THESE BEFORE DEPLOYMENT:

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
// Copy from: https://docs.google.com/spreadsheets/d/[THIS_ID]/edit

const VALID_USERS = {
    'monk': 'health123',        // Demo user - CHANGE FOR PRODUCTION!
    'username': 'password',     // Add more users
    'john': 'john123',
    'jane': 'jane456'
};
```

### In index.html

```javascript
// Line ~180 - EDIT THIS WITH YOUR DEPLOYMENT URL:

const response = await fetch('YOUR_GAS_WEBAPP_URL_HERE', {

// Change to:

const response = await fetch('https://script.google.com/macros/d/DEPLOYMENT_ID/userweb', {
```

### In app.js (Optional Customization)

```javascript
// Default goal values:
goals: {
    targetWeight: 75,           // kg
    dailyStepsGoal: 10000,      // steps
    budgetLimit: 500,           // ₹
    targetCalories: 2000        // calories
}

// Calorie estimation factors:
const calorieFactors = {
    homeCooked: 1.5,   // 1.5 cal per gram
    outsideFood: 2.0   // 2.0 cal per gram
};
```

---

## 📍 KEY URLs & IDs TO COLLECT

Create a document and fill these in:

```
PROJECT: Monk Health by Kiran Kumar
Date Created: _______________
User: _______________

GOOGLE SETUP:
Spreadsheet URL: _________________________________
Spreadsheet ID: _________________________________
Apps Script Project ID: _________________________________
Deployment URL: _________________________________

GITHUB SETUP:
GitHub Username: _________________________________
Repository URL: _________________________________
GitHub Pages URL: _________________________________
(Should be: https://[username].github.io/monk-health)

CREDENTIALS:
Demo User ID: monk
Demo Password: health123
(Change these after first test!)

NOTES:
_________________________________________________
_________________________________________________
```

---

## 🧪 TESTING CHECKLIST

### Authentication Test
```
1. Go to GitHub Pages URL
2. Try invalid credentials → Should show error
3. Login with: monk / health123 → Should redirect to dashboard
4. Should see your user initial in top right
```

### Health Tracker Test
```
1. Go to "Add Entry"
2. Fill in:
   - Date: Today
   - Wake-up Time: 6:30 AM
   - Sleep Time: 10:30 PM (yesterday)
   - HIIT: 30 min
   - Cardio: 20 min
   - Steps: 8500
   - Water: 2.5 L
   - Weight: 75.5 kg
3. Check auto-calculated fields:
   - Sleep Duration should show ~8h
   - Total Active Minutes should show 50
4. Submit form
```

### Food Tracker Test
```
1. In same form, add food:
   - Name: Chicken Rice
   - Time: 12:30
   - Category: Lunch
   - Type: Home Cooked
   - Quantity: 200g
2. Check auto-calculation:
   - Calories should be ~300 (200g × 1.5 cal/gram)
3. Add another food item
4. Check "Daily Total Calories" auto-updates
```

### Expense Tracker Test
```
1. Add expense:
   - Amount: 100
   - Category: Food
   - Time: 12:30
   - Description: Coffee
2. Add another expense:
   - Amount: 250
   - Category: Groceries
3. Check "Daily Total Spent" shows 350
4. Submit form
```

### Dashboard Test
```
1. Click "Dashboard" in sidebar
2. Check stat cards show updated data:
   - Today's Steps: 8500
   - Calories Intake: should show total
   - Sleep Duration: 8h
   - Daily Spending: ₹350
   - Weight: 75.5
   - Water Intake: 2.5
3. Check progress bars fill appropriately
4. Read smart insights section
```

### Charts Test
```
1. Click "Data Visualization" in sidebar
2. Add data for several days first (important!)
3. Check each chart loads:
   - Weight Progress (30-day line)
   - Steps Trend (7-day bar)
   - Calories Intake (7-day line)
   - Expense Breakdown (pie)
   - Sleep Tracking (radar)
```

### Goals Test
```
1. Click "Goals" in sidebar
2. Update values:
   - Target Weight: 70 kg
   - Daily Steps: 12000
   - Budget Limit: 600
   - Target Calories: 2200
3. Click "Save Goals"
4. Go back to Dashboard
5. Verify progress bars use new goals
```

### Data Persistence Test
```
1. Add some data
2. Go to Dashboard
3. Logout
4. Login again
5. Check data is still there
6. Go back to Add Entry
7. Data should be empty for new entry
8. Go to Dashboard
9. Previous data should still show
```

---

## 🚨 COMMON SETUP MISTAKES

| Mistake | Solution |
|---------|----------|
| Deployment URL not updated in index.html | Copy full URL from Google Apps Script deployment |
| Spreadsheet ID wrong in GoogleAppsScript.gs | Double-check: https://docs.google.com/spreadsheets/d/**[THIS_PART]**/edit |
| Google Apps Script not deployed as Web App | Go to Deploy menu, select "Web app", set to "Anyone" |
| GitHub Pages not enabled | Settings → Pages → Select branch and folder |
| Charts not loading | Make sure you've entered at least 7 days of data |
| Login fails with demo credentials | Check that Google Apps Script is deployed and authorization is complete |
| Data not saving to Sheets | Verify Spreadsheet ID in GoogleAppsScript.gs matches actual sheet |

---

## 📞 SUPPORT RESOURCES

### Check These When Stuck:

1. **Browser Console** (Press F12)
   - Look for red error messages
   - Check network tab for failed requests
   - Copy full error message

2. **Google Apps Script Logs** 
   - Go to your Apps Script project
   - Click View → Executions
   - Check for errors from recent runs

3. **Google Sheets**
   - Manually check your spreadsheet
   - Verify three sheets exist: Health_Data, Food_Data, Expense_Data
   - Check if data is being added

4. **GitHub Pages Status**
   - Go to Repository → Settings → Pages
   - Check build status
   - Wait a few minutes if deployment just started

---

## 🔐 SECURITY CHECKLIST FOR PRODUCTION

Before sharing with others:

- [ ] Change all demo credentials in GoogleAppsScript.gs
- [ ] Use strong passwords (mix of uppercase, lowercase, numbers, symbols)
- [ ] Restrict Google Apps Script deployment to specific users only
- [ ] Enable 2FA on Google account
- [ ] Enable 2FA on GitHub account
- [ ] Set up regular backup of Sheets data
- [ ] Review Google Apps Script code for any vulnerabilities
- [ ] Test access restrictions
- [ ] Document all usernames and passwords securely
- [ ] Consider using Google Form for more users instead of hardcoding

---

## 📚 FILE MANIFEST

What each file does:

### index.html
- Login page
- Motivational quotes carousel
- Authentication form
- Calls Google Apps Script on submit

### dashboard.html
- Main application interface
- Sidebar navigation
- Dashboard view with stats
- Add Entry form with 3 sections
- Visualization charts
- Goals management

### app.js
- All frontend JavaScript logic
- Form validation and submission
- Data management (localStorage)
- Chart initialization
- Auto-calculations
- Navigation between views
- 2000+ lines of functionality

### GoogleAppsScript.gs
- Authentication API
- Spreadsheet CRUD operations
- Data validation
- Query functions
- Sheet creation/management
- 400+ lines of backend logic

### DEPLOYMENT_GUIDE.md
- Step-by-step setup instructions
- Troubleshooting guide
- Customization examples
- Feature explanations

### README.md
- Project overview
- Feature list
- Tech stack
- Quick start guide
- FAQ
- Philosophy

---

## ⏱️ ESTIMATED TIMELINE

- Setting up Google Sheets & Apps Script: **5-10 minutes**
- Creating GitHub repo & uploading files: **5 minutes**
- Enabling GitHub Pages: **5 minutes**
- Configuration & testing: **10-15 minutes**

**Total: ~25-40 minutes**

---

## ✨ NEXT STEPS AFTER SETUP

1. **Personalize**
   - Change default goals to match your targets
   - Add real user accounts
   - Customize motivational messages

2. **Start Using**
   - Add daily entries consistently
   - Review dashboard daily
   - Check insights and adjust goals

3. **Build Habits**
   - Track for 30 days to see patterns
   - Review weekly progress
   - Celebrate milestones

4. **Optimize**
   - Adjust calorie factors based on accuracy
   - Refine budget categories
   - Set more ambitious goals as you progress

---

## 🎯 SUCCESS METRICS

You'll know setup is successful when:

✅ Login page loads with demo credentials
✅ Can login and see dashboard
✅ Can add health, food, and expense data
✅ Data persists after logout/login
✅ Charts display after multiple days of data
✅ Goals are customizable
✅ All calculations work correctly

---

## 💬 FINAL NOTES

- **Start simple:** Enter data consistently before advanced features
- **Backup regularly:** Download Sheets data weekly
- **Share wisely:** If sharing, create separate accounts
- **Stay disciplined:** The app works best with daily input
- **Review progress:** Check trends weekly, not just daily
- **Adjust goals:** Modify targets as you improve

---

**You're all set! 🚀 Start your Monk Health journey today.**

*"Small steps daily create big results."*
