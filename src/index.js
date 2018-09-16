//import _ from 'lodash';
import React,{Component} from 'react';
import ReactDom from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import YTSearch from 'youtube-api-search';

const API_KEY = 'AIzaSyCM-mX3TRBYg2sgOfectvi6OPlxkUnT8_E';


class App extends Component {

    constructor(props){
        super(props);
        this.state = {
             videos : [],
             selectedVideo : null
            };

    this.videoSearch('9gag girls');

    }
    videoSearch(term){

        YTSearch({key:API_KEY,term:term},(videos)=>{
            this.setState({
                 videos: videos,
                 selectedVideo:videos[0]
                });
        });
    }

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term)},300);;
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos}/>
            </div>
        );
    }
}
//create a component and that produce html 

//take this generated component's html and put on page (in the DOM)
ReactDom.render(<App />, document.querySelector('.container'));
