// Post'u bul
function getPost(id) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    return posts.find(p => p.id === id);
}

// Post'u güncelle ve kaydet
function updatePost(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.map(p => p.id === post.id ? post : p);
    localStorage.setItem("posts", JSON.stringify(posts));
}

// LIKE sistemi (kalıcı)
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".like-btn");
    if (!btn) return;

    const card = btn.closest(".post-card");
    const id = card.getAttribute("data-id");
    const post = getPost(id);
    if (!post) return;

    const count = btn.querySelector(".like-count");

    if (post.liked) {
        post.liked = false;
        post.likes--;
        btn.classList.remove("liked");
    } else {
        post.liked = true;
        post.likes++;
        btn.classList.add("liked");
    }

    count.textContent = post.likes;
    updatePost(post);
});

// Yorum paneli aç/kapa
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".comment-btn");
    if (!btn) return;

    const card = btn.closest(".post-card");
    const section = card.querySelector(".comment-section");
    section.style.display = section.style.display === "none" ? "block" : "none";
});

// Yorum ekleme (kalıcı + ekrana basma)
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-comment");
    if (!btn) return;

    const card = btn.closest(".post-card");
    const id = card.getAttribute("data-id");
    const post = getPost(id);
    if (!post) return;

    const input = card.querySelector(".comment-input");
    const commentsDiv = card.querySelector(".comments");

    const yorumText = input.value.trim();
    if (!yorumText) return;

    const yorum = {
        user: localStorage.getItem("yansikullanici") || "Anonim",
        text: yorumText
    };

    post.comments.push(yorum);
    updatePost(post);

    // Yorumları tekrar bas (UI güncelleme)
    commentsDiv.innerHTML = post.comments.map((c, i) => `
        <p>
            <strong>${c.user}:</strong> ${c.text}
            <button class="delete-comment" data-index="${i}">Sil</button>
        </p>
    `).join("");

    input.value = "";
});

// POST silme
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-post");
    if (!btn) return;

    const card = btn.closest(".post-card");
    const id = card.getAttribute("data-id");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));

    card.remove();
});

// YORUM silme
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-comment");
    if (!btn) return;

    const card = btn.closest(".post-card");
    const postId = card.getAttribute("data-id");
    const index = btn.getAttribute("data-index");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    post.comments.splice(index, 1);
    updatePost(post);

    // Silme sonrası yorumları UI'da güncelle
    const commentsDiv = card.querySelector(".comments");
    commentsDiv.innerHTML = post.comments.map((c, i) => `
        <p>
            <strong>${c.user}:</strong> ${c.text}
            <button class="delete-comment" data-index="${i}">Sil</button>
        </p>
    `).join("");
});
