import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
    id: number;
    title: string;
    body: string;
}

interface PostDetailProps {
    token: string | null;
}

const PostDetail: React.FC<PostDetailProps> = ({ token }) => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setPost(response.data);
                    setTitle(response.data.title);
                    setBody(response.data.body);
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        setError("Post not found.");
                    } else {
                        setError("There was an error fetching the post!");
                    }
                    console.error("There was an error fetching the post!", error);
                });
        }
    }, [id, token]);

    const handleUpdatePost = () => {
        if (token && post) {
            axios.put<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                title,
                body,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
                .then(response => {
                    setPost(response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.error("There was an error updating the post!", error);
                });
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdatePost(); }}>
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
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
}

export default PostDetail;
