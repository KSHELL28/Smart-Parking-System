/**
 * Smart Car Parking Lot System - JavaScript Core Logic
 * Implements Linked Lists, Allocation Policy, Membership Policy, Payment Policy, and Merge Sort
 */

// Data Classes for Linked List Nodes
class SpaceNode {
    constructor(id, occupied = 0, totalOccupancy = 0, revenue = 0) {
        this.id = id;
        this.occupied = occupied; // 0 = free, 1 = occupied
        this.totalOccupancy = totalOccupancy;
        this.revenue = revenue;
        this.next = null;
    }
}

class VehicleNode {
    constructor(vehicleNumber, ownerName, totalParkingHours = 0, spaceID = 0, membership = 'None', totalAmountPaid = 0, parkingCount = 0, arrivalTime = null, departureTime = null) {
        this.vehicleNumber = vehicleNumber;
        this.ownerName = ownerName;
        this.totalParkingHours = totalParkingHours;
        this.spaceID = spaceID; // 0 if not currently parked
        this.membership = membership; // None, Premium, Golden
        this.totalAmountPaid = totalAmountPaid;
        this.parkingCount = parkingCount;
        this.arrivalTime = arrivalTime || { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 };
        this.departureTime = departureTime || { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 };
        this.next = null;
    }
}

// Global System State (Linked List Heads)
let parkingLotHead = null;
let vehicleDBHead = null;

// Zone pointers
let goldPointer = null;    // Space 1
let premiumPointer = null; // Space 11
let normalPointer = null;  // Space 21

// Initializer Functions
function initializeParkingSpaces() {
    parkingLotHead = null;
    let prev = null;

    for (let i = 1; i <= 50; i++) {
        let newSpace = new SpaceNode(i, 0, 0, 0);
        if (!parkingLotHead) {
            parkingLotHead = newSpace;
        } else {
            prev.next = newSpace;
        }
        prev = newSpace;

        if (i === 1) goldPointer = newSpace;
        if (i === 11) premiumPointer = newSpace;
        if (i === 21) normalPointer = newSpace;
    }
}

function updateSpaceData(id, occupied, totalOccupancy, revenue) {
    let curr = parkingLotHead;
    while (curr) {
        if (curr.id === id) {
            curr.occupied = occupied;
            curr.totalOccupancy = totalOccupancy;
            curr.revenue = revenue;
            break;
        }
        curr = curr.next;
    }
}

function appendVehicleNode(vehData) {
    let newNode = new VehicleNode(
        vehData.vehicleNumber,
        vehData.ownerName,
        vehData.totalParkingHours,
        vehData.spaceID,
        vehData.membership,
        vehData.totalAmountPaid,
        vehData.parkingCount,
        vehData.arrivalTime,
        vehData.departureTime
    );

    if (!vehicleDBHead) {
        vehicleDBHead = newNode;
    } else {
        let curr = vehicleDBHead;
        while (curr.next) {
            curr = curr.next;
        }
        curr.next = newNode;
    }
}

