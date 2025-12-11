import { useCallback, useEffect, useRef, useState } from 'react';

// Types for pagination
interface PaginationParams {
    page: number;
    limit: number;
}

// Types for API response
interface ApiResponse<T> {
    data: T[];
    total?: number;
    hasMore?: boolean;
}

// Types for hook
interface UseInfiniteFetcherOptions<T> {
    fetchFn: (params: PaginationParams) => Promise<ApiResponse<T>>;
    initialLimit?: number;
    enabled?: boolean;
}

interface UseInfiniteFetcherReturn<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    hasMore: boolean;
    loadMore: () => Promise<void>;
    reset: () => void;
    observerTarget: (node: HTMLElement | null) => void;
}

export const useInfiniteFetcher = <T>({
    fetchFn,
    initialLimit = 10,
    enabled = true
}: UseInfiniteFetcherOptions<T>): UseInfiniteFetcherReturn<T> => {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);

    const observerTargetRef = useRef<HTMLElement | null>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const isLoadingRef = useRef<boolean>(false);
    const pageRef = useRef<number>(1);

    // Synchronize ref with state
    useEffect(() => {
        pageRef.current = page;
    }, [page]);

    // Data loading function
    const loadMore = useCallback(async () => {
        if (isLoadingRef.current || !hasMore || !enabled) {
            return;
        }

        isLoadingRef.current = true;
        setLoading(true);
        setError(null);

        try {
            const currentPage = pageRef.current;
            const response = await fetchFn({
                page: currentPage,
                limit: initialLimit
            });

            setData(prevData => [...prevData, ...response.data]);
            setHasMore(response.hasMore ?? response.data.length === initialLimit);
            setPage(prevPage => prevPage + 1);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
            setError(errorMessage);
        } finally {
            setLoading(false);
            isLoadingRef.current = false;
        }
    }, [hasMore, enabled, fetchFn, initialLimit]);

    // Reset state
    const reset = useCallback(() => {
        setData([]);
        setPage(1);
        pageRef.current = 1;
        setHasMore(true);
        setError(null);
        isLoadingRef.current = false;
    }, []);

    // Intersection Observer for automatic loading
    const observerTarget = useCallback(
        (node: HTMLElement | null) => {
            // Disconnect previous observer
            if (observerRef.current) {
                observerRef.current.disconnect();
            }

            // If element is removed, clear reference
            if (!node) {
                observerTargetRef.current = null;
                return;
            }

            observerTargetRef.current = node;

            // Create new observer
            observerRef.current = new IntersectionObserver(
                entries => {
                    const [entry] = entries;
                    if (entry.isIntersecting && hasMore && !loading && enabled) {
                        loadMore();
                    }
                },
                {
                    root: null,
                    rootMargin: '100px',
                    threshold: 0.1
                }
            );

            observerRef.current.observe(node);
        },
        [hasMore, loading, enabled, loadMore]
    );

    // Cleanup observer on unmount
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return {
        data,
        loading,
        error,
        hasMore,
        loadMore,
        reset,
        observerTarget
    };
};
