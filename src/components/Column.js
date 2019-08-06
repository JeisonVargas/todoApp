import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import './styles/Column.css';

class Column extends React.Component {

  render() {
    return (
      <div className={this.props.column.id === 'column-1' ? 'Column__Container test__1' : 'Column__Container'}>
        <h3 className="Column__Title">{this.props.column.id === 'column-1' ? '' : this.props.column.title}</h3>
        <Droppable
          droppableId={this.props.column.id}
          isDropDisabled={this.props.isDropDisabled}
        >
          {provided => (
            <div className="Column__Item"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {this.props.items.map((item, index) => <Item key={item.id} item={item} index={index} />)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    )
  }
}

export default Column;
