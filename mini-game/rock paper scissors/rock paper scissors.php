<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"   href="rock paper scissors.css">
    <title>سنگ_کاغذ_قیچی</title>
    

</head>
<body>
<div class="game">
    
    <div class="choices">
        <button class="choice-btn" data-choice="سنگ">🌚</button>
        <button class="choice-btn" data-choice="کاغذ">📄</button>
        <button class="choice-btn" data-choice="قیچی">✂️</button>
    </div>
    <div class="result" id="resultMsg">روی یکی از دکمه‌ها بزن!</div>
    <div class="score">
        <span>🧑 تو: <span id="userScore">0</span></span>
        <span>🤖 کامپیوتر: <span id="compScore">0</span></span>
    </div>
    <button class="reset" id="resetBtn">🔄 شروع مجدد</button>
</div>

  <script src="rock paper scissors.js"></script>
    <?php include '../go home.php';?>
    
</body>
</html>