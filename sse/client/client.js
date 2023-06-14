const eventSource = new EventSource("http://localhost:3030");

function updateMessage(message) {
	const list = document.getElementById("message");
	const item = document.createElement("p");
	item.textContent = message;
	list.appendChild(item);
}

// function updateName(nama) {
//     const list = document.getElementById("message");
//     const item = document.createElement("p");
//     item.textContent = nama;
//     list.appendChild(item);
//   }

eventSource.onmessage = (event) => {
	// updateMessage(event.data);
    updateMessage(event.data);
};

eventSource.onerror = () => {
	updateMessage("Server closed connection");
    // updateName("Server closed connection");
	eventSource.close();
};