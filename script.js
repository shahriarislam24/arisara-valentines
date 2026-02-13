// ========================================
// VALENTINE'S DAY WEBSITE - MAIN SCRIPT
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

// Counter for "No" button clicks
let noClickCount = 0;

// Get all screen elements
const transitionScreen = document.getElementById('transition-screen');
const questionScreen = document.getElementById('question-screen');
const yesScreen = document.getElementById('yes-screen');
const noScreen = document.getElementById('no-screen');

// Get button elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// ========================================
// INITIAL TRANSITION ANIMATION - SMOOTH FADE (NO BLUR)
// ========================================
// Wait 3 seconds, then transition to question screen
setTimeout(() => {
    // Fade out transition screen super smoothly (1 second)
    transitionScreen.style.opacity = '0';
    transitionScreen.style.transition = 'opacity 1s ease-in-out';
    
    // After fade completes, remove it and show question screen
    setTimeout(() => {
        transitionScreen.style.display = 'none';
        
        // Show question screen with smooth fade in (1 second)
        questionScreen.classList.remove('blurred');
        questionScreen.classList.add('active');
        questionScreen.style.opacity = '0';
        questionScreen.style.transition = 'opacity 1s ease-in-out';
        
        // Fade in the question screen
        setTimeout(() => {
            questionScreen.style.opacity = '1';
        }, 50);
    }, 1000); // Wait for 1 second fade out
}, 3000);

// ========================================
// YES BUTTON - Go to "Yes" screen
// ========================================
if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        // Hide question screen
        questionScreen.classList.remove('active');
        
        // Show yes screen
        yesScreen.classList.add('active');
    });
}

// ========================================
// NO BUTTON - Move to random position
// ========================================
if (noBtn) {
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Stop event from bubbling
        
        noClickCount++;
        
        // Just keep moving - no limit!
        moveNoButtonRandomly();
    });

    // ========================================
    // FUNCTION: Move "No" button to random position
    // ========================================
    function moveNoButtonRandomly() {
        const buttonRect = noBtn.getBoundingClientRect();
        
        // Calculate available space
        const maxX = window.innerWidth - buttonRect.width - 50;
        const maxY = window.innerHeight - buttonRect.height - 50;
        
        // Generate random position
        const randomX = Math.random() * (maxX - 50) + 25;
        const randomY = Math.random() * (maxY - 50) + 25;
        
        // Apply position with fixed positioning
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '1000';
        
        // Keep original size
        noBtn.style.width = '189px';
        noBtn.style.height = '143px';
        
        // Add rotation
        const randomRotation = Math.random() * 30 - 15;
        noBtn.setAttribute('data-rotation', randomRotation);
        noBtn.style.transform = `rotate(${randomRotation}deg)`;
    }

    // Add hover listener to maintain rotation when hovering after move
    noBtn.addEventListener('mouseenter', () => {
        if (noClickCount >= 3) {
            moveNoButtonRandomly();
        } else if (noBtn.style.position === 'fixed') {
            // If button has moved, maintain rotation on hover
            const currentRotation = parseFloat(noBtn.getAttribute('data-rotation') || 0);
            noBtn.style.transform = `rotate(${currentRotation - 8}deg)`;
        }
    });

    noBtn.addEventListener('mouseleave', () => {
        if (noBtn.style.position === 'fixed') {
            // Restore original rotation when not hovering
            const currentRotation = parseFloat(noBtn.getAttribute('data-rotation') || 0);
            noBtn.style.transform = `rotate(${currentRotation}deg)`;
        }
    });
}

// ========================================
// CONSOLE MESSAGE (Easter egg for developers)
// ========================================
console.log('💕 Happy Valentine\'s Day! 💕');
console.log('Made with love for Pari! ❤️');

}); // End of DOMContentLoaded