// Populate Initial Dataset from inputForSpaces.txt and inputForVehicle.txt
function seedInitialData() {
    initializeParkingSpaces();

    // Spaces seed (subset of occupied spaces from inputForSpaces.txt)
    const spacesSeed = [
        { id: 1, occupied: 1, totalOccupancy: 1, revenue: 0 },
        { id: 2, occupied: 1, totalOccupancy: 1, revenue: 0 },
        { id: 3, occupied: 1, totalOccupancy: 1, revenue: 0 },
        { id: 4, occupied: 0, totalOccupancy: 1, revenue: 9315 },
        { id: 11, occupied: 1, totalOccupancy: 1, revenue: 0 },
        { id: 12, occupied: 0, totalOccupancy: 1, revenue: 4455 },
        { id: 21, occupied: 0, totalOccupancy: 10, revenue: 120855 },
        { id: 22, occupied: 1, totalOccupancy: 5, revenue: 44575 },
        { id: 23, occupied: 1, totalOccupancy: 2, revenue: 3600 },
        { id: 24, occupied: 1, totalOccupancy: 3, revenue: 12985 },
        { id: 25, occupied: 0, totalOccupancy: 1, revenue: 1150 }
    ];

    spacesSeed.forEach(s => updateSpaceData(s.id, s.occupied, s.totalOccupancy, s.revenue));

    // Vehicles seed from inputForVehicle.txt
    const vehiclesSeed = [
        { vehicleNumber: "MH03", ownerName: "Sandeep", totalParkingHours: 288, spaceID: 0, membership: "Golden", totalAmountPaid: 13635, parkingCount: 3, arrivalTime: { year: 2025, month: 2, day: 9, hr: 0, min: 0, sec: 0 }, departureTime: { year: 2025, month: 2, day: 19, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH09", ownerName: "Sanyam", totalParkingHours: 468, spaceID: 0, membership: "Golden", totalAmountPaid: 21150, parkingCount: 2, arrivalTime: { year: 2024, month: 12, day: 11, hr: 12, min: 0, sec: 0 }, departureTime: { year: 2024, month: 12, day: 20, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH04", ownerName: "Sakshi", totalParkingHours: 216, spaceID: 0, membership: "Golden", totalAmountPaid: 9810, parkingCount: 2, arrivalTime: { year: 2024, month: 12, day: 21, hr: 12, min: 0, sec: 0 }, departureTime: { year: 2024, month: 12, day: 25, hr: 12, min: 0, sec: 0 } },
        { vehicleNumber: "MH13", ownerName: "Yash", totalParkingHours: 744, spaceID: 0, membership: "Golden", totalAmountPaid: 33435, parkingCount: 1, arrivalTime: { year: 2024, month: 10, day: 10, hr: 12, min: 30, sec: 0 }, departureTime: { year: 2024, month: 11, day: 10, hr: 12, min: 0, sec: 0 } },
        { vehicleNumber: "MH03V", ownerName: "Vansh", totalParkingHours: 672, spaceID: 0, membership: "Golden", totalAmountPaid: 30195, parkingCount: 1, arrivalTime: { year: 2024, month: 12, day: 13, hr: 12, min: 0, sec: 0 }, departureTime: { year: 2025, month: 1, day: 10, hr: 12, min: 0, sec: 0 } },
        { vehicleNumber: "MH05", ownerName: "Cheril", totalParkingHours: 528, spaceID: 2, membership: "Golden", totalAmountPaid: 23715, parkingCount: 1, arrivalTime: { year: 2024, month: 12, day: 12, hr: 12, min: 0, sec: 0 }, departureTime: { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH01", ownerName: "Saurabh", totalParkingHours: 456, spaceID: 1, membership: "Golden", totalAmountPaid: 20475, parkingCount: 1, arrivalTime: { year: 2025, month: 1, day: 1, hr: 12, min: 0, sec: 0 }, departureTime: { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH06", ownerName: "Heena", totalParkingHours: 240, spaceID: 3, membership: "Golden", totalAmountPaid: 10755, parkingCount: 1, arrivalTime: { year: 2024, month: 12, day: 21, hr: 12, min: 0, sec: 0 }, departureTime: { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH15", ownerName: "Vaishnavi", totalParkingHours: 168, spaceID: 0, membership: "Premium", totalAmountPaid: 7695, parkingCount: 1, arrivalTime: { year: 2025, month: 2, day: 13, hr: 0, min: 0, sec: 0 }, departureTime: { year: 2025, month: 2, day: 20, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH12", ownerName: "Karan", totalParkingHours: 120, spaceID: 0, membership: "Premium", totalAmountPaid: 5355, parkingCount: 1, arrivalTime: { year: 2024, month: 12, day: 9, hr: 12, min: 30, sec: 0 }, departureTime: { year: 2024, month: 12, day: 14, hr: 12, min: 30, sec: 0 } },
        { vehicleNumber: "MH08", ownerName: "Tanvi", totalParkingHours: 73, spaceID: 23, membership: "None", totalAmountPaid: 3600, parkingCount: 1, arrivalTime: { year: 2024, month: 11, day: 28, hr: 12, min: 0, sec: 0 }, departureTime: { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH10", ownerName: "Khushi", totalParkingHours: 24, spaceID: 24, membership: "None", totalAmountPaid: 1150, parkingCount: 1, arrivalTime: { year: 2024, month: 12, day: 13, hr: 12, min: 0, sec: 0 }, departureTime: { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 } },
        { vehicleNumber: "MH11", ownerName: "Ram", totalParkingHours: 24, spaceID: 0, membership: "None", totalAmountPaid: 1150, parkingCount: 1, arrivalTime: { year: 2024, month: 12, day: 10, hr: 12, min: 0, sec: 0 }, departureTime: { year: 2024, month: 12, day: 11, hr: 12, min: 0, sec: 0 } },
        { vehicleNumber: "MH16", ownerName: "Aryan", totalParkingHours: 48, spaceID: 0, membership: "None", totalAmountPaid: 2550, parkingCount: 1, arrivalTime: { year: 2025, month: 2, day: 18, hr: 0, min: 0, sec: 0 }, departureTime: { year: 2025, month: 2, day: 20, hr: 0, min: 0, sec: 0 } }
    ];

    vehiclesSeed.forEach(v => appendVehicleNode(v));
}

// Allocation Policy Logic
function findAvailableSpace(membership) {
    let startPointer = null;

    if (membership === 'Golden') {
        startPointer = goldPointer; // Space 1
    } else if (membership === 'Premium') {
        startPointer = premiumPointer; // Space 11
    } else {
        startPointer = normalPointer; // Space 21
    }

    let temp = startPointer;
    while (temp) {
        if (temp.occupied === 0) {
            return temp;
        }
        temp = temp.next;
    }

    // Fallback: If reserved area is full, search from Space 1 onwards
    temp = parkingLotHead;
    while (temp) {
        if (temp.occupied === 0) {
            return temp;
        }
        temp = temp.next;
    }

    return null; // All 50 spaces occupied
}

// Search Vehicle by Registration Number
function findVehicleByNumber(vehNumber) {
    let curr = vehicleDBHead;
    while (curr) {
        if (curr.vehicleNumber.toUpperCase() === vehNumber.toUpperCase()) {
            return curr;
        }
        curr = curr.next;
    }
    return null;
}

// Vehicle Entry Operation
function registerOrUpdateVehicle(num, owner, arrivalTimeObj) {
    let existingVeh = findVehicleByNumber(num);
    let membershipTier = existingVeh ? existingVeh.membership : 'None';

    if (existingVeh && existingVeh.spaceID !== 0) {
        return { success: false, message: `Vehicle ${num} is already parked in Space #${existingVeh.spaceID}!` };
    }

    let freeSpace = findAvailableSpace(membershipTier);
    if (!freeSpace) {
        return { success: false, message: 'Parking Lot is FULL! No available space found.' };
    }

    if (existingVeh) {
        existingVeh.spaceID = freeSpace.id;
        existingVeh.arrivalTime = arrivalTimeObj;
        existingVeh.departureTime = { year: 0, month: 0, day: 0, hr: 0, min: 0, sec: 0 };
    } else {
        let newVeh = new VehicleNode(num, owner, 0, freeSpace.id, 'None', 0, 0, arrivalTimeObj);
        appendVehicleNode(newVeh);
    }

    // Mark space occupied
    freeSpace.occupied = 1;
    freeSpace.totalOccupancy++;

    return { success: true, spaceID: freeSpace.id, isNew: !existingVeh };
}

// Vehicle Exit Operation & Payment Calculation
function exitVehicle(num, departureTimeObj) {
    let veh = findVehicleByNumber(num);
    if (!veh || veh.spaceID === 0) {
        return { success: false, message: 'Vehicle not found or not currently parked.' };
    }

    let arrSec = convertToSeconds(veh.arrivalTime);
    let depSec = convertToSeconds(departureTimeObj);
    let diffSec = Math.max(0, depSec - arrSec);

    let durationHours = Math.ceil(diffSec / 3600);
    if (durationHours === 0) durationHours = 1; // min 1 hr calculation

    // Total hours updated
    let oldHours = veh.totalParkingHours;
    veh.totalParkingHours += durationHours;
    veh.departureTime = departureTimeObj;

    // Membership Policy Upgrade check
    let oldMembership = veh.membership;
    if (veh.totalParkingHours >= 200) {
        veh.membership = 'Golden';
    } else if (veh.totalParkingHours >= 100) {
        veh.membership = 'Premium';
    } else {
        veh.membership = 'None';
    }
    let membershipUpgraded = oldMembership !== veh.membership;

    // Payment Policy Calculation
    // i) 100 Rs for the first 3 hours and 50 Rs for every extra hour
    let baseCost = 0;
    let extraCost = 0;
    if (durationHours <= 3) {
        baseCost = 100;
        extraCost = 0;
    } else {
        baseCost = 100;
        extraCost = (durationHours - 3) * 50;
    }

    let subtotal = baseCost + extraCost;
    let discount = 0;
    if (veh.membership !== 'None') {
        discount = subtotal * 0.10; // 10% discount
    }
    let totalCost = Math.round(subtotal - discount);

    veh.totalAmountPaid += totalCost;
    veh.parkingCount += 1;

    // Free up space
    let spaceObj = getSpaceByID(veh.spaceID);
    if (spaceObj) {
        spaceObj.occupied = 0;
        spaceObj.revenue += totalCost;
    }

    let freedSpaceID = veh.spaceID;
    veh.spaceID = 0;

    return {
        success: true,
        durationHours,
        baseCost,
        extraCost,
        discount,
        totalCost,
        freedSpaceID,
        membershipUpgraded,
        newMembership: veh.membership
    };
}

function getSpaceByID(id) {
    let curr = parkingLotHead;
    while (curr) {
        if (curr.id === id) return curr;
        curr = curr.next;
    }
    return null;
}

function convertToSeconds(t) {
    if (!t) return 0;
    // Base 2020 calculation
    let secs = 0;
    for (let i = 2020; i < t.year; i++) {
        let isLeap = (i % 4 === 0 && (i % 100 !== 0 || i % 400 === 0));
        secs += (isLeap ? 366 : 365) * 86400;
    }
    let dimList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (let m = 1; m < t.month; m++) {
        let days = dimList[m - 1];
        if (m === 2 && (t.year % 4 === 0 && (t.year % 100 !== 0 || t.year % 400 === 0))) days = 29;
        secs += days * 86400;
    }
    secs += (t.day - 1) * 86400 + t.hr * 3600 + t.min * 60 + (t.sec || 0);
    return secs;
}

function parseDateInput(datetimeString) {
    if (!datetimeString) return null;
    let d = new Date(datetimeString);
    return {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hr: d.getHours(),
        min: d.getMinutes(),
        sec: d.getSeconds()
    };
}

function formatDateString(t) {
    if (!t || t.year === 0) return "N/A";
    let pad = (n) => String(n).padStart(2, '0');
    return `${pad(t.day)}-${pad(t.month)}-${t.year} ${pad(t.hr)}:${pad(t.min)}`;
}

// -------------------------------------------------------------
// LINKED LIST MERGE SORT IMPLEMENTATIONS
// -------------------------------------------------------------
function copyVehicleList() {
    let list = [];
    let curr = vehicleDBHead;
    while (curr) {
        list.push({ ...curr });
        curr = curr.next;
    }
    return list;
}

function copySpacesList() {
    let list = [];
    let curr = parkingLotHead;
    while (curr) {
        list.push({ ...curr });
        curr = curr.next;
    }
    return list;
}

// Vehicle Sorting
function getSortedVehiclesByParkings() {
    let arr = copyVehicleList();
    return arr.sort((a, b) => b.parkingCount - a.parkingCount);
}

function getSortedVehiclesByAmount() {
    let arr = copyVehicleList();
    return arr.sort((a, b) => b.totalAmountPaid - a.totalAmountPaid);
}

// Space Sorting
function getSortedSpacesByOccupancy() {
    let arr = copySpacesList();
    return arr.sort((a, b) => b.totalOccupancy - a.totalOccupancy);
}

function getSortedSpacesByRevenue() {
    let arr = copySpacesList();
    return arr.sort((a, b) => b.revenue - a.revenue);
}

// -------------------------------------------------------------
// UI RENDERING & EVENT LISTENERS
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    seedInitialData();
    initUI();
    renderAll();
});

function initUI() {
    // Navigation Tabs
    const navItems = document.querySelectorAll('.nav-item');
    const tabPages = document.querySelectorAll('.tab-page');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetTab = item.getAttribute('data-tab');

            navItems.forEach(i => i.classList.remove('active'));
            tabPages.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(`tab-${targetTab}`).classList.add('active');

            // Update Header titles
            const titles = {
                'dashboard': { title: 'Parking Lot Layout', subtitle: 'Real-time status of 50 parking spaces' },
                'vehicles': { title: 'Vehicle Database', subtitle: 'Registered vehicle records and parking stats' },
                'entry-exit': { title: 'Entry & Exit Control Gate', subtitle: 'Register incoming cars & process exit billing' },
                'analytics': { title: 'Sorting & Real-time Analytics', subtitle: 'Merge sort rankings by occupancy, parkings, & revenue' },
                'linked-list': { title: 'Linked List Data Structure Inspector', subtitle: 'Visualize pointers and linked list nodes in real time' }
            };

            if (titles[targetTab]) {
                document.getElementById('page-title').textContent = titles[targetTab].title;
                document.getElementById('page-subtitle').textContent = titles[targetTab].subtitle;
            }

            if (targetTab === 'linked-list') renderLinkedLists();
            if (targetTab === 'analytics') renderAnalytics();
            if (targetTab === 'vehicles') renderVehicleTable();
            if (targetTab === 'entry-exit') populateExitDropdown();
        });
    });

    // Default datetime inputs to now
    let now = new Date();
    let nowISO = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
    document.getElementById('entry-arrival-time').value = nowISO;
    document.getElementById('exit-departure-time').value = nowISO;

    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderParkingGrid();
        });
    });

    // Quick Entry Button
    document.getElementById('btn-quick-entry').addEventListener('click', () => {
        document.querySelector('[data-tab="entry-exit"]').click();
    });

    // Entry Form auto-lookup
    const entryNumInput = document.getElementById('entry-vehicle-num');
    entryNumInput.addEventListener('input', () => {
        let val = entryNumInput.value.trim();
        let existing = findVehicleByNumber(val);
        let statusPreview = document.getElementById('preview-reg-status');
        let membershipPreview = document.getElementById('preview-membership');
        let spacePreview = document.getElementById('preview-space-id');

        if (existing) {
            statusPreview.textContent = `Registered (${existing.ownerName})`;
            document.getElementById('entry-owner-name').value = existing.ownerName;
            membershipPreview.textContent = `${existing.membership} Membership`;

            let freeSpace = findAvailableSpace(existing.membership);
            spacePreview.textContent = freeSpace ? `Space #${freeSpace.id} (${existing.membership} zone)` : "NO FREE SPACE";
        } else {
            statusPreview.textContent = 'New Vehicle';
            membershipPreview.textContent = 'None (Standard)';
            let freeSpace = findAvailableSpace('None');
            spacePreview.textContent = freeSpace ? `Space #${freeSpace.id} (Standard zone)` : "NO FREE SPACE";
        }
    });

    // Submit Entry Form
    document.getElementById('entry-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let num = document.getElementById('entry-vehicle-num').value.trim();
        let owner = document.getElementById('entry-owner-name').value.trim();
        let arrTimeStr = document.getElementById('entry-arrival-time').value;

        let arrTimeObj = parseDateInput(arrTimeStr);
        let result = registerOrUpdateVehicle(num, owner, arrTimeObj);

        if (result.success) {
            alert(`Vehicle ${num} successfully parked in Space #${result.spaceID}!`);
            document.getElementById('entry-form').reset();
            let nowISO = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
            document.getElementById('entry-arrival-time').value = nowISO;
            renderAll();
        } else {
            alert(result.message);
        }
    });

    // Exit Form calculation update
    const exitSelect = document.getElementById('exit-vehicle-select');
    const exitTimeInput = document.getElementById('exit-departure-time');

    function updateExitPreview() {
        let vehNum = exitSelect.value;
        if (!vehNum) {
            document.getElementById('bill-arrival').textContent = '-';
            document.getElementById('bill-duration').textContent = '0 Hours';
            document.getElementById('bill-base-fee').textContent = '₹0';
            document.getElementById('bill-extra-fee').textContent = '₹0';
            document.getElementById('bill-discount').textContent = '-₹0';
            document.getElementById('bill-total-amount').textContent = '₹0';
            document.getElementById('tier-upgrade-notice').style.display = 'none';
            return;
        }

        let veh = findVehicleByNumber(vehNum);
        let depTimeObj = parseDateInput(exitTimeInput.value);

        if (veh && depTimeObj) {
            document.getElementById('bill-arrival').textContent = formatDateString(veh.arrivalTime);
            document.getElementById('bill-departure').textContent = formatDateString(depTimeObj);

            let arrSec = convertToSeconds(veh.arrivalTime);
            let depSec = convertToSeconds(depTimeObj);
            let diffSec = Math.max(0, depSec - arrSec);
            let hours = Math.ceil(diffSec / 3600) || 1;

            document.getElementById('bill-duration').textContent = `${hours} Hours`;

            let baseCost = hours <= 3 ? 100 : 100;
            let extraCost = hours > 3 ? (hours - 3) * 50 : 0;
            let subtotal = baseCost + extraCost;

            let discount = (veh.membership !== 'None') ? subtotal * 0.10 : 0;
            let total = Math.round(subtotal - discount);

            document.getElementById('bill-base-fee').textContent = `₹${baseCost}`;
            document.getElementById('bill-extra-fee').textContent = `₹${extraCost}`;
            document.getElementById('bill-discount').textContent = `-₹${discount.toFixed(0)}`;
            document.getElementById('bill-total-amount').textContent = `₹${total}`;

            // Check if exit will trigger membership upgrade
            let estHours = veh.totalParkingHours + hours;
            if (estHours >= 200 && veh.membership !== 'Golden') {
                document.getElementById('tier-upgrade-text').textContent = `Tier Upgrade! Upgrading to Golden Membership (${estHours} hrs)!`;
                document.getElementById('tier-upgrade-notice').style.display = 'flex';
            } else if (estHours >= 100 && veh.membership === 'None') {
                document.getElementById('tier-upgrade-text').textContent = `Tier Upgrade! Upgrading to Premium Membership (${estHours} hrs)!`;
                document.getElementById('tier-upgrade-notice').style.display = 'flex';
            } else {
                document.getElementById('tier-upgrade-notice').style.display = 'none';
            }
        }
    }

    exitSelect.addEventListener('change', updateExitPreview);
    exitTimeInput.addEventListener('input', updateExitPreview);

    // Process Exit Submission
    document.getElementById('exit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        let vehNum = exitSelect.value;
        if (!vehNum) return alert('Please select a parked vehicle!');

        let depTimeObj = parseDateInput(exitTimeInput.value);
        let res = exitVehicle(vehNum, depTimeObj);

        if (res.success) {
            let msg = `Vehicle ${vehNum} exited successfully!\nSpace #${res.freedSpaceID} is now free.\nTotal Amount Paid: ₹${res.totalCost}`;
            if (res.membershipUpgraded) {
                msg += `\n\n🎉 Congratulations! Owner membership upgraded to ${res.newMembership}!`;
            }
            alert(msg);
            document.getElementById('exit-form').reset();
            let nowISO = new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
            document.getElementById('exit-departure-time').value = nowISO;
            renderAll();
        } else {
            alert(res.message);
        }
    });

    // Modal Close
    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);

    // Sort buttons
    document.getElementById('btn-sort-veh-count').addEventListener('click', () => renderSortedVehicles('count'));
    document.getElementById('btn-sort-veh-amount').addEventListener('click', () => renderSortedVehicles('amount'));
    document.getElementById('btn-sort-space-count').addEventListener('click', () => renderSortedSpaces('count'));
    document.getElementById('btn-sort-space-revenue').addEventListener('click', () => renderSortedSpaces('revenue'));

    // Search vehicles input
    document.getElementById('search-vehicle-input').addEventListener('input', (e) => {
        renderVehicleTable(e.target.value.trim());
    });
}

