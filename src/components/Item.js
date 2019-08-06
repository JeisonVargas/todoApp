import React from 'react';

import { Draggable } from 'react-beautiful-dnd';
import './styles/Item.css';

class Item extends React.Component {
  render() {
    const isDragDisabled = false;
    // const isDragDisabled = this.props.item.id === 'task-1';
    return (
      <Draggable
        draggableId={this.props.item.id}
        index={this.props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <div className={'Item__Container'}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
						<div className="Item__Handle" {...provided.dragHandleProps} ></div>
            {this.props.item.content}
          </div>
        )}
      </Draggable>
    )
  }
}

export default Item;
