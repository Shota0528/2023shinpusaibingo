document.addEventListener('DOMContentLoaded', function() {
    const drumRoll = document.getElementById('drum-roll');
    const bingoTable = document.getElementById('bingo-table');
    const drawButton = document.getElementById('draw-button');

    const drawnNumbers = [];

    function drawNumber() {
        if (drawnNumbers.length === 75) {
            alert('全ての数字が抽選されました！');
            return;
        }

        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 75) + 1;
        } while (drawnNumbers.includes(randomNumber));

        drawnNumbers.push(randomNumber);

        animateDrumRoll(randomNumber);

        setTimeout(() => {
            const result = drawnNumbers[drawnNumbers.length - 1];
            updateDrumRoll(result); // アニメーション終了後に最終的な結果を表示
            updateBingoTable();
        }, 3000);
    }

    function animateDrumRoll(finalNumber) {
        let count = 0;
        const interval = setInterval(() => {
            count++;
            const randomNum = Math.floor(Math.random() * 75) + 1;
            drumRoll.innerText = randomNum;
            if (count === 10) {
                clearInterval(interval);
                drumRoll.innerText = finalNumber; // アニメーション終了後に最終的な結果を表示
            }
        }, 100);
    }

    function updateDrumRoll(number) {
        drumRoll.innerText = number;
    }

    function updateBingoTable() {
        bingoTable.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 15; j++) {
                const cell = document.createElement('td');
                const number = j * 5 + i + 1;
                cell.innerText = number;
                if (drawnNumbers.includes(number)) {
                    if (drawnNumbers.indexOf(number) === drawnNumbers.length - 1) {
                        cell.style.backgroundColor = '#FF0000'; //最新の1つ前に出た数字を黄色で表示
                    } else if (drawnNumbers.indexOf(number) === drawnNumbers.length - 2) {
                        cell.style.backgroundColor = '#FFFF00'; //最新の数字を赤で表示
                    }
                } else {
                    cell.style.backgroundColor = '#CCCCCC'; //まだ抽選されていない数字は背景を灰色に
                }
                row.appendChild(cell);
            }
            bingoTable.appendChild(row);
        }
    }

    drawButton.addEventListener('click', function() {
        drawNumber();
    });
});
