
    
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';      // X همیشه شروع کننده (انسان)
    let gameActive = true;
    let isAgainstComputer = true;  // پیش‌فرض بازی با کامپیوتر
    
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    
    const boardElement = document.getElementById('board');
    const statusMsg = document.getElementById('statusMsg');
    const turnSpan = document.getElementById('turn');
    
   
    function createBoard() {
        boardElement.innerHTML = '';
        for(let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if(board[i] === 'X') cell.classList.add('X');
            if(board[i] === 'O') cell.classList.add('O');
            cell.textContent = board[i];
            cell.addEventListener('click', () => handleMove(i));
            boardElement.appendChild(cell);
        }
    }
    
    
    function checkWinner() {
        for(let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if(board.every(cell => cell !== '')) return 'tie';
        return null;
    }
    
    
    function highlightWinnerCells() {
        for(let pattern of winPatterns) {
            const [a,b,c] = pattern;
            if(board[a] && board[a] === board[b] && board[a] === board[c]) {
                const cells = document.querySelectorAll('.cell');
                [a,b,c].forEach(idx => {
                    cells[idx].style.background = "#ffecb3";
                    cells[idx].style.transform = "scale(1.02)";
                });
                break;
            }
        }
    }
    
    
    function computerMove() {
        if(!gameActive) return;
        if(currentPlayer !== 'O') return;
        
        
        setTimeout(() => {
            if(!gameActive || currentPlayer !== 'O') return;
            
            let move = getBestMove();
            
            if(move !== -1 && board[move] === '') {
                board[move] = 'O';
                
                const winner = checkWinner();
                if(winner) {
                    gameActive = false;
                    if(winner === 'tie') {
                        statusMsg.innerHTML = "🤝 بازی مساوی شد! 🤝";
                    } else {
                        statusMsg.innerHTML = `🤖 کامپیوتر (${winner}) برنده شد! 🤖`;
                        highlightWinnerCells();
                    }
                    createBoard();
                    return;
                }
                
                currentPlayer = 'X';
                turnSpan.textContent = 'X';
                statusMsg.innerHTML = `🎮 نوبت: <span id="turn">X</span> (شما)`;
                createBoard();
            }
        }, 150);
    }
    
    
    function getBestMove() {
        // 1. بررسی حرکت برد کامپیوتر
        for(let i = 0; i < 9; i++) {
            if(board[i] === '') {
                board[i] = 'O';
                if(checkWinner() === 'O') {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        
        for(let i = 0; i < 9; i++) {
            if(board[i] === '') {
                board[i] = 'X';
                if(checkWinner() === 'X') {
                    board[i] = '';
                    return i;
                }
                board[i] = '';
            }
        }
        
        
        if(board[4] === '') return 4;
        
        
        const corners = [0,2,6,8];
        const availableCorners = corners.filter(i => board[i] === '');
        if(availableCorners.length > 0) {
            return availableCorners[Math.floor(Math.random() * availableCorners.length)];
        }
        
        
        const edges = [1,3,5,7];
        const availableEdges = edges.filter(i => board[i] === '');
        if(availableEdges.length > 0) {
            return availableEdges[Math.floor(Math.random() * availableEdges.length)];
        }
        
        return -1;
    }
    
    
    function handleMove(index) {
        if(!gameActive) return;
        if(board[index] !== '') return;
        
    
        if(!isAgainstComputer) {
            if(board[index] === '') {
                board[index] = currentPlayer;
                
                const winner = checkWinner();
                if(winner) {
                    gameActive = false;
                    if(winner === 'tie') {
                        statusMsg.innerHTML = "🤝 بازی مساوی شد! 🤝";
                    } else {
                        statusMsg.innerHTML = `🎉🏆 بازیکن ${winner} برنده شد! 🏆🎉`;
                        highlightWinnerCells();
                    }
                    createBoard();
                    return;
                }
                
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                turnSpan.textContent = currentPlayer;
                statusMsg.innerHTML = `🎮 نوبت: <span id="turn">${currentPlayer}</span>`;
                createBoard();
            }
            return;
        }
        
        
        if(currentPlayer !== 'X') return;
        
        
        board[index] = 'X';
        
        const winner = checkWinner();
        if(winner) {
            gameActive = false;
            if(winner === 'tie') {
                statusMsg.innerHTML = "🤝 بازی مساوی شد! 🤝";
            } else {
                statusMsg.innerHTML = `🎉 شما برنده شدید! 🎉`;
                highlightWinnerCells();
            }
            createBoard();
            return;
        }
        
        
        currentPlayer = 'O';
        turnSpan.textContent = 'O';
        statusMsg.innerHTML = `🤖 نوبت: کامپیوتر (O) 🤖`;
        createBoard();
        
        
        computerMove();
    }
    
    
    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        
        if(isAgainstComputer) {
            turnSpan.textContent = 'X';
            statusMsg.innerHTML = `🎮 نوبت: <span id="turn">X</span> (شما)`;
        } else {
            turnSpan.textContent = 'X';
            statusMsg.innerHTML = `🎮 نوبت: <span id="turn">X</span>`;
        }
        createBoard();
    }
    
    
    function setMode(isComputer) {
        isAgainstComputer = isComputer;
        resetGame();
        
        // به‌روزرسانی دکمه‌های فعال
        document.getElementById('modePVP').classList.remove('active');
        document.getElementById('modePVC').classList.remove('active');
        if(isComputer) {
            document.getElementById('modePVC').classList.add('active');
        } else {
            document.getElementById('modePVP').classList.add('active');
        }
    }
    
    
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    document.getElementById('modePVP').addEventListener('click', () => setMode(false));
    document.getElementById('modePVC').addEventListener('click', () => setMode(true));
    
    
    createBoard();


