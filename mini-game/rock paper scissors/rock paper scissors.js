
    const resultDiv = document.getElementById('resultMsg');
    let userScoreSpan = document.getElementById('userScore');
    let compScoreSpan = document.getElementById('compScore');
    let userScore = 0, compScore = 0;

    
    function getWinner(user, computer) {
        if (user === computer) return 'مساوی';
        if (
            (user === 'سنگ' && computer === 'قیچی') ||
            (user === 'کاغذ' && computer === 'سنگ') ||
            (user === 'قیچی' && computer === 'کاغذ')
        ) {
            return 'کاربر';
        }
        return 'کامپیوتر';
    }

    
    function computerChoice() {
        const items = ['سنگ', 'کاغذ', 'قیچی'];
        const randomIndex = Math.floor(Math.random() * 3);
        return items[randomIndex];
    }

    function getEmoji(choice) {
        if (choice === 'سنگ') return '🌚';
        if (choice === 'کاغذ') return '📄';
        return '✂️';
    }

    function playGame(userChoice) {
        const compChoice = computerChoice();
        const winner = getWinner(userChoice, compChoice);

        let resultText = `🧑 ${getEmoji(userChoice)}  vs  ${getEmoji(compChoice)} 🤖<br>`;

        if (winner === 'مساوی') {
            resultText += `🤝 مساوی! هر دو ${userChoice} زدید.`;
        } else if (winner === 'کاربر') {
            resultText += `🎉 تو بردی! ${userChoice} برنده شد مقابل ${compChoice}.`;
            userScore++;
        } else {
            resultText += `💔 کامپیوتر برد! ${compChoice} بهتر از ${userChoice} بود.`;
            compScore++;
        }

        userScoreSpan.innerText = userScore;
        compScoreSpan.innerText = compScore;
        resultDiv.innerHTML = resultText;
    }

    
    function resetGame() {
        userScore = 0;
        compScore = 0;
        userScoreSpan.innerText = '0';
        compScoreSpan.innerText = '0';
        resultDiv.innerHTML = ' امتیازها صفر شد! بازی رو شروع کن ';
    }

    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const userChoice = btn.getAttribute('data-choice');
            playGame(userChoice);
        });
    });

    document.getElementById('resetBtn').addEventListener('click', resetGame);
