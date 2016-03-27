import React from 'react';

import Panel from 'react-bootstrap/lib/Panel';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';

class BugFilter extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.state = {
      status: this.props.filter.status,
      priority: this.props.filter.priority,
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.filter.status === this.state.status &&
      newProps.filter.priority === this.state.priority) {
      return;
    }
    this.setState({ status: newProps.filter.status, priority: newProps.filter.priority });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  onChangePriority(e) {
    this.setState({ priority: e.target.value });
  }

  applyFilter() {
    const filter = {};
    if (this.state.status) {
      filter.status = this.state.status;
    }
    if (this.state.priority) {
      filter.priority = this.state.priority;
    }
    this.props.onSubmit(filter);
  }

  render() {
    return (
      <div>
        <Panel collapsible expanded header="Bug filters">
          <Grid fluid>
            <Row>
              <Col xs={12} sm={6} md={4}>
                Status:
                <Input type="select" value={this.state.status} onChange={this.onChangeStatus}>
                  <option value="">(Any)</option>
                  <option value="New">New</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </Input>
              </Col>
              <Col xs={12} sm={6} md={4}>
                Priority:
                <Input type="select" value={this.state.priority} onChange={this.onChangePriority}>
                  <option value="">(Any)</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                  <option value="P3">P3</option>
                </Input>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <ButtonInput bsStyle="primary" onClick={this.applyFilter}>Apply</ButtonInput>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}

BugFilter.propTypes = {
  filter: React.PropTypes.object,
  onSubmit: React.PropTypes.func.isRequired,
};

export default BugFilter;
