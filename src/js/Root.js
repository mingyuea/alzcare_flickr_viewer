import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import fetchJsonp from 'fetch-jsonp';
import SearchComp from './SearchComp.js'


class Root extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			"searchVal": "",
			"urlEndpoint": "https://api.flickr.com/services/feeds/photos_public.gne"
		}

		this.handleSearch = this.handleSearch.bind(this);
		this.searchChange = this.searchChange.bind(this);
	}

	searchChange(inputVal){
		this.setState({
			"searchVal": inputVal
		});
	}

	handleSearch(){
		let searchTerm = this.state.searchVal;
		searchTerm = searchTerm.replace(/\s/g, "%20");
		/*let urlEnd = this.state.urlEndpoint + searchTerm;
		console.log(urlEnd);

		fetch(urlEnd, {
			method: 'GET',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(data => console.log(data));*/
		$.ajax({
			url: this.state.urlEndpoint,
			dataType: 'jsonp',
			data: {
				"tags": searchTerm,
				"format": "json"
			}

			/*success: function(data){
				console.log(data)
			}.bind(this),
			error: function(xhr, status, err){
				console.error('an error:', status, err.toString())	
			}.bind(this)*/
		})

	}

	render(){
		return(
			<div>
				<SearchComp searchVal={this.state.searchVal} onChange={this.searchChange} onSubmit={this.handleSearch} />
			</div>
		)
	}
}

export default Root;

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<Root />, wrapper) : false;