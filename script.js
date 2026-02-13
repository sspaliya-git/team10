document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // Mobile Menu Toggle
    // ---------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // ---------------------------------------------------------
    // Highlight active link based on current URL
    // ---------------------------------------------------------
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-links a');
    const menuLength = menuItems.length;
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].className = "active";
        }
    }

    // ---------------------------------------------------------
    // Quiz Logic (quiz.html)
    // ---------------------------------------------------------
    const quizButtons = document.querySelectorAll('.option-btn');
    const questionDiv = document.getElementById('question-1');
    const resultDiv = document.getElementById('result');
    const progressBar = document.querySelector('.progress-fill');

    if (quizButtons.length > 0 && questionDiv && resultDiv) {
        quizButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // In a real app, this would load the next question
                // For this demo, we'll just show the result
                questionDiv.style.display = 'none';
                if (progressBar) progressBar.style.width = '100%';
                resultDiv.style.display = 'block';
            });
        });
    }

    // ---------------------------------------------------------
    // AI Guide Logic (guide.html)
    // ---------------------------------------------------------
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.querySelector('.send-btn');
    const chips = document.querySelectorAll('.chip');

    if (chatMessages && userInput && sendBtn) {

        // Function to handle sending messages
        const sendMessage = (text = null) => {
            const msgText = text || userInput.value.trim();
            if (!msgText) return;

            // Add User Message
            addMessage(msgText, 'user');
            userInput.value = '';

            // Simulate Bot Response
            setTimeout(() => {
                const botResponse = getBotResponse(msgText);
                addMessage(botResponse, 'bot');
                scrollToBottom();
            }, 1000);
        };

        // Helper to add message to DOM
        const addMessage = (text, sender) => {
            const div = document.createElement('div');
            div.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
            div.innerText = text;
            chatMessages.appendChild(div);
            scrollToBottom();
        };

        // Scroll to bottom
        const scrollToBottom = () => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        // Bot Response Logic
        const getBotResponse = (input) => {
            input = input.toLowerCase();
            if (input.includes('coding') || input.includes('computer') || input.includes('software')) {
                return "For coding, Science with Math is usually the best stream! You can then pursue B.Tech (CS/IT) or BCA.";
            } else if (input.includes('design') || input.includes('art') || input.includes('draw')) {
                return "Graphic designers create visuals. You can take any stream, but Arts helps! Look for design exams like NID/NIFT.";
            } else if (input.includes('biology') || input.includes('doctor') || input.includes('medical')) {
                return "Biology requires good memory and understanding. If you like nature and the human body, you'll enjoy it! You can aim for MBBS, BDS, or Pharma.";
            } else if (input.includes('commerce') || input.includes('business') || input.includes('money')) {
                return "Commerce opens doors to CA, CS, BBA, and Finance. Great if you like numbers and business studies!";
            } else {
                return "That's an interesting question! I'm still learning, but I suggest exploring the Discovery page for more details on various careers.";
            }
        };

        // Event Listeners
        sendBtn.addEventListener('click', () => sendMessage());

        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Chip clicks
        chips.forEach(chip => {
            chip.addEventListener('click', function () {
                // The text is inside the chip, but we might want to clean it or use data attributes
                // For now, let's just use the logic we had: send the suggested query
                // We'll extract the query from the click handler or just use the text
                // My previous inline code used specific strings in onclick.
                // Let's use the text content of the chip for simplicity or mapped values.
                // To keep it simple and match previous behavior, I will check the text.

                // Let's just pass the text of the chip
                // NOTE: In the HTML I had `onclick="sendMessage('...')"`.
                // If I remove inline JS, I need to know what text to send.
                // I will update HTML to put the question in `data-question` or just use the text.
                // Let's assume I'll update HTML to have data attributes or just use innerText.
                // Using innerText for now as it's visible.

                // Oops, the HTML had specific queries in the onclick "Best stream for coding?".
                // The chip text is "Best stream for coding?".
                // So passing innerText works.
                sendMessage(this.innerText);
            });
        });
    }

});
