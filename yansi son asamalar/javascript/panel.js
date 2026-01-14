
function setupStarRating(storageKey) {
    const box = document.getElementById("global-rating");
    const stars = box.querySelectorAll("span");
    const text = document.getElementById("global-rating-text");

    let saved = localStorage.getItem(storageKey);

    if (saved) {
        stars.forEach(s => s.classList.remove("active"));
        for (let i = 0; i < saved; i++) stars[i].classList.add("active");
        text.textContent = `Puanın: ${saved}/5`;
    }

    stars.forEach(star => {
        star.onclick = () => {
            const val = star.dataset.star;
            stars.forEach(s => s.classList.remove("active"));
            for (let i = 0; i < val; i++) stars[i].classList.add("active");
            text.textContent = `Puanın: ${val}/5`;
            localStorage.setItem(storageKey, val);
        };
    });
}




function openGlobalPanel(data, type) {

    document.getElementById("global-img").src = data.img;
    document.getElementById("global-title").textContent = data.title;

    if (type === "book") {
        document.getElementById("global-info1").textContent = "Yazar: " + data.author;
        document.getElementById("global-info2").textContent = "Yıl: " + data.year;
        document.getElementById("global-info3").textContent = "Tür: " + data.genre;

        if (data.amazon) {
            globalLinkBtn("Amazon’da Gör", data.amazon);
        } else {
            hideLinkBtn();
        }
    }

    if (type === "film") {
        document.getElementById("global-info1").textContent = "Yönetmen: " + data.director;
        document.getElementById("global-info2").textContent = "Yıl: " + data.year;
        document.getElementById("global-info3").textContent = "Tür: " + data.genre;

        if (data.trailer) {
            globalLinkBtn("Fragmanı İzle", data.trailer);
        } else {
            hideLinkBtn();
        }
    }

    if (type === "music") {
        document.getElementById("global-info1").textContent = "Sanatçı: " + data.artist;
        document.getElementById("global-info2").textContent = "Albüm: " + data.album;
        document.getElementById("global-info3").textContent = "Yıl: " + data.year;

        if (data.spotify) {
            globalLinkBtn("Spotify’da Dinle 🎧", data.spotify);
        } else {
            hideLinkBtn();
        }
    }

    document.getElementById("global-description").textContent = data.description;

    setupStarRating("rate_" + data.title);

    loadGlobalComments(data.title);

    document.getElementById("global-panel").classList.add("active");
}



function globalLinkBtn(text, url) {
    const btn = document.getElementById("global-link-btn");
    btn.style.display = "block";
    btn.textContent = text;
    btn.onclick = () => window.open(url, "_blank");
}

function hideLinkBtn() {
    document.getElementById("global-link-btn").style.display = "none";
}



function loadGlobalComments(title) {
    const container = document.getElementById("global-comments");
    container.innerHTML = "";

    const comments = JSON.parse(localStorage.getItem("comments_" + title)) || [];

    comments.forEach((c, i) => {
        container.innerHTML += `
            <p>
                <strong>${c.user}:</strong> ${c.text}
                <button class="delete-global-comment" data-index="${i}">Sil</button>
            </p>
        `;
    });
}

// Global panel yorum silme
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-global-comment");
    if (!btn) return;

    const title = document.getElementById("global-title").textContent;
    const index = btn.getAttribute("data-index");

    let comments = JSON.parse(localStorage.getItem("comments_" + title)) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments_" + title, JSON.stringify(comments));

    loadGlobalComments(title);
});



// Yorum ekleme butonu ve input
const globalCommentBtn = document.getElementById("global-comment-btn");
const globalCommentInput = document.getElementById("global-comment-input");


globalCommentBtn.onclick = () => {
    const text = globalCommentInput.value.trim();
    if (!text) return;

    const title = document.getElementById("global-title").textContent;

    const username = localStorage.getItem("yansikullanici") || "Anonim";

    const comments = JSON.parse(localStorage.getItem("comments_" + title)) || [];

    comments.push({
        user: username,
        text: text
    });

    localStorage.setItem("comments_" + title, JSON.stringify(comments));

    loadGlobalComments(title);

    globalCommentInput.value = "";
};


document.getElementById("global-close").onclick = () => {
    document.getElementById("global-panel").classList.remove("active");
};
