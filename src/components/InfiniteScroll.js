import React, { useState, useEffect, useRef } from 'react';
import { CSpinner } from '@coreui/react';
import PostCard from './PostCard';
import axiosInstance from '../axiosInstance';

function InfiniteScroll(props) {
    const {posts, setPosts, subreddit} = props
    const [isVisible, setIsVisible] = useState(false)
    const [lastItem, setLastItem] = useState(posts[posts.length - 1])
    const loader = useRef(null)

    const handleObserver = (entities) => {
        const target = entities[0]
        setIsVisible(target.isIntersecting)
    }

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        }
        const observer = new IntersectionObserver(handleObserver, options)
        if(loader.current) {
            observer.observe(loader.current)
        }
    }, [])

    useEffect(() => {
        if(isVisible) {
            setLastItem(posts[posts.length - 1])
            console.log("VISIBLE - LOAD MORE")
        }

    }, [isVisible])

    useEffect(() => {
        axiosInstance.get(`/${subreddit}/${lastItem.id}/loadMore`).then(res => {
            let more = res.data.posts
            setPosts([...posts, ...more])
        })
    }, [lastItem])

    return (
        <div>
            {posts.map((post) => {
                return <PostCard post={post} key={post.id} />
            })}
            <div className="loading" ref={loader}>
                <CSpinner />
            </div>
        </div>
    )
}

export default InfiniteScroll