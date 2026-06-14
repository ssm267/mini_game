<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet"   href="X_O.css">
    <title>بازی دوز</title>
    
</head>
<body>
<div class="game-container">
    <div class="mode-selector">
        <button id="modePVP" class="mode-btn">👥 بازیکن vs بازیکن</button>
        <button id="modePVC" class="mode-btn active">🤖 بازیکن vs کامپیوتر</button>
    </div>
    <div class="board" id="board"></div>
    <div class="info">
        <div class="status" id="statusMsg">🎮 نوبت: <span id="turn">X</span> (شما)</div>
        <button id="resetBtn">🔄 بازی جدید</button>
    </div>
</div>
  <script src="X_O.js"></script>
    <?php include '../go home.php';?>
</body>
</html>