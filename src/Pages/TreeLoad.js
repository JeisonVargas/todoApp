import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../components/Column';

// import './styles/TreeLoad.css'

class TreeLoad extends React.Component {
  state = {
    items: {
      'task-1': {id: 'task-1', content: 'Take out the garbage'},
      'task-2': {id: 'task-2', content: 'Watch my favourite show'},
      'task-3': {id: 'task-3', content: 'Charge my phone'},
      'task-4': {id: 'task-4', content: 'Cook dinner'},
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Posiciones',
        itemIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
    },
    columnOrder: ['column-1'],
  }

  // onDragStart = start => {
  //   const { destination } = start;
  //   console.log(start.draggableId);
  //   // Object.key(this.state.items) = 'blue';
  //   document.body.style.color = 'orange';
	// 	document.body.style.transition = 'background-color 0.2s ease'
  // };

	// onDragUpdate = update => {
	// 	const { destination } = update;
	// 	const opacity = destination
	// 		? destination.index / Object.keys(this.state.items).length
	// 		: 0;
	// 	document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
	// }

  onDragEnd = result => {
    // document.body.style.color = 'inherit';
		// document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newItemIds = Array.from(column.itemIds);
    newItemIds.splice(source.index, 1);
    newItemIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      itemIds: newItemIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn
      }
    }

    this.setState(newState);
  }

  render() {
    return (
      <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
        {this.state.columnOrder.map((columnId) => {
          const column = this.state.columns[columnId];
          const items = column.itemIds.map(itemId => this.state.items[itemId]);

          return <Column key={column.id} column={column} items={items} />;
        })}
      </DragDropContext>
    )
  }
}

export default TreeLoad;
