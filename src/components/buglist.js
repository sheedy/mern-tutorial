import React from 'react';
import $ from 'jquery';

import BugTable from './bugtable';
import BugAdd from './bugadd';
import BugFilter from './bugfilter';

const apiGetBugUrl = '/api/bugs';
const apiAddBugUrl = '/api/bugs';

class BugList extends React.Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.addBug = this.addBug.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.state = {
      bugs: []
    };
  }

  loadData() {
    var query = this.props.location.query || {};
    var filter = {
      priority: query.priority,
      status: query.status
    };
    $.ajax({
      url: apiGetBugUrl,
      data: filter,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({bugs: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  addBug(bug) {
    $.ajax({
      url: apiAddBugUrl,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(bug),
      success: function(data) {
        var newBugList = this.state.bugs.concat(data);
        this.setState({bugs: newBugList});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  changeFilter(filter) {
    this.context.router.push({
      search: '?' + $.param(filter)
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority && oldQuery.status === newQuery.status) {
      return;
    } else {
      this.loadData();
    }
  }

  render() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter onSubmit={this.changeFilter} filter={this.props.location.query}/>
        <hr/>
        <BugTable bugs={this.state.bugs}/>
        <hr/>
        <BugAdd addBug={this.addBug}/>
      </div>
    );
  }
}

BugList.contextTypes = {
  router: React.PropTypes.object
};

export default BugList;
