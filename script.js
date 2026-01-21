const emojis = ['🎈', '🎉', '🎊', '🎁', '🎂', '🥳', '✨', '🌟', '💖', '🎵'];
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#00d2d3'];
let currentPhotoIndex = 0;
let slideshowInterval;

function startSlideshow() {
    const photos = document.querySelectorAll('.gallery-photo');
    const captions = document.querySelectorAll('.photo-caption');
    
    if (photos.length === 0) return;
    
    slideshowInterval = setInterval(() => {
        photos[currentPhotoIndex].classList.remove('active');
        captions[currentPhotoIndex].classList.remove('active');
        
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        
        photos[currentPhotoIndex].classList.add('active');
        captions[currentPhotoIndex].classList.add('active');
    }, 3000); // Her 3 saniyede bir değişir
}

function celebrate() {
    const name = document.getElementById('nameInput').value.trim();
    
    if (!name) {
        alert('Lütfen bir isim girin! 😊');
        return;
    }
    
    document.getElementById('inputSection').style.display = 'none';
    document.getElementById('celebration').classList.add('active');
    document.getElementById('celebrationText').textContent = `${name} 🎉`;
    
    // Müziği başlat
    const musicPlayer = document.getElementById('musicPlayer');
    musicPlayer.play().catch(e => console.log('Otomatik müzik çalma engellendi'));
    
    startSlideshow();
    createEmojiRain();
    createBalloons();
    createConfetti();
    playSound();
}

function createEmojiRain() {
    const container = document.getElementById('emojiRain');
    
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = (Math.random() * 3 + 3) + 's';
        emoji.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 6000);
    }, 300);
}

function createBalloons() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.textContent = '🎈';
            balloon.style.left = Math.random() * 90 + '%';
            balloon.style.top = Math.random() * 80 + 10 + '%';
            balloon.style.animationDelay = Math.random() * 2 + 's';
            
            balloon.onclick = function() {
                this.style.animation = 'none';
                this.textContent = '22';
                this.style.fontSize = '40px';
                this.style.fontWeight = 'bold';
                setTimeout(() => this.remove(), 1000);
            };
            
            document.body.appendChild(balloon);
        }, i * 200);
    }
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }
}

function playSound() {
    // Sesli kutlama için basit bir "ding" sesi simülasyonu
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99];
    
    notes.forEach((freq, index) => {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = freq;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }, index * 200);
    });
}

function reset() {
    document.getElementById('inputSection').style.display = 'block';
    document.getElementById('celebration').classList.remove('active');
    document.getElementById('nameInput').value = '';
    document.getElementById('musicPlayer').pause();
    document.getElementById('musicPlayer').currentTime = 0;
    
    // Slideshow'u durdur
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
    
    currentPhotoIndex = 0;
    
    document.querySelectorAll('.gallery-photo').forEach((p, i) => {
        p.classList.remove('active');
        if (i === 0) p.classList.add('active');
    });
    
    document.querySelectorAll('.photo-caption').forEach((c, i) => {
        c.classList.remove('active');
        if (i === 0) c.classList.add('active');
    });
    
    // Balonları temizle
    document.querySelectorAll('.balloon').forEach(b => b.remove());
}

// Enter tuşu ile kutlama
document.getElementById('nameInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        celebrate();
    }
});