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
var counter = 0; // Initialize the counter

function populateTable() {
    for(const flight of flights) {
        const tableRow = document.createElement('tr');
        // lets add a counter class to each row, e.g. row-1 row-2
        var counterRow = 'row-' + counter;

        // Iterate through each detail in the 'flight' object
        for (const flightDetail in flight) { 
            // Check if the row already exists in the table
            let tableRow = document.querySelector('.row-' + counter);

            // if (!tableRow) {
                // If the row does not exist, create it
                // tableRow = document.createElement('tr');
        
                // Dynamically create a class name for the row based on the counter value
                // var counterRow = 'row-' + counter;
                tableRow.classList.add(counterRow); // Add the dynamic class to the row
        
                // Append the row to the table
                // const table = document.querySelector('table'); // Assuming there's a table element
                // table.append(tableRow);
            // }

            // Clear the current row's content before updating it
            // tableRow.innerHTML = '';
    
            const tableData = document.createElement('td'); // Create a <td> element for the row's data
            const word = Array.from(flight[flightDetail]); // Convert the current flight detail into an array of characters
        
            for (const [index, letter] of word.entries()) { // Loop through the characters in the array
                const letterElement = document.createElement('div'); // Create a <div> element for the letter
        
                setTimeout(() => {
                    letterElement.classList.add('flip'); // Add the 'flip' class for animation
                    letterElement.textContent = letter; // Set the text content to the letter
                    tableData.append(letterElement); // Append the letter <div> to the <td>
                }, 100 * index); // Introduce a delay for the animation
            }

            tableRow.append(tableData); // Append the completed <td> to the current row

            // Increment the counter for the next row
            counter++;
        }
        tableBody.append(tableRow); // Append the row to the table
    }
}
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
