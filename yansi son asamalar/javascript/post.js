function savePost(post) {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postList = document.querySelector("#post-list");
    if (!postList) return;
    postList.innerHTML = "";
    posts.forEach(p => renderPost(p, postList));
}

function renderPost(p, postList) {
    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.setAttribute("data-id", p.id);

    postCard.innerHTML = `
        <img src="${p.pfp}" class="pfp">

        <div class="post-content">
            <strong>${p.username}</strong>
            

            <span class="post-time">${p.time}</span>

            <p class="post-text-show">${p.text}</p>

            ${p.kategori ? `<span class="post-tag ${p.kategori}">${p.kategori.toUpperCase()}</span>` : ""}
            ${p.image ? `<img src="${p.image}" class="post-image-show">` : ""}

            <div class="post-actions-bottom">
                <span class="like-btn ${p.liked ? "liked" : ""}">❤️ <b class="like-count">${p.likes}</b></span>
                <span class="comment-btn">💬</span>
                <span class="delete-post">🗑️</span>
            </div>

<div class="comment-section" style="display:none;">
    <div class="comments">
        ${p.comments.map((c, i) => `
           <p>
              <strong>${c.user}:</strong> ${c.text}
              <button class="delete-comment" data-index="${i}">Sil</button>
           </p>
        `).join("")}
    </div>

    <div class="comment-input-row">
        <input type="text" class="comment-input" placeholder="Yorum yaz...">
        <button class="add-comment">Gönder</button>
    </div>
</div>

            </div>
        </div>
    `;

    postList.prepend(postCard);
}

document.addEventListener("DOMContentLoaded", () => {
    loadPosts();

    const postText = document.querySelector(".post-text");
    const postImageInput = document.querySelector(".post-image");
    const categorySelect = document.querySelector(".kategori-sec");
    const postBtn = document.querySelector(".post-btn");
    const postList = document.querySelector("#post-list");

    if (!postText || !postBtn || !postList) return;

    let selectedImage = null;
    const userPfp = localStorage.getItem("pfp_yansikullanici") || "resimler/defaultpfp.png";

    postImageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => selectedImage = e.target.result;
        reader.readAsDataURL(file);
    });

    postBtn.addEventListener("click", () => {
        const text = postText.value.trim();
        const kategori = categorySelect.value;
        const username = getUser();

        if (!text && !selectedImage) {
            alert("Gönderi boş olamaz!");
            return;
        }

        const now = new Date();
        const timeString = now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });

        const post = {
            id: Date.now().toString(),
            username: username,
            text: text,
            image: selectedImage,
            kategori: kategori,
            time: timeString,
            pfp: userPfp,
            likes: 0,
            liked: false,
            comments: []
        };

        savePost(post);
        renderPost(post, postList);

        postText.value = "";
        categorySelect.value = "";
        postImageInput.value = "";
        selectedImage = null;
    });
});
