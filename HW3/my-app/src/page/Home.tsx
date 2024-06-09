import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface HomeProps {
    token: string | null;
}

const Home: React.FC<HomeProps> = ({ token }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (token) {
            axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the posts!", error);
                });
        }
    }, [token]);

    const handleAddPost = () => {
        if (token) {
            axios.post<Post>('https://jsonplaceholder.typicode.com/posts', {
                title,
                body,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setPosts([response.data, ...posts]); 
                    setTitle('');
                    setBody('');
                })
                .catch(error => {
                    console.error("There was an error adding the post!", error);
                });
        }
    };
    

    const handleDeletePost = (id: number) => {
        if (token) {
            axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(() => {
                    setPosts(posts.filter(post => post.id !== id));
                })
                .catch(error => {
                    console.error("There was an error deleting the post!", error);
                });
        }
    };

    return (
        <div>
            <h1>Posts</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleAddPost(); }}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <button type="submit">Add Post</button>
            </form>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`}>
                            <h2>{post.title}</h2>
                        </Link>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
