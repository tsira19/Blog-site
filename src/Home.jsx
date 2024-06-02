import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Image1 from './Assets/360_F_646415876_cmsLxfUmHiCSbnrNB71njoLzNOrGXkbd.jpg';
import Image2 from './Assets/wild-grass-growing-nature_53876-42541.avif';
import Image3 from './Assets/aesthetic-computer-pictures-863p9twidbn825fp.jpg';
import Footer from './Footer';
import Layout from './Layout';

const carouselData = [
  {
    image: Image1,
    caption: "A BEAUTIFUL BLOG WITH NO IMAGES REQUIRED",
    description: "By Maddison Barnett / In Culture / 2 Comment"
  },
  {
    image: Image2,
    caption: "WHAT COULD POSSIBLY GO WRONG?",
    description: "By Maddison Barnett / In Politics / Add comment"
  },
  {
    image: Image3,
    caption: "THE SIMPLEST WAYS TO CHOOSE THE BEST COFFEE",
    description: "By Maddison Barnett / In Humans / 3 Comments"
  }
];

const HomeCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccess = localStorage.getItem('success');
    if (!isSuccess) {
      //navigate('/');
      loadBlogPosts();// es wasashlelia
    } else {
      loadBlogPosts();
    }
  }, [navigate]);

  const loadBlogPosts = () => {
    fetch('https://apitest.reachstar.io/blog/list')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  };

  const onSelectHandler = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const handleReadNow = (id) => {
    console.log(`Reading post with ID ${id} now...`);
    window.location.href = `/blog/get/${id}`;
  };

  const handleReadLater = (id) => {
    console.log(`Saving post with ID ${id} for later reading...`);
  };

  return (
    <div>
        <Layout/>
      <Carousel 
        activeIndex={activeIndex}
        onSelect={onSelectHandler}
        style={{ height: '100%', width: '100%' }}
      >
        {carouselData.map((item, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={item.image}
              alt={`slide ${idx + 1}`}
              style={{ maxHeight: 'calc(100vh - 120px)', objectFit: 'cover' }}
            />
            <Carousel.Caption style={{ top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
              <h3 className="title-1" style={{ fontSize: '3rem', textTransform: 'uppercase' }}>{item.caption}</h3>
              <p>{item.description}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button className="button1" type="button" onClick={() => handleReadNow(item.id)}>READ </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div className="App" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1>Blog Posts</h1>
        <div className="blog-list">
          {posts.map(post => (
            <div className="blog-post" style={{ marginBottom: '20px' }} key={post.id}>
              <h2 style={{ fontSize: '4rem', color: '#930587' }}>{post.title}</h2>
              <p style={{ fontSize: '2rem' }}>{post.description}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="button1" type="button" onClick={() => handleReadNow(post.id)}>More Details</button>
                <button className="button2" type="button" onClick={() => handleReadLater(post.id)}>READ LATER</button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomeCarousel;
