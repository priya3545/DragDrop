import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tree, TreeNode } from "react-organizational-chart";
import { filteredValue } from "../helper/helper";
import NodeData from "./Details";
import "./index.css";
export const CreateChildDataNode = ({ data, id }) => {
  const T = id === null ? Tree : TreeNode;
  const filterList = filteredValue(data, id);

  return (
    <div className="child-node">
      {filterList.map((item) => (
        <Draggable key={item.id} draggableId={`${item.id}`} index={item.id}>
          {(provided) => (
            <div
              className="col-3 col3"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              // onDragStart={handleDragStart}
            >
              <T
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
                <CreateChildDataNode data={data} id={item.id} />
              </T>
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export const CardTemplate = ({ data }) => {
  const [dataState, setDataState] = useState(data);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!result.destination || destination.index === source.index) {
      return;
    }
    let items = dataState.map((value) => {
      if (value.id === source.index) {
        value = { ...value, parent: destination.index };
      }
      return value;
    });
    setDataState(items);
    // //parent items after dragged and their child items will be linked HR node
    // const hrID = items.filter((item) => {
    //   if (item.employeeRole === "HR") return item.id;
    // });
    // const linkedChildtoHrData = filteredValue(items, source.index).map(
    //   (item) => {
    //     item = {...item, parent: hrID };
    //     return item;
    //   }
    // );
    // console.log(hrID, linkedChildtoHrData);

    // // console.log(result, items);
    // setDataState();
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"Org-Chart"} type="Tree">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <CreateChildDataNode data={dataState} id={null} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CardTemplate;
