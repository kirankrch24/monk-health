# Monk Health by Kiran Kumar - Deployment Guide

## 📋 Overview

This is a complete self-improvement and health tracking web application with:
- Modern dark-themed UI
- Health, food, and expense tracking
- Data visualization with charts
- Goal setting and progress tracking
- Secure authentication

---

## 🛠️ Prerequisites

1. **GitHub Account** - For hosting the frontend
2. **Google Account** - For Google Apps Script backend and Sheets database
3. **Basic knowledge** of:
   - Git/GitHub
   - Google Apps Script
   - Google Sheets

---

## 📦 Project Structure

```
monk-health/
├── index.html              # Login page
├── dashboard.html          # Main application
├── app.js                  # Frontend logic
├── GoogleAppsScript.gs     # Backend API
└── README.md              # This file
```

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### STEP 1: Prepare the Google Backend

#### 1.1 Create a Google Spreadsheet
1. Go to https://sheets.google.com
2. Click "Create" → "New spreadsheet"
3. Name it: **"Monk Health Database"**
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

#### 1.2 Create Google Apps Script
1. In your Google Sheet, go to **Tools** → **Script editor**
2. Delete the default code
3. Copy and paste the entire content from **GoogleAppsScript.gs**
4. Replace `'YOUR_SPREADSHEET_ID_HERE'` with your Spreadsheet ID
5. **Optional:** Add more users to the `VALID_USERS` object:
   ```javascript
   const VALID_USERS = {
       'monk': 'health123',
       'yourname': 'yourpassword',
       // Add more as needed
   };
   ```