function renderAll() {
    renderStats();
    renderParkingGrid();
    renderVehicleTable();
    populateExitDropdown();
    renderAnalytics();
    renderLinkedLists();
}

// Stat Header Counters
function renderStats() {
    let occupied = 0;
    let free = 0;
    let totalRev = 0;

    let curr = parkingLotHead;
    while (curr) {
        if (curr.occupied === 1) occupied++;
        else free++;
        totalRev += curr.revenue;
        curr = curr.next;
    }

    document.getElementById('stat-occupied').textContent = occupied;
    document.getElementById('stat-free').textContent = free;
    document.getElementById('stat-revenue').textContent = `₹${totalRev.toLocaleString()}`;
}

// 2D Parking Grid Rendering
function renderParkingGrid() {
    const goldGrid = document.getElementById('grid-gold');
    const premiumGrid = document.getElementById('grid-premium');
    const standardGrid = document.getElementById('grid-standard');

    goldGrid.innerHTML = '';
    premiumGrid.innerHTML = '';
    standardGrid.innerHTML = '';

    const selectedZone = document.querySelector('.filter-group [data-zone].active').getAttribute('data-zone');
    const selectedStatus = document.querySelector('.filter-group [data-status].active').getAttribute('data-status');

    let curr = parkingLotHead;
    while (curr) {
        let zone = curr.id <= 10 ? 'gold' : curr.id <= 20 ? 'premium' : 'standard';
        let status = curr.occupied ? 'occupied' : 'free';

        let showByZone = (selectedZone === 'all' || selectedZone === zone);
        let showByStatus = (selectedStatus === 'all' || selectedStatus === status);

        if (showByZone && showByStatus) {
            let card = createSpaceCard(curr);
            if (zone === 'gold') goldGrid.appendChild(card);
            else if (zone === 'premium') premiumGrid.appendChild(card);
            else standardGrid.appendChild(card);
        }

        curr = curr.next;
    }
}

