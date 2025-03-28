# SkillSwap Project

## Running the Project

### Prerequisites
Ensure you have the following installed:
- Node.js (latest stable version)
- MongoDB (local or cloud-based)
- Postman (for API testing, optional)

### Setup
# Project Setup Guide

## 1. Clone the Repository
```bash
git clone https://github.com/CMPN-CODECELL/Syrus2025_OpenInnovation_CaffeineCoder.git
cd Syrus2025_OpenInnovation_CaffeineCoder
```

## 2. Backend Setup
```bash
cd Backend
npm install
```
- Create a `.env` file in the `Backend` directory and add:
  ```plaintext
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```
- Start the backend server:
  ```bash
  npm start
  ```
  or for development:
  ```bash
  npm run dev
  ```

## 3. Frontend Setup
```bash
cd ../Frontend
npm install
```
- Start the frontend:
  ```bash
  npm start
  ```
  or for development:
  ```bash
  npm run dev
  ```

## 4. Streamlit App Setup
```bash
cd ../streamlit
pip install -r requirements.txt
```
- Run the Streamlit app:
  ```bash
  streamlit run app.py
  ```

## 5. Access the Application
- **Backend API**: `http://localhost:5000/`
- **Frontend UI**: `http://localhost:3000/`
- **Streamlit App**: Runs on a default Streamlit port (e.g., `http://localhost:8501/`)


---

## Suggestions from Mentor

### Issue: Misuse of SkillSwap Sessions
**Problem:** Two users may join a SkillSwap session, bypass actual skill-sharing, and exploit the system to earn badges.

**Proposed Solutions:**
- **Verification Mechanism:** Participants submit proof of learning (e.g., a quiz, summary, or recorded session snippet).
- **Session Monitoring:** Periodic check-ins to ensure active participation.
- **Activity Tracking:** AI-based analysis of discussions to detect meaningful engagement.


### Rating System Based on Sentiment Analysis
**Feature:** Implement a sentiment-based rating system for learners.

**How it Works:**
1. **Real-time sentiment analysis** during a session using Natural Language Processing (NLP).
2. Learners’ feedback and engagement levels determine their rating.
3. Ratings influence reputation and future pairing in SkillSwap.
5. Encourages high-quality teaching and learning.

**Tools & Technologies:**
- **Sentiment Analysis:** NLP models (TextBlob, VADER, or custom ML models).
- **Real-time Feedback:** WebSockets or periodic survey prompts.
- **Rating Calculation:** Weighted average based on session engagement and feedback.

This system ensures learners receive accurate ratings and incentivizes genuine knowledge exchange.
