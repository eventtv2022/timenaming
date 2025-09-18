document.addEventListener("DOMContentLoaded", function() {
    const bookButton = document.getElementById("bookButton");
    const dateTimeInput = document.getElementById("dateTime");
    const nameInput = document.getElementById("name");
    const bookingList = document.getElementById("bookingList");

    // Список для хранения забронированных минут
    const bookings = [];

    bookButton.addEventListener("click", function() {
        const dateTime = dateTimeInput.value;
        const name = nameInput.value;

        if (!dateTime || !name) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        // Проверка на уникальность бронирования
        if (bookings.some(booking => booking.dateTime === dateTime)) {
            alert("Эта минута уже забронирована.");
            return;
        }

        // Добавление нового бронирования
        bookings.push({ dateTime, name });
        
        // Обновление списка бронирований
        updateBookingList();

        // Очистка полей ввода
        dateTimeInput.value = '';
        nameInput.value = '';
    });

    function updateBookingList() {
        bookingList.innerHTML = ''; // Очистка списка

        // Сортировка бронирований по времени
        bookings.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        bookings.forEach(booking => {
            const row = document.createElement("tr");
            const dateCell = document.createElement("td");
            const nameCell = document.createElement("td");

            dateCell.textContent = new Date(booking.dateTime).toLocaleString();
            nameCell.textContent = booking.name;

            row.appendChild(dateCell);
            row.appendChild(nameCell);
            bookingList.appendChild(row);
        });
    }
});

