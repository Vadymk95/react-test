import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    company: {
        name: string;
    };
}

interface UserCardProps {
    user: User;
    onDelete: (id: number) => void;
}

const UserCard: FC<UserCardProps> = memo(({ user, onDelete }) => {
    return (
        <div key={user.id} className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Company: {user.company.name}</p>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    );
});

export const App: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchUsers = async () => {
            const url = 'https://jsonplaceholder.typicode.com/users';

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data: User[] = await response.json();
                setUsers(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const memoizedUsers = useMemo(() => {
        // 1. Filtering
        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // 2. Sorting
        const sorted = [...filtered].sort((a, b) => {
            // Convert names to lowercase for case-insensitive comparison
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            // Compare names alphabetically
            if (nameA < nameB) {
                // If nameA comes before nameB:
                // - Return -1 for ascending order (A-Z)
                // - Return 1 for descending order (Z-A)
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (nameA > nameB) {
                // If nameA comes after nameB:
                // - Return 1 for ascending order (A-Z)
                // - Return -1 for descending order (Z-A)
                return sortOrder === 'asc' ? 1 : -1;
            }
            // Names are equal - maintain original order
            return 0;
        });

        return sorted;
    }, [users, searchTerm, sortOrder]);

    const handleDelete = useCallback((userId: number) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }, []);

    if (loading) {
        return <div className="app-container">Loading...</div>;
    }

    if (error) {
        return <div className="app-container">Error: {error}</div>;
    }

    return (
        <div className="app-container">
            <h1>Users list</h1>

            <div className="controls-container">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                <button onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}>
                    Sort by name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
                </button>
            </div>

            <div className="user-list">
                {memoizedUsers.length > 0 ? (
                    memoizedUsers.map(user => (
                        <UserCard key={user.id} user={user} onDelete={handleDelete} />
                    ))
                ) : (
                    <p>Users not found.</p>
                )}
            </div>
        </div>
    );
};
