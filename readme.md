# 🚗 Smart Car Parking Lot System

A comprehensive Data Structures and Problem Solving/Design (DSPD) assignment project implementing a **Smart Car Parking Lot System**. This repository features both a **C Console CLI Application** and an interactive, modern **Web Dashboard (HTML5/CSS3/JavaScript)** backed by Singly Linked Lists, custom Allocation/Membership/Payment policies, and Merge Sort algorithms.

---

## 🌟 Key Features

- **50 Parking Spaces**: Capacity for 50 vehicles with space IDs ranging from 1 to 50.
- **Linked List Architecture**: Dual linked-list architecture (`struct space*` for parking spaces and `struct vehicleDB*` for vehicle database records).
- **Policy Enforcement**:
  - 🥇 **Allocation Policy**: 
    - **Golden Zone**: Spaces 1 – 10 (Reserved for Golden members, $\ge 200$ hrs)
    - **Premium Zone**: Spaces 11 – 20 (Reserved for Premium members, $\ge 100$ hrs)
    - **Standard Zone**: Spaces 21 – 50 (For standard users, $< 100$ hrs)
    - *Fallback mechanism ensures no vehicle is rejected if other zones have free slots.*
  - ⭐ **Membership Policy**:
    - **No Membership (`None`)**: $< 100$ total parking hours
    - **Premium Membership**: $\ge 100$ total parking hours
    - **Golden Membership**: $\ge 200$ total parking hours
  - 💳 **Payment Policy**:
    - Flat **₹100** for the first 3 hours.
    - **₹50** for every additional hour parked beyond 3 hours.
    - **10% Discount** automatically applied for Golden and Premium members.
- **Linked List Merge Sort Analytics**:
  1. Sort vehicles based on **total parkings done** (descending).
  2. Sort vehicles based on **total parking amount paid** (descending).
  3. Sort parking spaces based on **occupancy frequency** (most occupied first).
  4. Sort parking spaces based on **maximum revenue generated** (descending).
- **File Persistence**: Load and save parkinglot & vehicle state to text files (`inputForVehicle.txt` & `inputForSpaces.txt`).
- **Interactive Web UI**: Real-time 2D grid visualization, entry/exit gates, analytics dashboard, and live **Linked List Node Inspector**.

---

## 📂 Repository Structure

```
.
├── program.c               # C CLI Source Code (Linked Lists, Policies, Merge Sort, File I/O)
├── inputForVehicle.txt     # Vehicle records persistent dataset
├── inputForSpaces.txt      # Parking space occupancy & revenue dataset
├── index.html              # Web UI Dashboard HTML structure
├── styles.css              # Dark glassmorphism design system
└── app.js                  # JavaScript linked-list simulation engine & Merge Sort
```

---

## 💻 How to Run the C Program

1. Open your terminal in the repository directory.
2. Compile `program.c` using GCC:
   ```bash
   gcc program.c -o program.exe
   ```
3. Run the compiled executable:
   - **On Windows**:
     ```powershell
     .\program.exe
     ```
   - **On Linux / macOS**:
     ```bash
     ./program.exe
     ```

---

## 🌐 How to Use the Web Dashboard

1. Double-click and open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
2. Explore the tabs:
   - 🅿️ **Parking Lot Layout**: Real-time 2D status grid of 50 parking spaces.
   - 🚗 **Vehicle Database**: Searchable registry of all vehicle records.
   - 🚪 **Entry / Exit Gate**: Register new/returning vehicles & process exit billing.
   - 📊 **Sorting & Analytics**: Real-time Merge Sort rankings for vehicles & spaces.
   - 🔗 **Linked List View**: Visual representation of `VehicleNode` and `SpaceNode` pointer chains.

---

## 🧪 Algorithms & Data Structures Used

- **Data Structure**: Custom Singly Linked List pointers (`head`, `goldPointer`, `premiumPointer`, `normalPointer`).
- **Sorting Algorithm**: **Merge Sort** on Linked Lists ($O(N \log N)$ time complexity, $O(1)$ auxiliary space for pointer restructuring).
- **Time Representation**: Calendar epoch calculation convertable to seconds for exact hourly parking duration billing.

---

## 📜 License

Created as part of the DSPD (Data Structures and Problem Solving/Design) Coursework Assignment.
