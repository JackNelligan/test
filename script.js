document.addEventListener('DOMContentLoaded', function() {
    const username = 'user1'; // Assume logged-in user
    const postList = document.getElementById('post-list');
    const suggestedList = document.getElementById('suggested-list');

    // Fetch featured posts
    function fetchFeaturedPosts() {
        fetch('/api/featured-posts')
            .then(response => response.json())
            .then(posts => {
                postList.innerHTML = ''; // Clear existing content
                posts.forEach(post => {
                    const postItem = document.createElement('div');
                    postItem.classList.add('post-item');
                    
                    const postLink = document.createElement('a');
                    postLink.href = post.url;
                    postLink.textContent = post.title;
                    
                    postItem.appendChild(postLink);
                    postList.appendChild(postItem);
                });
            })
            .catch(error => console.error('Error fetching featured posts:', error));
    }

    // Fetch suggested posts
    function fetchSuggestedPosts() {
        fetch(`/api/suggested-posts/${username}`)
            .then(response => response.json())
            .then(posts => {
                suggestedList.innerHTML = ''; // Clear existing content
                posts.forEach(post => {
                    const suggestedItem = document.createElement('div');
                    suggestedItem.classList.add('suggested-item');
                    
                    const suggestedLink = document.createElement('a');
                    suggestedLink.href = post.url;
                    suggestedLink.textContent = post.title;
                    
                    suggestedItem.appendChild(suggestedLink);
                    suggestedList.appendChild(suggestedItem);
                });
            })
            .catch(error => console.error('Error fetching suggested posts:', error));
    }

    // Load content when the page is ready
    fetchFeaturedPosts();
    fetchSuggestedPosts();
});

