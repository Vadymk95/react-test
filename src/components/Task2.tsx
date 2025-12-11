import { FC } from 'react';

import { useInfiniteFetcher } from '../hooks/useInfiniteFetcher';

// Types for post data
interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

// Cache for all posts (using closure)
let cachedPosts: Post[] | null = null;

// Function to fetch data from API
// jsonplaceholder always returns all 100 posts, so we cache them
const fetchPosts = async ({
    page,
    limit
}: {
    page: number;
    limit: number;
}): Promise<{ data: Post[]; hasMore: boolean }> => {
    // Simulate network delay on each request (to look like a real API request)
    // First load is slightly longer (simulating loading all data)
    const delay = cachedPosts ? 300 : 800;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Load all posts only on first request
    if (!cachedPosts) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        cachedPosts = await response.json();
    }

    const allPosts = cachedPosts!;
    const totalPosts = allPosts.length;

    // Calculate indices for current page
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Get data for current page (slice on client side)
    const data = allPosts.slice(startIndex, endIndex);
    const hasMore = endIndex < totalPosts;

    return { data, hasMore };
};

export const Task2: FC = () => {
    const { data, loading, error, hasMore, loadMore, observerTarget } = useInfiniteFetcher<Post>({
        fetchFn: fetchPosts,
        initialLimit: 10,
        enabled: true
    });

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Task 2: Infinite Scroll</h1>

            {error && <div style={{ color: 'red', marginBottom: '20px' }}>Error: {error}</div>}

            <div style={{ marginBottom: '20px' }}>
                <h2>Posts ({data.length} / 100)</h2>
                {data.map(post => (
                    <div
                        key={post.id}
                        style={{
                            padding: '15px',
                            marginBottom: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: '#f9f9f9'
                        }}
                    >
                        <h3 style={{ marginTop: 0, color: '#333' }}>
                            #{post.id} - {post.title}
                        </h3>
                        <p style={{ color: '#666', lineHeight: '1.6' }}>{post.body}</p>
                        <small style={{ color: '#999' }}>User ID: {post.userId}</small>
                    </div>
                ))}
            </div>

            {/* Element for Intersection Observer */}
            <div ref={observerTarget} style={{ height: '20px', marginTop: '20px' }}>
                {loading && (
                    <div style={{ textAlign: 'center', padding: '20px' }}>Loading more...</div>
                )}
            </div>

            {/* "Load More" button as fallback */}
            {!loading && hasMore && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        onClick={loadMore}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        Load More
                    </button>
                </div>
            )}

            {!hasMore && data.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                    No more data to load
                </div>
            )}
        </div>
    );
};
