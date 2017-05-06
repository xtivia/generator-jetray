import React from 'react';
import ReactDOM from 'react-dom';

export class TodoItem extends React.Component {
  render(){
    return <div>{this.props.item}</div>;
  }
}

export class NewTodoItem extends React.Component {

  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
  	this.refs.itemName.focus();
  }

  render(){
    return (
      <form onSubmit={this.onSubmit}>
        <label>New Task</label>
        <input className="form-control" ref="itemName" type="text" />
      </form>);
  }

  onSubmit(event){
    event.preventDefault();
    let input = this.refs.itemName;
    let newItem = input.value;
    this.props.addEvent({ newItem });
    input.value = '';
  }
}
