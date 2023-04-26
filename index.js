const setup = document.getElementById('setup');
const playerCountInput = document.getElementById('playerCountInput');
const playerCountBtn = document.getElementById('playerCountBtn');
const playerNamesContainer = document.getElementById('playerNamesContainer');
const game = document.getElementById('game');
const score = document.getElementById('score');
const thead = document.getElementById('gameHeader');
const tbody = document.getElementById('gameBody');
const nextTurnBtn = document.getElementById('nextTurn');
const definitionBtn = document.getElementById('definitionBtn');
const wordBox = document.getElementById('wordBox');
const definition = document.getElementById('definition');

let players = [];

playerCountBtn.addEventListener('click', function() {
    if (playerCountInput.value <= 4 && playerCountInput.value >= 1) {
        for (let i = 0; i < playerCountInput.value; i++) {
            playerNamesContainer.style.visibility = 'visible';
            const nameContainer = document.createElement('div');
            const nameInput = document.createElement('input');
            nameContainer.classList.add('nameBox');
            nameInput.classList.add('nameInput');
            nameInput.placeholder = `Player ${i+1} Name:`;
            nameContainer.appendChild(nameInput);
            playerNamesContainer.appendChild(nameContainer);
        }
        const playerNamesBtn = document.createElement('button');
        playerNamesBtn.textContent = 'Start Game';
        playerNamesContainer.appendChild(playerNamesBtn);
        playerNamesBtn.addEventListener('click', function() {
            const nameInput = document.getElementsByClassName('nameInput');
            let nameCheck = true;
            players = [];
            for (let i = 0; i < nameInput.length; i++) {
                const e = nameInput[i];
                if (e.value === '') {
                    nameCheck = false;
                } else {
                    players.push(e.value);
                }
            }
            if (nameCheck) {
                setup.style.visibility = 'hidden';
                setup.style.height = '100px';
                playerNamesContainer.style.visibility = 'hidden';
                game.style.visibility = 'visible';
                //add to table now
                const turnHeader = document.createElement('th');
                turnHeader.textContent = 'Turn#';
                thead.appendChild(turnHeader);
                for (let i = 0; i < nameInput.length; i++) {
                    const newPlayer = document.createElement('th');
                    newPlayer.textContent = nameInput[i].value;
                    thead.appendChild(newPlayer);
                }
                updateScoreboard();
                addNewRow(nameInput.length);
            } else {
                alert('Please fill out all name fields!');
            }
            
        })
    } else {
        alert('Please enter a player count between 1 and 4!');
    }
})



function addNewRow(numPlayers) {
    const tr = document.createElement('tr');
    const rowNum = document.createElement('td');
    rowNum.textContent = tbody.children.length;
    tr.appendChild(rowNum);
    for (let i = 0; i < numPlayers; i++) {
        const td = document.createElement('td');
        const p = document.createElement('p');
        const tdBtn = document.createElement('button');
        p.textContent = '0';
        tdBtn.textContent = 'Add';
        td.appendChild(p);
        td.appendChild(tdBtn);
        tr.appendChild(td);
        tdBtn.addEventListener('click', function() {
            updateCell(this);
            td.appendChild(tdBtn);
        })
    }
    tbody.appendChild(tr);

}

nextTurnBtn.addEventListener('click', function() {
    const nameInput = document.getElementsByClassName('nameInput');
    addNewRow(nameInput.length);
})

definitionBtn.addEventListener('click', function() {
    getWord(wordBox.value);
})