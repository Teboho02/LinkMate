async function getData() {
  let col_messages = [];

  try {
    const querySnapshot = await db.collection("Message").get();
    querySnapshot.forEach((doc) => {
      const userData = doc.data();

      let res = JSON.stringify(doc.data());
      let jsonRes = JSON.parse(res);
      if (jsonRes.To == localStorage.getItem("username")) {
        col_messages.push(jsonRes);
      }
    });
  } catch (e) {
    console.error("Error getting data: ", e);
  }

  show_messages(col_messages);
}

function show_messages(arr) {   
  const messageContainer = document.getElementById("message-container");

  //create a new array that will only show the last messages

  messageArray = [];
  messageArray.push(arr[arr.length - 1]);
  let isIn = false;
  for (let i = arr.length - 2; i >= 0; i--) {
    let isIn = false;
    for (let j = 0; j < messageArray.length; j++) {
      if (arr[i].From === messageArray[j].From) {
        isIn = true;
        break; // No need to continue checking once found
      }
    }
    if (!isIn) {
      messageArray.push(arr[i]); 
    }
  }
  messageContainer.innerHTML = "";

  for (let i = 0; i < messageArray.length; i++) {
    const message = messageArray[i];

    // Create the card div
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("cardx");

    // Create the container div
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("containerx");

    // Create the left div
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("leftx");

    // Create the status indicator div
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status-indx");

    if (message.read == 1) {
      statusDiv.style.backgroundColor = "green";
    }

    // Append status indicator to left div
    leftDiv.appendChild(statusDiv);

    // Create the right div
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("rightx");

    // Create the text wrapper div
    const textWrapDiv = document.createElement("div");
    textWrapDiv.classList.add("text-wrapx");

    // Create the name paragraph
    const nameParagraph = document.createElement("p");
    nameParagraph.classList.add("text-contentx");
    nameParagraph.id = "name";

    // Create the link
    const nameLink = document.createElement("a");
    nameLink.classList.add("text-linkx");
    nameLink.href = "#";
    nameLink.textContent = message.From;

    // Append link to name paragraph
    nameParagraph.appendChild(nameLink);

    // Create the message paragraph
    const messageParagraph = document.createElement("p");
    messageParagraph.classList.add("timex");
    messageParagraph.id = "message";
    messageParagraph.textContent = message.message;

    // Append name and message paragraphs to text wrapper
    textWrapDiv.appendChild(nameParagraph);
    textWrapDiv.appendChild(messageParagraph);

    // Create the button wrapper div
    const buttonWrapDiv = document.createElement("div");
    buttonWrapDiv.classList.add("button-wrapx");

    // Create the button
    const button = document.createElement("button");
    button.classList.add("primary-ctax");
    button.id = "readMessage";
    button.textContent = "open message";
    button.addEventListener("click", () => {
      localStorage.setItem("messaageFrom", message.From);
      openMessage(messageArray);
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

function openMessage(messages) {
  localStorage.setItem("messages", messages);

  //makr the message as read
  window.location.href = "../messages/messages.html";
}

getData();
