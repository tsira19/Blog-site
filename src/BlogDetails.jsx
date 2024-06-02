import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const BlogDetailsPage = () => {
    const { id } = useParams();
    const [blogDetails, setBlogDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [editingMode, setEditingMode] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newComment, setNewComment] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [commentSubmitting, setCommentSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getBlogDetails = async () => {
            try {
                const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
                if (response.status === 200 && response.data) {
                    setBlogDetails(response.data);
                    setNewTitle(response.data.title);
                    setNewDescription(response.data.description);
                    setAllComments(response.data.comments || []);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching blog details:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getBlogDetails();
    }, [id]);

    const handleUpdateBlog = async () => {
        try {
            if (!newTitle.trim() || !newDescription.trim()) {
                alert('Title and description are required.');
                return;
            }
            const updatedBlog = { title: newTitle, description: newDescription };
            await axios.put(`https://apitest.reachstar.io/blog/edit/${id}`, updatedBlog);

            setEditingMode(false);
            const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
            if (response.status === 200 && response.data) {
                setBlogDetails(response.data);
                setNewTitle(response.data.title);
                setNewDescription(response.data.description);
            }
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const handleAddComment = async () => {
        try {
            setCommentSubmitting(true);
            if (!newComment.trim()) {
                alert('Please enter a comment.');
                return;
            }
            await axios.post(`https://apitest.reachstar.io/comment/add/${id}`, { comment: newComment });
            const response = await axios.get(`https://apitest.reachstar.io/blog/get/${id}`);
            if (response.status === 200 && response.data) {
                setBlogDetails(response.data);
                setAllComments(response.data.comments || []);
                setNewComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        } finally {
            setCommentSubmitting(false);
        }
    };

    const handleRemoveComment = async (commentId) => {
        try {
            await axios.delete(`https://apitest.reachstar.io/comment/delete/${commentId}`);
            setAllComments(allComments.filter(comment => comment.id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleRemoveBlog = async () => {
        try {
            await axios.delete(`https://apitest.reachstar.io/blog/delete/${id}`);
            navigate(`/home/${id}`);
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    return (
        <div className="details-container p-0">
            <div className="container blog-details p-4 mb-4 d-flex flex-column align-items-center mt-5 px-4">
                <h2 className="text-center mb-4" style={{ color: '#b226d8', fontWeight: 'bold', fontSize: '24px' }}>
                    {isLoading ? 'Loading...' : blogDetails.title}
                </h2>
                {isLoading ? (
                    <p>Loading details...</p>
                ) : (
                    <div className='details-content d-flex flex-column align-items-center'>
                        <div className="button-group d-flex justify-content-center gap-4">
                            <button onClick={() => setEditingMode(!editingMode)} className="btn btn-danger mb-4">
                                {editingMode ? 'Cancel Edit' : 'Edit Blog'}
                            </button>
                            <button onClick={handleRemoveBlog} className="btn btn-danger mb-4">Delete Blog</button>
                        </div>
                        {editingMode ? (
                            <div className='editing-section d-flex flex-column align-items-center'>
                                <input
                                    id="newTitleInput"
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                />
                                <br />
                                <textarea
                                    id="newDescriptionInput"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                />
                                <br />
                                <button onClick={handleUpdateBlog} className="btn btn-success" style={{ width: '240px' }}>Save Changes</button>
                            </div>
                        ) : (
                            <>
                                <div className="description-section d-flex flex-column align-items-center" style={{ fontSize: '18px' }}>
                                    <p>{blogDetails.description}</p>
                                </div>
                                <div className="comment-input-section">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        style={{ backgroundColor: '#ffffff', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <button className='submit-comment-btn' onClick={handleAddComment} disabled={commentSubmitting}>Submit</button>
                                </div>
                                <div>
                                    <h3>Comments</h3>
                                    <ul>
                                        {allComments.map(comment => (
                                            <li key={comment.id}>
                                                {comment.comment}
                                                <button onClick={() => handleRemoveComment(comment.id)}>Delete</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogDetailsPage;