 // Wishlist items array
const wishlistItems = [
    { name: "Upgrade phone", note: "📱 new device" },
    { name: "Skincare - Laluz", note: "✨ glowy skin" },
    { name: "Money + flowers", note: "💐💰 perfect combo" },
    { name: "Puma ballet shoes 😍 anything ballet shoes", note: "🩰 balletcore dream" },
    { name: "Juicer", note: "🥤 fresh mornings" },
    { name: "Maybelline makeup - ask my shade", note: "💄 find my match" },
    { name: "IPad/tablet", note: "🎨 digital dreams" },
    { name: "Vlogging Kit", note: "📸 creator era" },
    { name: "Gym sets", note: "💪 fit & fierce" },
    { name: "Jewellery + passport holder", note: "🔑 allergy safe" },
    { name: "Handbags", note: "👜 carry elegance" },
    { name: "Wigs", note: "💇‍♀️ switch the vibe" },
    { name: "Sneakers 💋", note: "👟 walk in style" },
    { name: "Laptop", note: "💻 work & create" },
    { name: "Big teddy bear", note: "🧸 cuddle giant" }
];

let checkedState = new Array(wishlistItems.length).fill(false);

// Load saved data from localStorage
function loadData() {
    const saved = localStorage.getItem('wishlistPink2026');
    if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length === wishlistItems.length) {
            checkedState = parsed;
        }
    }
    
    const savedPhoto = localStorage.getItem('userPhoto');
    if (savedPhoto) {
        document.getElementById('profilePhoto').src = savedPhoto;
        document.getElementById('profilePhoto').style.display = 'block';
        document.getElementById('photoPlaceholder').style.display = 'none';
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('wishlistPink2026', JSON.stringify(checkedState));
}

// Update progress bar and counter
function updateProgress() {
    const completed = checkedState.filter(v => v === true).length;
    const percent = (completed / wishlistItems.length) * 100;
    document.getElementById('progressFill').style.width = `${percent}%`;
    document.getElementById('progressLabel').innerText = `${completed}/${wishlistItems.length} fulfilled`;
    
    // Celebration effect when all completed
    if (completed === wishlistItems.length) {
        const footer = document.querySelector('.footer');
        footer.style.background = "linear-gradient(135deg, #ffe0e8, #ffd4e0)";
        setTimeout(() => {
            footer.style.background = "linear-gradient(135deg, #fff5f8, #ffeef4)";
        }, 1000);
    }
}

// Render the wishlist
function renderWishlist() {
    const container = document.getElementById('wishlistContainer');
    container.innerHTML = '';
    
    wishlistItems.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'wish-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checkedState[index];
        checkbox.addEventListener('change', (e) => {
            checkedState[index] = e.target.checked;
            saveData();
            renderWishlist();
            updateProgress();
        });
        
        const textSpan = document.createElement('div');
        textSpan.className = 'item-text';
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'item-name';
        nameSpan.textContent = item.name;
        if (checkedState[index]) {
            nameSpan.classList.add('completed-text');
        }
        
        const noteSpan = document.createElement('span');
        noteSpan.className = 'item-note';
        noteSpan.textContent = item.note;
        
        textSpan.appendChild(nameSpan);
        textSpan.appendChild(noteSpan);
        
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(textSpan);
        container.appendChild(itemDiv);
    });
}

// Reset all items
function resetAll() {
    if (confirm('💗 Reset all wishlist items? 💗')) {
        checkedState.fill(false);
        saveData();
        renderWishlist();
        updateProgress();
    }
}

// Share wishlist
function shareWishlist() {
    const completed = checkedState.filter(v => v === true).length;
    const total = wishlistItems.length;
    const completedItems = wishlistItems.filter((_, i) => checkedState[i]).map(item => item.name);
    const pendingItems = wishlistItems.filter((_, i) => !checkedState[i]).map(item => item.name);
    
    let text = `💗 MY PINK WISHLIST · 15 June 2026 💗\n${completed}/${total} dreams fulfilled\n\n`;
    if (completedItems.length) text += `✅ Completed: ${completedItems.join(', ')}\n\n`;
    if (pendingItems.length) text += `💫 Still wishing: ${pendingItems.join(', ')}\n\n`;
    text += `🌸 Manifesting all these pink dreams! 🌸\n#PinkWishlist #Manifesting`;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('💗 Wishlist copied! Share with your loved ones 💗');
    });
}

// Photo upload functions
function openPhotoUpload() {
    document.getElementById('photoModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('photoModal').style.display = 'none';
}

function uploadPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoUrl = e.target.result;
            document.getElementById('profilePhoto').src = photoUrl;
            document.getElementById('profilePhoto').style.display = 'block';
            document.getElementById('photoPlaceholder').style.display = 'none';
            localStorage.setItem('userPhoto', photoUrl);
            closeModal();
        };
        reader.readAsDataURL(file);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('photoModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize everything
loadData();
renderWishlist();
updateProgress();

// Add event listeners
document.getElementById('resetBtn').addEventListener('click', resetAll);
document.getElementById('shareBtn').addEventListener('click', shareWishlist);
