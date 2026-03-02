// ==========================================
// 1. CẤU HÌNH CHO 2 NGƯỜI (2 MÃ PIN KHÁC NHAU)
// ==========================================

const PROFILE_1 = {
    pin: "2008",          // Mã PIN người thứ 1
    theme: "green",       // Tone màu mặc định (Xanh lá)
    vidHeader: "Phượng's Video",
    vidSrc: "pj.mp4",
    vidTitle: "The peak moment",
    greeting: "Hello bạn Phượng,",
    message: "Chúc bạn Phượng 8/3 vui vẻ, ngày càng xinh đẹp và tốt nghiệp ngôi trường mong muốn."
};

const PROFILE_2 = {
    pin: "1506",          // Mã PIN cho Phượng (Bạn có thể đổi tùy ý)
    theme: "pink",        // Tone màu sẽ tự chuyển sang Hồng
    vidHeader: "Phương's Video",
    vidSrc: "p.mp4", // Đổi tên video mặc định của bạn ở đây
    vidTitle: "A major glow-up",
    greeting: "Hello Phương,",
    message: "Nhân ngày 8/3, chúc bạn luôn xinh đẹp, vui vẻ và hạnh phúc. Chúc bạn sẽ tốt nghiệp ngôi trường mơ ước"
};

let currentPin = "";
let textToType = ""; // Khai báo biến lưu lời chúc động

// --- LOGIC BÀN PHÍM SỐ ---
function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

function addNumber(num) {
    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();
        document.getElementById("error-msg").style.display = "none";
        
        if (currentPin.length === 4) {
            setTimeout(checkPin, 200);
        }
    }
}

function clearPin() {
    currentPin = "";
    updateDots();
    document.getElementById("error-msg").style.display = "none";
}

function checkPin() {
    if (currentPin === PROFILE_1.pin) {
        applyProfile(PROFILE_1);
    } else if (currentPin === PROFILE_2.pin) {
        applyProfile(PROFILE_2);
    } else {
        document.getElementById("error-msg").style.display = "block";
        currentPin = "";
        updateDots();
    }
}

// Hàm áp dụng giao diện và nội dung tùy theo người nhập Pass
function applyProfile(profile) {
    // 1. Chuyển màn hình
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("main-screen").classList.remove("hidden");

    // 2. Đổi tone màu Web (Thêm class pink-theme nếu là Phượng)
    if (profile.theme === "pink") {
        document.body.classList.add("pink-theme");
    } else {
        document.body.classList.remove("pink-theme");
    }

    // 3. Đổi thông tin Video
    document.getElementById("vid-header").innerText = profile.vidHeader;
    document.getElementById("my-video").src = profile.vidSrc;
    document.getElementById("vid-title").innerText = profile.vidTitle;

    // 4. Đổi thông tin Thư
    document.getElementById("letter-greeting").innerText = profile.greeting;
    textToType = profile.message; // Nạp câu chúc tương ứng vào máy đánh chữ
}

// --- LOGIC MODAL & TYPEWRITER ---
function openModal(modalId) {
    document.getElementById(modalId).classList.remove("hidden");
    if(modalId === 'letter-modal') {
        startTypewriter();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add("hidden");
    if(modalId === 'video-modal') {
        const video = document.getElementById("my-video");
        video.pause();
        document.getElementById("play-pause-btn").innerHTML = "▶";
    }
}

let typeIndex = 0;
let isTyping = false;

function startTypewriter() {
    if (isTyping) return;
    const textElement = document.getElementById("typewriter-text");
    textElement.innerHTML = "";
    typeIndex = 0;
    isTyping = true;
    
    function type() {
        if (typeIndex < textToType.length) {
            textElement.innerHTML += textToType.charAt(typeIndex);
            typeIndex++;
            setTimeout(type, 80); 
        } else {
            isTyping = false;
        }
    }
    type();
}

// --- LOGIC CUSTOM VIDEO PLAYER ---
const video = document.getElementById("my-video");
const playBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const durationDisplay = document.getElementById("duration");

function togglePlay() {
    if (video.paused) {
        video.play();
        playBtn.innerHTML = "⏸";
        playBtn.style.paddingLeft = "0px";
    } else {
        video.pause();
        playBtn.innerHTML = "▶";
        playBtn.style.paddingLeft = "5px";
    }
}

function seekVideo(seconds) {
    video.currentTime += seconds;
}

function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    if(sec < 10) sec = "0" + sec;
    return min + ":" + sec;
}

video.addEventListener("loadedmetadata", () => {
    progressBar.max = Math.floor(video.duration);
    durationDisplay.innerText = formatTime(video.duration);
});

video.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(video.currentTime);
    currentTimeDisplay.innerText = formatTime(video.currentTime);
});

progressBar.addEventListener("input", () => {
    video.currentTime = progressBar.value;
});

video.addEventListener("ended", () => {
    playBtn.innerHTML = "▶";
    playBtn.style.paddingLeft = "5px";
});

// --- LOGIC GIFT MODAL ---
function toggleFullscreen() {
    const giftBox = document.getElementById("gift-box");
    const expandIcon = document.getElementById("expand-icon");
    giftBox.classList.toggle("fullscreen");
    if(giftBox.classList.contains("fullscreen")) {
        expandIcon.innerHTML = "🗗";
    } else {
        expandIcon.innerHTML = "⛶";
    }
}



function openGiftModal() {
    document.getElementById("gift-modal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeGiftModal() {
    document.getElementById("gift-modal").classList.add("hidden");
    document.body.style.overflow = "";
}