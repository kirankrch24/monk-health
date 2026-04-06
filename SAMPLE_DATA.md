# Sample Data & Usage Examples

This file contains sample data to help you understand how to use Monk Health effectively.

---

## 📋 Sample Daily Entry

### Date: April 6, 2026

#### SECTION 1: HEALTH TRACKER

```
Date: 2026-04-06
Wake-up Time: 2026-04-06 06:30
Sleep Time: 2026-04-05 22:30

Exercise:
- HIIT Duration: 30 minutes
- Cardio Duration: 20 minutes
- Total Active Minutes: 50 (auto-calculated)

Daily Activity:
- Steps Walked: 8,542
- Water Intake: 2.5 liters
- Weight: 75.5 kg

Health Info:
- Sleep Duration: 8 hours (auto-calculated)
- Blood Pressure: 120/80
```

**Auto-calculated values:**
- Sleep Duration = 22:30 to 06:30 = 8 hours ✓
- Total Active Minutes = 30 + 20 = 50 minutes ✓

---

#### SECTION 2: FOOD TRACKER

**Food Item 1: Breakfast**
```
Food Item Name: Oatmeal with berries
Time of Eating: 07:00
Category: Breakfast
Type: Home Cooked
Quantity: 50 grams
Calories: 75 (auto: 50g × 1.5 cal/gram)
Sugar Level Estimate: Medium
Healthy or Not: Yes - Healthy
Could it be avoided?: No
Notes: High fiber, good energy start
```

**Food Item 2: Mid-morning Snack**
```
Food Item Name: Coffee with milk
Time of Eating: 10:00
Category: Snack
Type: Outside Food
Quantity: 200 grams (cup)
Calories: 400 (auto: 200g × 2.0 cal/gram)
Sugar Level Estimate: Medium
Healthy or Not: No - Unhealthy
Could it be avoided?: Yes
Notes: Added 2 sugars
```

**Food Item 3: Lunch**
```
Food Item Name: Grilled Chicken with Rice
Time of Eating: 12:30
Category: Lunch
Type: Home Cooked
Quantity: 300 grams
Calories: 450 (auto: 300g × 1.5 cal/gram)
Sugar Level Estimate: Low
Healthy or Not: Yes - Healthy
Could it be avoided?: No
Notes: Perfectly balanced meal
```

**Food Item 4: Afternoon Snack**
```
Food Item Name: Apple
Time of Eating: 15:00
Category: Snack
Type: Home Cooked
Quantity: 100 grams
Calories: 150 (auto: 100g × 1.5 cal/gram)
Sugar Level Estimate: High
Healthy or Not: Yes - Healthy
Could it be avoided?: No
Notes: Natural sugars, good nutrition
```

**Food Item 5: Dinner**
```
Food Item Name: Lentil Curry with Chapati
Time of Eating: 19:30
Category: Dinner
Type: Home Cooked
Quantity: 250 grams
Calories: 375 (auto: 250g × 1.5 cal/gram)
Sugar Level Estimate: Low
Healthy or Not: Yes - Healthy
Could it be avoided?: No
Notes: Protein rich, satisfying
```

**Daily Total Calories: 1,450 kcal** (Auto-calculated)
- Below target of 2,000 kcal ✓ Good progress toward healthy eating goal

---

#### SECTION 3: EXPENSE TRACKER

**Expense 1: Morning Coffee**
```
Amount Spent: ₹100
Category: Food
Time: 10:00
Description: Cappuccino with extra shot
```

**Expense 2: Lunch at Restaurant**
```
Amount Spent: ₹350
Category: Food
Time: 12:30
Description: Chicken biryani
```

**Expense 3: Afternoon Snack**
```
Amount Spent: ₹50
Category: Food
Time: 15:00
Description: Apple from fruit vendor
```

**Expense 4: Transportation**
```
Amount Spent: ₹100
Category: Necessary
Time: 08:00
Description: Auto-rickshaw to gym
```

**Daily Total Spent: ₹600** (Auto-calculated)
- Over budget of ₹500 by ₹100 ⚠️

---

## 📊 Dashboard Display (After Above Entry)

### Stat Cards Would Show:

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 👣 Today's Steps │  │ 🔥 Calories      │  │ 😴 Sleep         │
│                  │  │ Intake           │  │ Duration         │
│ 8,542            │  │ 1,450            │  │ 8h               │
│                  │  │ Goal: 10,000     │  │ Goal: 8h         │
│ [████████░░]85%  │  │ Goal: 2,000      │  │ [██████████]100% │
│                  │  │ [███░░░░░░░]73%  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ 💰 Daily Spend   │  │ ⚖️ Weight        │  │ 💧 Water Intake  │
│ ₹600             │  │ 75.5 kg          │  │ 2.5 liters       │
│ Budget: ₹500     │  │                  │  │ Target: 3L       │
│ [███████████░]120%│ │                  │  │ [████████░░]83%  │
│ Over by ₹100     │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### Smart Insights Would Show:

