import React, { Fragment, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tree, TreeNode } from "react-organizational-chart";
import NodeData from "./Details";
import "./index.css";

const createChildNode = (item) => {
  return item?.map((data) => {
    return (
      <Draggable key={data.id} draggableId={`${data.id}`} index={data.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TreeNode
              key={data.id}
              label={
                <NodeData
                  name={data.employeeName}
                  role={data.employeeRole}
                  id={data.id}
                  profile={data.profile}
                />
              }
            >
              {createChildNode(data.children)}
            </TreeNode>
          </div>
        )}
      </Draggable>
    );
  });
};

const CreateOrgStructure = ({ data }) => {
  return data?.map((item) => {
    return (
      <>
        <Tree
          key={item.id}
          label={
            <NodeData
              name={item.employeeName}
              role={item.employeeRole}
              id={item.id}
              profile={item.profile}
            />
          }
        >
          {createChildNode(item.children)}
        </Tree>
      </>
    );
  });
};

export const CardTemplate = ({ data }) => {
  const [dataState, setDataState] = useState(data);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log(result);
  };

  return (
    <div className="org-stucture">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"Org-Chart"} type="Tree">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <CreateOrgStructure data={dataState} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CardTemplate;
