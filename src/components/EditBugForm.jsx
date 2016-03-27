import React from 'react';
import $ from 'jquery';
import Link from 'react-router/lib/Link';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

class EditBugForm extends React.Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.showSuccessAlert = this.showSuccessAlert.bind(this);
    this.dismissSuccess = this.dismissSuccess.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      successAlertVisible: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this.loadData();
    }
  }

  onChangePriority(e) {
    this.setState({ priority: e.target.value });
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }

  onChangeOwner(e) {
    this.setState({ owner: e.target.value });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  loadData() {
    $.ajax(`/api/bugs/${this.props.params.id}`).done(
      bug => this.setState(bug)
    );
  }

  showSuccessAlert() {
    this.setState({ successAlertVisible: true });
  }

  dismissSuccess() {
    this.setState({ successAlertVisible: false });
  }

  submit(e) {
    e.preventDefault();
    const bug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title,
    };
    $.ajax({
      url: `/api/bugs/${this.props.params.id}`,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(bug),
      dataType: 'json',
      success: function submitSuccess(updatedBug) {
        this.setState(updatedBug);
        this.showSuccessAlert();
      }.bind(this),
    });
  }

  render() {
    const success = (
      <Alert bsStyle="success" onDismiss={this.dismissSuccess} dismissAfter={5000}>
        Bug edited successfully !
      </Alert>
    );
    return (
      <div style={{ maxWidth: 600 }}>
        <Panel header={`Edit bug: ${this.props.params.id}`}>
          <form onSubmit={this.submit}>
            Priority:
            <Input
              type="select" name="priority"
              value={this.state.priority} onChange={this.onChangePriority}
            >
              <option value="P1">P1</option>
              <option value="P2">P2</option>
              <option value="P3">P3</option>
            </Input>
            Status:
            <Input type="select" value={this.state.status} onChange={this.onChangeStatus}>
              <option>New</option>
              <option>Open</option>
              <option>Fixed</option>
              <option>Closed</option>
            </Input>
            Owner:
            <Input type="text" value={this.state.owner} onChange={this.onChangeOwner} />
            Title:
            <Input type="text" value={this.state.title} onChange={this.onChangeTitle} />
            <ButtonToolbar>
              <Button bsStyle="primary" type="submit">Submit</Button>
              <Link className="btn btn-default" to="/bugs">Back to bug list</Link>
            </ButtonToolbar>
          </form>
          {this.state.successAlertVisible ? success : null}
        </Panel>
      </div>
    );
  }
}

EditBugForm.propTypes = {
  params: React.PropTypes.object,
};

export default EditBugForm;
