# Smart-Parking-System
Smart Parking System using C Using Linked Lists 
# Smart Car Parking System 🚗🅿️

This project is a C-based implementation of a Smart Car Parking System that manages 50 parking slots with automated allocation, billing, and membership tracking using linked lists and file handling.

## 🚀 Features

- Register and update vehicle information
- Allocate nearest parking space based on membership
- Calculate parking fees based on duration
- Membership upgrade based on parking hours
- Discounts for Premium and Golden members
- Data persistence using text files
- Sort vehicles by:
  - Total number of parkings
  - Total amount paid
- Sort parking spaces by:
  - Occupancy count
  - Total revenue

## 📜 Policies

### 🅿️ Allocation Policy
- **Golden Members**: Slots 1–10
- **Premium Members**: Slots 11–20
- **No Membership**: Slots 21–50 (first available)

### 💳 Membership Policy
- **None**: < 100 hours
- **Premium**: ≥ 100 hours
- **Golden**: ≥ 200 hours

### 💰 Payment Policy
- ₹100 for first 3 hours
- ₹50 for each additional hour
- 10% discount for members

## 💻 How to Run

1. Compile:
   ```bash
   gcc main.c -o parking_system
   
2. Compile:
   ```bash
   ./parking_system

3. Follow the on-screen menu for operations.

## 🔧 Future Work
- Adding a GUI for interaction
- Storing data in an SQLite database instead of text files
- Integrating sensor simulation for real-time vehicle tracking
- Generating daily/monthly reports
- Adding QR code scanning for vehicle entry
