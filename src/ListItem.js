import React from 'react';

const ListItem = (props) => {
	return  <li className="list-group-item text-left">
              
              {props.item.name}
              <button className="btn btn-sm btn-success ml-3 float-right " onClick={props.updateTodos}> 
              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
			</button>
              <button className="btn btn-sm btn-danger mr-3 float-right" onClick={props.deleteTodos}><i class="fa fa-trash" aria-hidden="true"></i>

</button>
    </li>;
};
export default ListItem;