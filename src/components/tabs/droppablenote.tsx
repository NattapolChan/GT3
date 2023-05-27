import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function DroppableNote(props : any) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <div ref={setNodeRef} style={style}>
      <text className='text-blue-200 bg-green-600'>{props.children}</text>
    </div>
  );
}