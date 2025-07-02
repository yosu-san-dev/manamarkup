const calcIndex = 24;

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

        posts.forEach((post, index) => {
            const node = post.node;
            const likes = node.edge_liked_by.count;
            const comments = node.edge_media_to_comment.count;
            totalLikes += likes;
            totalComments += comments;

            // If you want to show post thumbnails, you'd need img tags like <img id="post-img-0"> in your HTML
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

        // Set data in DOM
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

        // Show hidden section
        const section = document.getElementById("hidden-section-1");
        section.style.display = "block";

        document.getElementById("btn-1-text").textContent = "Check";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("btn-1-text").textContent = "Check";
        alert("An error occurred.");
    }
});

document.getElementById("reanlyse").onclick = function(){
    const section = document.getElementById("hidden-section-1");
    section.style.display = "none";
    document.getElementById("text-input-1").value = ``;
    
};

document.getElementById("toggle-1").addEventListener("click", () => {
    const section = document.getElementById("answer-1");
    const btn = document.getElementById("toggle-1");

    if (section.style.display === "none" || !section.style.display) {
        section.style.display = "block";
        btn.textContent = "-";
    } else {
        section.style.display = "none";
        btn.textContent = "+";
    }
});

document.getElementById("toggle-2").addEventListener("click", () => {
    const section = document.getElementById("answer-2");
    const btn = document.getElementById("toggle-2");

    if (section.style.display === "none" || !section.style.display) {
        section.style.display = "block";
        btn.textContent = "-";
    } else {
        section.style.display = "none";
        btn.textContent = "+";
    }
});

document.getElementById("toggle-3").addEventListener("click", () => {
    const section = document.getElementById("answer-3");
    const btn = document.getElementById("toggle-3");

    if (section.style.display === "none" || !section.style.display) {
        section.style.display = "block";
        btn.textContent = "-";
    } else {
        section.style.display = "none";
        btn.textContent = "+";
    }
});

document.getElementById("toggle-4").addEventListener("click", () => {
    const section = document.getElementById("answer-4");
    const btn = document.getElementById("toggle-4");

    if (section.style.display === "none" || !section.style.display) {
        section.style.display = "block";
        btn.textContent = "-";
    } else {
        section.style.display = "none";
        btn.textContent = "+";
    }
});