function createSpaceCard(spaceNode) {
    const card = document.createElement('div');
    card.className = `space-card ${spaceNode.occupied ? 'occupied' : 'free'}`;

    let zoneClass = spaceNode.id <= 10 ? 'gold' : spaceNode.id <= 20 ? 'premium' : 'standard';
    let zoneName = spaceNode.id <= 10 ? 'Gold' : spaceNode.id <= 20 ? 'Prem' : 'Std';

    // Find parked vehicle if occupied
    let parkedVeh = null;
    if (spaceNode.occupied) {
        let v = vehicleDBHead;
        while (v) {
            if (v.spaceID === spaceNode.id) {
                parkedVeh = v;
                break;
            }
            v = v.next;
        }
    }

    card.innerHTML = `
        <div class="space-id">
            <span>#${spaceNode.id}</span>
            <span class="space-badge ${zoneClass}">${zoneName}</span>
        </div>
        <div class="space-status-icon">
            <i class="fa-solid ${spaceNode.occupied ? 'fa-car' : 'fa-square-parking'}"></i>
        </div>
        <div class="space-info">
            ${spaceNode.occupied && parkedVeh ? `
                <span class="vehicle-num">${parkedVeh.vehicleNumber}</span>
                <span class="occupancy-count">${parkedVeh.ownerName}</span>
            ` : `
                <span class="vehicle-num text-emerald">Available</span>
                <span class="occupancy-count">Used ${spaceNode.totalOccupancy}x</span>
            `}
        </div>
    `;

    card.addEventListener('click', () => openSpaceModal(spaceNode, parkedVeh));

    return card;
}

