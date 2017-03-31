import React from 'react';
import ReactDOM from 'react-dom';
import sortBy from 'lodash/sortBy'
import request from 'superagent'

export class UserList extends React.Component {

  constructor(props){
    super(props);
    this.state = {users : []};
  }
  
  componentDidMount() {
        let self = this;
        request
          .get("http://jsonplaceholder.typicode.com/users")
          .end(function (err, res) {
              if (err || !res.ok) {
                  throw new Error("Bad response from server");
              }
              let sorted_users = sortBy(res.body, function(o) { return o.username; });
              self.setState({users: sorted_users});
          });
    };
 
  render() {
    let workers = this.state.users.map((user,index) => {
      return <li key={index}>{user.username}--{user.name}</li>;
    });
    return(
      <div>
        <ul>{workers}</ul>
      </div>
    );
  }
  
}