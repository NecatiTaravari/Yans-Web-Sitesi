document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("music-container");

    container.innerHTML = ""; // çift basmayı engelle

    musics.forEach((music, index) => {
        const sideClass = index % 2 === 0 ? "left" : "right";

        const cardHTML = `
        <div class="card-wrapper">

            <div class="film-kart ${sideClass}" data-id="${index}">
                <div class="hover-panel">
                    <h3>${music.title}</h3>
                    <p>${music.description}</p>
                </div>

                <img src="${music.img}" alt="Müzik">

                <div class="info">
                    <h3>${music.title}</h3>
                    <span class="category muzik">Müzik</span>
                </div>
            </div>

            <div class="card-actions-outside">
                <span class="like-btn">❤️ <b class="like-count">0</b></span>

                <span class="add-to-profile"
                    data-type="music"
                    data-title="${music.title}"
                    data-img="${music.img}">
                    ➕
                </span>
            </div>

        </div>`;

        container.innerHTML += cardHTML;
    });
});

document.addEventListener("click", e => {
    const card = e.target.closest(".film-kart");
    if (!card) return;

    openGlobalPanel(musics[card.dataset.id], "music");
});