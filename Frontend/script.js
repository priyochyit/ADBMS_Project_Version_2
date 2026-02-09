// Language Dictionary
const translations = {
    en: {
        bankTitle: "Chittagong Bank PLC",
        tagline: "Connecting Our Nation to global",
        resources: "Resources",
        audit: "Internal Audit",
        recruitment: "e-Recruitment",
        status: "Status: Secured",
        navigation: "Navigation",
        language: "Language",
        locations: "Locations",
        chattogram: "Chattogram",
        dhaka: "Dhaka",
        agrabad: "Agrabad Branch (Head Office)",
        agrabadAddr: "24/A Tower, Commercial Area",
        gec: "GEC Corporate Branch",
        gecAddr: "Central Plaza, CDA Avenue",
        open: "Open:",
        dhakaSoon: "Dhaka Branch Opening Soon",
        dhakaSoonDesc: "Our Corporate Presence is Coming to the Capital City",
        securityHub: "Security Hub",
        infraActive: "Infrastructure Active",
        encLayer: "Encryption Layer:",
        aes: "AES-256 GCM",
        fund: "Fund Transfer",
        statement: "E-Statement",
        cards: "Cards Control",
        noticeTitle: "System Notices & Job Circulars",
        liveUpdates: "Live Updates",
        branchDirectory: "Regional Branch Directory",
        login: "Login",
        register: "Register"
    },
    bn: {
        bankTitle: "চট্টগ্রাম ব্যাংক পিএলসি",
        tagline: "আমাদের জাতিকে বিশ্বের সাথে যুক্ত করছি",
        resources: "রিসোর্স",
        audit: "অভ্যন্তরীণ অডিট",
        recruitment: "ই-রিক্রুটমেন্ট",
        status: "অবস্থা: সুরক্ষিত",
        navigation: "নেভিগেশন",
        language: "ভাষা",
        locations: "অবস্থান",
        chattogram: "চট্টগ্রাম",
        dhaka: "ঢাকা",
        agrabad: "আগ্রাবাদ শাখা (প্রধান কার্যালয়)",
        agrabadAddr: "২৪/এ টাওয়ার, বাণিজ্যিক এলাকা",
        gec: "জিইসি কর্পোরেট শাখা",
        gecAddr: "সেন্ট্রাল Plaza, সিডিএ এভিনিউ",
        open: "খোলা:",
        dhakaSoon: "ঢাকা শাখা শীঘ্রই আসছে",
        dhakaSoonDesc: "রাজধানী শহরে আমাদের কর্পোরেট উপস্থিতি আসছে",
        securityHub: "সিকিউরিটি হাব",
        infraActive: "ইনফ্রাস্ট্রাকচার সচল",
        encLayer: "এনক্রিপশন স্তর:",
        aes: "AES-২৫৬ GCM",
        fund: "তহবিল স্থানান্তর",
        statement: "ই-স্টেটমেন্ট",
        cards: "কার্ড নিয়ন্ত্রণ",
        noticeTitle: "সিস্টেম নোটিশ ও নিয়োগ বিজ্ঞপ্তি",
        liveUpdates: "সরাসরি আপডেট",
        branchDirectory: "আঞ্চলিক শাখা ডিরেক্টরি",
        login: "লগইন",
        register: "নিবন্ধন"
    }
};

// Data Persistence Logic
// Using 'let' allows us to modify the array, but we will use splice for deletions
let usersData = JSON.parse(localStorage.getItem('adms_records')) || [
    { id: 101, name: "Priyabrata Chowdhury", email: "admin@cbl.com", role: "Admin", branch: "Agrabad" }
];

const Lang = {
    current: 'en',
    switch(lang) {
        this.current = lang;
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key]) el.innerText = translations[lang][key];
        });
        document.querySelectorAll('.lang-switch-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`lang-${lang}`);
        if(activeBtn) activeBtn.classList.add('active');
        UI.showToast(lang === 'bn' ? "ভাষা পরিবর্তন করা হয়েছে" : "Language Switched", "success");
    }
};

