function updateCell(btn) {
    let td = btn.parentElement;
    let points = score.value;
    td.children[0].textContent = points;
    score.value = '';
    updateScoreboard();
}

const showScoreDiv = document.getElementById('showScoreDiv');
let addPlayersToScoreboard = false;
function updateScoreboard() {
    const nameInput = document.getElementsByClassName('nameInput');
    if (!addPlayersToScoreboard) {
        for (let i = 0; i < nameInput.length; i++) {
            let e = nameInput[i];
            console.log(e.value);
            let playerContainer = document.createElement('div');
            let newPlayerName = document.createElement('p');
            let newPlayerScore = document.createElement('p');
            newPlayerName.textContent = `${e.value}'s Score: `;
            newPlayerScore.textContent = 0;
            playerContainer.appendChild(newPlayerName);
            playerContainer.appendChild(newPlayerScore);
            showScoreDiv.appendChild(playerContainer);
        }
        addPlayersToScoreboard = true;
    } else {
        for (let i = 0; i < nameInput.length; i++) {
            let scoreCount = 0;
            for (let x = 0; x < tbody.children.length; x++) {
                let turnScore = Number(tbody.children[x].children[i+1].children[0].textContent);
                scoreCount += turnScore;
            }
            showScoreDiv.children[i].children[1].textContent = scoreCount;
        }
    }
}

async function getWord(word) {
    definition.style.visibility = 'visible';
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const responseData = await response.json();
        const wordMeaning = responseData[0].meanings[0].definitions[0].definition;
        definition.textContent = `${word}:  ${wordMeaning}`;
    } catch (err) {
        definition.textContent = 'Not a valid word.';
    }
}