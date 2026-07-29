# Innovhack-SNS

An intelligent AI/ML recommendation engine that delivers personalised product suggestions based on user behaviour and preferences.

# 🛒 AI-Powered Product Recommendation System

AI-powered e-commerce recommendation system that delivers personalised product suggestions using browsing history, purchases, ratings, and wishlist data. Built with AI/ML for real-time, scalable, and accurate recommendations to improve user experience, engagement, and sales.
---

## 📖 Table of Contents

- About the Project
- Problem Statement
- Objectives
- Features
- System Architecture
- Technology Stack
- AI/ML Model
- Dataset
- Project Workflow
- Installation
- Usage
- API Endpoints
- Folder Structure
- Screenshots
- Future Scope
- Contributors
- License

---

# 📌 About the Project

Modern e-commerce platforms contain millions of products, making it challenging for customers to discover items that match their interests. Traditional recommendation systems often provide generic suggestions that fail to understand individual customer preferences.

This project introduces an AI-powered recommendation system capable of analysing customer behaviour—including browsing history, purchase history, ratings, and wishlist activity—to generate personalised product recommendations in real time.

The recommendation engine continuously learns from user interactions, enabling businesses to improve customer satisfaction, increase conversions, and maximise sales while maintaining a scalable architecture suitable for large-scale e-commerce platforms.

---

# ❓ Problem Statement

Develop an AI-powered recommendation system for an e-commerce platform that provides personalised product suggestions based on customer preferences, browsing history, purchase behaviour, ratings, and wishlist data. The solution should improve product discoverability, customer engagement, shopping experience, and overall business performance while supporting real-time recommendations and scalability.

---

# 🎯 Objectives

- Improve product discoverability through personalised recommendations.
- Enhance customer shopping experience.
- Increase customer engagement and retention.
- Boost conversion rates and sales.
- Reduce product search time.
- Learn continuously from customer interactions.
- Provide accurate recommendations with low response time.
- Build a scalable recommendation engine suitable for enterprise-level e-commerce platforms.

---

# ✨ Features

- Personalised product recommendations
- AI-powered recommendation engine
- Collaborative Filtering
- Content-Based Filtering
- Hybrid Recommendation System
- Real-time recommendation generation
- Customer behaviour analysis
- Wishlist analysis
- Purchase history learning
- Browsing history analysis
- Rating-based recommendations
- Trending product recommendations
- Similar product suggestions
- Scalable architecture
- REST API integration
- User-friendly dashboard
- Fast response time
- Continuous model improvement

---

# 🏗️ System Architecture

```
                Customer

                    │

         React Frontend / Web App

                    │

             REST API (FastAPI)

                    │

        Recommendation Engine

                    │

       AI / Machine Learning Model

                    │

          Feature Engineering

                    │

        Customer Behaviour Data

                    │

      PostgreSQL / MongoDB Database

                    │

      Recommended Products Output
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- Tailwind CSS
- JavaScript

## Backend

- Python
- FastAPI
- Flask (Optional)

## Machine Learning

- Scikit-learn
- Pandas
- NumPy
- SciPy

## Database

- PostgreSQL
- MongoDB

## Deployment

- Docker
- GitHub
- GitHub Actions

## Tools

- VS Code
- Jupyter Notebook
- Postman
- Figma

---

# 🤖 AI/ML Model

The recommendation system combines multiple recommendation techniques to achieve higher accuracy.

### Algorithms Used

- Collaborative Filtering
- Content-Based Filtering
- Hybrid Recommendation
- Cosine Similarity
- K-Nearest Neighbours (KNN)
- Matrix Factorisation (Optional)
- TF-IDF Vectorisation
- Singular Value Decomposition (SVD)

### Model Pipeline

1. Data Collection
2. Data Cleaning
3. Feature Engineering
4. Model Training
5. Recommendation Generation
6. User Feedback Collection
7. Model Retraining

---

# 📊 Dataset

The recommendation model uses the following information:

- User ID
- Product ID
- Product Category
- Product Description
- Ratings
- Reviews
- Browsing History
- Purchase History
- Wishlist
- Cart Items
- Product Popularity
- Timestamp

Possible dataset sources:

- Kaggle
- Amazon Product Dataset
- Flipkart Dataset
- Custom Dataset

---

# 🔄 Project Workflow

```
Customer Login

        │

Browse Products

        │

Collect User Behaviour

        │

Store Customer Data

        │

Feature Engineering

        │

AI Recommendation Model

        │

Generate Personalised Products

        │

Display Recommendations

        │

Collect User Feedback

        │

Update AI Model
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AI-Recommendation-System.git
```

Move into the project directory

```bash
cd AI-Recommendation-System
```

Install Backend Dependencies

```bash
pip install -r requirements.txt
```

Install Frontend Dependencies

```bash
npm install
```

Start Backend

```bash
uvicorn main:app --reload
```

Start Frontend

```bash
npm run dev
```

---

# ▶️ Usage

1. Register/Login.
2. Browse products.
3. Add products to wishlist or cart.
4. Rate purchased products.
5. Receive AI-powered personalised recommendations.
6. Continue interacting to improve recommendation accuracy.

---

# 🌐 API Endpoints

## Authentication

```
POST /login
POST /register
```

## Products

```
GET /products
GET /product/{id}
```

## Recommendation

```
GET /recommendations/{user_id}
```

## Wishlist

```
POST /wishlist
GET /wishlist
```

## Ratings

```
POST /ratings
```

---

# 📁 Folder Structure

```
AI-Recommendation-System/

│
├── frontend/
│
├── backend/
│
├── models/
│
├── dataset/
│
├── notebooks/
│
├── api/
│
├── screenshots/
│
├── docs/
│
├── requirements.txt
│
├── package.json
│
├── README.md
│
└── LICENSE
```

---

# 📷 Screenshots

## Home Page

(Add Screenshot)

---

## Product Page

(Add Screenshot)

---

## Recommendation Dashboard

(Add Screenshot)

---

## Admin Dashboard

(Add Screenshot)

---

# 📈 Future Scope

- Deep Learning Recommendation Models
- Transformer-based Recommendation Systems
- Voice Search Integration
- AI Shopping Assistant
- Explainable AI Recommendations
- Real-time Streaming Recommendations
- Multi-language Support
- Mobile Application
- Cloud Deployment
- Graph Neural Network Recommendations
- Reinforcement Learning-based Recommendations

---

# 👨‍💻 Contributors

- Deepan M 
- Aenok Antony C
- Haries Prasad S K
- Srithar S R

---

# 📄 License

This project is licensed under the MIT License.

---

# 🙏 Acknowledgements

- Open Source Community
- Scikit-learn
- FastAPI
- React.js
- Kaggle Datasets
- GitHub

---

## ⭐ If you found this project helpful, consider giving it a star on GitHub!
