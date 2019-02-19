import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import bg from './bg.jpg';

import './styles.css';

UIkit.use(Icons);

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imgs: [],
			perPage: 12,
			page: 1
		};
	}

	componentDidMount() {
		this.loadImages();
	}

	loadImages = () => {
		fetch(
			`https://api.unsplash.com/photos/?client_id=3fd6bdbde3a7b6e283d60e620289652444d9f6946c5ea62a64085bacb193529c&page=${this
				.state.page}&per_page=${this.state.perPage}`
		)
			.then((res) => res.json())
			.then((data) =>
				this.setState({
					imgs: this.state.imgs.concat([ ...data ])
				})
			)
			.catch((err) => {
				console.log('Error happened during fetching!', err);
			});
	};

	fetchMoreData = () => {
		setTimeout(() => {
			this.setState(
				(prevState) => ({
					page: prevState.page + 1
				}),
				this.loadImages
			);
		}, 1500);
	};

	render() {
		let images = this.state.imgs.map((img, index) => (
			<div key={index}>
				<img data-src={img.urls.small} key={img.id} alt={img.description} uk-img="true" />
			</div>
		));
		return (
			<div>
				<div className="uk-section-default">
					<div className="uk-section uk-height-large uk-background-cover" style={style}>
						<div className="uk-container">
							<h1>Infinite Scroll Unsplash Gallery</h1>
						</div>
					</div>
				</div>
				<div className="uk-section uk-section-large">
					<div className="uk-container uk-container-small">
						<InfiniteScroll
							className="uk-animation-fade"
							dataLength={this.state.imgs.length}
							next={this.fetchMoreData}
							hasMore={true}
							loader={
								<div className="uk-text-center">
									<span uk-spinner="ratio: 3" />
								</div>
							}
						>
							<div className="uk-child-width-1-3@s uk-margin-large" uk-grid="masonry: true">
								{images}
							</div>
						</InfiniteScroll>
					</div>
				</div>
			</div>
		);
	}
}

const style = {
	backgroundImage: `url('${bg}')`
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
