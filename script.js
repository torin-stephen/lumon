// Login functionality
const loginScreen = document.getElementById('loginScreen');
const mainTerminal = document.getElementById('mainTerminal');
const passkeyInput = document.getElementById('passkeyInput');
const loginBtn = document.getElementById('loginBtn');
const CORRECT_PASSKEY = "123";

function handleLogin() {
    if (passkeyInput.value === CORRECT_PASSKEY) {
        loginScreen.classList.add('fade-out');
        setTimeout(() => {
            loginScreen.style.display = 'none';
            mainTerminal.style.display = 'block';
            initFileBrowser();
        }, 1000);
    } else {
        alert("INCORRECT PASSKEY\nPLEASE TRY AGAIN");
        passkeyInput.value = '';
    }
}

loginBtn.addEventListener('click', handleLogin);
passkeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLogin();
});
window.addEventListener('load', () => passkeyInput.focus());

// Terminal functionality
let files = [
    {
        id: 1,
        name: "REFINER_PROTOCOL.txt",
        type: "text",
        content: "MDR REFINER PROTOCOL v4.2.7\n\n1. All refiners must complete their daily quota\n2. No communication about outside world\n3. Report all numbers that provoke emotional response\n4. Kier's wisdom guides all decisions\n\nWARNING: Violations may result in overtime."
    },
    {
        id: 2,
        name: "QUOTA_4872.dat",
        type: "text",
        content: "DAILY QUOTA REPORT\n\nREFINER: M. SCOUT\nCOMPLETED: 87%\nDEFIANT NUMBERS: 4\n\nREFINER: H. RIGGS\nCOMPLETED: 92%\nDEFIANT NUMBERS: 2\n\nREFINER: D. G.\nCOMPLETED: 78%\nDEFIANT NUMBERS: 7"
    },
    {
        id: 3,
        name: "SCOUT_MARK.txt",
        type: "text",
        content: "EMPLOYEE DOSSIER: MARK SCOUT\n\nSTATUS: Active\nDEPARTMENT: Macrodata Refinement\nTENURE: 2 years\n\nNOTES:\n- Former history professor\n- Widower\n- Shows above-average refinement rates\n- Occasionally requires wellness checks"
    },
    {
        id: 4,
        name: "RIGGS_HELENA.txt",
        type: "text",
        content: "EMPLOYEE DOSSIER: HELENA RIGGS\n\nSTATUS: Active\nDEPARTMENT: Macrodata Refinement\nTENURE: 3 months\n\nNOTES:\n- Lumon family connection\n- Strong initial performance\n- Occasional protocol questions\n- Special monitoring required"
    },
    {
        id: 5,
        name: "GRANER_DYLAN.txt",
        type: "text",
        content: "EMPLOYEE DOSSIER: DYLAN GRANER\n\nSTATUS: Active\nDEPARTMENT: Macrodata Refinement\nTENURE: 1.5 years\n\nNOTES:\n- Excellent quota compliance\n- Minimal emotional reactivity\n- Occasionally jokes about overtime\n- Potential candidate for promotion"
    },
    {
        id: 6,
        name: "IRVING_B.txt",
        type: "text",
        content: "EMPLOYEE DOSSIER: IRVING BAILIFF\n\nSTATUS: Active\nDEPARTMENT: Macrodata Refinement\nTENURE: 3 years\n\nNOTES:\n- Longest serving MDR refiner\n- Strict adherence to protocols\n- Frequently quotes Kier\n- Model employee"
    },
    {
        id: 7,
        name: "COLD_HARBOR.dat",
        type: "text",
        content: "ACCESS DENIED\n\nThis file requires Security Level 4 clearance.\n\nPlease contact your supervisor if you believe this is an error.",
        locked: true
    },
    {
        id: 8,
        name: "LUMON_LEGACY.dat",
        type: "text",
        content: "ACCESS DENIED\n\nThis file requires Security Level 4 clearance.\n\nPlease contact your supervisor if you believe this is an error.",
        locked: true
    },
    {
        id: 9,
        name: "MDR_TRAINING.pdf",
        type: "text",
        content: "MACRODATA REFINEMENT TRAINING MANUAL\n\nSection 1: Identifying Defiant Numbers\nSection 2: Proper Bin Allocation\nSection 3: Emotional Recognition Protocols\nSection 4: Kier's Principles for Refinement\n\nCONFIDENTIAL - MDR EYES ONLY"
    },
    {
        id: 10,
        name: "WELLNESS_SESSIONS.txt",
        type: "text",
        content: "WELLNESS SESSION PROTOCOLS\n\n1. All refiners must attend bi-weekly\n2. Sessions last exactly 15 minutes\n3. Only approved topics may be discussed\n4. Report any concerning behavior immediately\n\nAPPROVED TOPICS:\n- Breakfast preferences\n- Dream descriptions\n- Childhood pets"
    },
    {
        id: 11,
        name: "KIER_QUOTES.txt",
        type: "text",
        content: "\"The shadow of my hand will keep you safe.\"\n\n\"A child's mind is a father's sacred sanctuary.\"\n\n\"The two must become one, lest the one become none.\"\n\n\"Work is as natural as leisure.\"\n\n\"The weakest hand will slit the throat of diligence.\""
    },
    {
        id: 12,
        name: "OVERTIME_PROTOCOL.txt",
        type: "text",
        content: "OVERTIME CONTINGENCY PROCEDURES\n\n1. May only be initiated by department head\n2. Maximum duration: 2 hours\n3. Requires dual authentication\n4. Full memory wipe mandatory after completion\n\nWARNING: Repeated overtime may cause\npermanent psychological damage."
    },
    {
        id: 13,
        name: "PERPETUITY_WING.jpg",
        type: "image",
        content: "https://i.imgur.com/JQZqk0a.jpg"
    }
];

