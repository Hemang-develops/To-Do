import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";

const CustomModal = (props) => {
    const [activeItem, setActiveItem] = useState(props.activeItem);

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const updatedItem = { ...activeItem, [name]: value };
        setActiveItem(updatedItem);
    };

    return (
        <Modal isOpen={true} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>Todo Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="todo-title">Title</Label>
                        <Input
                            type="text"
                            id="todo-title"
                            name="title"
                            value={activeItem.title}
                            onChange={handleChange}
                            placeholder="Enter Todo Title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="todo-description">Description</Label>
                        <Input
                            type="text"
                            id="todo-description"
                            name="description"
                            value={activeItem.description}
                            onChange={handleChange}
                            placeholder="Enter Todo description"
                        />
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input
                                type="checkbox"
                                name="completed"
                                checked={activeItem.completed}
                                onChange={handleChange}
                            />
                            Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => props.onSave(activeItem)}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CustomModal;
