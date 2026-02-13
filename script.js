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
    const questionContainer = document.getElementById('questionContainer');
    const resultDiv = document.getElementById('result');
    const progressBar = document.getElementById('progressFill');
    const questionNumberEl = document.getElementById('questionNumber');
    const questionTextEl = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const resultTitleEl = document.getElementById('resultTitle');
    const resultDescEl = document.getElementById('resultDesc');

    const quizData = [
        {
            text: "What do you enjoy doing most in your free time?",
            pictureBased: false,
            options: [
                { text: "Solving puzzles or math problems", stream: "science" },
                { text: "Drawing, painting, or designing", stream: "arts" },
                { text: "Helping people or organizing events", stream: "commerce" },
                { text: "Fixing things or working with tools", stream: "vocational" }
            ]
        },
        {
            text: "Which subject interests you most?",
            pictureBased: true,
            options: [
                { text: "Science & Experiments", emoji: "🔬", stream: "science" },
                { text: "Arts & Creativity", emoji: "🎨", stream: "arts" },
                { text: "Commerce & Numbers", emoji: "💼", stream: "commerce" },
                { text: "Hands-on Skills", emoji: "🔧", stream: "vocational" }
            ]
        },
        {
            text: "When working on a project, you prefer:",
            pictureBased: false,
            options: [
                { text: "Analysing data and finding solutions", stream: "science" },
                { text: "Creating something visually appealing", stream: "arts" },
                { text: "Planning budgets and managing tasks", stream: "commerce" },
                { text: "Building or assembling things physically", stream: "vocational" }
            ]
        },
        {
            text: "Which work environment appeals to you most?",
            pictureBased: true,
            options: [
                { text: "Lab or Research Centre", emoji: "🧪", stream: "science" },
                { text: "Studio or Creative Space", emoji: "🖌️", stream: "arts" },
                { text: "Office or Bank", emoji: "🏛️", stream: "commerce" },
                { text: "Kitchen or Workshop", emoji: "🍳", stream: "vocational" }
            ]
        },
        {
            text: "Your friends would describe you as:",
            pictureBased: false,
            options: [
                { text: "Logical and curious", stream: "science" },
                { text: "Creative and expressive", stream: "arts" },
                { text: "Organised and good with numbers", stream: "commerce" },
                { text: "Practical and hands-on", stream: "vocational" }
            ]
        },
        {
            text: "Pick the activity you'd enjoy most:",
            pictureBased: true,
            options: [
                { text: "Conducting experiments", emoji: "⚗️", stream: "science" },
                { text: "Designing a poster", emoji: "✏️", stream: "arts" },
                { text: "Managing a budget", emoji: "📊", stream: "commerce" },
                { text: "Cooking a meal", emoji: "👨‍🍳", stream: "vocational" }
            ]
        },
        {
            text: "What matters most to you in a career?",
            pictureBased: false,
            options: [
                { text: "Discovery and innovation", stream: "science" },
                { text: "Expression and creativity", stream: "arts" },
                { text: "Growth and financial stability", stream: "commerce" },
                { text: "Practical skills and independence", stream: "vocational" }
            ]
        },
        {
            text: "Which outcome excites you?",
            pictureBased: true,
            options: [
                { text: "Launching a rocket", emoji: "🚀", stream: "science" },
                { text: "Exhibiting your art", emoji: "🖼️", stream: "arts" },
                { text: "Leading a business", emoji: "🏆", stream: "commerce" },
                { text: "Opening your own shop", emoji: "🏪", stream: "vocational" }
            ]
        }
    ];

    const streamResults = {
        science: { title: "Science & Engineering", desc: "You love solving problems and understanding how things work. Explore careers in medicine, engineering, research, and technology.", link: "science.html" },
        arts: { title: "Arts & Creativity", desc: "You thrive on expression and creativity. Explore careers in design, media, performing arts, and social sciences.", link: "arts.html" },
        commerce: { title: "Commerce & Business", desc: "You enjoy numbers, planning, and management. Explore careers in finance, accounting, business, and law.", link: "commerce.html" },
        vocational: { title: "Vocational & Skills", desc: "You prefer hands-on work and practical skills. Explore careers in hospitality, trades, beauty, and IT.", link: "vocational.html" }
    };

    if (questionContainer && resultDiv && optionsContainer) {
        let currentQuestion = 0;
        let scores = { science: 0, arts: 0, commerce: 0, vocational: 0 };

        function renderQuestion() {
            if (currentQuestion >= quizData.length) {
                showResult();
                return;
            }
            const q = quizData[currentQuestion];
            questionNumberEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
            questionTextEl.textContent = q.text;
            progressBar.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;

            optionsContainer.innerHTML = '';
            q.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'option-btn' + (q.pictureBased ? ' picture-option' : '');
                if (q.pictureBased && opt.emoji) {
                    btn.innerHTML = `<span class="option-emoji">${opt.emoji}</span><span>${opt.text}</span>`;
                } else {
                    btn.textContent = opt.text;
                }
                btn.dataset.stream = opt.stream;
                btn.addEventListener('click', () => selectOption(opt.stream));
                optionsContainer.appendChild(btn);
            });
        }

        function selectOption(stream) {
            scores[stream] = (scores[stream] || 0) + 1;
            currentQuestion++;
            renderQuestion();
        }

        function showResult() {
            const topStream = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
            const result = streamResults[topStream];
            questionContainer.style.display = 'none';
            progressBar.style.width = '100%';
            resultTitleEl.textContent = result.title;
            resultDescEl.textContent = result.desc;
            const exploreBtn = resultDiv.querySelector('.btn-primary');
            exploreBtn.href = result.link;
            exploreBtn.textContent = 'Explore ' + result.title;
            resultDiv.style.display = 'block';
        }

        renderQuestion();
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