const UI = {
    selectedRole: 'user',
    
    toggleTheme() {
        const html = document.documentElement;
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Persist theme
        this.showToast(`Theme: ${isDark ? 'Dark' : 'Light'}`, "success");
    },

    toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        if(menu) menu.classList.toggle('hidden');
    },

    openNavModal(type) {
        const content = {
            resources: `<h2 class="text-xl font-bold mb-4 text-[#b8a180]">Resources</h2><p>Access banking guidelines and forms.</p>`,
            audit: `<h2 class="text-xl font-bold mb-4 text-[#b8a180]">Internal Audit</h2><p>Regulatory compliance documents.</p>`,
            recruitment: `<h2 class="text-xl font-bold mb-4 text-[#b8a180]">e-Recruitment</h2><p>Join the team at Chittagong Bank.</p>`
        };
        document.getElementById('modalContent').innerHTML = content[type] || '';
        document.getElementById('infoModal').style.display = 'flex';
    },

    openFeatureModal(type) {
        const content = {
            fund: `<h2 class="text-xl font-bold mb-4 text-[#b8a180]">Fund Transfer</h2><input type="text" placeholder="Account Number" class="input-base w-full p-3 rounded-xl mb-4"><button class="w-full bg-[#b8a180] text-white py-3 rounded-xl">Verify</button>`,
            statement: `<h2 class="text-xl font-bold mb-4 text-[#b8a180]">E-Statement</h2><p>Generating secure PDF...</p>`,
            cards: `<h2 class="text-xl font-bold mb-4 text-[#b8a180]">Cards Control</h2><p>Security lock enabled.</p>`
        };
        document.getElementById('modalContent').innerHTML = content[type] || '';
        document.getElementById('infoModal').style.display = 'flex';
    },

    closeModal() {
        document.getElementById('infoModal').style.display = 'none';
    },

    showToast(msg, type) {
        const toast = document.getElementById('toast');
        if(toast) {
            toast.innerText = msg;
            toast.className = `toast toast-${type}`;
            toast.style.display = 'block';
            setTimeout(() => toast.style.display = 'none', 3000);
        }
    },

    filterBranch(region) {
        document.getElementById('group-chattogram').classList.toggle('hidden', region !== 'chattogram');
        document.getElementById('group-dhaka').classList.toggle('hidden', region !== 'dhaka');
        document.getElementById('tab-chattogram').classList.toggle('active', region === 'chattogram');
        document.getElementById('tab-dhaka').classList.toggle('active', region === 'dhaka');
    },

    switchTab(tab) {
        const loginPortal = document.getElementById('login-portal');
        const registerPortal = document.getElementById('register-portal');
        const loginBtn = document.getElementById('login-btn');
        const registerBtn = document.getElementById('register-btn');

        if (tab === 'login') {
            loginPortal.classList.remove('hidden');
            registerPortal.classList.add('hidden');
            loginBtn.classList.add('active');
            registerBtn.classList.remove('active');
        } else {
            registerPortal.classList.remove('hidden');
            loginPortal.classList.add('hidden');
            registerBtn.classList.add('active');
            loginBtn.classList.remove('active');
        }
    },

    toggleRegFields(role) {
        this.selectedRole = role;
        const adminFields = document.getElementById('admin-fields');
        document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`role-${role}`);
        if(activeBtn) activeBtn.classList.add('active');

        if (role === 'admin' || role === 'staff') {
            if(adminFields) adminFields.classList.remove('hidden');
        } else {
            if(adminFields) adminFields.classList.add('hidden');
        }
    },

    handleLogin() {
        const id = document.getElementById('login-id').value;
        const pass = document.getElementById('login-pass').value;
        
        if(!id || !pass) {
            this.showToast("Fields cannot be empty", "error");
            return;
        }

        if(this.selectedRole === 'admin') {
            this.showToast("Admin Session Started", "success");
            document.getElementById('login-portal').classList.add('hidden');
            document.getElementById('tab-switcher').classList.add('hidden');
            document.getElementById('admin-dashboard').classList.remove('hidden');
            const logoutBtn = document.getElementById('logout-nav-btn');
            if(logoutBtn) logoutBtn.classList.remove('hidden');
            
            // Force render table immediately
            Admin.renderTable();
        } else {
            this.showToast('Logging in as User...', 'success');
        }
    },

    logout() {
        location.reload();
    },

    handleRegistration(e) {
        e.preventDefault();
        this.showToast("Registered Locally", "success");
        setTimeout(() => this.switchTab('login'), 1000);
        return false;
    },

    triggerBiometric(type) {
        const status = type === 'login' ? 'bio-login-txt' : 'bio-reg-status';
        const el = document.getElementById(status);
        if(el) {
            el.innerText = "Scanning...";
            setTimeout(() => {
                el.innerText = "Verified";
                this.showToast("Biometric Success", "success");
            }, 1000);
        }
    }
};