```
📋 Quick Insights

• ✓ Excellent sleep duration: 8h
  You met your 8-hour sleep goal!

• ⚠️ High sugar intake detected: 2 items with high sugar
  (Coffee and Apple - consider alternatives)

• ⚠️ Budget exceeded! Spent ₹600 vs limit ₹500
  Over by ₹100 - Watch your food spending tomorrow

• 👣 You walked 1,458 fewer steps than your goal
  Try to add an evening walk to reach 10,000 steps

• 💚 Great nutrition! Only 1 unhealthy item
  Continue making smart food choices
```

---

## 📈 Weekly Data Examples

### Last 7 Days - Health Progression

```
Date    | Steps | Weight | Sleep | Daily Spend
--------|-------|--------|-------|----------
2026-04-01 | 7,200 | 76.5 kg | 6.5h | ₹450
2026-04-02 | 8,100 | 76.3 kg | 7.0h | ₹520
2026-04-03 | 9,500 | 76.0 kg | 7.5h | ₹480
2026-04-04 | 7,800 | 75.8 kg | 7.0h | ₹510
2026-04-05 | 8,300 | 75.6 kg | 7.5h | ₹490
2026-04-06 | 8,542 | 75.5 kg | 8.0h | ₹600
2026-04-07 | 9,200 | 75.2 kg | 8.0h | ₹470

7-Day Averages:
- Steps: 8,449/day (Goal: 10,000)
- Weight: 75.7 kg (Down from 76.5 - Good progress!)
- Sleep: 7.4 hours (Close to 8-hour target)
- Spending: ₹502/day (Slightly over ₹500 budget)
```

### Last 30 Days - Monthly Trend

```
Month: April 2026

Weight Trend:
76.5 kg → 75.2 kg (Lost 1.3 kg! 💪)

Steps Achievement:
- Days with 10k+ steps: 3 days
- Average daily steps: 8,200
- Best day: April 3 (9,500 steps)

Calories Pattern:
- Days under 2000 cal: 4 days
- Days over 2000 cal: 3 days
- Average: 1,820 cal/day

Budget Adherence:
- Days under budget: 5 days
- Days over budget: 2 days
- Monthly total: ₹3,520 (Target: ₹15,000)
```

---

## 🎯 Goals Configuration Examples

### Example 1: Fitness Focused Person

```
Goal 1: Target Weight
- Current: 80 kg
- Goal: 70 kg (10 kg to lose)
- Timeframe: 6 months
- Monthly target: ~1.7 kg loss

Goal 2: Daily Steps Goal
- Current average: 5,000
- Goal: 15,000 (aggressive)
- Progression: Increase by 1,000 every 2 weeks

Goal 3: Daily Budget
- Current: ₹800
- Goal: ₹600 (budget consciousness)
- Focus: Reduce food spending

Goal 4: Target Calories
- Current: 2,500
- Goal: 1,800 (calorie deficit)
- Focus: Slow, sustainable loss
```

### Example 2: Health Conscious Person

```
Goal 1: Target Weight
- Current: 70 kg
- Goal: 68 kg (maintenance with slight loss)
- Timeframe: 3 months

Goal 2: Daily Steps Goal
- Current: 8,000
- Goal: 12,000
- Reason: General fitness and cardiovascular health

Goal 3: Daily Budget
- Current: ₹600
- Goal: ₹500
- Focus: Mindful spending

Goal 4: Target Calories
- Current: 2,000
- Goal: 2,000 (maintenance)
- Focus: Balanced nutrition
```

### Example 3: Budget Conscious Person

```
Goal 1: Target Weight
- Current: 72 kg
- Goal: 71 kg (slow, steady improvement)

Goal 2: Daily Steps Goal
- Current: 7,000
- Goal: 10,000 (achievable, no gym needed)

Goal 3: Daily Budget
- Current: ₹700
- Goal: ₹400 (significant reduction)
- Focus: Home-cooked meals only

Goal 4: Target Calories
- Current: 2,100
- Goal: 1,900 (gentle reduction)
```

---

## 💡 Data Entry Tips & Tricks

### Quick Entry Shortcuts

**For Regular Activities:**
- If you always walk 8,000 steps, enter it quickly
- Same wake/sleep times? Copy previous day's entry
- Regular meals? Note them for quick future entry

**Calorie Estimation:**
- Home Cooked: 1.5 cal per gram (default)
- Outside Food: 2.0 cal per gram (oily foods)
- Adjust these factors based on accuracy over time

**Expense Categories:**
- **Necessary:** Rent, utilities, transportation, medicine
- **Extra:** Entertainment, clothes, non-essential purchases
- **Food:** All meals and snacks
- **Lifestyle:** Gym, books, hobby expenses

### Monthly Review Process

```
1. First day of month: Review previous month metrics
2. Check weight trend (up/down?)
3. Calculate average daily steps (met goals?)
4. Review spending patterns (overspent? Where?)
5. Check calorie intake (consistent or variable?)
6. Adjust next month's goals if needed
7. Start fresh with motivation
```

---

