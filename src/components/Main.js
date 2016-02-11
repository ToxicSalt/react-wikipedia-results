require('normalize.css');
require('styles/App.css');

import React from 'react';
import $ from 'jquery';

import SearchComponent from './SearchComponent';
import ResultComponent from './ResultComponent';

class AppComponent extends React.Component {
  constructor() {
    super();
    this.api = {
      method: 'GET',
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        format: 'json',
        formatversion: '2',
        generator: 'search',
        gsrnamespace: '0',
        gsrlimit: '5',
        prop: 'extracts|pageimages',
        redirects: '',
        exintro: 'true',
        exsentences: '3',
        explaintext: 'true',
        exlimit: 'max',
        piprop: 'thumbnail',
        pithumbsize: '250',
        gsrsearch: ''
      },
      dataType: 'jsonp'
    }
    this.state = {
      query: '',
      results: []
    }
  }
  updateQueryResults() {
    if (this.state.query != '') {
      this.api.data.gsrsearch = this.state.query;
      $.ajax(this.api).done(data => {
        this.setState({
          results: data.query.pages
        })
      })
    }
    else {
      this.setState({
        results: []
      })
    }
  }
  render() {
    return (
      <div className="index">
        <SearchComponent query={this.state.query} updateQuery={event => {this.setState({query:event.target.value}, this.updateQueryResults)}}/>
        <div className="result-container">
          {this.state.results.map((result, index) =>
            {
              if (!result.missing || !result.invalid) {
                return <ResultComponent key={index} url={result.fullurl} title={result.title} description={result.extract} />
              }
            }
          )}
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
