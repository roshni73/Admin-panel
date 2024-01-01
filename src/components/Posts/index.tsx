import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

import { PostInterface } from '#interfaces/PostInterface';
import Container from '#components/Container';

import './index.css';

function Posts() {
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (Number(id) > 100) {
      return;
    }
    const url = id ? `https://dummyjson.com/users/${id}/posts` : 'https://dummyjson.com/posts';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data && data.posts) {
          setPosts(data.posts);
        }
      });
  }, [id]);

  return (
    <Container>
      <h1>Posts</h1>

      <div className='posts'>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <div className='reactions'>
                <SlLike />
                <FaRegComment />
                <IoShareSocialOutline />
              </div>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
    </Container>
  );

}

export default Posts;