import React, {Component} from 'react';
import api from '../services/api';

import io from 'socket.io-client';
//Fotos
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from  '../assets/comment.svg';
import send from  '../assets/send.svg';

import './Feed.css';

 class Feed extends Component{
    state ={
        feed: [],
    };


async componentDidMount(){
    this.registerToSocket();

    const response = await api.get('posts');
    
    this.setState({ feed : response.data});
}
registerToSocket = () => {
    const socket = io("http://localhost:3003");

    socket.on('post', newPost => {
        this.setState({ feed: [newPost, ...this.state.feed] });
        console.log("aqui tb");
})
socket.on('like', likePost => {
    console.log('likePost');
    this.setState({
        feed: this.state.feed.map(post => 
        post._id === likePost._id ? likePost : post
        )
    });
});
}
handleLike = id =>{
    console.log(`/posts/${id}/like`);
    api.post(`${id}/like`);
}
    render() {
        return(
            <section id='post-list'>
                {this.state.feed.map( post => (
                 <article>
                     <header>
                         <div className='user-info'>
                            <span>{post.author}</span>
                            <span className= 'place'>{post.place}</span>
                         </div>
                     <img src={more} alt='Mais'/>
                     </header>
                
                     <img src={`http://localhost:3003/files/${post.image}`} alt=""/>
                <footer>
                     <div className='actions'>
                         <button type ="button" onClick={() => this.handleLike(post._id)}>
                             <img src={like}  alt=""/>
                         </button>    
                        
                         <img src={comment}  alt=""/>
                        
                         <img src={send}  alt=""/>
                     
                     </div>
                        <strong className='likes'>{post.likes}</strong>
                        <p>
                            {post.description}
                            <span>{post.hashtags}</span>
                        </p>
                </footer>
             </article>
                ) )}
            </section>
        );
    } 
}
export default Feed;