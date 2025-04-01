// document.addEventListener("DOMContentLoaded", function () {
//     const form = document.querySelector("form");

//     form.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         const eventData = {
//             name: document.querySelector(".inp1").value,
//             shortDescription: document.querySelector(".inp2").value,
//             fullDescription: document.querySelector(".inp3").value,
//             city: document.querySelector("#cityInput").value,
//             address: document.querySelector(".PIB1").value,
//             ageLimit: document.querySelector(".age1").value,
//         };

//         try {
//             const response = await fetch("http://localhost:5000/api/events", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(eventData),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert("Захід успішно створено!");
//             } else {
//                 alert("Помилка: " + result.message);
//             }
//         } catch (error) {
//             console.error("Помилка відправки:", error);
//             alert("Сталася помилка при відправці даних.");
//         }
//     });
// });

// // Отримуємо всі елементи з класом "image-box" (блоки для завантаження зображень)
// const imageBoxes = document.querySelectorAll('.image-box');
// let currentIndex = 0; // Поточний індекс вибраного зображення

// // Функція для вибору зображення за індексом
// function selectImage(index) {
//     currentIndex = index; // Зберігаємо індекс вибраного блоку
//     document.getElementById('file-input').click(); // Викликаємо вибір файлу
// }

// // Функція для завантаження зображення після вибору файлу
// function uploadImage(event) {
//     const file = event.target.files[0]; // Отримуємо вибраний файл
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function(e) {
//             // Вставляємо зображення у відповідний блок
//             imageBoxes[currentIndex].innerHTML = `<img src="${e.target.result}" alt="Uploaded Image">`;
//         };
//         reader.readAsDataURL(file); // Зчитуємо файл як URL
//     }
//     event.target.value = ''; // Очищаємо input для можливості повторного вибору
// }
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
                window.location.href = `D:/Meetly/userRegistr/event/eventPage.html?id=${result.event._id}`;
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
        window.location.href = "D:/Meetly/userRegistr/mainPage/index.html"; 
    }
    if (logo) {
        logo.addEventListener("click", goToHome);
    }
});
