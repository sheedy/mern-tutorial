import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';

export default class BugAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    this.props.addBug({owner: form.owner.value, title: form.title.value, status: 'New', priority: 'P1'});
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return (
      <Panel header="Add a bug">
        <form name="bugAdd" onSubmit={this.handleSubmit}>
          <Input type="text" name="owner" placeholder="Owner"/>
          <Input type="text" name="title" placeholder="Title"/>
          <ButtonInput type="submit" bsStyle="primary">Add bug</ButtonInput>
        </form>
      </Panel>
    );
  }
}
