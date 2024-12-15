const loadAllPosts =async (searchText = 'comedy') =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const posts = data.posts;
    // console.log(searchText);
    showPosts(posts)
}
let count = 0;

const showPosts = (posts) =>{
    const postCardContainer = document.getElementById('post-card-container');
    postCardContainer.innerHTML = '';
    const asideCardContainer = document.getElementById('aide-card-container');
    asideCardContainer.innerHTML = '';
    count=0;
    const readCount = document.getElementById('read-count');
    readCount.innerText = '';
    // console.log(posts)
    posts.forEach(post => {
        // console.log(post)
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="px-2 lg:px-8 py-6 flex bg-[#FFFFFF] rounded-3xl mt-4 drop-shadow-xl">
            <div class="relative">
                <span class="h-3 w-3 ${post.isActive ? 'bg-green-500' : 'bg-red-500'} absolute rounded-full right-0 top-1"></span>
                <img class="h-16 w-16 rounded-xl mt-2" src="${post.image}" alt="">
            </div>
            <div class="ml-4">
                <div class="flex gap-2 lg:gap-4 text-[#12132DCC]">
                    <p><span class="font-bold">#</span> <span>${post.category}</span></p>
                    <p><span class="font-bold">Author</span> : <span>${post.author.name}</span></p>
                </div>
                <div class="mt-2 text-[#12132D99]">
                    <div class="pb-4 border-b-[.1rem] border-dashed border-[#12132D40]">
                        <h2 class="mb-4 text-[#12132D] font-bold text-xl">${post.title}</h2>
                        <p>${post.description}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center py-4">
                    <div class="flex gap-2 lg:gap-4 justify-center items-center">
                        <p class="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            <span>${post.comment_count}</span></p>
                        <p class="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>                                  
                            <span>${post.view_count}</span></p>
                        <p class="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>                                  
                            <span>${post.posted_time}</span> min</p>
                    </div>
                    <div>
                        <i onClick="handlePostDetails(${post.id},'${post?.title?.replace(/'/g, "\\'")}','${post?.view_count}')" class="cursor-pointer bg-[#10B981] p-2 rounded-full fa-solid fa-envelope-open text-white"></i>                                  
                    </div>
                </div>
            </div>
        </div>
        `;
        postCardContainer.appendChild(card);
    });
    handleLoadingBar(false);
}

const handlePostDetails = (postId,postTitle,postViewCount) =>{
    
    count++;
    const readCount = document.getElementById('read-count');
    readCount.innerText = count;
    const asideCardContainer = document.getElementById('aide-card-container');
    const asideCard = document.createElement('div');
    asideCard.innerHTML = `
    <div class="flex justify-between items-center gap-4 bg-[#FFFFFF] rounded-xl p-4 mx-4 mb-2 drop-shadow-xl">
        <div class="text-[#12132D]">
            <p>${postTitle}</p>
        </div>
        <div class="text-[#12132D99]">
            <p class="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>                                  
                <span>${postViewCount}</span></p>
        </div>
    </div>
    `;
    asideCardContainer.appendChild(asideCard);
    // console.log('post details by id', postTitle);
}

const loadLatestPosts = async () =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const latestPosts = await res.json();
    handLatestPostsLeLoadingBar(true);
    showLatestPosts(latestPosts)
    // console.log(data);
}

const showLatestPosts = (latestPosts) =>{
    const latestPostCard = document.getElementById('latest-post-card');
    latestPosts.forEach(latestPost =>{
        const postDetailsCard = document.createElement('div');
        postDetailsCard.innerHTML = `
        <div class="flex flex-col gap-4 border-solid border-[.1rem] border-[#12132D26] p-4 rounded-xl">
            <div>
                <img class="h-32 w-full rounded-xl" src="${latestPost.cover_image}" alt="">
            </div>
            <div class="flex gap-2 items-center text-[#12132D99]">
                <i class="fa-regular fa-calendar-days"></i>
                <p class="flex gap-2"><span>${latestPost?.author?.posted_date || 'No Date Count'}</span></p>
            </div>
            <div>
                <h3 class="text-lg font-bold text-[#12132D]">${latestPost.title}</h3>
                <p class="text-[#12132D99]">${latestPost.description}</p>
            </div>
            <div class="flex gap-3 items-center">
                <img class="w-10 h-10 rounded-full" src="${latestPost.profile_image}" alt="">
                <div>
                    <h3 class="text-xl font-bold text-[#12132D]">${latestPost?.author?.name || 'Unknown'}</h3>
                    <p class="text-[#12132D99]">${latestPost?.author?.designation || 'Unknown'}</p>
                </div>
            </div>
        </div>  
        `;
        latestPostCard.appendChild(postDetailsCard);
        // console.log(latestPost)
    })
    handLatestPostsLeLoadingBar(false)
    // console.log(latestPosts)
}

const handleSearchByCategory = () =>{
    const readCount = document.getElementById('read-count');
    readCount.innerText = '';
    count=0;
    const searchInputField =document.getElementById('search-text');
    const searchText = searchInputField.value;
    loadAllPosts(searchText)
    handleLoadingBar(true);
    // console.log('searching calling',searchText);
}

const handleLoadingBar = (isLoading) =>{
    const loadingBars = document.getElementById('allPosts-loading-bars');
    // console.log(isLoading)
    if(isLoading){
        loadingBars.classList.remove('hidden');
    }else{
        loadingBars.classList.add('hidden');
        // setTimeout(() => {
        //     loadingBars.classList.add('hidden');
        // }, 2000);
    }
}
const handLatestPostsLeLoadingBar = (isLoading) =>{
    const loadingBars = document.getElementById('latestPosts-loading-bars');
    // console.log(isLoading)
    if(isLoading){
        loadingBars.classList.remove('hidden');
    }else{
        loadingBars.classList.add('hidden');
    }
}

loadLatestPosts()

loadAllPosts()