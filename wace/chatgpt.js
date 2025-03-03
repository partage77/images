/*
How It Works

Dynamic Player Rows:
Each player has a row (div) that includes their name, score, and a bar representing their score.

Sorting:
Players are sorted by score on every update, and their position (transform: translateY) is adjusted accordingly.
Smooth Animation:
CSS transition ensures smooth resizing of bars and movement of rows.

Random Score Updates:
Simulated with setInterval, randomizing scores and updating the graph.

*/
const players = [
    { name: "Alice"    , score: 50, color: "#ff5733" },
    { name: "Benjamin" , score: 70, color: "#33ff57" },
    { name: "Clara"    , score: 40, color: "#3357ff" },
    { name: "Didi"     , score: 60, color: "#ff33a1" },
    { name: "Eli"      , score: 80, color: "#f3ff33" },
    { name: "Flo"      , score: 30, color: "#a133ff" },
]

const barContainer = document.getElementById("barContainer");

function updateBarGraph(players) {
    // Sort players by score in descending order
    players.sort((a, b) => b.score - a.score);
//    const maxNumber = players.reduce((max, player) => Math.max(max, player.score), -Infinity)
    const maxNumber = 1000

    // Create or update bars
    players.forEach((player, index) => {
        index |= 0
        // Get or create the player's row
        let row = document.getElementById(`player-${player.name}`);
        if (!row) {
            row = document.createElement("div");
            row.id = `player-${player.name}`;
            row.className = "player-row";

            // Player bar
            const barDiv = document.createElement("div");
            barDiv.className = "player-bar";
            barDiv.style.backgroundColor = player.color;
            barDiv.textContent = player.name

            // Append elements
            row.appendChild(barDiv)
            barContainer.appendChild(row)
        }

        // Update bar width and score
        const bar   = row.querySelector(".player-bar")

        bar.style.width     = (player.score / maxNumber * 100 ) + 'vw'
        row.style.transform = "translateY(" + 50 * index + "px)";
    });
}

// Simulate score updates
setInterval(() => {
    
    players.forEach(player => {
        player.score += 1 + Math.floor(Math.random() * 15)
    })
    updateBarGraph(players);
}, 2000);

// Initial render
updateBarGraph(players);
