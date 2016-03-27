import React from 'react';
import Link from 'react-router/lib/Link';

const BugRow = function bugRow(props) {
  return (
    <tr>
      <td>
        <Link to={`/bugs/${props.bug._id}`}>{props.bug._id}</Link>
      </td>
      <td>{props.bug.status}</td>
      <td>{props.bug.priority}</td>
      <td>{props.bug.owner}</td>
      <td>{props.bug.title}</td>
    </tr>
  );
};

BugRow.propTypes = {
  bug: React.PropTypes.object,
};

export default BugRow;
