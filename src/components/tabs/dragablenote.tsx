import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export default function DraggableNote(props : any) {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <text className='text-green-400 bg-red-800 w-10 h-10'>{props.children}</text>
    </button>
  );
}