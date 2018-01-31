import React from 'react';
import {
  Link
} from 'react-router-dom';

export default class UserMemberships extends React.Component {
  render() {
    const {
      user
    } = this.props;

    return (
      <div>
        {user && user.memberships && <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>{/* Actions */}</th>
            </tr>
          </thead>
          <tbody>
            {user.memberships.map((membership, ndx) => (
              <tr key={ndx}>
                <td className="font-weight-bold">
                  {membership.organization.name}
                </td>
                <td>
                  {membership.role}
                </td>
                <td>
                  {(membership.role === 'Administrator' || membership.role === 'admin') &&
                    <Link className="btn btn-sm btn-primary" to={`/organizations/${membership.organization.id}`}>
                      <i className="fa fa-gears mr-1" />
                      Manage
                    </Link>
                  }
                  <button type="button" className="btn btn-sm btn-outline-danger">
                    <i className="fa fa-sign-out mr-1" />
                    Leave Organization
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        }
      </div>
    );
  }
}
