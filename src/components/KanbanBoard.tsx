import React from 'react';
import KanbanColumn from './KanbanColumn';
import { useKanbanStore } from '../store/useKanbanStore';
import { DragDropContext } from '@hello-pangea/dnd';

const KanbanBoard: React.FC = () => {
  const issues = useKanbanStore((state) => state.columns);
  const moveIssue = useKanbanStore((state) => state.moveIssue);
  const reorderIssue = useKanbanStore((state) => state.reorderIssue);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    const issueId = parseInt(draggableId);

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      reorderIssue(
        source.droppableId as "todo" | "inProgress" | "done",
        destination.droppableId as "todo" | "inProgress" | "done",
        source.index,
        destination.index
      );
    } else {
      moveIssue(
        issueId,
        source.droppableId as "todo" | "inProgress" | "done",
        destination.droppableId as "todo" | "inProgress" | "done",
        destination.index
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='kanbanBoard'>
        <KanbanColumn columnId="todo" issues={issues.todo} title="To Do" />
        <KanbanColumn columnId="inProgress" issues={issues.inProgress} title="In Progress" />
        <KanbanColumn columnId="done" issues={issues.done} title="Done" />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;