// Admin Operations (CRUD System - OPTIMIZED)
const Admin = {
    saveToStorage() {
        localStorage.setItem('adms_records', JSON.stringify(usersData));
    },
    
    renderTable() {
        const tbody = document.getElementById('admin-table-body');
        if(!tbody) return;
        
        if(usersData.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center py-4 text-slate-500">No records found</td></tr>`;
            return;
        }

        tbody.innerHTML = usersData.map(user => `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.branch}</td>
                <td class="flex gap-2">
                    <button onclick="Admin.editRecord(${user.id})" class="text-[#b8a180] font-bold hover:text-[#a38d6d] transition">Edit</button>
                    <button onclick="Admin.deleteRecord(${user.id})" class="text-red-500 font-bold hover:text-red-700 transition">Delete</button>
                </td>
            </tr>
        `).join('');
    },

    openAddModal() {
        const content = `
            <h2 class="text-xl font-black text-[#b8a180] mb-6 uppercase">Add Record</h2>
            <form id="crud-form" class="space-y-4" onsubmit="Admin.createRecord(event)">
                <input type="text" id="db-name" placeholder="Full Name" required class="input-base w-full h-11 px-4 rounded-lg">
                <input type="email" id="db-email" placeholder="Email" required class="input-base w-full h-11 px-4 rounded-lg">
                <select id="db-role" class="w-full h-11 px-4 rounded-lg input-base">
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit" class="w-full bg-[#b8a180] text-white py-3 rounded-xl font-bold uppercase hover:bg-[#a38d6d] transition">Submit</button>
            </form>
        `;
        document.getElementById('modalContent').innerHTML = content;
        document.getElementById('infoModal').style.display = 'flex';
    },

    createRecord(e) {
        e.preventDefault();
        // Use Date.now() for better unique IDs
        const newRecord = {
            id: Math.floor(Date.now() / 100000), 
            name: document.getElementById('db-name').value,
            email: document.getElementById('db-email').value,
            role: document.getElementById('db-role').value,
            branch: "Agrabad"
        };
        usersData.push(newRecord);
        this.saveToStorage(); 
        UI.showToast("Record Added", "success");
        UI.closeModal();
        this.renderTable();
    },

    editRecord(id) {
        const user = usersData.find(u => u.id === id);
        if(!user) return;
        
        const content = `
            <h2 class="text-xl font-black text-[#b8a180] mb-6 uppercase">Update Record</h2>
            <form id="crud-form" class="space-y-4" onsubmit="Admin.updateRecord(event, ${id})">
                <input type="text" id="db-name" value="${user.name}" required class="input-base w-full h-11 px-4 rounded-lg">
                <input type="email" id="db-email" value="${user.email}" required class="input-base w-full h-11 px-4 rounded-lg">
                <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-xl font-bold uppercase hover:bg-blue-700 transition">Update</button>
            </form>
        `;
        document.getElementById('modalContent').innerHTML = content;
        document.getElementById('infoModal').style.display = 'flex';
    },

    updateRecord(e, id) {
        e.preventDefault();
        const index = usersData.findIndex(u => u.id === id);
        if(index !== -1) {
            usersData[index].name = document.getElementById('db-name').value;
            usersData[index].email = document.getElementById('db-email').value;
            this.saveToStorage();
            UI.showToast("Record Updated", "success");
            UI.closeModal();
            this.renderTable();
        }
    },

    // FIXED DELETE FUNCTION
    deleteRecord(id) {
        if(confirm("Permanently delete this record?")) {
            // Finding the index of the item
            const index = usersData.findIndex(user => user.id === id);
            
            if (index !== -1) {
                // Using splice to remove the item directly from the array
                // This is safer than re-assigning the variable
                usersData.splice(index, 1);
                
                // Save and Re-render
                this.saveToStorage();
                this.renderTable();
                
                UI.showToast("Record Deleted", "error"); // Using 'error' color for deletion alert
            } else {
                UI.showToast("Record not found", "error");
            }
        }
    }
};

const updateRates = () => {
    ['usd', 'eur', 'gbp'].forEach(cur => {
        const el = document.getElementById(`rate-${cur}`);
        if(!el) return;
        let val = parseFloat(el.innerText), change = (Math.random() * 0.1 - 0.05);
        if (!isNaN(val)) {
            el.innerText = (val + change).toFixed(2);
        }
    });
};

setInterval(updateRates, 5000);

document.addEventListener('DOMContentLoaded', () => {
    // Ensuring the theme is set correctly on load
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Initial Render check (if needed)
    // Admin.renderTable(); // Uncomment if table is visible by default

});
