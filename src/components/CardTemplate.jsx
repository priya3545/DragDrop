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

export const CardTemplates = ({ data }) => {
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

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

const DraggableComp = ({ id, index, children }) => {
  return (
    <Draggable key={id} draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

const DroppableComp = ({ id, children }) => {
  return (
    <Droppable droppableId={`${id}`}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const createTreeNode = (node, index) => {
  if (node == null) return;

  return (
    <DraggableComp id={node.id} key={node.id} index={index}>
      <DroppableComp id={node.id}>
        <TreeNode label={node.name}>
          {node.childNodes.map((orgUnit, index) =>
            createTreeNode(orgUnit, index)
          )}
        </TreeNode>
      </DroppableComp>
    </DraggableComp>
  );
};

const createTree = (root, index) => {
  if (root == null) return;

  return (
    <DraggableComp id={root.id} key={root.id} index={index}>
      <DroppableComp id={root.id}>
        <Tree label={root.name}>
          {root.childNodes.map((orgUnit, index) =>
            createTreeNode(orgUnit, index)
          )}
        </Tree>
      </DroppableComp>
    </DraggableComp>
  );
};

const createNode = (id, name, childNodes) => {
  return {
    id,
    name,
    childNodes,
  };
};

export const CardTemplate = ({ data }) => {
  const [org, setOrg] = useState([
    createNode("0", "root 1", [
      createNode("00", "node 1", [
        createNode("000", "node 11", []),
        createNode("001", "node 12", []),
      ]),
      createNode("01", "node 2", [
        createNode("010", "node 21", []),
        createNode("011", "node 22", []),
      ]),
    ]),
    createNode("1", "root 2", []),
  ]);

  const getArrAfterRemoval = (org, sourceIndexArr, index) => {

    if(index === sourceIndexArr.length -1) {
      return [...org.splice(sourceIndexArr[index], 1)];
    }
    return [...getArrAfterRemoval(org[sourceIndexArr[index]], sourceIndexArr, ++index)];
  }

  const getArrAfterAddition = (org, destIndexArr, index, elem) => {

    if(destIndexArr[index] === 9) return [...org, elem];
    if(index === destIndexArr.length) return [...org, elem];
    return [...getArrAfterAddition(org[destIndexArr[index]], destIndexArr, ++index, elem)];
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    console.log("from dragging - ", result);

    const sourceIndex = result.draggableId;
    const destIndex = result.destination.droppableId;

    const sourceIndexArr = sourceIndex.split("").map(value => parseInt(value, 10));
    const destIndexArr = destIndex.split("").map(value => parseInt(value, 10));
    console.log("index arr - ", sourceIndexArr, destIndexArr);

    let orgResult = [...org];

    let sourceElem = orgResult[sourceIndexArr[0]];
    for(let i=0; i < sourceIndexArr.length; i++) {
      console.log("source elem - ", sourceElem);
      sourceElem = sourceElem.childNodes[sourceIndexArr[i]];
    }
    orgResult = getArrAfterRemoval(orgResult, sourceIndexArr, 0);
    orgResult = getArrAfterAddition(orgResult, destIndexArr, 0, sourceElem);

    console.log("result - ", orgResult);
    setOrg([...orgResult]);
  };

  return (
    <div className="root">
      <DragDropContext onDragEnd={onDragEnd}>
        <DroppableComp droppableId="9">
          {org.map((orgUnit, index) => createTree(orgUnit, index))}
        </DroppableComp>
      </DragDropContext>
    </div>
  );
};

export default CardTemplate;
