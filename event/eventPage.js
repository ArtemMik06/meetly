document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    if (!eventId) {
        alert("ID заходу не вказано");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/events/${eventId}`);
        const eventData = await response.json();
        
        if (response.ok) {
            document.getElementById("event-title").textContent = eventData.name;
            document.getElementById("event-short-description").textContent = eventData.shortDescription;
            document.getElementById("event-full-description").textContent = eventData.fullDescription;
            document.getElementById("event-city").textContent = eventData.city;
            document.getElementById("event-address").textContent = eventData.address;
            document.getElementById("event-age").textContent = eventData.ageLimit;
        } else {
            alert("Помилка: " + eventData.message);
        }
    } catch (error) {
        console.error("Помилка отримання даних заходу:", error);
        alert("Не вдалося завантажити дані заходу.");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo"); 

    function goToHome() {
        window.location.href = "D:/Meetly/userRegistr/mainPage/index.html"; 
    }
    if (logo) {
        logo.addEventListener("click", goToHome);
    }
});
