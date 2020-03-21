import axios from 'axios';
import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem';
import loaderGig from './loader.gif';

class App extends Component{
constructor(props) {
    super();
    

    this.state = {
      newtoDo:'',
      editing:false,
      editingIndex:null,
      notification:null,
      todos: [],
      loading:true,

    }
this.apiUrl = 'https://5e602ac5cbbe0600146cb834.mockapi.io';
    
this.addTodo = this.addTodo.bind(this);
this.handleToDo = this.handleToDo.bind(this);
this.deleteTodos =  this.deleteTodos.bind(this);
this.updateTodos =  this.updateTodos.bind(this);
this.changeTodo =  this.changeTodo.bind(this);
  }

async componentDidMount (){
  const response = await axios.get(`${this.apiUrl}/reactcrud`);
  this.setState({
    todos:response.data,
    loading:false
  })
}

  handleToDo(event){
      this.setState({
        newtoDo: event.target.value
      })

    }
  generateID(){
    const lastID = this.state.todos[this.state.todos.length-1];
    if(lastID){
      return lastID.id+1
    }
    return 1
  }
  alert(notification){
    this.setState({
      notification
    })
    setTimeout(()=>{
      this.setState({
        notification:null,
      })
    },2000)
    
  }
 async addTodo(){

   const response = await axios.post(`${this.apiUrl}/reactcrud`,{
     name: this.state.newtoDo
   });
   const todos = this.state.todos;
   todos.push(response.data);
    this.setState({
      todos: todos,
      newtoDo: ''
    })
    this.alert('Added Successfully');
  }
  async deleteTodos(index){
    const todos = this.state.todos;
    const todo = todos[index];

    await axios.delete(`${this.apiUrl}/reactcrud/${todo.id}`);

    delete todos[index];
    this.setState({
      todos : todos
    })
    this.alert('Deleted Successfully');

  }
  updateTodos(index){
    const todo = this.state.todos[index]
    this.setState({
      editing: true,
      newtoDo: todo.name,
      editingIndex: index,
      
    })
    this.alert('Updated Successfully');
    
  }
  async changeTodo(){
    const todo = this.state.todos[this.state.editingIndex];
    const response = await axios.put(`${this.apiUrl}/reactcrud/${todo.id}`,{
     name: this.state.newtoDo
   });

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({
      todos,
      editing:false,
      editingIndex:null,
      newtoDo:''
    })


  }

  render() {  
    

  return (
    <div className="App">
      <header className="App-header" style={{minHeight: "100px"}}>
        <img src={logo} className="App-logo" alt="logo"  />
        
      </header>
      <div className="container">
          <h4 className="p-4">Todo App</h4>
          {
            this.state.notification &&
            <div className="alert alert-info">{this.state.notification}</div>
          }
          {
           this.state.loading &&
            <img src={loaderGig} alt="loading"/>
          }
          
          
          <input type="text"
          name="toDO"
          value={this.state.newtoDo}
          className="form-control my-3"
          placeholder="Add New Event"
          onChange={this.handleToDo}

          />
          <button 
          className="btn btn-info btn-block mb-3" 
          disabled={this.state.newtoDo.length < 5 }
          onClick={this.state.editing ? this.changeTodo:this.addTodo} 

          >
          {this.state.editing ? 'Update':'Add'} Event
          </button>
          {
            (!this.state.editing || this.state.loading ) &&
          
          <ul className="list-group">
            {this.state.todos.map((item,index)=>{
              return <ListItem 
              key={index.id}
              item={item}
              updateTodos = {()=>this.updateTodos(index)}
              deleteTodos = {()=>this.deleteTodos(index)}
              />;
            }

              )} 
          </ul>
          }
      </div>
    </div>
  );
}
}

export default App;
