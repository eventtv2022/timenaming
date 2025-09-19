const { createClient } = supabase;

// 🔑 ВСТАВЬ СВОИ ДАННЫЕ (Supabase project → Settings → API)
const supabaseUrl = "https://eventtv2022.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51d3Nidndrc2ZpdHBsYWRodHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMDIzMzUsImV4cCI6MjA3Mzg3ODMzNX0.9Xoy2KPVPNao6cIbtHUqsWRvO5GLtTK5KRrkAeDdQ3k"; // только anon
const db = createClient(supabaseUrl, supabaseKey);

const bookButton = document.getElementById("bookButton");
const dateTimeInput = document.getElementById("dateTime");
const nameInput = document.getElementById("name");
const bookingList = document.getElementById("bookingList");
const notification = document.getElementById("notification");

// Добавление брони
bookButton.addEventListener("click", async () => {
  const dateTime = dateTimeInput.value;
  const name = nameInput.value;

  if (!dateTime || !name) {
    alert("Пожалуйста, заполните все поля.");
    return;
  }

  const { error } = await db.from("bookings").insert([{ dateTime, name }]);

  if (error) {
    console.error("Ошибка вставки:", error.message);
    alert("Ошибка: " + error.message);
  } else {
    dateTimeInput.value = "";
    nameInput.value = "";
  }
});

// Загрузка всех броней
async function loadBookings() {
  const { data, error } = await db
    .from("bookings")
    .select("*")
    .order("dateTime", { ascending: true });

  if (error) {
    console.error("Ошибка загрузки:", error.message);
    return;
  }

  bookingList.innerHTML = "";
  data.forEach(booking => {
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

// Подписка на изменения (realtime)
db.channel("bookings-changes")
  .on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "bookings" },
    payload => {
      console.log("Realtime:", payload);
      showNotification("Новая бронь добавлена!");
      loadBookings();
    }
  )
  .subscribe();

function showNotification(message) {
  notification.textContent = message;
  notification.classList.remove("hidden");
  setTimeout(() => notification.classList.add("hidden"), 3000);
}

// Первоначальная загрузка
loadBookings();
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


