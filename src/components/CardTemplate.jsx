import React, { Fragment, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tree, TreeNode } from "react-organizational-chart";
import NodeData from "./Details";
import "./index.css";

const createChildNode = (item, id) => {
  return item
    ?.filter((value) => value.parent === id)
    ?.map((data) => {
      return (
        <Draggable key={data.id} draggableId={`${data.id}`} index={data.id}>
          {(provided) => {
            return (
              <div
                className="node-data"
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
                      bgColor={data.color}
                    />
                  }
                >
                  {createChildNode(item, data.id)}
                </TreeNode>
              </div>
            );
          }}
        </Draggable>
      );
    });
};

const CreateOrgStructure = ({ data, id }) => {
  return data
    ?.filter((value) => value.parent === id)
    ?.map((item) => {
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
                bgColor={item.color}
              />
            }
          >
            {createChildNode(data, item.id)}
          </Tree>
        </>
      );
    });
};

export const CardTemplate = ({ data }) => {
  const [dataState, setDataState] = useState(data);

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source } = result;
    if (!destination || destination.index === source.index) return;

    let items = dataState.map((value) => {
      if (value.id === source.index) {
        value = { ...value, parent: destination.index };
      }
      return value;
    });
    setDataState(items);
  };

  return (
    <div className="org-stucture">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"Org-Chart"} type="Tree">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <CreateOrgStructure data={dataState} id={null} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CardTemplate;
