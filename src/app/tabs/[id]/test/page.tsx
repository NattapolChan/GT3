'use client'
import React, {useState, useMemo} from 'react';
import {DndContext} from '@dnd-kit/core';
import { createSnapModifier } from '@dnd-kit/modifiers';

const tabLength = 20

const initstring = () => {
  let array = ['E', 'A', 'D', 'G', 'B', 'e']
  let stringid = []
  for (let i = 0;i < 6; i++) {
    for (let j = 0;j<tabLength;j++) {
      stringid.push(array[i]+j)
    }
  }
  return stringid
}

export default function App() {
  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">
      <div className='text-red-500'>Drag me</div>
    </Draggable>
  );
  console.log(initstring())
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          <text className='text-green-500'>{parent === id ? draggableMarkup : id}</text>
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event: any) {
    const {over} = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};

import {useDroppable} from '@dnd-kit/core';

function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

import {useDraggable} from '@dnd-kit/core';
import { stringify } from 'querystring';

export function Draggable(props: any) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}