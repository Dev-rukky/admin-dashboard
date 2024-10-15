import { DragOverlay, useDraggable, UseDraggableArguments } from '@dnd-kit/core';

interface Props {
    id: string;
    data?: UseDraggableArguments['data']
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {

    const { attributes, listeners, setNodeRef, active } = useDraggable({
        id,
        data,
    })

  return (
    <div style={{ position: 'relative'}}>
      <div ref={setNodeRef} {...attributes} {...listeners} style={{
        opacity: active ? (active.id === id ? 1 : 0.5) : 1,
        borderRadius: '8px',
        position: 'relative',
        cursor: 'grab'

      }}>
        {active?.id === id && (
            <DragOverlay zIndex={1000} >
                <div style={{
                    borderRadius: '8px',
                    boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;',
                    cursor: 'grabbing'
                }}>
                    {children}
                </div>
            </DragOverlay>
        )}
        {children}
      </div>
    </div>
  )
}

export default KanbanItem
