import React from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../components/Column';

import './styles/TreeLoad.css'

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
        title: 'Area Inicial',
        itemIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'Posiciones',
        itemIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Intereses',
        itemIds: [],
      },
      'column-4': {
        id: 'column-4',
        title: 'Alternativas a la no negociación',
        itemIds: [],
      },
    },
    columnOrder: ['column-2', 'column-3', 'column-4'],
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

  // onDragStart = start => {
  //   const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
  //
  //   this.setState({
  //     homeIndex,
  //   })
  // }

  onDragEnd = result => {
    // document.body.style.color = 'inherit';
		// document.body.style.backgroundColor = 'inherit';
    // this.setState({
    //   homeIndex: null,
    // })

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

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
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
      return;
    }

    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    this.setState(newState);

  }

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <div className="TreeLoad__Container">
          <Column
            key={this.state.columns['column-1'].id}
            column={this.state.columns['column-1']}
            items={this.state.columns['column-1'].itemIds.map(itemId => this.state.items[itemId])}
            isDropDisabled={true}
          />
        </div>
        <div className="TreeLoad__Container">
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const items = column.itemIds.map(itemId => this.state.items[itemId]);

            return (
              <Column
                key={column.id}
                column={column}
                items={items}
              />);
          })}
        </div>
      </DragDropContext>
    )
  }
}

export default TreeLoad;