let currentFileIndex = 0;
let selectedFileIndex = -1;
let navigationIndex = 0;

const fileListEl = document.getElementById('fileList');
const filePreviewEl = document.getElementById('filePreview');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const newBtn = document.getElementById('newBtn');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');
const statusBarEl = document.getElementById('statusBar');

function initFileBrowser() {
    renderFileList();
    updateStatusBar();
    createScanline();
}

function createScanline() {
    const scanline = document.createElement('div');
    scanline.className = 'scanline';
    document.querySelector('.terminal').appendChild(scanline);
}

function renderFileList() {
    fileListEl.innerHTML = '';
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = `file-item ${file.locked ? 'locked' : ''}`;
        if (file.locked) {
            fileItem.innerHTML = `<i class="fas fa-lock lock-icon"></i> ${file.name}`;
        } else {
            fileItem.textContent = file.name;
        }
        if (index === selectedFileIndex) {
            fileItem.classList.add('selected');
        }
        fileItem.addEventListener('click', () => {
            selectFile(index);
            navigationIndex = index;
        });
        fileListEl.appendChild(fileItem);
    });
}

function selectFile(index) {
    selectedFileIndex = index;
    renderFileList();
    previewFile(files[index]);
    updateStatusBar();
}

function previewFile(file) {
    let content = '';
    
    if (file.locked) {
        content = `
            <div class="locked-file-content">
                <i class="fas fa-lock lock-icon"></i>
                <div>${file.content}</div>
            </div>
        `;
    } else {
        switch(file.type) {
            case 'text':
                content = `<div class="file-content">${file.content}</div>`;
                break;
            case 'image':
                content = `<img src="${file.content}" alt="${file.name}" style="max-height: 70vh;">`;
                break;
            case 'audio':
                content = `<audio controls><source src="${file.content}" type="audio/wav"></audio>`;
                break;
            default:
                content = `<div class="file-content">UNSUPPORTED FILE TYPE</div>`;
        }
    }
    
    filePreviewEl.innerHTML = content;
}

function prevFile() {
    if (!files.length) return;
    navigationIndex = (navigationIndex - 1 + files.length) % files.length;
    selectFile(navigationIndex);
}

function nextFile() {
    if (!files.length) return;
    navigationIndex = (navigationIndex + 1) % files.length;
    selectFile(navigationIndex);
}

