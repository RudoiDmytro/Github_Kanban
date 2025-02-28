import { Card } from "antd";
import type { Issue } from "../../types/types";
import KanbanCard from "./KanbanCard";
import { Droppable } from "@hello-pangea/dnd";
import styles from "./Kanban.module.css";

type KanbanColumnProps = {
  columnId: string;
  title: string;
  issues: Issue[];
};

const KanbanColumn = ({ columnId, title, issues }: KanbanColumnProps) => {
  return (
    <Card id={columnId} className={styles.kanbanColumn}>
      <div className={styles.kanbanColumnTitle}>{title}</div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.kanbanColumnContent}
          >
            {issues.map((issue, index) => (
              <KanbanCard key={issue.id} issue={issue} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Card>
  );
};

export default KanbanColumn;
