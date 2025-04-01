document.addEventListener("DOMContentLoaded", async () => {
    const userId = localStorage.getItem("userId"); 

    if (!userId) {
        alert("Ви не авторизовані!");
        window.location.href = "index.html"; 
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/user/${userId}`);
        const user = await response.json();

        if (response.ok) {
            document.getElementById("user-name").textContent = user.name;
            document.getElementById("user-email").textContent = user.email;
            document.getElementById("user-fullname").textContent = user.full_name;
            document.getElementById("user-birthdate").textContent = user.birth_date;
            if (user.photo) {
                document.getElementById("user-photo").src = user.photo;
            }
        } else {
            alert(user.message);
            localStorage.removeItem("userId"); 
            window.location.href = "index.html";
        }
    } catch (error) {
        console.error("Помилка отримання даних:", error);
    }
});
document.getElementById("create-event-btn").addEventListener("click", function () {
    window.location.href = "D:/Meetly/userRegistr/event/eventCreation.html"; 
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
