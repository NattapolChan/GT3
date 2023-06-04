import React from 'react'
import { useDraggable } from '@dnd-kit/core'

type DraggableNoteProps = {
  children: string
}

export default function DraggableNote(props: DraggableNoteProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <text className="h-10 w-10 bg-red-800 text-green-400">
        {props.children}
      </text>
    </button>
  )
}
