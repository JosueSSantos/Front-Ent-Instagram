import React, {Component} from 'react';
import api from '../services/api';
import './New.css';

class New extends Component{

state ={
    image: null,
    author: '', 
    place: '', 
    description: '', 
    hashtags: '', 

};
    handleSubmit = async e =>{
        e.preventDefault();

        const data = new FormData();

        data.append('image', this.state.image);

        data.append('author', this.state.author);

        data.append('place', this.state.place);

        data.append('description', this.state.description);

        data.append('hashtags', this.state.hashtags);

        await api.post('posts', data);

        this.props.history.push('/');

       console.log(this.state);
    }
    handleImageChange = e =>{ 
        this.setState({ image: e.target.files[0]})
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value });
    }

    render() {
        return(
            <form  id="new-posts" onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.handleImageChange} />

                <input 
                    type="text"
                    name="author"
                    placeholder="Autor do Post"
                    onChange={this.handleChange}
                    value={this.setState.author}
                />
                  <input 
                    type="text"
                    name="place"
                    placeholder="Localização do Post"
                    onChange={this.handleChange}
                    value={this.setState.place}
                />
                <input 
                    type="text"
                    name="description"
                    placeholder="Descrição do Post"
                    onChange={this.handleChange}
                    value={this.setState.description}
                />
                <input 
                    type="text"
                    name="hashtags"
                    placeholder="Hashtags do Post"
                    onChange={this.handleChange}
                    value={this.setState.hashtags}
                />
                <button type="submit">Enviar</button>
            </form>
        );
    }
} 
export default New;