import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { faPencilAlt } from "@fortawesome/fontawesome-free-solid";

export default function Todo(props) {
  const [todoList, updateVal] = useState([]);
  const [error, updateError] = useState("");
  const [editList, updateList] = useState([]);
  let todoRef = React.useRef(null);
  let todoId = React.useRef([]);
  function AddItem() {
    let value = todoRef.current.value;
    if (value) {
      updateVal([...todoList, value]);
      updateError("");
      todoRef.current.value = "";
    } else {
      updateError("Input Required");
    }
  }
  function DeleteItem(index) {
    console.log(index);
    updateVal((todoList) =>
      todoList.filter((item, i) => (i !== index ? item : null))
    );
  }
  function EditItem(index) {
    updateList([...editList, index]);
    todoId.current[index].disabled = false;
    // updateList(true);
  }
  function changeFuction(index, event) {
    updateVal((todoList) =>
      todoList.map((item, i) => (i === index ? event.target.value : item))
    );
  }
  let list = todoList.map((item, index) => {
    console.log(item, index);

    return (
      <li className="list-group-item list-group-item-light " key={index}>
        <Form.Control
          value={item}
          disabled
          readOnly={false}
          ref={(el) => (todoId.current[index] = el)}
          onChange={(event) => changeFuction(index, event)}
        />
        <ButtonGroup
          aria-label="Action"
          className="position-absolute end-0 top-0"
          size="sm"
        >
          {console.log(editList)}
          {editList.length !== 0 ? (
            editList.map((item, i) => {
              return (
                <>
                  {item === index ? (
                    <>
                      <Button variant="info" key={item}>
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="secondary"
                        key={item}
                        onClick={() => EditItem(index)}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Button>
                      <Button
                        variant="danger"
                        key={i}
                        onClick={() => DeleteItem(index)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Button>
                    </>
                  )}
                </>
              );
            })
          ) : (
            <>
              <Button variant="secondary" onClick={() => EditItem(index)}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </Button>
              <Button variant="danger" onClick={() => DeleteItem(index)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </>
          )}
        </ButtonGroup>
      </li>
    );
  });

  return (
    <>
      <InputGroup className="mt-3">
        <InputGroup.Text id="addItemText" className="bg-dark text-light">
          Add Work
        </InputGroup.Text>
        <Form.Control
          placeholder="Todo"
          name="todo"
          ref={todoRef}
        ></Form.Control>
        <Button
          variant="outline-secondary"
          onClick={AddItem}
          id="button-addon2"
        >
          ADD
        </Button>
      </InputGroup>
      <span className="text-danger">{error}</span>
      <div className="m-3 list-group">{list}</div>
    </>
  );
}
