import React from 'react';

import { Draggable } from 'react-beautiful-dnd';
import './styles/Item.css';

class Item extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div className={'Item__Container'}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {this.props.item.content}
          </div>
        )}
      </Draggable>
    )
  }
}

export default Item;
