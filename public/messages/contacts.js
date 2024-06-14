// Mock data to test the function
const mockData = [
    {
        message: "Hello, this is a test message 1.",
        messageType: "text",
        read: false,
        from: "Alice"
    },
    {
        message: "Hello, this is a test message 2.",
        messageType: "text",
        read: true,
        from: "Bob"
    },
    {
        message: "Hello, this is a test message 3.",
        messageType: "text",
        read: false,
        from: "Charlie"
    }
];

async function getData() {
   
    let col_messages = [];

    try {
        const querySnapshot = await db.collection("Message").get();
        querySnapshot.forEach((doc) => {
            const userData = doc.data();

            let res = JSON.stringify(doc.data());
            let jsonRes = JSON.parse(res);
            console.log("username: ",localStorage.getItem("username"));
            console.log(jsonRes);
            if(jsonRes.To == localStorage.getItem("username")){
                col_messages.push(jsonRes);
            }
        }); 

    } catch (e) {
        console.error("Error getting data: ", e);
    }

    show_messages(col_messages);

}

function show_messages(messageArray) {
    const messageContainer = document.getElementById('message-container'); 

    messageContainer.innerHTML = '';

    for (let i = 0; i < messageArray.length; i++) {
        const message = messageArray[i];

        // Create the card div
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('cardx');

        // Create the container div
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('containerx');

        // Create the left div
        const leftDiv = document.createElement('div');
        leftDiv.classList.add('leftx');

        // Create the status indicator div
        const statusDiv = document.createElement('div');
        statusDiv.classList.add('status-indx');

        // Append status indicator to left div
        leftDiv.appendChild(statusDiv);

        // Create the right div
        const rightDiv = document.createElement('div');
        rightDiv.classList.add('rightx');

        // Create the text wrapper div
        const textWrapDiv = document.createElement('div');
        textWrapDiv.classList.add('text-wrapx');

        // Create the name paragraph
        const nameParagraph = document.createElement('p');
        nameParagraph.classList.add('text-contentx');
        nameParagraph.id = 'name';

        // Create the link
        const nameLink = document.createElement('a');
        nameLink.classList.add('text-linkx');
        nameLink.href = '#';
        nameLink.textContent = message.From;

        // Append link to name paragraph
        nameParagraph.appendChild(nameLink);

        // Create the message paragraph
        const messageParagraph = document.createElement('p');
        messageParagraph.classList.add('timex');
        messageParagraph.id = 'message';
        messageParagraph.textContent = message.message;

        // Append name and message paragraphs to text wrapper
        textWrapDiv.appendChild(nameParagraph);
        textWrapDiv.appendChild(messageParagraph);

        // Create the button wrapper div
        const buttonWrapDiv = document.createElement('div');
        buttonWrapDiv.classList.add('button-wrapx');

        // Create the button
        const button = document.createElement('button');
        button.classList.add('primary-ctax');
        button.id = 'readMessage';
        button.textContent = 'open message';
        button.addEventListener('click', () => {
            alert(`Opening message from ${message.from}: ${message.message}`);
        });

        // Append button to button wrapper
        buttonWrapDiv.appendChild(button);

        // Append text wrapper and button wrapper to right div
        rightDiv.appendChild(textWrapDiv);
        rightDiv.appendChild(buttonWrapDiv);

        // Append left and right divs to container div
        containerDiv.appendChild(leftDiv);
        containerDiv.appendChild(rightDiv);

        // Append container div to card div
        cardDiv.appendChild(containerDiv);

        // Append card div to parent container
        messageContainer.appendChild(cardDiv);
    }
}

// Call getData to initiate the process with mock data
getData();
