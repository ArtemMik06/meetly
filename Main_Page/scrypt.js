document.addEventListener("DOMContentLoaded", async function () {
    const eventsGrid = document.querySelector(".events-grid");

    try {
        const response = await fetch("http://localhost:5000/api/events");
        const events = await response.json();

        if (!Array.isArray(events)) {
            console.error("Очікував масив заходів, отримав:", events);
            return;
        }

        eventsGrid.innerHTML = ""; 

        events.forEach(event => {
            const eventCard = document.createElement("a");
            eventCard.href = `../Event_Page/eventPage.html?id=${event._id}`;
            eventCard.innerHTML = `
                <div class="event-card">
                    <div class="event-image"></div>
                    <h2>${event.name}</h2>
                    <p>${event.organizer || "Організатор невідомий"}</p>
                </div>
            `;
            eventsGrid.appendChild(eventCard);
        });

    } catch (error) {
        console.error("Помилка при завантаженні заходів:", error);
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");

    if (registerButton) {
        registerButton.addEventListener("click", function () {
            window.location.href = "../Registr_Page/index.html"; 
        });
    }
});
document.getElementById("loginButton").addEventListener("click", function() {
    window.location.href = "../Login_Page/login.html";
});
