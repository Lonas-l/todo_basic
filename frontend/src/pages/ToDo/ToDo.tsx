import React, {useEffect, useState} from "react";
import "./ToDo.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import TaskItem from "../../components/TaskItem";
import DatePicker from "react-date-picker";
import {fetchTodos, updateTodoSettings} from "../../service/authService";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
function ToDo({token}: any) {

    const [dataValue, setDataValue] = useState<Value>(new Date());
    const [taskName, setTaskName] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [data, setData] = useState<any>([]);
    const updateTaskName = (id: number, updatedTaskName: string, updatedTaskDescription: string) => {
        const updatedData = data.map((item: any) => {
            if (item.id === id) {
                return {
                    ...item,
                    title: updatedTaskName,
                    description: updatedTaskDescription
                };
            }
            return item;
        });

        setData(updatedData);

        updateTodoSettings(token, updatedData).then(r => {});
    };
    const changeCompleted = (id: number) => {
        const updatedData = data.map((item: any) => {
            if (item.id === id) {
                return {...item, status: item.status == "incomplete" ? "complete" : "incomplete"};
            }
            return item;
        });

        setData(updatedData);
        updateTodoSettings(token, updatedData).then(r => {
        });
    };

    const deleteItem = (id: number) => {
        const updatedData = data.filter((item: any) => item.id !== id);
        setData(updatedData);
        updateTodoSettings(token, updatedData).then(r => {
        });
    };

    const addNewItem = () => {
        const lastId = data.length > 0 ? data[data.length - 1].id : 0;

        const dateObject = new Date(dataValue as any);

        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getUTCFullYear();

        const newItem = {
            id: lastId + 1,
            title: taskName,
            description: taskDescription,
            status: "incomplete",
            due_date: `${day}-${month}-${year}`,
        };

        console.log('newItem = ', newItem.due_date)

        setData([...data, newItem]);
        updateTodoSettings(token, [...data, newItem]).then(r => {
            setTaskName("");
            setTaskDescription("");
            setDataValue(new Date());
        });
    };
    const getSettings = () => {
        fetchTodos(token)
            .then((settings) => {
                if (settings) {
                    setData(settings);
                }
            });
    };

    useEffect(() => {
        getSettings();
    }, []);

    return (
        <div className={"secondTaskPage"}>
            <div>
                <h1>My ToDoList</h1>
                <div className={"inputBlock"}>
                    <Form.Control type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)}
                                  placeholder="Enter label" className={"inputField"}/>

                    <Form.Control type="text" value={taskDescription}
                                  onChange={(e) => setTaskDescription(e.target.value)}
                                  placeholder="Enter description" className={"inputField"}/>
                    <DatePicker
                        onChange={(dataValue: any) => setDataValue(dataValue)}
                        value={dataValue}
                        minDate={new Date()}
                    />
                    <Button className={"inputButton"}
                            disabled={taskName.length < 1 || taskDescription.length < 1 || !dataValue} variant="primary"
                            onClick={() => {
                                addNewItem();
                            }}>
                        Add Task
                    </Button>
                </div>

            </div>
            <div className={"todoItemBlock"}>
                {data?.slice().reverse().map((value: any) => (
                    <TaskItem
                        key={value.id}
                        value={value}
                        changeCompleted={changeCompleted}
                        deleteItem={deleteItem}
                        updateTaskName={updateTaskName}
                    />
                ))}
            </div>
        </div>
    );
}

export default ToDo;