#### 1.3 Deploy as Web App
1. Click **Deploy** (top right) → **New deployment**
2. Click the settings icon, select "Web app"
3. **Execute as:** Your account
4. **Who has access:** Anyone
5. Click **Deploy**
6. Click **Authorize access** when prompted
7. **Copy the deployment URL** (you'll need this):
   ```
   https://script.google.com/macros/d/YOUR_DEPLOYMENT_ID/userweb
   ```

---

### STEP 2: Set Up Frontend Files

#### 2.1 Update the Web App URL
In **index.html**, find this line (around line 180):
```javascript
const response = await fetch('YOUR_GAS_WEBAPP_URL_HERE', {
```

Replace `'YOUR_GAS_WEBAPP_URL_HERE'` with your deployment URL from Step 1.3

#### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Create a new public repository: **monk-health**
3. Check "Add a README file"
4. Click **Create repository**

#### 2.3 Clone and Add Files
```bash
git clone https://github.com/YOUR_USERNAME/monk-health.git
cd monk-health

# Copy all files to this directory:
# - index.html
# - dashboard.html
# - app.js
```

Or you can:
1. Go to your repository on GitHub
2. Click **Add file** → **Upload files**
3. Upload: `index.html`, `dashboard.html`, `app.js`

#### 2.4 Enable GitHub Pages
1. Go to your repository → **Settings**
2. Scroll to **"Pages"** section
3. **Source:** Select `main` branch
4. **Folder:** Select `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site URL: `https://YOUR_USERNAME.github.io/monk-health`

---

### STEP 3: Test the Application

#### 3.1 Access the App
- Go to: `https://YOUR_USERNAME.github.io/monk-health`

#### 3.2 Login
- Demo credentials shown on login page:
  - **ID:** monk
  - **Password:** health123

#### 3.3 Test Features
1. Add health data (steps, sleep, weight, etc.)
2. Add food items with auto-calculated calories
3. Add expenses and track budget
4. View dashboard metrics
5. Check data visualization charts
6. Set and update goals

---

## 🔐 Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

1. **Change demo credentials:**
   - Update `VALID_USERS` in GoogleAppsScript.gs with real passwords
   - Use strong, unique passwords

2. **Restrict deployment access:**
   - In Google Apps Script, change deployment settings from "Anyone" to specific users

3. **Backup data regularly:**
   - Download your Sheets data regularly
   - Set up version history in Google Drive

4. **Use HTTPS only:**
   - GitHub Pages uses HTTPS by default ✅
   - Don't use HTTP connections

---

## 💾 Data Storage

### Google Sheets Structure

Three sheets are automatically created:

#### Health_Data
- Stores daily health metrics
- Columns: Date, Wake-up Time, Sleep Time, Steps, Weight, Sleep Duration, etc.

#### Food_Data
- Stores food intake records
- Columns: Date, Food Item, Time, Category, Calories, Sugar Level, etc.

#### Expense_Data
- Stores expense records
- Columns: Date, Amount, Category, Time, Description, etc.

---

## 📊 Features Explained

### Dashboard
- Daily stats cards showing steps, calories, sleep, spending
- Progress bars toward daily goals
- Smart insights based on your data

### Add Entry (Big Daily Form)
**Section 1: Health Tracker**
- Automatic sleep duration calculation
- Exercise tracking (HIIT + Cardio)
- Weight and water intake

**Section 2: Food Tracker**
- Auto-calculated calories based on quantity and type
- Sugar level estimation
- Health assessment suggestions
- Add multiple food items per day

**Section 3: Expense Tracker**
- Budget tracking by category
- Automatic daily total calculation
- Financial awareness

### Data Visualization
- Weight progress (30-day line chart)
- Steps trend (7-day bar chart)
- Calories intake (7-day line chart)
- Expense breakdown (pie chart)
- Sleep tracking (radar chart)

### Goals Section
- Set personalized targets:
  - Target weight
  - Daily steps goal
  - Daily budget limit
  - Target calories

---

## 🔧 Customization

### Change Colors
Edit the CSS in `index.html` and `dashboard.html`:
```css
/* Primary colors */
--bg-dark: #121212;      /* Background */
--bg-card: #1e1e1e;      /* Cards */
--text-light: #ffffff;   /* Text */
--accent: #cccccc;       /* Accents */
```

### Change Goal Defaults
In `app.js`:
```javascript
goals: {
    targetWeight: 75,      // kg
    dailyStepsGoal: 10000,
    budgetLimit: 500,      // ₹
    targetCalories: 2000
}
```

### Add More Users
In `GoogleAppsScript.gs`:
```javascript
const VALID_USERS = {
    'monk': 'health123',
    'john': 'password123',
    'jane': 'password456'
};
```

### Change Currency
Replace `₹` with your currency symbol throughout the code.

---

## 🐛 Troubleshooting

### Issue: "Connection error" on login
- **Solution:** Check your Google Apps Script deployment URL
- Verify the URL in index.html matches the deployed endpoint
- Make sure you've authorized the script

### Issue: Data not saving
- **Solution:** Check Google Sheets has created the three sheets
- Verify your Spreadsheet ID is correct in GoogleAppsScript.gs
- Check browser console (F12) for errors

### Issue: Charts not displaying
- **Solution:** Make sure you have data entered first
- Charts.js library loads from CDN - check internet connection
- Try refreshing the page

### Issue: Can't access GitHub Pages
- **Solution:** Wait 1-2 minutes after enabling Pages
- Clear browser cache (Ctrl+Shift+Delete)
- Verify `index.html` is in the repository root

### Issue: Login not working
- **Solution:** Demo credentials are `monk` / `health123`
- Check browser's developer console for errors
- Verify Google Apps Script is deployed as Web App

---

## 📱 Mobile Optimization

The app is fully responsive:
- Desktop: Full sidebar navigation
- Tablet: Optimized layout
- Mobile: Touch-friendly interface

---

## 🎯 Ikigai Philosophy Integration

The app embodies the Ikigai principle: "Eat less, walk more, live better."

Features that support this:
- Daily step tracking motivation
- Calorie awareness for conscious eating
- Budget tracking for mindful spending
- Sleep monitoring for health
- Goal setting for purposeful living

---

## 📈 Future Enhancements

Consider adding:
1. **Photo food logging** - Snap a photo of meals
2. **Wearable integration** - Sync with fitness trackers
3. **AI recommendations** - Personalized suggestions
4. **Export reports** - Monthly PDF summaries
5. **Social features** - Share progress with friends
6. **Reminders** - Push notifications for goals
7. **Dark mode toggle** - Light theme option
8. **Multi-user support** - Family tracking

---

## 📞 Support & Issues

For help:
1. Check the **Troubleshooting** section above
2. Review browser console (F12 → Console tab)
3. Check Google Apps Script logs (Run → Execution log)
4. Verify all URLs and IDs are correct

---

## 📄 License & Attribution

This application is created with the philosophy:
**"Small steps daily create big results."**

Feel free to customize and share. Remember to:
- Respect user privacy
- Secure authentication credentials
- Backup data regularly

---

## ✨ Quick Start Checklist

- [ ] Create Google Spreadsheet
- [ ] Create Google Apps Script
- [ ] Deploy as Web App
- [ ] Copy deployment URL
- [ ] Update URL in index.html
- [ ] Create GitHub repository
- [ ] Upload files to GitHub
- [ ] Enable GitHub Pages
- [ ] Test login with demo credentials
- [ ] Add sample data
- [ ] View charts and dashboard
- [ ] Set personal goals
- [ ] Start tracking!

---

**Monk Health by Kiran Kumar**
*Eat less. Walk more. Live better.*

**Created:** 2026
**Version:** 1.0
