const calcIndex = 24; // the amount of posts neede for the calculation 

/* ============================
   Calculator Section
============================ */

document.querySelector(".btn-1").addEventListener("click", async () => {
    const username = document.querySelector(".text-input-1").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    const token = "4c92481835a94a4987c11081685209b6bf0821efbd7";
    const encodedURL = encodeURIComponent(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`);
    const apiURL = `https://api.scrape.do/?token=${token}&url=${encodedURL}&super=true`;

    try {
        document.getElementById("btn-1-text").textContent = "Loading...";

        const response = await fetch(apiURL);
        if (!response.ok) {
            alert("Failed to fetch data. Please try again later.");
            document.getElementById("btn-1-text").textContent = "Check";
            return;
        }

        const data = await response.json();
        const user = data?.data?.user;
        if (!user) {
            alert("Invalid username or private account.");
            document.getElementById("btn-1-text").textContent = "Check";
            return;
        }

        const avatarURL = user.profile_pic_url;
        const followers = user.edge_followed_by.count;
        const following = user.edge_follow.count;
        const postsNum = user.edge_owner_to_timeline_media.count;
        const name = user.full_name || user.username;
        const posts = user.edge_owner_to_timeline_media.edges.slice(0, calcIndex);

        if (posts.length === 0) {
            alert("This account has no posts.");
            document.getElementById("btn-1-text").textContent = "Check";
            return;
        }

        let totalLikes = 0;
        let totalComments = 0;

        posts.forEach(post => {
            const node = post.node;
            totalLikes += node.edge_liked_by.count;
            totalComments += node.edge_media_to_comment.count;
        });

        const avgLikes = totalLikes / posts.length;
        const avgComments = totalComments / posts.length;
        const engagementRate = ((totalLikes + totalComments) / (followers * posts.length)) * 100;

        // Format numbers (K, M)
        const formatNum = (num) => {
            if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
            if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
            return Math.floor(num);
        };

        // Update DOM elements with fetched and calculated data
        document.getElementById("followers").textContent = formatNum(followers);
        document.getElementById("following").textContent = formatNum(following);
        document.getElementById("posts-num").textContent = postsNum;
        document.getElementById("name").textContent = name;
        document.getElementById("username").textContent = username;
        document.getElementById("avg-likes").textContent = formatNum(avgLikes);
        document.getElementById("avg-comments").textContent = formatNum(avgComments);
        document.getElementById("result-box").textContent = `${engagementRate.toFixed(2)}%`;

        const avatarImg = document.getElementById("avatar");
        if (avatarImg) avatarImg.src = avatarURL;

        // Show results section
        document.getElementById("hidden-section-1").style.display = "block";

        document.getElementById("btn-1-text").textContent = "Check";
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
        document.getElementById("btn-1-text").textContent = "Check";
    }
});

// Re-analyze button: resets input and hides results
document.getElementById("reanlyse").onclick = () => {
    document.getElementById("hidden-section-1").style.display = "none";
    document.getElementById("text-input-1").value = "";
};

// Toggle show/hide details for engagement results
document.getElementById("toggle-btn").addEventListener("click", () => {
    const section = document.getElementById("hidden-section-1");
    const btn = document.getElementById("toggle-btn");
    if (section.style.display === "none" || !section.style.display) {
        section.style.display = "block";
        btn.textContent = "Hide Details";
    } else {
        section.style.display = "none";
        btn.textContent = "Show Details";
    }
});


/* ============================
   FAQ Section - Toggle Answers
============================ */

const faqToggles = ["toggle-1", "toggle-2", "toggle-3", "toggle-4"];

faqToggles.forEach(id => {
    const toggleBtn = document.getElementById(id);
    toggleBtn.addEventListener("click", () => {
        const answerId = `answer-${id.split("-")[1]}`;
        const answerSection = document.getElementById(answerId);
        if (answerSection.style.display === "none" || !answerSection.style.display) {
            answerSection.style.display = "block";
            toggleBtn.textContent = "-";
        } else {
            answerSection.style.display = "none";
            toggleBtn.textContent = "+";
        }
    });
});


/* ============================
   Language Selector
============================ */

const langBtn = document.getElementById("lang-btn");
const langMenu = document.getElementById("lang-menu");

langBtn.addEventListener("click", () => {
    langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
});

// Close language menu when clicking outside
window.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.style.display = "none";
    }
});


/* ============================
   Side Panel (Slide-in Menu)
============================ */

const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const panel = document.getElementById("slide-panel");
const overlay = document.getElementById("overlay");

openBtn.addEventListener("click", () => {
    panel.classList.add("open");
    overlay.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    panel.classList.remove("open");
    overlay.style.display = "none";
});

// Close panel and overlay if clicking outside
window.addEventListener("click", (e) => {
    if (!openBtn.contains(e.target) && !panel.contains(e.target)) {
        panel.classList.remove("open");
        overlay.style.display = "none";
    }
});
