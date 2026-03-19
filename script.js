function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

function setValidUntilTime() {
    const now = new Date();
    // Add 1 hour
    now.setHours(now.getHours() + 1);
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const validUntilDisplay = document.getElementById('valid-until-timer');
    if (validUntilDisplay) {
        validUntilDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

let timerSeconds = 1;
function updateTimer() {
    timerSeconds++;
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;
    
    const hStr = String(hours).padStart(2, '0');
    const mStr = String(minutes).padStart(2, '0');
    const sStr = String(seconds).padStart(2, '0');
    
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = `${hStr}:${mStr}:${sStr}`;
    }
}

// Initial calls
updateCurrentTime();
setValidUntilTime();
setInterval(updateCurrentTime, 1000);
setInterval(updateTimer, 1000);

// Carousel Scroll Indicator Logic
document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.getElementById('carousel');
    const dot1 = document.getElementById('dot1');
    const dot2 = document.getElementById('dot2');
    
    if(carousel) {
        // Jump to page 2 (QR code) instantly on load
        carousel.scrollTo({ left: 393, behavior: 'auto' });
        
        carousel.addEventListener('scroll', () => {
            const scrollPos = carousel.scrollLeft;
            const threshold = carousel.clientWidth / 2;
            
            if(scrollPos < threshold) {
                // We are on Page 1
                if(dot1) dot1.className = "dot yellow";
                if(dot2) dot2.className = "dot grey";
            } else {
                // We are on Page 2
                if(dot1) dot1.className = "dot grey";
                if(dot2) dot2.className = "dot yellow";
            }
        });

        // Add mouse drag-to-click functionality for Desktop users
        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.scrollSnapType = 'none'; // pause snap while dragging
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.scrollSnapType = 'x mandatory';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.scrollSnapType = 'x mandatory';
        });

        carousel.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5; 
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});
