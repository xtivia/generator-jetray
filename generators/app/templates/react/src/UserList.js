import React from 'react';
import ReactDOM from 'react-dom';
import sortBy from 'lodash/sortBy'

export class UserList extends React.Component {

  constructor(props){
    super(props);
    this.state = {users : []};
  }
  
  componentDidMount() {
    let self = this;
    fetch("http://jsonplaceholder.typicode.com/users")
      .then( (response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json()
      })   
      .then( (json) => {
        let sorted_users = sortBy(json, function(o) { return o.username; });
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