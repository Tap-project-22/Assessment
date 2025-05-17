// === LOGIN LOGIC ===
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorEl = document.getElementById("error");

  if (username === "7397516182" && password === "dhana@22") {
    window.location.href = "main.html";
  } else {
    errorEl.textContent = "Invalid phone number or password.";
  }
}
function logout() {
  // Clear any login/session info, e.g.:
  localStorage.removeItem('isLoggedIn');  // or whatever you store

  // Redirect to login page (change 'index.html' if different)
  window.location.href = 'index.html';
}
// === MAIN PAGE LOGIC ===
const codes = [...Array.from({ length: 600 }, (_, i) => i)].filter(i => i >= 100 && i <= 599);
let currentFilterResults = [];

function loadAllImages() {
  currentFilterResults = codes;
  const imageContainer = document.getElementById("images");
  if (!imageContainer) return;
  imageContainer.innerHTML = "";
  currentFilterResults.forEach(code => {
    const img = document.createElement("img");
    img.src = `https://http.dog/${code}.jpg`;
    img.alt = `HTTP ${code}`;
    img.onerror = () => img.remove();
    imageContainer.appendChild(img);
  });
}

function applyFilter() {
  const filterInput = document.getElementById("filter");
  if (!filterInput) return;

  const filter = filterInput.value.trim();
  const imageContainer = document.getElementById("images");

  if (filter === "") {
    currentFilterResults = codes;
  } else {
    const pattern = new RegExp("^" + filter.replace(/x/g, "\\d") + "$");
    currentFilterResults = codes.filter(code => pattern.test(code.toString()));
  }

  imageContainer.innerHTML = "";
  currentFilterResults.forEach(code => {
    const img = document.createElement("img");
    img.src = `https://http.dog/${code}.jpg`;
    img.alt = `HTTP ${code}`;
    img.onerror = () => img.remove();
    imageContainer.appendChild(img);
  });
}

function saveList() {
  const nameInput = document.getElementById("list-name");
  if (!nameInput) return;
  const listName = nameInput.value;
  if (!listName || currentFilterResults.length === 0) {
    alert("Provide a valid list name and filter results.");
    return;
  }

  const saved = JSON.parse(localStorage.getItem("lists") || "[]");
  const newList = {
    name: listName,
    date: new Date().toISOString(),
    codes: currentFilterResults,
    images: currentFilterResults.map(code => `https://http.dog/${code}.jpg`)
  };
  saved.push(newList);
  localStorage.setItem("lists", JSON.stringify(saved));
  loadSavedLists();
  nameInput.value = "";
}

function loadSavedLists() {
  const listContainer = document.getElementById("saved-lists");
  if (!listContainer) return;

  const lists = JSON.parse(localStorage.getItem("lists") || "[]");
  listContainer.innerHTML = "";
  lists.forEach((list, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${list.name}</strong> - ${new Date(list.date).toLocaleString()} 
      <button onclick="viewList(${index})">View</button>
      <button onclick="deleteList(${index})">Delete</button>`;
    listContainer.appendChild(li);
  });
}

function viewList(index) {
  const lists = JSON.parse(localStorage.getItem("lists") || "[]");
  const list = lists[index];
  const imageContainer = document.getElementById("images");
  if (!imageContainer) return;
  imageContainer.innerHTML = "";
  list.codes.forEach(code => {
    const img = document.createElement("img");
    img.src = `https://http.dog/${code}.jpg`;
    img.alt = `HTTP ${code}`;
    img.onerror = () => img.remove();
    imageContainer.appendChild(img);
  });
}

function deleteList(index) {
  const lists = JSON.parse(localStorage.getItem("lists") || "[]");
  lists.splice(index, 1);
  localStorage.setItem("lists", JSON.stringify(lists));
  loadSavedLists();
}
function showModal() {
  document.getElementById("errorModal").style.display = "block";
}

function closeModal() {
  document.getElementById("errorModal").style.display = "none";
}

// Auto init when on main.html
window.onload = function () {
  if (document.getElementById("images")) {
    loadAllImages();
    loadSavedLists();
  }
};