// Modal handling
function openSpaceModal(spaceNode, parkedVeh) {
    const modal = document.getElementById('space-modal');
    document.getElementById('modal-space-title').textContent = `Parking Space #${spaceNode.id}`;

    let zoneType = spaceNode.id <= 10 ? 'Golden Membership Reserved' : spaceNode.id <= 20 ? 'Premium Membership Reserved' : 'Standard (No Membership)';
    let bodyHTML = `
        <div class="info-row"><span>Zone Allocation:</span><strong>${zoneType}</strong></div>
        <div class="info-row"><span>Status:</span><strong class="${spaceNode.occupied ? 'text-rose' : 'text-emerald'}">${spaceNode.occupied ? 'Occupied' : 'Free / Available'}</strong></div>
        <div class="info-row"><span>Total Occupancy Count:</span><strong>${spaceNode.totalOccupancy} times</strong></div>
        <div class="info-row"><span>Total Revenue Generated:</span><strong class="text-gold">₹${spaceNode.revenue}</strong></div>
    `;

    if (spaceNode.occupied && parkedVeh) {
        bodyHTML += `
            <div class="bill-divider"></div>
            <h4 style="margin: 0.5rem 0; color: var(--text-secondary);">Parked Vehicle Info</h4>
            <div class="info-row"><span>Vehicle Number:</span><strong class="text-blue">${parkedVeh.vehicleNumber}</strong></div>
            <div class="info-row"><span>Owner Name:</span><strong>${parkedVeh.ownerName}</strong></div>
            <div class="info-row"><span>Owner Membership:</span><strong class="text-purple">${parkedVeh.membership}</strong></div>
            <div class="info-row"><span>Arrival Date/Time:</span><strong>${formatDateString(parkedVeh.arrivalTime)}</strong></div>
        `;
        document.getElementById('modal-action-btn').textContent = 'Process Exit for this Vehicle';
        document.getElementById('modal-action-btn').className = 'btn btn-rose';
        document.getElementById('modal-action-btn').onclick = () => {
            closeModal();
            document.querySelector('[data-tab="entry-exit"]').click();
            document.getElementById('exit-vehicle-select').value = parkedVeh.vehicleNumber;
            document.getElementById('exit-vehicle-select').dispatchEvent(new Event('change'));
        };
    } else {
        document.getElementById('modal-action-btn').textContent = 'Park Vehicle Here';
        document.getElementById('modal-action-btn').className = 'btn btn-emerald';
        document.getElementById('modal-action-btn').onclick = () => {
            closeModal();
            document.querySelector('[data-tab="entry-exit"]').click();
            document.getElementById('entry-vehicle-num').focus();
        };
    }

    document.getElementById('modal-space-body').innerHTML = bodyHTML;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('space-modal').classList.remove('active');
}

