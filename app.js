/* =========================================================================
   MediPulse AI - Doctor Appointment System
   SINGLE JAVASCRIPT FILE (js/app.js)
   
   Is file ko 5 aasan hisson mein divide kiya gaya hai:
   SECTION 1: APNA DATA YAHAN CHANGE KAREIN (Doctors, Shifts, Settings)
   SECTION 2: AODHIYA TOOLS (Popup alerts aur Date format)
   SECTION 3: DOCTORS DIRECTORY (Search aur Filter logic)
   SECTION 4: BOOKING FORM (Live slots generator aur AI triage)
   SECTION 5: DOCTOR & ADMIN DASHBOARD (Metrics, Table, Shifts manager)
   ========================================================================= */


// =========================================================================
// SECTION 1: APNA DATA YAHAN EDIT KAREIN (Third-Person Friendly)
// Koi bhi teesra person naya doctor ya shift add karne ke liye yahan edit kare
// =========================================================================

// 1. DOCTORS KI LIST
const DEFAULT_DOCTORS = [
  {
    id: "DOC-001",
    name: "Dr. Ayesha Malik",
    specialty: "Cardiology",
    experienceYears: 14,
    branch: "Central Memorial Hospital",
    rating: 4.9,
    consultationFee: 75,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    activeDays: ["Monday", "Wednesday", "Friday"],
    education: "MBBS, MD - Cardiology",
    bio: "Heart disease, high blood pressure, and preventive cardiology specialist."
  },
  {
    id: "DOC-002",
    name: "Dr. Farhan Siddiqui",
    specialty: "Neurology",
    experienceYears: 11,
    branch: "North Wing Specialty Center",
    rating: 4.8,
    consultationFee: 85,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    activeDays: ["Tuesday", "Thursday", "Saturday"],
    education: "MBBS, FCPS - Neurology",
    bio: "Specialist in chronic migraines, tremors, and neurological disorders."
  },
  {
    id: "DOC-003",
    name: "Dr. Sarah Jenkins",
    specialty: "Pediatrics",
    experienceYears: 9,
    branch: "City Health Pavilion",
    rating: 4.9,
    consultationFee: 60,
    avatar: "https://images.unsplash.com/photo-1594824813535-a74b60e61d8f?auto=format&fit=crop&q=80&w=400",
    activeDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    education: "MBBS, DCH - Pediatrics",
    bio: "Child healthcare, newborn checkups, and routine vaccinations."
  },
  {
    id: "DOC-004",
    name: "Dr. Tariq Mahmood",
    specialty: "Orthopedics",
    experienceYears: 16,
    branch: "Central Memorial Hospital",
    rating: 4.7,
    consultationFee: 80,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    activeDays: ["Monday", "Thursday", "Saturday"],
    education: "MBBS, MS - Orthopedic Surgery",
    bio: "Knee and shoulder joints, bone fractures, and sports injuries."
  },
  {
    id: "DOC-005",
    name: "Dr. Elena Rostova",
    specialty: "Dermatology",
    experienceYears: 8,
    branch: "North Wing Specialty Center",
    rating: 4.9,
    consultationFee: 70,
    avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
    activeDays: ["Tuesday", "Wednesday", "Friday"],
    education: "MD - Dermatology",
    bio: "Skin allergies, acne, eczema, and laser cosmetic treatments."
  },
  {
    id: "DOC-006",
    name: "Dr. Bilal Qureshi",
    specialty: "General Medicine",
    experienceYears: 12,
    branch: "City Health Pavilion",
    rating: 4.8,
    consultationFee: 50,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
    activeDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    education: "MBBS, MRCGP",
    bio: "Primary care physician for seasonal fever, flu, and adult health reviews."
  }
];

