document.addEventListener("DOMContentLoaded", function () {
    const eventForm = document.getElementById("eventForm");

    eventForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки

        // Отримуємо значення полів
        const eventData = {
            name: document.getElementById("eventName").value.trim(),
            shortDescription: document.getElementById("shortDescription").value.trim(),
            fullDescription: document.getElementById("fullDescription").value.trim(),
            city: document.getElementById("city").value.trim(),
            address: document.getElementById("address").value.trim(),
            ageLimit: document.getElementById("ageLimit").value
        };

        // Перевіряємо обов'язкові поля
        if (!eventData.name || !eventData.shortDescription || !eventData.city) {
            alert("Будь ласка, заповніть всі обов'язкові поля!");
            return;
        }

        try {
            // Відправляємо дані на сервер
            const response = await fetch("http://localhost:5000/api/events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Захід успішно створено!", result);
                window.location.href = `../Event_Page/eventPage.html?id=${result.event._id}`;
            } else {
                alert("Помилка: " + result.message);
            }
        } catch (error) {
            console.error("Помилка відправки даних:", error);
            alert("Не вдалося створити захід. Спробуйте пізніше.");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo"); 

    function goToHome() {
        window.location.href = "../Main_Page/index.html"; 
    }
    if (logo) {
        logo.addEventListener("click", goToHome);
    }
});
