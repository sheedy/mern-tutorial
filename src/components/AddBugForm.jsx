import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';

import BaseComponent from './common/BaseComponent';

class AddBugForm extends BaseComponent {
  constructor() {
    super();
    this._bind('handleSubmit');
  }

  handleSubmit(e) {
    const form = document.forms.bugAdd;
    e.preventDefault();
    this.props.addBug({ owner: form.owner.value,
      title: form.title.value, status: 'New', priority: 'P1' });
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <Panel header="Add a bug">
        <form name="bugAdd" onSubmit={this.handleSubmit}>
          <Input type="text" name="owner" placeholder="Owner" />
          <Input type="text" name="title" placeholder="Title" />
          <ButtonInput type="submit" bsStyle="primary">Add bug</ButtonInput>
        </form>
      </Panel>
    );
  }
}

AddBugForm.propTypes = {
  addBug: React.PropTypes.func.isRequired,
};

export default AddBugForm;
