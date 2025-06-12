document.querySelector(".btn1").addEventListener
("click", async () => {
    const username = document.querySelector(".text-input1").value.trim();
    if (!username) {
        document.getElementById("engagement-output").innerText = `${engagementRate.toFixed(2)}%`;
        return;
    }

    const token = "4c92481835a94a4987c11081685209b6bf0821efbd7";
    const encodedURL = encodeURIComponent(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`);
    const apiURL = `https://api.scrape.do/?token=${token}&url=${encodedURL}&super=true`;

    try 
    {
        const response = await fetch(apiURL);
        if (!response.ok) {
            alert("Failed to fetch data. Please try again later.");
            return;
        }

        const data = await response.json();
        const user = data?.data?.user;
        if (!user) {
            alert("Invalid username or private account.");
            return;
        }

        const followers = user.edge_followed_by.count;
        const posts = user.edge_owner_to_timeline_media.edges.slice(0, 12);

        let totalLikes = 0;
        let totalComments = 0;

        posts.forEach(post => 
        {
            const node = post.node;
            totalLikes += node.edge_liked_by?.count || 0;
            totalComments += node.edge_media_to_comment?.count || 0;
        });

        const engagementRate = ((totalLikes + totalComments) / (followers * posts.length)) * 100;

        alert(`Engagement Rate: ${engagementRate.toFixed(2)}%`);

    } 
    catch (error) 
    {
        console.error("Error:", error);
        alert("An error occurred.");
    }
});