function newFile() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">CREATE NEW FILE</h3>
            <input type="text" id="fileNameInput" class="modal-input" placeholder="FILE_NAME.EXT" autofocus>
            <div class="modal-buttons">
                <button id="confirmNewBtn" class="button">CREATE</button>
                <button id="cancelNewBtn" class="button">CANCEL</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirmNewBtn').onclick = () => {
        const fileName = document.getElementById('fileNameInput').value.trim();
        if (fileName) {
            files.push({
                id: Date.now(),
                name: fileName,
                type: "text",
                content: "New file content..."
            });
            renderFileList();
            selectFile(files.length - 1);
            navigationIndex = files.length - 1;
        }
        document.body.removeChild(modal);
    };

    document.getElementById('cancelNewBtn').onclick = () => {
        document.body.removeChild(modal);
    };
    modal.onclick = (e) => e.target === modal && document.body.removeChild(modal);
}

function editCurrentFile() {
    if (selectedFileIndex === -1) return;
    const file = files[selectedFileIndex];
    if (file.locked || file.type !== "text") {
        alert("This file cannot be edited");
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">EDITING: ${file.name}</h3>
            <textarea id="editContent" class="modal-input">${file.content}</textarea>
            <div class="modal-buttons">
                <button id="saveBtn" class="button">SAVE</button>
                <button id="cancelBtn" class="button">CANCEL</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('saveBtn').onclick = () => {
        file.content = document.getElementById('editContent').value;
        previewFile(file);
        document.body.removeChild(modal);
    };
    document.getElementById('cancelBtn').onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => e.target === modal && document.body.removeChild(modal);
}

function deleteCurrentFile() {
    if (selectedFileIndex === -1) return;
    const file = files[selectedFileIndex];
    
    if (file.locked) {
        alert("Restricted files cannot be deleted");
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">PERMANENT ERASURE</h3>
            <p>Confirm deletion of:</p>
            <p><strong>${file.name}</strong></p>
            <p>This action cannot be undone.</p>
            <div class="modal-buttons">
                <button id="confirmDeleteBtn" class="button">CONFIRM</button>
                <button id="cancelDeleteBtn" class="button">CANCEL</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirmDeleteBtn').onclick = () => {
        files.splice(selectedFileIndex, 1);
        if (files.length) {
            navigationIndex = Math.min(navigationIndex, files.length - 1);
            selectedFileIndex = navigationIndex;
            previewFile(files[selectedFileIndex]);
        } else {
            selectedFileIndex = -1;
            filePreviewEl.innerHTML = '<div style="text-align: center; margin-top: 50px;">NO FILES AVAILABLE</div>';
        }
        renderFileList();
        updateStatusBar();
        document.body.removeChild(modal);
    };
    document.getElementById('cancelDeleteBtn').onclick = () => document.body.removeChild(modal);
    modal.onclick = (e) => e.target === modal && document.body.removeChild(modal);
}

function updateStatusBar() {
    const selectedFile = selectedFileIndex >= 0 ? files[selectedFileIndex].name : 'NONE';
    statusBarEl.textContent = `READY | FILES: ${files.length} | SELECTED: ${selectedFile}`;
}

// Event listeners
prevBtn.addEventListener('click', prevFile);
nextBtn.addEventListener('click', nextFile);
newBtn.addEventListener('click', newFile);
editBtn.addEventListener('click', editCurrentFile);
deleteBtn.addEventListener('click', deleteCurrentFile);

// Glitch effects
setInterval(() => {
    if (Math.random() > 0.93) {
        const terminal = document.querySelector('.terminal');
        terminal.style.transform = 'translateX(2px)';
        terminal.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
        setTimeout(() => {
            terminal.style.transform = 'translateX(-2px)';
            terminal.style.boxShadow = '0 0 10px rgba(0, 0, 255, 0.5)';
            setTimeout(() => {
                terminal.style.transform = '';
                terminal.style.boxShadow = '';
            }, 100);
        }, 100);
    }
}, 8000);