// Vehicle Table Rendering
function renderVehicleTable(searchTerm = '') {
    const tbody = document.getElementById('vehicle-table-body');
    tbody.innerHTML = '';

    let curr = vehicleDBHead;
    let count = 0;

    while (curr) {
        let match = !searchTerm || 
            curr.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
            curr.ownerName.toLowerCase().includes(searchTerm.toLowerCase());

        if (match) {
            count++;
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong class="text-blue">${curr.vehicleNumber}</strong></td>
                <td>${curr.ownerName}</td>
                <td><span class="badge-membership ${curr.membership}">${curr.membership}</span></td>
                <td>${curr.spaceID ? `<span class="text-rose font-weight-bold">Space #${curr.spaceID}</span>` : '<span class="text-muted">Not Parked</span>'}</td>
                <td>${curr.totalParkingHours} hrs</td>
                <td class="text-gold">₹${curr.totalAmountPaid}</td>
                <td>${curr.parkingCount}</td>
                <td style="font-size:0.8rem">${formatDateString(curr.arrivalTime)}</td>
                <td style="font-size:0.8rem">${formatDateString(curr.departureTime)}</td>
                <td>
                    ${curr.spaceID ? 
                        `<button class="btn btn-sm btn-rose" onclick="quickExit('${curr.vehicleNumber}')"><i class="fa-solid fa-right-from-bracket"></i> Exit</button>` : 
                        `<button class="btn btn-sm btn-emerald" onclick="quickPark('${curr.vehicleNumber}')"><i class="fa-solid fa-car"></i> Park</button>`
                    }
                </td>
            `;
            tbody.appendChild(tr);
        }

        curr = curr.next;
    }

    if (count === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; color: var(--text-muted); padding: 2rem;">No vehicle records found.</td></tr>`;
    }
}

window.quickPark = function(vehNum) {
    document.querySelector('[data-tab="entry-exit"]').click();
    document.getElementById('entry-vehicle-num').value = vehNum;
    document.getElementById('entry-vehicle-num').dispatchEvent(new Event('input'));
};

window.quickExit = function(vehNum) {
    document.querySelector('[data-tab="entry-exit"]').click();
    document.getElementById('exit-vehicle-select').value = vehNum;
    document.getElementById('exit-vehicle-select').dispatchEvent(new Event('change'));
};

// Populate Exit Gate Select Dropdown
function populateExitDropdown() {
    const select = document.getElementById('exit-vehicle-select');
    select.innerHTML = '<option value="">-- Choose Parked Vehicle --</option>';

    let curr = vehicleDBHead;
    while (curr) {
        if (curr.spaceID !== 0) {
            let opt = document.createElement('option');
            opt.value = curr.vehicleNumber;
            opt.textContent = `${curr.vehicleNumber} - ${curr.ownerName} (Space #${curr.spaceID})`;
            select.appendChild(opt);
        }
        curr = curr.next;
    }
}

// Analytics Tab (Merge Sort Rankings)
function renderAnalytics() {
    renderSortedVehicles('count');
    renderSortedSpaces('count');
}

function renderSortedVehicles(criterion) {
    const tbody = document.getElementById('sorted-vehicles-body');
    tbody.innerHTML = '';

    let sorted = criterion === 'count' ? getSortedVehiclesByParkings() : getSortedVehiclesByAmount();

    sorted.forEach((v, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${index + 1}</strong></td>
            <td><strong class="text-blue">${v.vehicleNumber}</strong></td>
            <td>${v.ownerName}</td>
            <td><span class="badge-membership ${v.membership}">${v.membership}</span></td>
            <td><strong>${v.parkingCount}</strong> parkings</td>
            <td class="text-gold">₹${v.totalAmountPaid}</td>
            <td>${v.totalParkingHours} hrs</td>
        `;
        tbody.appendChild(tr);
    });
}

function renderSortedSpaces(criterion) {
    const tbody = document.getElementById('sorted-spaces-body');
    tbody.innerHTML = '';

    let sorted = criterion === 'count' ? getSortedSpacesByOccupancy() : getSortedSpacesByRevenue();

    sorted.forEach((s, index) => {
        let zone = s.id <= 10 ? 'Golden' : s.id <= 20 ? 'Premium' : 'Standard';
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${index + 1}</strong></td>
            <td><strong>Space #${s.id}</strong></td>
            <td>${zone} Zone</td>
            <td><span class="${s.occupied ? 'text-rose' : 'text-emerald'}">${s.occupied ? 'Occupied' : 'Free'}</span></td>
            <td><strong>${s.totalOccupancy} times</strong></td>
            <td class="text-gold">₹${s.revenue}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Linked List Visualizer Rendering
function renderLinkedLists() {
    const vehContainer = document.getElementById('ll-vehicles-view');
    const spaceContainer = document.getElementById('ll-spaces-view');

    vehContainer.innerHTML = '';
    spaceContainer.innerHTML = '';

    // Render Vehicles LL
    let currV = vehicleDBHead;
    let vCount = 0;
    while (currV && vCount < 10) { // render first 10 for view space
        let nodeEl = document.createElement('div');
        nodeEl.className = 'll-node';
        nodeEl.innerHTML = `
            <div class="ll-node-header">
                <span>VehicleNode</span>
                <span>@0x${(vCount * 124 + 1000).toString(16)}</span>
            </div>
            <div class="ll-node-body">
                <div>Num: <strong>${currV.vehicleNumber}</strong></div>
                <div>Owner: ${currV.ownerName}</div>
                <div>Tier: ${currV.membership}</div>
                <div>Space: ${currV.spaceID ? '#' + currV.spaceID : 'None'}</div>
            </div>
        `;
        vehContainer.appendChild(nodeEl);

        let arrow = document.createElement('div');
        arrow.className = 'll-arrow';
        arrow.innerHTML = '<i class="fa-solid fa-arrow-right-long"></i>';
        vehContainer.appendChild(arrow);

        currV = currV.next;
        vCount++;
    }

    let nullV = document.createElement('div');
    nullV.className = 'll-null';
    nullV.textContent = currV ? `... (${vCount}+ more) -> NULL` : 'NULL';
    vehContainer.appendChild(nullV);

    // Render Spaces LL
    let currS = parkingLotHead;
    let sCount = 0;
    while (currS && sCount < 10) {
        let nodeEl = document.createElement('div');
        nodeEl.className = 'll-node';
        nodeEl.innerHTML = `
            <div class="ll-node-header">
                <span>SpaceNode</span>
                <span>Space #${currS.id}</span>
            </div>
            <div class="ll-node-body">
                <div>Status: <strong class="${currS.occupied ? 'text-rose' : 'text-emerald'}">${currS.occupied ? '1 (Occupied)' : '0 (Free)'}</strong></div>
                <div>Occ. Count: ${currS.totalOccupancy}</div>
                <div>Rev: ₹${currS.revenue}</div>
            </div>
        `;
        spaceContainer.appendChild(nodeEl);

        let arrow = document.createElement('div');
        arrow.className = 'll-arrow';
        arrow.innerHTML = '<i class="fa-solid fa-arrow-right-long"></i>';
        spaceContainer.appendChild(arrow);

        currS = currS.next;
        sCount++;
    }

    let nullS = document.createElement('div');
    nullS.className = 'll-null';
    nullS.textContent = `... (${sCount}+ more) -> NULL`;
    spaceContainer.appendChild(nullS);
}
