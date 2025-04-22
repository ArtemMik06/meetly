document.getElementById("registrationForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("userId", result._id); 
            window.location.href = "profile.html"; 
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Помилка:", error);
    }
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
