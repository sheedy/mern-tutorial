import React from 'react';
import Alert from 'react-bootstrap';

//WIP

export default class SuccessAlert extends React.Component {
  constructor(props) {
    super(props);
    this.dismissSuccess = this.dismissSuccess.bind(this);
    this.state = {
      successAlertVisible: this.props.successAlertVisible
    };
  }

  componentWillReceiveProps(newProps) {
    console.log("New!");
    if (newProps.successAlertVisible === this.state.successAlertVisible) {
      return;
    }
    console.log("New!");
    this.setState({successAlertVisible: newProps.successAlertVisible});
  }

  dismissSuccess() {
    this.setState({successAlertVisible: false});
  }

  render() {
    if (this.state.successAlertVisible) {
      return (
        <Alert bsStyle="success" onDismiss={this.dismissSuccess} dismissAfter={5000}>
          Bug edited successfully !
        </Alert>
      );
    }
    return (<noscript/>);
  }
}
