import React, { Fragment, useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { faPencilAlt } from "@fortawesome/fontawesome-free-solid";

function TodoAddItem({ onClickAddItem }) {
  let inputRef = React.useRef(null);

  const handleOnClickAddItem = () => {
    const { value } = inputRef.current;
    onClickAddItem(value);
  };

  return (
    <InputGroup className="mt-3">
      <InputGroup.Text id="addItemText" className="bg-dark text-light">
        Add Work
      </InputGroup.Text>
      <Form.Control
        placeholder="Todo"
        name="todo"
        ref={inputRef}
      ></Form.Control>
      <Button
        variant="outline-secondary"
        onClick={handleOnClickAddItem}
        id="button-addon2"
      >
        ADD
      </Button>
    </InputGroup>
  );
}

function TodoError({ error }) {
  return <span className="text-danger">{error}</span>;
}

function TodoListItem({
  item,
  indexKey,
  isEnableEdit,
  onClickDelete,
  OnChangeSaveInputValue,
  onClickEnableIndexEdit,
}) {
  const handleOnChangeInput = (event) => {
    const { value } = event.target;
    OnChangeSaveInputValue(value, indexKey);
  };

  console.log("isEnableEdit", isEnableEdit);
  return (
    <li className="list-group-item list-group-item-light " key={indexKey}>
      <Form.Control
        value={item}
        readOnly={false}
        disabled={!isEnableEdit}
        // ref={(el) => (todoId.current[index] = el)}
        onChange={handleOnChangeInput}
      />

      <ButtonGroup
        aria-label="Action"
        className="position-absolute end-0 top-0"
        size="sm"
      >
        {isEnableEdit && (
          <Button variant="info" key={item}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
        )}
        {!isEnableEdit && (
          <>
            <Button
              variant="secondary"
              onClick={() => onClickEnableIndexEdit(indexKey)}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
            </Button>
            <Button variant="danger" onClick={() => onClickDelete(indexKey)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </>
        )}
      </ButtonGroup>
    </li>
  );
}

function TodoList({
  list,
  enableEditIndexList,
  onClickEnableIndexEdit,
  onClickDelete,
  OnChangeSaveInputValue,
}) {
  return (
    <ul className="m-3 list-group">
      {list.map((item, index) => (
        <TodoListItem
          indexKey={index}
          item={item}
          isEnableEdit={enableEditIndexList.some((e) => e === index)}
          onClickEnableIndexEdit={onClickEnableIndexEdit}
          onClickDelete={onClickDelete}
          OnChangeSaveInputValue={OnChangeSaveInputValue}
        />
      ))}
    </ul>
  );
}

export function Todo() {
  const [todoList, setTodoList] = useState(["a", "b"]);
  const [enableEditIndexList, setEnableEditIndexList] = useState([]);
  const [error, updateError] = useState("");

  const handleOnClickAddItemValue = (value) => {
    setTodoList((preState) => [...preState, value]);
  };

  const handleOnClickEnableIndexEdit = (indexKey) => {
    setEnableEditIndexList((preState) => [...preState, indexKey]);
  };

  const handleOnClickDelete = (deleteIndexKey) => {
    setTodoList((preState) =>
      preState.filter((_, currentIndex) => currentIndex !== deleteIndexKey)
    );
  };

  const handleOnChangeSaveInputValue = (value, indexKey) => {
    const updatedTodoList = todoList.map((item, currentIndex) => {
      return currentIndex === indexKey ? value : item;
    });

    setTodoList(updatedTodoList);
  };

  return (
    <Fragment>
      <TodoAddItem onClickAddItem={handleOnClickAddItemValue} />
      <TodoError />
      <TodoList
        list={todoList}
        enableEditIndexList={enableEditIndexList}
        onClickDelete={handleOnClickDelete}
        onClickEnableIndexEdit={handleOnClickEnableIndexEdit}
        OnChangeSaveInputValue={handleOnChangeSaveInputValue}
      />
    </Fragment>
  );
}
