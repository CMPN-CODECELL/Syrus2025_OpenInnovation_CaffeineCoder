# SkillSwap Project

## Running the Project

### Prerequisites
Ensure you have the following installed:
- Node.js (latest stable version)
- MongoDB (local or cloud-based)
- Postman (for API testing, optional)

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/skillswap.git
   cd skillswap
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the required environment variables:
     ```plaintext
     PORT=3000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     ```
4. Start the server:
   ```bash
   npm start
   ```
   or for development:
   ```bash
   npm run dev
   ```
5. The API will be running on `http://localhost:3000/`

---

## Suggestions from Mentor

### Issue: Misuse of SkillSwap Sessions
**Problem:** Two users may join a SkillSwap session, bypass actual skill-sharing, and exploit the system to earn badges.

**Proposed Solutions:**
- **Verification Mechanism:** Participants submit proof of learning (e.g., a quiz, summary, or recorded session snippet).
- **Cooldown Period:** A minimum time spent in a session before earning badges.
- **Session Monitoring:** Periodic check-ins to ensure active participation.
- **Activity Tracking:** AI-based analysis of discussions to detect meaningful engagement.
- **Session Reporting:** Users can flag suspicious activities for review.

### Rating System Based on Sentiment Analysis
**Feature:** Implement a sentiment-based rating system for learners.

**How it Works:**
1. **Real-time sentiment analysis** during a session using Natural Language Processing (NLP).
2. Learners’ feedback and engagement levels determine their rating.
3. **Voice-based sentiment detection** (if applicable) for more accurate evaluation.
4. Ratings influence reputation and future pairing in SkillSwap.
5. Encourages high-quality teaching and learning.

**Tools & Technologies:**
- **Sentiment Analysis:** NLP models (TextBlob, VADER, or custom ML models).
- **Real-time Feedback:** WebSockets or periodic survey prompts.
- **Rating Calculation:** Weighted average based on session engagement and feedback.

This system ensures learners receive accurate ratings and incentivizes genuine knowledge exchange.