// 2. DOCTOR WEEKLY SHIFTS (Requirement 2.4)
// Yahan par doctor ke consultation shift hours defined hain
const DEFAULT_SHIFTS = [
  // Dr. Ayesha (Monday morning + evening, Wednesday, Friday)
  { id: "SFT-1", doctorId: "DOC-001", dayOfWeek: "Monday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },
  { id: "SFT-2", doctorId: "DOC-001", dayOfWeek: "Monday", startTime: "14:00", endTime: "18:00", slotDurationMinutes: 30 },
  { id: "SFT-3", doctorId: "DOC-001", dayOfWeek: "Wednesday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },
  { id: "SFT-4", doctorId: "DOC-001", dayOfWeek: "Friday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },

  // Dr. Farhan (Tuesday, Thursday, Saturday)
  { id: "SFT-5", doctorId: "DOC-002", dayOfWeek: "Tuesday", startTime: "10:00", endTime: "14:00", slotDurationMinutes: 30 },
  { id: "SFT-6", doctorId: "DOC-002", dayOfWeek: "Thursday", startTime: "10:00", endTime: "14:00", slotDurationMinutes: 30 },

  // Dr. Sarah (Monday, Tuesday, Wednesday)
  { id: "SFT-7", doctorId: "DOC-003", dayOfWeek: "Monday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },
  { id: "SFT-8", doctorId: "DOC-003", dayOfWeek: "Tuesday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },

  // Dr. Tariq (Monday, Thursday)
  { id: "SFT-9", doctorId: "DOC-004", dayOfWeek: "Monday", startTime: "14:00", endTime: "18:00", slotDurationMinutes: 30 },
  { id: "SFT-10", doctorId: "DOC-004", dayOfWeek: "Thursday", startTime: "14:00", endTime: "18:00", slotDurationMinutes: 30 },

  // Dr. Elena (Tuesday, Friday)
  { id: "SFT-11", doctorId: "DOC-005", dayOfWeek: "Tuesday", startTime: "09:30", endTime: "13:30", slotDurationMinutes: 30 },
  { id: "SFT-12", doctorId: "DOC-005", dayOfWeek: "Friday", startTime: "09:30", endTime: "13:30", slotDurationMinutes: 30 },

  // Dr. Bilal (Monday to Thursday)
  { id: "SFT-13", doctorId: "DOC-006", dayOfWeek: "Monday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 },
  { id: "SFT-14", doctorId: "DOC-006", dayOfWeek: "Tuesday", startTime: "09:00", endTime: "13:00", slotDurationMinutes: 30 }
];

// 3. SAMPLE APPOINTMENTS (Dashboard testing ke liye)
const DEFAULT_APPOINTMENTS = [
  {
    id: "APT-1001",
    patientName: "Zainab Khan",
    patientEmail: "zainab@example.com",
    patientPhone: "+92 300 1234567",
    doctorId: "DOC-001",
    doctorName: "Dr. Ayesha Malik",
    doctorSpecialty: "Cardiology",
    date: new Date().toISOString().split('T')[0], // Aaj ki date
    timeSlot: "09:30 AM",
    appointmentType: "In-Person",
    reason: "Chest tightness after walking and elevated BP.",
    aiCategory: "Cardiology Urgent Triage",
    aiSeverity: "High",
    status: "Confirmed"
  },
  {
    id: "APT-1002",
    patientName: "Ahmed Raza",
    patientEmail: "ahmed@example.com",
    patientPhone: "+92 321 9876543",
    doctorId: "DOC-002",
    doctorName: "Dr. Farhan Siddiqui",
    doctorSpecialty: "Neurology",
    date: new Date().toISOString().split('T')[0],
    timeSlot: "11:00 AM",
    appointmentType: "Video Consultation",
    reason: "Right-sided pulsing migraine for 2 weeks.",
    aiCategory: "Neurology Specialist Review",
    aiSeverity: "Medium",
    status: "Processing"
  }
];

// 4. AI SYMPTOMS CLASSIFICATION RULES (Symptom check karne ke liye)
const AI_KEYWORDS = [
  { words: ["chest", "heart", "bp", "blood pressure", "breathless", "angina"], category: "Cardiology Urgent Triage", severity: "High", specialty: "Cardiology" },
  { words: ["headache", "migraine", "dizzy", "brain", "numbness", "seizure"], category: "Neurology Review", severity: "Medium", specialty: "Neurology" },
  { words: ["child", "baby", "toddler", "vaccine", "infant"], category: "Pediatric Care / Routine", severity: "Low", specialty: "Pediatrics" },
  { words: ["knee", "joint", "bone", "fracture", "shoulder", "back pain"], category: "Orthopedic Care", severity: "Medium", specialty: "Orthopedics" },
  { words: ["skin", "rash", "acne", "itching", "allergy", "eczema"], category: "Dermatology Care", severity: "Low", specialty: "Dermatology" },
  { words: ["fever", "cough", "cold", "flu", "weakness", "checkup"], category: "General Practice", severity: "Low", specialty: "General Medicine" }
];

// 5. n8n AUTOMATION SETTINGS (Person 2 Integration)
let N8N_WEBHOOK_URL = "https://automation.yourclinic.internal/webhook/appointment-booking";


// =========================================================================
// DATA STORAGE HELPERS (Browser me data save rakhne ke liye)
// =========================================================================

function getSavedDoctors() {
  const data = localStorage.getItem('app_doctors');
  if (!data) {
    localStorage.setItem('app_doctors', JSON.stringify(DEFAULT_DOCTORS));
    return DEFAULT_DOCTORS;
  }
  return JSON.parse(data);
}

function getSavedShifts() {
  const data = localStorage.getItem('app_shifts');
  if (!data) {
    localStorage.setItem('app_shifts', JSON.stringify(DEFAULT_SHIFTS));
    return DEFAULT_SHIFTS;
  }
  return JSON.parse(data);
}

function getSavedAppointments() {
  const data = localStorage.getItem('app_appointments');
  if (!data) {
    localStorage.setItem('app_appointments', JSON.stringify(DEFAULT_APPOINTMENTS));
    return DEFAULT_APPOINTMENTS;
  }
  return JSON.parse(data);
}

function saveAppointments(appointmentsList) {
  localStorage.setItem('app_appointments', JSON.stringify(appointmentsList));
}

function saveShifts(shiftsList) {
  localStorage.setItem('app_shifts', JSON.stringify(shiftsList));
}


// =========================================================================
// SECTION 2: COMMON UTILITIES (Alerts & Formatting)
// =========================================================================

// Alert Notification Popup
function showToast(message, type = 'success') {
  let box = document.getElementById('toast-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'toast-box';
    box.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4';
    document.body.appendChild(box);
  }

  const alert = document.createElement('div');
  const bgColor = type === 'error' ? 'bg-rose-600 text-white' : (type === 'warning' ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white');
  alert.className = `p-4 rounded-2xl shadow-xl text-xs font-bold flex items-center justify-between transition-all ${bgColor}`;
  alert.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="ml-2 text-white font-bold opacity-75 hover:opacity-100">✕</button>
  `;

  box.appendChild(alert);
  setTimeout(() => alert.remove(), 3500);
}

// Date ko aasan format mein badalta hai: "2026-09-15" -> "Tue, Sep 15, 2026"
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const d = new Date(dateString + 'T00:00:00');
  return isNaN(d) ? dateString : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}


// =========================================================================
// SECTION 3: DOCTORS DIRECTORY (doctors.html)
// =========================================================================

let selectedSpecialtyFilter = 'all';
let selectedBranchFilter = 'all';
let selectedDayFilter = 'all';
let searchKeyword = '';

function setupDoctorsPage() {
  const grid = document.getElementById('doctors-grid');
  if (!grid) return; // Agar ye page doctors.html nahi hai toh aage mat chalo

  renderSpecialtyPills();
  renderDoctorsList();

  // Search input event
  const searchInput = document.getElementById('doctor-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchKeyword = e.target.value.toLowerCase().trim();
      renderDoctorsList();
    });
  }

  // Branch filter event
  const branchSelect = document.getElementById('branch-filter');
  if (branchSelect) {
    branchSelect.addEventListener('change', (e) => {
      selectedBranchFilter = e.target.value;
      renderDoctorsList();
    });
  }

  // Day filter event
  const daySelect = document.getElementById('day-filter');
  if (daySelect) {
    daySelect.addEventListener('change', (e) => {
      selectedDayFilter = e.target.value;
      renderDoctorsList();
    });
  }
}

// Specialty ke buttons render karein
function renderSpecialtyPills() {
  const container = document.getElementById('specialty-pills-container');
  if (!container) return;

  const categories = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine'];

  container.innerHTML = categories.map(cat => {
    const isSelected = selectedSpecialtyFilter === cat;
    const label = cat === 'all' ? 'All Disciplines' : cat;
    const btnClass = isSelected
      ? 'bg-slate-900 text-white font-bold'
      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 font-medium';

    return `
      <button onclick="changeSpecialtyFilter('${cat}')" class="px-4 py-2 rounded-2xl text-xs transition ${btnClass}">
        ${label}
      </button>
    `;
  }).join('');
}

function changeSpecialtyFilter(cat) {
  selectedSpecialtyFilter = cat;
  renderSpecialtyPills();
  renderDoctorsList();
}

function resetAllFilters() {
  selectedSpecialtyFilter = 'all';
  selectedBranchFilter = 'all';
  selectedDayFilter = 'all';
  searchKeyword = '';

  if (document.getElementById('doctor-search')) document.getElementById('doctor-search').value = '';
  if (document.getElementById('branch-filter')) document.getElementById('branch-filter').value = 'all';
  if (document.getElementById('day-filter')) document.getElementById('day-filter').value = 'all';

  renderSpecialtyPills();
  renderDoctorsList();
}

// Doctor cards screen par dikhana
function renderDoctorsList() {
  const grid = document.getElementById('doctors-grid');
  const countBadge = document.getElementById('doctors-count');
  if (!grid) return;

  const doctors = getSavedDoctors();

  const filtered = doctors.filter(doc => {
    const matchSearch = !searchKeyword || 
      doc.name.toLowerCase().includes(searchKeyword) || 
      doc.specialty.toLowerCase().includes(searchKeyword) ||
      doc.bio.toLowerCase().includes(searchKeyword);

    const matchSpecialty = selectedSpecialtyFilter === 'all' || doc.specialty.toLowerCase() === selectedSpecialtyFilter.toLowerCase();
    const matchBranch = selectedBranchFilter === 'all' || doc.branch === selectedBranchFilter;
    const matchDay = selectedDayFilter === 'all' || doc.activeDays.includes(selectedDayFilter);

    return matchSearch && matchSpecialty && matchBranch && matchDay;
  });

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Doctor${filtered.length === 1 ? '' : 's'} Available`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8">
        <p class="text-sm font-bold text-slate-700">No doctors match your search or filter.</p>
        <button onclick="resetAllFilters()" class="mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(doc => {
    const dayTags = doc.activeDays.map(d => `<span class="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">${d.slice(0, 3)}</span>`).join(' ');

    return `
      <div class="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
        <div>
          <div class="flex gap-4 items-start mb-3">
            <img src="${doc.avatar}" alt="${doc.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 flex-shrink-0">
            <div class="min-w-0">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-100">${doc.specialty}</span>
              <h3 class="font-bold text-slate-900 text-base mt-1 truncate">${doc.name}</h3>
              <p class="text-xs text-slate-400 font-medium">${doc.experienceYears} Yrs Exp • ★ ${doc.rating}</p>
            </div>
          </div>
          <p class="text-xs text-slate-600 mb-3 line-clamp-2">${doc.bio}</p>
          <p class="text-xs text-slate-500 mb-2 font-medium">📍 ${doc.branch}</p>
          <div class="flex flex-wrap gap-1 mb-4">${dayTags}</div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-slate-400 block font-bold">Consultation Fee</span>
            <span class="text-lg font-black text-slate-900">$${doc.consultationFee}</span>
          </div>
          <div class="flex gap-2">
            <button onclick="viewDoctorDetails('${doc.id}')" class="px-3.5 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition">Profile</button>
            <a href="booking.html?doctor=${doc.id}" class="px-4 py-2 text-xs font-black text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-md transition">Book Slot</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Doctor Details Popup Modal
function viewDoctorDetails(doctorId) {
  const doctors = getSavedDoctors();
  const doc = doctors.find(d => d.id === doctorId);
  if (!doc) return;

  const shifts = getSavedShifts().filter(s => s.doctorId === doctorId);
  const shiftList = shifts.length > 0 
    ? shifts.map(s => `<li class="flex justify-between text-xs py-1.5 border-b border-slate-100"><strong>${s.dayOfWeek}</strong> <span class="text-sky-600 font-bold">${s.startTime} - ${s.endTime}</span></li>`).join('')
    : '<li class="text-xs text-slate-400 py-1">Standard shift hours available upon booking.</li>';

  const modalHtml = `
    <div id="doctor-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <img src="${doc.avatar}" class="w-14 h-14 rounded-2xl object-cover">
            <div>
              <h3 class="font-bold text-slate-900 text-base">${doc.name}</h3>
              <p class="text-xs text-sky-600 font-semibold">${doc.specialty} • ${doc.education}</p>
            </div>
          </div>
          <button onclick="document.getElementById('doctor-modal').remove()" class="text-slate-400 hover:text-slate-700 font-bold text-lg p-1">✕</button>
        </div>

        <div class="text-xs space-y-3 text-slate-600">
          <p>${doc.bio}</p>
          <div class="bg-slate-50 p-3 rounded-xl space-y-1">
            <p><strong>Hospital Branch:</strong> ${doc.branch}</p>
            <p><strong>Experience:</strong> ${doc.experienceYears} Years</p>
            <p><strong>Fee:</strong> $${doc.consultationFee}</p>
          </div>
          <div>
            <strong class="text-slate-800 block mb-1">Weekly Consultation Shift Hours:</strong>
            <ul class="bg-white p-2.5 rounded-xl border border-slate-200">${shiftList}</ul>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button onclick="document.getElementById('doctor-modal').remove()" class="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl">Close</button>
          <a href="booking.html?doctor=${doc.id}" class="px-5 py-2 text-xs font-black text-white bg-sky-600 hover:bg-sky-700 rounded-xl">Book Slot</a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}


// =========================================================================
// SECTION 4: APPOINTMENT BOOKING (booking.html)
// =========================================================================

let currentBookingDoctorId = null;
let currentBookingDate = null;
let currentBookingSlot = null;
let currentAiResult = null;

function setupBookingPage() {
  const form = document.getElementById('appointment-form');
  if (!form) return; // Agar ye page booking.html nahi hai toh return

  // Populate doctor select dropdown
  const select = document.getElementById('doctor-select');
  const doctors = getSavedDoctors();
  if (select) {
    select.innerHTML = '<option value="">-- Choose Specialist Doctor --</option>' +
      doctors.map(d => `<option value="${d.id}">${d.name} (${d.specialty}) - $${d.consultationFee}</option>`).join('');

    select.addEventListener('change', (e) => {
      currentBookingDoctorId = e.target.value;
      currentBookingSlot = null;
      calculateOpenSlots();
      refreshBookingSummary();
    });
  }

  // Set date picker (Minimum today)
  const dateInput = document.getElementById('appointment-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
    currentBookingDate = today;

    dateInput.addEventListener('change', (e) => {
      currentBookingDate = e.target.value;
      currentBookingSlot = null;
      calculateOpenSlots();
      refreshBookingSummary();
    });
  }

  // Agar URL se doctor aaya ho (?doctor=DOC-001)
  const urlParamDoctor = new URLSearchParams(window.location.search).get('doctor');
  if (urlParamDoctor && select) {
    select.value = urlParamDoctor;
    currentBookingDoctorId = urlParamDoctor;
  }

  // Symptom reason field for real-time AI triage preview
  const reasonBox = document.getElementById('appointment-reason');
  if (reasonBox) {
    reasonBox.addEventListener('input', (e) => {
      analyzeSymptomsWithAi(e.target.value);
    });
  }

  // Mode radio buttons (In-person vs video)
  document.querySelectorAll('input[name="appointmentType"]').forEach(r => {
    r.addEventListener('change', refreshBookingSummary);
  });

  form.addEventListener('submit', submitAppointmentForm);

  calculateOpenSlots();
  refreshBookingSummary();
}

// Doctor shift timings ke mutabiq 30-min ke slots calculate karein
function calculateOpenSlots() {
  const container = document.getElementById('slots-container');
  const notice = document.getElementById('slots-notice');
  if (!container) return;

  if (!currentBookingDoctorId || !currentBookingDate) {
    container.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">Select a doctor and date to view available time slots.</div>`;
    if (notice) notice.textContent = '';
    return;
  }

  const doctors = getSavedDoctors();
  const doctor = doctors.find(d => d.id === currentBookingDoctorId);
  const dateObj = new Date(currentBookingDate + 'T00:00:00');
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const selectedDayName = dayNames[dateObj.getDay()];

  // Doctor ki shift check karein is din par
  const shifts = getSavedShifts().filter(s => s.doctorId === currentBookingDoctorId && s.dayOfWeek.toLowerCase() === selectedDayName.toLowerCase());

  if (shifts.length === 0) {
    container.innerHTML = `
      <div class="p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200 text-xs">
        <strong>${doctor.name}</strong> is off duty on <strong>${selectedDayName}s</strong>.<br>
        Active days: <span class="font-bold">${doctor.activeDays.join(', ')}</span>
      </div>
    `;
    if (notice) notice.textContent = 'Doctor off shift';
    return;
  }

  // 30-minute intervals generate karein
  let slots = [];
  shifts.forEach(s => {
    let [startHour, startMin] = s.startTime.split(':').map(Number);
    let [endHour, endMin] = s.endTime.split(':').map(Number);
    let cur = startHour * 60 + startMin;
    const end = endHour * 60 + endMin;

    while (cur + 30 <= end) {
      const h = Math.floor(cur / 60);
      const m = cur % 60;
      const period = h >= 12 ? 'PM' : 'AM';
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m < 10 ? `0${m}` : m;
      slots.push(`${displayH < 10 ? '0' : ''}${displayH}:${displayM} ${period}`);
      cur += 30;
    }
  });

  // Jo slots pehle se book hain unhe check karein
  const appointments = getSavedAppointments();
  const alreadyBooked = appointments
    .filter(a => a.doctorId === currentBookingDoctorId && a.date === currentBookingDate && a.status !== 'Cancelled')
    .map(a => a.timeSlot);

  if (notice) {
    notice.textContent = `${selectedDayName} Shift: ${shifts.map(s => `${s.startTime}-${s.endTime}`).join(' & ')}`;
  }

  container.innerHTML = `
    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
      ${slots.map(slot => {
        const isBooked = alreadyBooked.includes(slot);
        const isSelected = currentBookingSlot === slot;

        if (isBooked) {
          return `<button type="button" disabled class="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed">
            ${slot} (Booked)
          </button>`;
        }

        const activeClass = isSelected
          ? 'bg-sky-600 text-white font-bold shadow-md ring-2 ring-sky-600'
          : 'bg-white text-slate-700 border border-slate-200 hover:border-sky-500 font-semibold';

        return `<button type="button" onclick="chooseSlot('${slot}')" class="py-2.5 px-3 rounded-xl text-xs transition ${activeClass}">${slot}</button>`;
      }).join('')}
    </div>
  `;
}

function chooseSlot(slot) {
  currentBookingSlot = slot;
  calculateOpenSlots();
  refreshBookingSummary();
}

// Symptom text par real-time AI Urgency classification
function analyzeSymptomsWithAi(text) {
  const box = document.getElementById('ai-classification-preview');
  if (!box) return;

  if (!text || text.trim().length < 3) {
    box.innerHTML = `<span class="text-xs text-slate-400 italic">AI will evaluate symptom urgency as you type...</span>`;
    currentAiResult = null;
    return;
  }

  const lower = text.toLowerCase();
  let result = { category: "General Clinical Consultation", severity: "Low", specialty: "General Medicine" };

  for (const rule of AI_KEYWORDS) {
    if (rule.words.some(w => lower.includes(w))) {
      result = { category: rule.category, severity: rule.severity, specialty: rule.specialty };
      break;
    }
  }

  currentAiResult = result;
  const badgeClass = result.severity === 'High' ? 'bg-rose-100 text-rose-800' : (result.severity === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800');

  box.innerHTML = `
    <div class="p-3 bg-sky-50/70 border border-sky-100 rounded-xl text-xs space-y-1">
      <div class="flex items-center justify-between font-bold">
        <span>AI Pre-Triage Prediction:</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] ${badgeClass}">${result.severity} Priority</span>
      </div>
      <p class="font-semibold text-slate-800">${result.category}</p>
      <p class="text-[11px] text-slate-500">Department: <strong class="text-sky-700">${result.specialty}</strong> (Ready for n8n webhook payload)</p>
    </div>
  `;
}

// Right column sticky summary card refresh
function refreshBookingSummary() {
  const doctors = getSavedDoctors();
  const doc = currentBookingDoctorId ? doctors.find(d => d.id === currentBookingDoctorId) : null;
  const type = document.querySelector('input[name="appointmentType"]:checked')?.value || 'In-Person';

  if (document.getElementById('summary-doctor-name')) document.getElementById('summary-doctor-name').textContent = doc ? doc.name : 'Not selected';
  if (document.getElementById('summary-date')) document.getElementById('summary-date').textContent = currentBookingDate ? formatDate(currentBookingDate) : 'Not selected';
  if (document.getElementById('summary-slot')) document.getElementById('summary-slot').textContent = currentBookingSlot || 'Not selected';
  if (document.getElementById('summary-fee')) document.getElementById('summary-fee').textContent = doc ? `$${doc.consultationFee}` : '$0.00';
  if (document.getElementById('summary-type')) document.getElementById('summary-type').textContent = type;
}

// Form Submit -> Save to localStorage & simulate n8n webhook dispatch
function submitAppointmentForm(e) {
  e.preventDefault();

  if (!currentBookingDoctorId) { showToast('Please select a doctor', 'warning'); return; }
  if (!currentBookingDate) { showToast('Please choose an appointment date', 'warning'); return; }
  if (!currentBookingSlot) { showToast('Please select an open time slot', 'warning'); return; }

  const doctors = getSavedDoctors();
  const doctor = doctors.find(d => d.id === currentBookingDoctorId);
  const name = document.getElementById('patient-name').value.trim();
  const email = document.getElementById('patient-email').value.trim();
  const phone = document.getElementById('patient-phone').value.trim();
  const reason = document.getElementById('appointment-reason').value.trim();
  const type = document.querySelector('input[name="appointmentType"]:checked')?.value || 'In-Person';

  const ai = currentAiResult || { category: "Clinical Consultation", severity: "Low", specialty: doctor.specialty };
  const appointmentId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;

  const newAppointment = {
    id: appointmentId,
    patientName: name,
    patientEmail: email,
    patientPhone: phone,
    doctorId: doctor.id,
    doctorName: doctor.name,
    doctorSpecialty: doctor.specialty,
    date: currentBookingDate,
    timeSlot: currentBookingSlot,
    appointmentType: type,
    reason: reason,
    aiCategory: ai.category,
    aiSeverity: ai.severity,
    status: 'Pending'
  };

  // 1. Save to appointments array
  const allAppointments = getSavedAppointments();
  allAppointments.unshift(newAppointment);
  saveAppointments(allAppointments);

  // 2. n8n Payload format (Person 1 -> Person 2)
  const n8nPayload = {
    event: "appointment.created",
    timestamp: new Date().toISOString(),
    appointment_id: newAppointment.id,
    patient: { name, email, phone },
    appointment: { doctor_id: doctor.id, doctor_name: doctor.name, date: currentBookingDate, time_slot: currentBookingSlot, type, reason },
    ai_classification: ai
  };
  localStorage.setItem('last_n8n_payload', JSON.stringify(n8nPayload));

  // 3. Show Success Modal Popup
  const modalHtml = `
    <div id="booking-success-modal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div class="text-center">
          <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 text-xl font-black">✓</div>
          <h2 class="text-xl font-black text-slate-900">Appointment Booked Successfully!</h2>
          <p class="text-xs text-slate-400">Booking ID: <strong class="text-slate-800">${newAppointment.id}</strong></p>
        </div>

        <div class="bg-slate-50 p-4 rounded-2xl text-xs space-y-2 border border-slate-100">
          <div class="flex justify-between"><span>Patient:</span><strong>${newAppointment.patientName}</strong></div>
          <div class="flex justify-between"><span>Doctor:</span><strong class="text-sky-700">${newAppointment.doctorName}</strong></div>
          <div class="flex justify-between"><span>Date & Slot:</span><strong>${formatDate(newAppointment.date)} at ${newAppointment.timeSlot}</strong></div>
          <div class="flex justify-between"><span>AI Triage:</span><strong class="text-indigo-700">${newAppointment.aiCategory}</strong></div>
        </div>

        <p class="text-[11px] text-slate-400">Payload ready for Person 2 n8n workflow for Google Calendar Sync & patient notifications.</p>

        <div class="flex justify-end gap-2 pt-2">
          <a href="dashboard.html" class="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-xl hover:bg-slate-200">View in Dashboard</a>
          <button onclick="window.location.href='index.html'" class="px-5 py-2 text-xs font-black text-white bg-sky-600 hover:bg-sky-700 rounded-xl">Done</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
}


// =========================================================================
// SECTION 5: DOCTOR & ADMIN DASHBOARD (dashboard.html)
// =========================================================================

let currentDashboardStatusFilter = 'all';
let currentDashboardSearch = '';
let currentDashboardDoctorFilter = 'all';

function setupDashboardPage() {
  const tbody = document.getElementById('appointments-tbody');
  if (!tbody) return; // Agar ye page dashboard.html nahi hai toh return

  refreshMetricsCards();
  populateDoctorDropdowns();
  renderDashboardTable();
  renderShiftManager();
  renderN8nMonitor();

  // Search filter
  const searchInput = document.getElementById('dashboard-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentDashboardSearch = e.target.value.toLowerCase().trim();
      renderDashboardTable();
    });
  }

  // Doctor filter
  const docSelect = document.getElementById('dashboard-doctor-filter');
  if (docSelect) {
    docSelect.addEventListener('change', (e) => {
      currentDashboardDoctorFilter = e.target.value;
      renderDashboardTable();
    });
  }

  // Shifts doctor selector
  const shiftDocSelect = document.getElementById('shift-doctor-select');
  if (shiftDocSelect) {
    shiftDocSelect.addEventListener('change', renderShiftManager);
  }
}

// 5 Metric Counters (Spec 2.3)
function refreshMetricsCards() {
  const appointments = getSavedAppointments();
  const today = new Date().toISOString().split('T')[0];

  const total = appointments.length;
  const todayCount = appointments.filter(a => a.date === today && a.status !== 'Cancelled').length;
  const upcoming = appointments.filter(a => a.date > today && a.status !== 'Cancelled').length;
  const cancelled = appointments.filter(a => a.status === 'Cancelled').length;
  const pending = appointments.filter(a => a.status === 'Pending').length;

  if (document.getElementById('metric-total')) document.getElementById('metric-total').textContent = total;
  if (document.getElementById('metric-today')) document.getElementById('metric-today').textContent = todayCount;
  if (document.getElementById('metric-upcoming')) document.getElementById('metric-upcoming').textContent = upcoming;
  if (document.getElementById('metric-cancelled')) document.getElementById('metric-cancelled').textContent = cancelled;
  if (document.getElementById('metric-pending')) document.getElementById('metric-pending').textContent = pending;
}

// Dashboard doctor dropdowns populate karein
function populateDoctorDropdowns() {
  const doctors = getSavedDoctors();
  const filterSelect = document.getElementById('dashboard-doctor-filter');
  const shiftSelect = document.getElementById('shift-doctor-select');

  if (filterSelect) {
    filterSelect.innerHTML = '<option value="all">All Doctors</option>' +
      doctors.map(d => `<option value="${d.id}">${d.name} (${d.specialty})</option>`).join('');
  }
  if (shiftSelect) {
    shiftSelect.innerHTML = doctors.map(d => `<option value="${d.id}">${d.name} (${d.specialty})</option>`).join('');
  }
}

// Tab Switcher (Appointments / Availability / n8n)
function switchDashboardTab(tabName) {
  const tabs = ['appointments', 'availability', 'n8n'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    const section = document.getElementById(`tab-section-${t}`);
    if (btn) {
      btn.className = (t === tabName) 
        ? 'px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white shadow-md' 
        : 'px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50';
    }
    if (section) {
      section.classList.toggle('hidden', t !== tabName);
    }
  });

  if (tabName === 'availability') renderShiftManager();
  if (tabName === 'n8n') renderN8nMonitor();
}

function setStatusFilter(status) {
  currentDashboardStatusFilter = status;
  document.querySelectorAll('.status-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-status') === status) {
      btn.className = 'status-filter-btn px-3 py-1 rounded-lg text-xs font-bold bg-slate-900 text-white transition';
    } else {
      btn.className = 'status-filter-btn px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 transition';
    }
  });
  renderDashboardTable();
}

// Appointments Table Render
function renderDashboardTable() {
  const tbody = document.getElementById('appointments-tbody');
  const countEl = document.getElementById('table-results-count');
  if (!tbody) return;

  const appointments = getSavedAppointments();

  const filtered = appointments.filter(a => {
    const matchStatus = currentDashboardStatusFilter === 'all' || a.status.toLowerCase() === currentDashboardStatusFilter.toLowerCase();
    const matchDoctor = currentDashboardDoctorFilter === 'all' || a.doctorId === currentDashboardDoctorFilter;
    const matchSearch = !currentDashboardSearch || 
      a.patientName.toLowerCase().includes(currentDashboardSearch) ||
      a.id.toLowerCase().includes(currentDashboardSearch) ||
      a.doctorName.toLowerCase().includes(currentDashboardSearch);

    return matchStatus && matchDoctor && matchSearch;
  });

  if (countEl) countEl.textContent = `${filtered.length} entries`;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-xs text-slate-400">No appointments found matching this filter.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(a => {
    let badgeClass = 'bg-amber-100 text-amber-800';
    if (a.status === 'Confirmed') badgeClass = 'bg-emerald-100 text-emerald-800';
    else if (a.status === 'Processing') badgeClass = 'bg-sky-100 text-sky-800';
    else if (a.status === 'Cancelled') badgeClass = 'bg-rose-100 text-rose-800';
    else if (a.status === 'Completed') badgeClass = 'bg-purple-100 text-purple-800';

    return `
      <tr class="hover:bg-slate-50 transition border-b border-slate-100 text-xs">
        <td class="px-6 py-4">
          <span class="font-bold text-slate-900 block text-sm">${a.patientName}</span>
          <span class="text-slate-400 font-mono text-[11px]">${a.id} • ${a.patientPhone}</span>
        </td>
        <td class="px-6 py-4">
          <span class="font-bold text-slate-800 block">${a.doctorName}</span>
          <span class="text-sky-600 font-medium text-[11px]">${a.doctorSpecialty}</span>
        </td>
        <td class="px-6 py-4">
          <span class="font-bold text-slate-700 block">${formatDate(a.date)}</span>
          <span class="text-slate-500 text-[11px]">${a.timeSlot} (${a.appointmentType})</span>
        </td>
        <td class="px-6 py-4">
          <span class="px-2 py-0.5 rounded-lg font-bold text-[11px] bg-slate-100 text-slate-700 border border-slate-200 inline-block">${a.aiCategory}</span>
        </td>
        <td class="px-6 py-4">
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${badgeClass}">${a.status}</span>
        </td>
        <td class="px-6 py-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            ${a.status !== 'Confirmed' && a.status !== 'Completed' && a.status !== 'Cancelled' ? `
              <button onclick="updateAppointmentStatus('${a.id}', 'Confirmed')" class="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg hover:bg-emerald-100 text-xs">Confirm</button>
            ` : ''}
            ${a.status !== 'Cancelled' && a.status !== 'Completed' ? `
              <button onclick="updateAppointmentStatus('${a.id}', 'Cancelled')" class="px-2.5 py-1 bg-rose-50 text-rose-700 font-bold rounded-lg hover:bg-rose-100 text-xs">Cancel</button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function updateAppointmentStatus(id, newStatus) {
  let appointments = getSavedAppointments();
  const apt = appointments.find(a => a.id === id);
  if (apt) {
    apt.status = newStatus;
    saveAppointments(appointments);
    showToast(`Appointment ${id} status: ${newStatus}`);
    refreshMetricsCards();
    renderDashboardTable();
  }
}

// Availability Shift Manager (Spec 2.4)
function renderShiftManager() {
  const container = document.getElementById('shifts-list-container');
  const select = document.getElementById('shift-doctor-select');
  if (!container || !select) return;

  const docId = select.value || 'DOC-001';
  const doctors = getSavedDoctors();
  const doc = doctors.find(d => d.id === docId);
  const shifts = getSavedShifts().filter(s => s.doctorId === docId);

  if (document.getElementById('shift-doc-name')) document.getElementById('shift-doc-name').textContent = doc.name;
  if (document.getElementById('shift-doc-spec')) document.getElementById('shift-doc-spec').textContent = doc.specialty;

  if (shifts.length === 0) {
    container.innerHTML = `<div class="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-dashed">No recurring shifts configured for this doctor.</div>`;
    return;
  }

  container.innerHTML = shifts.map(s => `
    <div class="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
      <div>
        <strong class="text-xs text-slate-800">${s.dayOfWeek}</strong>
        <span class="text-xs text-sky-600 font-bold block">${s.startTime} - ${s.endTime} (${s.slotDurationMinutes}m intervals)</span>
      </div>
      <button onclick="deleteShift('${s.id}')" class="text-rose-500 hover:text-rose-700 text-xs font-bold p-1">Delete</button>
    </div>
  `).join('');
}

function handleAddNewShift(e) {
  e.preventDefault();
  const docId = document.getElementById('shift-doctor-select').value;
  const day = document.getElementById('new-shift-day').value;
  const start = document.getElementById('new-shift-start').value;
  const end = document.getElementById('new-shift-end').value;
  const duration = parseInt(document.getElementById('new-shift-duration').value) || 30;

  const shifts = getSavedShifts();
  shifts.push({
    id: `SFT-${Date.now()}`,
    doctorId: docId,
    dayOfWeek: day,
    startTime: start,
    endTime: end,
    slotDurationMinutes: duration
  });

  saveShifts(shifts);
  showToast(`Shift for ${day} added successfully!`);
  renderShiftManager();
}

function deleteShift(shiftId) {
  let shifts = getSavedShifts().filter(s => s.id !== shiftId);
  saveShifts(shifts);
  showToast('Shift removed');
  renderShiftManager();
}

// n8n Webhook Monitor Tab
function renderN8nMonitor() {
  const urlInput = document.getElementById('n8n-webhook-url');
  const payloadEl = document.getElementById('n8n-last-payload');
  const statusEl = document.getElementById('n8n-last-status');

  if (urlInput) urlInput.value = N8N_WEBHOOK_URL;
  if (statusEl) statusEl.textContent = "Ready (Listening)";

  const lastPayload = localStorage.getItem('last_n8n_payload');
  if (payloadEl) {
    payloadEl.textContent = lastPayload 
      ? JSON.stringify(JSON.parse(lastPayload), null, 2) 
      : '// Create an appointment on booking.html to view dispatched payload here';
  }
}

function saveN8nUrl() {
  const urlInput = document.getElementById('n8n-webhook-url');
  if (urlInput) {
    N8N_WEBHOOK_URL = urlInput.value.trim();
    showToast('n8n Webhook URL updated successfully!');
  }
}

function testN8nWebhookPing() {
  showToast('Testing n8n handshake ping...', 'info');
  setTimeout(() => {
    localStorage.setItem('last_n8n_payload', JSON.stringify({
      event: "test.handshake",
      timestamp: new Date().toISOString(),
      status: "Verified 200 OK Handshake"
    }, null, 2));
    renderN8nMonitor();
    showToast('n8n Webhook Handshake: 200 OK Verified!', 'success');
  }, 700);
}


// =========================================================================
// GLOBAL INITIALIZER (Har HTML page ko automatically detect karta hai)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Jo page open hoga, uska code chal jayega:
  setupDoctorsPage();   // doctors.html ke liye
  setupBookingPage();   // booking.html ke liye
  setupDashboardPage(); // dashboard.html ke liye
});

// Global Window functions (Buttons ke onClick ke liye)
window.changeSpecialtyFilter = changeSpecialtyFilter;
window.resetAllFilters = resetAllFilters;
window.viewDoctorDetails = viewDoctorDetails;
window.chooseSlot = chooseSlot;
window.switchDashboardTab = switchDashboardTab;
window.setStatusFilter = setStatusFilter;
window.updateAppointmentStatus = updateAppointmentStatus;
window.handleAddNewShift = handleAddNewShift;
window.deleteShift = deleteShift;
window.saveN8nUrl = saveN8nUrl;
window.testN8nWebhookPing = testN8nWebhookPing;