
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'thickly-choice-kookaburra.data-1.use1.tembo.io',
  database: 'postgres',
  password: 'FbBzogv9yzTOwbJm',
  port: 5432,
  ssl: { rejectUnauthorized: false } // Required for Tembo.io
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL on Tembo.io'))
  .catch(err => console.error('Connection error:', err.message));

async function executeQuery() {
  try {
    const result = await client.query('select getword(\'test_user\');'); // Change your_table_name
    const targetword = result.rows[0]?.getword;  // Safely accessing word from the first result
    console.log('Query Result:', word);  // Output the word
  } catch (err) {
    console.error('Query Error:', err.message);
  } finally {
    client.end(); // Close the connection after query execution
  }
  return targetword;
}

targetword=executeQuery();
let index = 0;
let game = 0;
const allowed = "qwertyuiopasdfghjklzxcvbnm";
const target = targetword;
let word = [];
function match(words, target) {
    let word = words.join("").toLowerCase();
    let color = []
    target = target.toLowerCase();
    if (target === word) {
        game = 1;
    }
    else {
        game = 0;
    }
    for (let i = 0; i < word.length; i++) {
        if (target[i] === word[i]) {
            color.push("W");
        } else if (target.includes(word[i])) {
            color.push("M");
        }
        else {
            color.push("L");
        }
    }
    return game, color;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
        moveFocusBack(event);
    }
    if ((event.key === "Delete" || event.key === "Tab" || !allowed.includes(event.key.toLowerCase())) && event.key !== "Enter") {
        event.preventDefault();
    }
    else {
        moveFocusup(event);
    }
});

function moveFocusup(event) {
    if (event.target.value) {
        const currentInput = event.target;
        let nextInput = currentInput.parentElement.nextElementSibling?.querySelector('.front');

        if (nextInput) {
            nextInput.disabled = false;
            nextInput.focus();
        }
    }
}
function moveFocusBack(event) {
    const currentInput = event.target;
    const previousInput = currentInput.parentElement.previousElementSibling?.querySelector('.front');
    if (event.code === "Backspace" && event.target.value === "" && previousInput) {
        currentInput.disabled = true;
        previousInput.focus();
    }
    else {
        event.target.value = ""
    }
}
function changeinput(color, index, word) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const element = document.getElementById(`word_${index + i}_inv`);
            const card = element.parentElement;
            element.value = word[i];
            card.classList.remove('is-flipped');
            void element.offsetWidth;
            if (color[i] === "L") {
                element.style.backgroundColor = "#3a3a3c";
            } else if (color[i] === "M") {
                element.style.backgroundColor = "#b59f3b";
            } else {
                element.style.backgroundColor = "#538d4e";
            }
            card.classList.toggle('is-flipped');
            const key = document.getElementById(word[i]);

            if (key) {
                void key.offsetWidth;
                if (color[i] === "L") {
                    key.classList.add('key-dark');
                } else if (color[i] === "M") {
                    key.classList.add('key-mismatch');
                } else {
                    key.classList.add('key-exact');
                }
            }
        }, 500 * i);
    }
}

function checkandpush(event) {
    event.preventDefault();
    word[0] = document.getElementById(`word_${index}`).value;
    index += 1;
    word[1] = document.getElementById(`word_${index}`).value;
    index += 1;
    word[2] = document.getElementById(`word_${index}`).value;
    index += 1;
    word[3] = document.getElementById(`word_${index}`).value;
    index += 1;
    word[4] = document.getElementById(`word_${index}`).value;
    index += 1;
    console.log(word);
    game, color = match(word, target);
    changeinput(color, index - 5, word);
    if (game === 1) {
        setTimeout(()=>{gamend();},2500);
    }
    else{
        const currentInput = event.target;
        if (currentInput.nextElementSibling) {
            const nextInput = currentInput.nextElementSibling;
            let firstInput = nextInput.querySelector(`input[id="word_${index}"]`);
            firstInput.disabled = false;
            firstInput.focus();
        }
    }
 
    currentInput.querySelectorAll('input[type="text"]').forEach(element => {
        element.disabled = true;
    });

}
function gamend()
{
    const form = document.getElementById("myForm");
    form.style.display = "block";
    setTimeout(() => {
        form.classList.add("active");
    }, 10);
}
function gamerestart() {
    location.reload(true);
}


function openForm() {
    loadchart();
    const form = document.getElementById("myForm");
    form.style.display = "block";
    setTimeout(() => {
        form.classList.add("active");
    }, 10);
}

function closeForm() {
    const form = document.getElementById("myForm");
    form.classList.remove("active");
    setTimeout(() => {
        form.style.display = "none";
    }, 300); 
    closeChart();
}

const xValues = ["1", "2", "3", "4", "5", "6", "Failed"];
const yValues = [55, 49, 44, 24, 15, 70, 80];
const barColors = ["white", "white", "white", "white", "white", "white", "white"];

function loadchart()
{
    setTimeout(() => {
        new Chart("myChart", {
            type: "bar",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                legend: { display: false },
                title: { display: false }
            }
        });
    }, 20); 
}