## 🔍 Sample Insights & Actions

### Insight: "High sugar intake detected"

**Common Causes:**
- Coffee with sugar
- Sugary beverages
- Desserts and sweets
- Fruits (natural sugars)
- Outside food

**Actions to Take:**
- Switch to sugar-free coffee
- Drink more water
- Choose natural fruits over processed snacks
- Reduce desserts to weekends

### Insight: "Budget exceeded"

**Common Causes:**
- Eating out too much
- Impulse purchases
- Multiple coffee runs
- Weekend spending spike

**Actions to Take:**
- Plan meals ahead
- Bring lunch from home
- Limit eating out to weekends
- Track every small expense

### Insight: "Steps below goal"

**Common Causes:**
- Sedentary work day
- Bad weather
- Traveling by vehicle
- Lack of motivation

**Actions to Take:**
- Take stairs instead of elevator
- Park far and walk
- Take evening walk
- Set hourly reminders to move

### Insight: "Sleep below 7 hours"

**Common Causes:**
- Late night work/scrolling
- Irregular sleep schedule
- Stress or anxiety
- Caffeine after 3 PM

**Actions to Take:**
- Reduce screen time 1 hour before bed
- Set consistent sleep time
- Avoid caffeine after 3 PM
- Try relaxation techniques

---

## 📱 Mobile Entry Example

### Quick mobile entry (2 minutes):

```
1. Open app on phone
2. Go to "Add Entry"
3. Date: Auto-fills today
4. Scroll down to "Steps": Enter 8500
5. Scroll to "Weight": Enter 75.5
6. Scroll to "Water": Enter 2.5
7. Add one food: Lunch rice (250g, Home)
   - Calories auto-calculate to 375
8. Add expense: Coffee (₹100, Food)
9. Hit Submit
10. Done! ✓

Total time: ~2 minutes
Data captured: Health + Food + Expense
Calculations: All automatic
```

---

## 🧮 Calculation Examples

### Sleep Duration Auto-Calculation

```
Scenario 1: Same day sleep
- Wake Time: 6:30 AM (2026-04-06 06:30)
- Sleep Time: 10:30 PM (2026-04-06 22:30)
- Duration: 8 hours ✓

Scenario 2: Sleep across days (More common)
- Wake Time: 6:30 AM (2026-04-06 06:30)
- Sleep Time: 10:30 PM (2026-04-05 22:30)
- Duration: 8 hours ✓

Scenario 3: Short sleep night
- Wake Time: 6:30 AM (2026-04-06 06:30)
- Sleep Time: 1:30 AM (2026-04-06 01:30)
- Duration: 5 hours ⚠️
```

### Calories Auto-Calculation

```
Home Cooked Factor: 1.5 calories per gram

Example 1:
- Food: Chicken Rice
- Quantity: 200g
- Calories: 200 × 1.5 = 300 cal ✓

Example 2:
- Food: Pizza
- Quantity: 150g
- Calories: 150 × 1.5 = 225 cal
- (Note: Might be higher, factor can be adjusted)

Outside Food Factor: 2.0 calories per gram

Example 3:
- Food: Burger
- Quantity: 100g
- Calories: 100 × 2.0 = 200 cal ✓

Example 4:
- Food: Fried Chicken
- Quantity: 200g
- Calories: 200 × 2.0 = 400 cal ✓
```

### Expense Total Auto-Calculation

```
Daily expenses:
1. Coffee: ₹100
2. Lunch: ₹350
3. Snack: ₹50
4. Transport: ₹100

Total: ₹100 + ₹350 + ₹50 + ₹100 = ₹600
Budget: ₹500
Status: Over by ₹100 ⚠️

Next day, if you spend:
1. Coffee: ₹80 (Saving ₹20)
2. Lunch home: ₹0 (Saving ₹350)
3. Snack: ₹40
4. Transport: ₹100

Total: ₹220
Budget: ₹500
Status: Under by ₹280 ✓ (Compensates yesterday)
```

---

## 📚 Using Sample Data

**Option 1: Manual Practice**
- Copy a sample entry
- Enter it into your app
- Watch auto-calculations
- See how dashboard updates

**Option 2: Understanding Patterns**
- Review the weekly/monthly examples
- Understand what "good" looks like
- Set realistic goals
- Plan your improvements

**Option 3: Reference**
- Keep this file nearby
- Check examples when unsure
- Use suggestions for actions
- Benchmark your data

---

## ✨ Key Takeaways

1. **Consistency matters** - Daily entries create accurate data
2. **Auto-calculations save time** - Focus on input, not math
3. **Trends over days** - One day doesn't make/break goals
4. **Small improvements add up** - Every walk, every home-cooked meal
5. **Track everything** - Even "bad" days show the pattern
6. **Adjust goals realistically** - Based on your actual data
7. **Review regularly** - Weekly and monthly analysis
8. **Celebrate wins** - Every ₹ saved and every kg lost

---

**Remember: "Small steps daily create big results."**

*Start with any one goal and build from there. You've got this! 💪*
