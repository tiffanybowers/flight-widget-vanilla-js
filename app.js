const tableBody = document.getElementById('table-body');

let flights = [
    {
        time: "08:11",
        destination: "OMAN",
        flight: "OX 203",
        gate: "A 01",
        remarks: "ON TIME"
    },
    {
        time: "12:39",
        destination: "LONDON",
        flight: "CL 328",
        gate: "C 31",
        remarks: "CANCELLED"
    },
    {
        time: "13:21",
        destination: "DUBAI",
        flight: "DXB 200",
        gate: "A 20",
        remarks: "CANCELLED"
    },
    {
        time: "14:02",
        destination: "FRANKFURT",
        flight: "FR 403",
        gate: "B 04",
        remarks: "ON TIME"
    },
    {
        time: "16:20",
        destination: "TOKYO",
        flight: "TK 233",
        gate: "A 31",
        remarks: "DELAYED"
    }
]

const destinations = ["TOKYO", "FRANKFURT", "DUBAI", "LONDON", "OMAN", "BEIRUT"];
const remarks = ["ON TIME", "DELAYED", "CANCELLED"];
let hour = 15;

function populateTable() {
    tableBody.innerHTML = ''; // Clear the table body before repopulating it

    // Loop through the flights array
    for (const flight of flights) {
        // Create a new table row
        const tableRow = document.createElement('tr');

        // Loop through the properties of the flight object
        for (const flightDetail in flight) {
            // Create a <td> for the current flight property
            const tableData = document.createElement('td');

            // Convert the flight detail value into an array of characters
            const word = Array.from(flight[flightDetail]);

            // Loop through each character (for flip animation)
            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div'); // Create a div for each character

                setTimeout(() => {
                    letterElement.classList.add('flip'); // Add the 'flip' class for animation
                    letterElement.textContent = letter; // Set the letter as the text content
                    tableData.append(letterElement); // Append the letter div to the <td>
                }, 100 * index); // Introduce a delay for the flip animation
            }
            // Append the <td> to the current row
            tableRow.appendChild(tableData);
        }
        // Append the completed row to the table body
        tableBody.appendChild(tableRow);
    }
}
// Call/Invoke the function to populate the table
populateTable();


function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
}

function generateRandomNumber(maxNumber) {
    const numbers = "0123456789";
    if(maxNumber) {
        const newNumbers = numbers.slice(0, maxNumber + 1);
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length));
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length));
}

function generateTime() {
    let displayHour = hour;

    if(hour <= 24) {
        hour++;
    }
    if(hour > 24) {
        hour = 1;
        displayHour = hour;
    } 
    if(hour < 10) {
        displayHour = "0" + hour;
    }

    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber();
}

function shuffleUp() {
    flights.shift(); //get rid of first item in array
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
    });
    tableBody.textContent = "";
    populateTable();
}

setInterval(shuffleUp, 5000)
