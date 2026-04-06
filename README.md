# Monk Health by Kiran Kumar

> **Eat Less. Walk More. Live Better.**

A modern, responsive web application for personal health tracking, inspired by Ikigai philosophy. Track your daily health metrics, food intake, expenses, and progress toward your goals.

![Version](https://img.shields.io/badge/version-1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-production-brightgreen)

---

## ✨ Features

### 📊 Dashboard
- **Daily Stats Cards** - Steps, calories, sleep, spending at a glance
- **Progress Bars** - Visual tracking toward goals
- **Smart Insights** - AI-powered suggestions based on your data
- **Motivational Messages** - Daily inspiration for consistency

### 🏃 Health Tracker
- Track wake-up and sleep times (auto-calculate sleep duration)
- Log exercises (HIIT + Cardio)
- Record daily steps, water intake, and weight
- Optional blood pressure monitoring

### 🍽️ Food Tracker
- Log food items with auto-calculated calories
- Meal type classification (Breakfast/Lunch/Dinner/Snack)
- Food source tracking (Home Cooked/Outside Food)
- Sugar level and health assessment
- Track avoidable items

### 💰 Expense Tracker
- Log daily expenses by category
- Automatic daily total calculation
- Budget monitoring
- Financial awareness and discipline

### 📈 Data Visualization
- **Weight Progress** - 30-day line chart
- **Steps Trend** - 7-day bar chart  
- **Calories Intake** - 7-day line chart
- **Expense Breakdown** - Pie chart by category
- **Sleep Tracking** - Radar chart

### 🎯 Goals Management
- Set target weight
- Daily steps goal
- Daily budget limit
- Target daily calories
- Visual progress tracking

### 🔐 Security
- Secure authentication system
- User-specific data isolation
- Credentials validated server-side
- No sensitive data in frontend

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (Vanilla)** - No dependencies needed
- **Chart.js** - Beautiful data visualization

### Backend
- **Google Apps Script** - Serverless API
- **Google Sheets** - Data storage

### Hosting
- **GitHub Pages** - Static file hosting
- **Google Drive** - Database

**All free!** ✅

---

## 🚀 Quick Start

### 1. Prerequisites
- GitHub account
- Google account
- 15 minutes of setup time

### 2. Basic Setup

```bash
# 1. Create Google Spreadsheet
# Visit: https://sheets.google.com

# 2. Add Google Apps Script
# Copy GoogleAppsScript.gs content to Script Editor

# 3. Create GitHub Repository
# Visit: https://github.com/new

# 4. Upload Files
# index.html
# dashboard.html  
# app.js

# 5. Enable GitHub Pages
# Settings → Pages → Select 'main' branch

# 6. Access Your App
# https://YOUR_USERNAME.github.io/monk-health
```

### 3. Login Credentials (Demo)
```
ID: monk
Password: health123
```

**👉 See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions**

---

## 📱 Screenshots & Usage

### Login Page
```
╔════════════════════════════════╗
║  Monk Health by Kiran Kumar    ║
║  Eat less. Walk more.          ║
║  Live better.                  ║
║                                ║
║  ┌────────────────────────┐   ║
║  │ Login                  │   ║
║  │ ID:    [_____________] │   ║
║  │ Pass:  [_____________] │   ║
║  │         [Enter]        │   ║
║  └────────────────────────┘   ║
╚════════════════════════════════╝
```

### Dashboard View
```
Daily Stats:
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ 👣 Steps    │ │ 🔥 Calories │ │ 😴 Sleep    │
│ 8,542       │ │ 1,820 cal   │ │ 7.5h        │
│ Goal: 10k   │ │ Target: 2k  │ │ Target: 8h  │
└─────────────┘ └─────────────┘ └─────────────┘

Smart Insights:
• You walked 1,458 fewer steps than your goal
• Consider healthier options: 1 unhealthy item consumed
• Budget exceeded! Spent ₹650 vs limit ₹500
```

### Add Entry Form
```
Section 1: Health Tracker
Date: [YYYY-MM-DD]
Wake-up Time: [HH:MM]
Sleep Time: [HH:MM]
Steps: [____]
Water (L): [____]
Weight (kg): [____]

Section 2: Food Tracker
+ [Add Food Item]
  Item: [Chicken Rice]
  Time: [12:30]
  Type: [Home Cooked]
  Qty: [200g]
  Calories: [300] (auto)

Section 3: Expense Tracker
+ [Add Expense]
  Amount: [₹100]
  Category: [Food]
  Description: [Coffee]

[Submit]
```

---

## 📊 Data Structure

### Google Sheets - Three Automated Sheets

**Health_Data Sheet**
```
User ID | Date | Wake-up | Sleep | HIIT | Cardio | Steps | Weight | ...
monk    | 2026-04-06 | 6:30 | 22:00 | 30 | 20 | 8542 | 75.5 | ...
```

**Food_Data Sheet**
```
User ID | Date | Item | Time | Category | Type | Qty | Calories | ...
monk    | 2026-04-06 | Chicken Rice | 12:30 | Lunch | Home | 200 | 300 | ...
```

**Expense_Data Sheet**
```
User ID | Date | Amount | Category | Time | Description
monk    | 2026-04-06 | 100 | Food | 12:30 | Coffee
```

---

## 🎯 Usage Examples

### Track a Complete Day

```
Morning:
- Wake-up at 6:30 AM
- Drank 0.5L water

Breakfast: 7:00 AM
- Oatmeal (50g) - 180 cal

Exercise: 8:00 AM
- 20 min HIIT

Mid-morning: 10:00 AM
- Coffee (150 cal) - Budget: ₹100

Lunch: 12:30 PM
- Chicken Rice (200g) - 300 cal - Outside Food

Afternoon:
- 8,542 steps walked
- Drank 1.5L water

Expenses:
- Coffee: ₹100 (Necessary)
- Groceries: ₹250 (Food)

Evening: 10:00 PM
- Sleep at 10:00 PM
- Weight: 75.5 kg

Sleep: 6:30 AM (8 hours)
```

### View Progress
- Dashboard shows all metrics updated
- Charts display 7-day and 30-day trends
- Goals tab shows progress toward targets
- Insights flag areas of concern

---

## 🎨 Design Philosophy

### Dark Minimal Theme
- **Background:** Dark Grey (#121212)
- **Cards:** Medium Grey (#1e1e1e)
- **Text:** White (#ffffff)
- **Accents:** Light Grey (#cccccc)

### Clean & Modern
- Minimal distractions
- Focus on data
- Smooth animations
- Professional appearance

### Fully Responsive
- Desktop: Full featured
- Tablet: Optimized layout
- Mobile: Touch-friendly UI

---

## 🔒 Security Features

✅ **Server-side Authentication** - Credentials validated on backend
✅ **HTTPS** - GitHub Pages uses SSL/TLS
✅ **No Hardcoded Passwords** - Stored only in Google Apps Script
✅ **Session Tokens** - Temporary access tokens
✅ **User Data Isolation** - Each user sees only their own data
✅ **Input Validation** - All inputs validated

---

## 📖 Documentation

- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Complete setup instructions
- **[CODE_COMMENTS](./app.js)** - Inline code documentation
- **[GoogleAppsScript.gs](./GoogleAppsScript.gs)** - Backend API documentation

---

## 🔧 Customization

### Change Default Goals
Edit `app.js`:
```javascript
goals: {
    targetWeight: 75,
    dailyStepsGoal: 10000,
    budgetLimit: 500,
    targetCalories: 2000
}
```

### Add More Users
Edit `GoogleAppsScript.gs`:
```javascript
const VALID_USERS = {
    'monk': 'health123',
    'yourname': 'yourpassword'
};
```

### Change Colors
Edit CSS in `index.html` and `dashboard.html`

### Change Currency
Replace `₹` throughout the code

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Check Google Apps Script deployment URL |
| Data not saving | Verify Spreadsheet ID in GoogleAppsScript.gs |
| Charts not showing | Ensure you have data entered first |
| Page not loading | Check GitHub Pages is enabled |

**See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#-troubleshooting) for detailed solutions**

---

## 📈 Future Roadmap

- [ ] Photo food logging
- [ ] Wearable device integration  
- [ ] AI meal recommendations
- [ ] Monthly PDF reports
- [ ] Family member sharing
- [ ] Push notifications
- [ ] Light theme option
- [ ] Advanced analytics

---

## 💡 Philosophy

This application embodies the Ikigai philosophy and the simple truth:

### **"Small steps daily create big results."**

Track your health with discipline. Monitor your finances with awareness. Build habits that last.

The monk approach to health:
- **Eat Less** - Conscious food choices
- **Walk More** - Daily movement
- **Live Better** - Holistic wellness

---

## 📄 License

This project is open source and available for personal and commercial use.

---

## 👨‍💻 Created By

**Kiran Kumar**

*A personal project to embody health, discipline, and mindful living.*

---

## 🙏 Acknowledgments

- Built with vanilla JavaScript (no frameworks)
- Powered by Google Apps Script
- Hosted on GitHub Pages
- Inspired by Ikigai philosophy
- Chart.js for beautiful visualizations

---

## ❓ FAQ

**Q: Is my data safe?**
A: Yes. Your data is stored in your Google Sheets, which you control. No data is shared with third parties.

**Q: Can I use this offline?**
A: No, it requires internet for authentication and data sync. Future versions may add offline capability.

**Q: How much does it cost?**
A: Completely free! Uses free tiers of Google Sheets and GitHub Pages.

**Q: Can multiple people use one account?**
A: Yes, but they'll share the same data. Create separate accounts for separate tracking.

**Q: Can I export my data?**
A: Yes, download from Google Sheets anytime.

**Q: Is there a mobile app?**
A: Not yet. The web app is fully responsive and works on mobile.

---

**Visit Your App:** `https://YOUR_USERNAME.github.io/monk-health`

**Follow the deployment guide and start your health journey today!** 🚀

---

*Last Updated: April 2026*
*Version: 1.0 Stable*
# monk-health
