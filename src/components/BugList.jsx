import React from 'react';
import $ from 'jquery';

import BugTable from './BugTable';
import AddBugForm from './AddBugForm';
import BugFilter from './BugFilter';

const apiGetBugUrl = '/api/bugs';
const apiAddBugUrl = '/api/bugs';

class BugList extends React.Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.addBug = this.addBug.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.state = {
      bugs: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority && oldQuery.status === newQuery.status) {
      return;
    }
    this.loadData();
  }

  loadData() {
    const query = this.props.location.query || {};
    const filter = {
      priority: query.priority,
      status: query.status,
    };
    $.ajax({
      url: apiGetBugUrl,
      data: filter,
      dataType: 'json',
      cache: false,
      success: function loadDataSuccess(data) {
        this.setState({ bugs: data });
      }.bind(this),
      error: function loadDataError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  addBug(bug) {
    $.ajax({
      url: apiAddBugUrl,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(bug),
      success: function addBugSuccess(data) {
        const newBugList = this.state.bugs.concat(data);
        this.setState({ bugs: newBugList });
      }.bind(this),
      error: function addBugError(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
  }

  changeFilter(filter) {
    this.context.router.push({
      search: `?${$.param(filter)}`,
    });
  }

  render() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter onSubmit={this.changeFilter} filter={this.props.location.query} />
        <hr />
        <BugTable bugs={this.state.bugs} />
        <hr />
        <AddBugForm addBug={this.addBug} />
      </div>
    );
  }
}

BugList.contextTypes = {
  router: React.PropTypes.object,
};

BugList.propTypes = {
  location: React.PropTypes.object,
  url: React.PropTypes.string,
};

export default BugList;