document.addEventListener('DOMContentLoaded', function() {
    const username = 'user1'; // Assume logged-in user
    const postList = document.getElementById('post-list');
    const suggestedList = document.getElementById('suggested-list');
    const loadingFeatured = document.getElementById('loading-featured');
    const loadingSuggested = document.getElementById('loading-suggested');
    const errorFeatured = document.getElementById('error-featured');
    const errorSuggested = document.getElementById('error-suggested');

    // Fetch and display featured posts
    function fetchFeaturedPosts() {
        loadingFeatured.style.display = 'block'; // Show loading spinner
        errorFeatured.textContent = ''; // Clear previous errors

        fetch('/api/featured-posts')
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(posts => {
                postList.innerHTML = ''; // Clear existing content
                posts.forEach(post => {
                    const postItem = document.createElement('div');
                    postItem.classList.add('post-item');
                    
                    const postLink = document.createElement('a');
                    postLink.href = post.url;
                    postLink.textContent = post.title;
                    
                    postItem.appendChild(postLink);
                    postList.appendChild(postItem);
                });
            })
            .catch(error => {
                console.error('Error fetching featured posts:', error);
                errorFeatured.textContent = 'Failed to load featured posts.';
            })
            .finally(() => {
                loadingFeatured.style.display = 'none'; // Hide loading spinner
            });
    }

    // Fetch and display suggested posts
    function fetchSuggestedPosts() {
        loadingSuggested.style.display = 'block'; // Show loading spinner
        errorSuggested.textContent = ''; // Clear previous errors

        fetch(`/api/suggested-posts/${username}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(posts => {
                suggestedList.innerHTML = ''; // Clear existing content
                posts.forEach(post => {
                    const suggestedItem = document.createElement('div');
                    suggestedItem.classList.add('suggested-item');
                    
                    const suggestedLink = document.createElement('a');
                    suggestedLink.href = post.url;
                    suggestedLink.textContent = post.title;
                    
                    suggestedItem.appendChild(suggestedLink);
                    suggestedList.appendChild(suggestedItem);
                });
            })
            .catch(error => {
                console.error('Error fetching suggested posts:', error);
                errorSuggested.textContent = 'Failed to load suggested posts.';
            })
            .finally(() => {
                loadingSuggested.style.display = 'none'; // Hide loading spinner
            });
    }

    // Load content when the page is ready
    fetchFeaturedPosts();
    fetchSuggestedPosts();
});

document.addEventListener('DOMContentLoaded', function() {
    const username = 'user1'; // Assume logged-in user
    const postList = document.getElementById('post-list');
    const suggestedList = document.getElementById('suggested-list');
    const loadingFeatured = document.getElementById('loading-featured');
    const loadingSuggested = document.getElementById('loading-suggested');
    const errorFeatured = document.getElementById('error-featured');
    const errorSuggested = document.getElementById('error-suggested');
    const loadMoreFeatured = document.getElementById('load-more-featured');
    const loadMoreSuggested = document.getElementById('load-more-suggested');
    
    let featuredOffset = 0;
    const featuredLimit = 3;

    let suggestedOffset = 0;
    const suggestedLimit = 3;

    // Fetch and display featured posts
    function fetchFeaturedPosts(offset = 0) {
        loadingFeatured.style.display = 'block'; // Show loading spinner
        errorFeatured.textContent = ''; // Clear previous errors

        fetch(`/api/featured-posts?offset=${offset}&limit=${featuredLimit}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(posts => {
                if (posts.length === 0) {
                    loadMoreFeatured.style.display = 'none'; // Hide button if no more posts
                }

                posts.forEach(post => {
                    const postItem = document.createElement('div');
                    postItem.classList.add('post-item');
                    
                    const postLink = document.createElement('a');
                    postLink.href = post.url;
                    postLink.textContent = post.title;
                    
                    postItem.appendChild(postLink);
                    postList.appendChild(postItem);
                });

                featuredOffset += posts.length;
            })
            .catch(error => {
                console.error('Error fetching featured posts:', error);
                errorFeatured.textContent = 'Failed to load featured posts.';
            })
            .finally(() => {
                loadingFeatured.style.display = 'none'; // Hide loading spinner
            });
    }

    // Fetch and display suggested posts
    function fetchSuggestedPosts(offset = 0) {
        loadingSuggested.style.display = 'block'; // Show loading spinner
        errorSuggested.textContent = ''; // Clear previous errors

        fetch(`/api/suggested-posts/${username}?offset=${offset}&limit=${suggestedLimit}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(posts => {
                if (posts.length === 0) {
                    loadMoreSuggested.style.display = 'none'; // Hide button if no more posts
                }

                posts.forEach(post => {
                    const suggestedItem = document.createElement('div');
                    suggestedItem.classList.add('suggested-item');
                    
                    const suggestedLink = document.createElement('a');
                    suggestedLink.href = post.url;
                    suggestedLink.textContent = post.title;
                    
                    suggestedItem.appendChild(suggestedLink);
                    suggestedList.appendChild(suggestedItem);
                });

                suggestedOffset += posts.length;
            })
            .catch(error => {
                console.error('Error fetching suggested posts:', error);
                errorSuggested.textContent = 'Failed to load suggested posts.';
            })
            .finally(() => {
                loadingSuggested.style.display = 'none'; // Hide loading spinner
            });
    }

    // Event listeners for "Load More" buttons
    loadMoreFeatured.addEventListener('click', () => {
        fetchFeaturedPosts(featuredOffset);
    });

    loadMoreSuggested.addEventListener('click', () => {
        fetchSuggestedPosts(suggestedOffset);
    });

    // Initial load
    fetchFeaturedPosts();
    fetchSuggestedPosts();
});

document.addEventListener('DOMContentLoaded', function() {
    const userId = 1; // Assume logged-in user's ID
    const notificationList = document.getElementById('notification-list');
    const loadingNotifications = document.getElementById('loading-notifications');
    const errorNotifications = document.getElementById('error-notifications');

    // Fetch and display notifications
    function fetchNotifications() {
        loadingNotifications.style.display = 'block'; // Show loading spinner
        errorNotifications.textContent = ''; // Clear previous errors

        fetch(`/api/notifications/${userId}`)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(notifications => {
                notificationList.innerHTML = ''; // Clear existing content
                notifications.forEach(notif => {
                    const notifItem = document.createElement('div');
                    notifItem.classList.add('notification-item');
                    if (notif.read) notifItem.classList.add('read');

                    const notifType = document.createElement('span');
                    notifType.classList.add('notification-type');
                    notifType.textContent = `[${notif.type}]`;

                    const notifMessage = document.createElement('span');
                    notifMessage.classList.add('notification-message');
                    notifMessage.textContent = notif.message;

                    notifItem.appendChild(notifType);
                    notifItem.appendChild(notifMessage);

                    notificationList.appendChild(notifItem);
                });
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
                errorNotifications.textContent = 'Failed to load notifications.';
            })
            .finally(() => {
                loadingNotifications.style.display = 'none'; // Hide loading spinner
            });
    }

    // Mark notifications as read
    function markNotificationsAsRead() {
        fetch('/api/notifications/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log('Notifications marked as read:', data);
        })
        .catch(error => console.error('Error marking notifications as read:', error));
    }

    // Initial load
    fetchNotifications();
    
    // Optional: Mark notifications as read when the user views them
    notificationList.addEventListener('click', () => {
        markNotificationsAsRead();
    });
});

function notifyUser(userId, type, message) {
    fetch('/api/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, type, message })
    })
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => console.log('Notification created:', data))
    .catch(error => console.error('Error creating notification:', error));
}

// Example usage: Notify post author of a new comment
notifyUser(postAuthorId, 'comment', 'Your post received a new comment!');