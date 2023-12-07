import React, {useState} from "react";
import "./TaskItem.css";
import CompletedSVG from "./SVGIcons/CompletedSVG";
import ConfirmSVG from "./SVGIcons/ConfirmSVG";
import EditSVG from "./SVGIcons/EditSVG";
import DeleteSVG from "./SVGIcons/DeleteSVG";

interface TaskItemProps {
    value: any;
    changeCompleted: any;
    deleteItem: any;
    updateTaskName: any;
}

function TaskItem({value, changeCompleted, deleteItem, updateTaskName}: TaskItemProps) {

    const [isEditTask, setIsEditTask] = useState<boolean>(false);
    const [editedTaskName, setEditedTaskName] = useState<string>(value?.title);
    const [editedTaskDescription, setEditedTaskDescription] = useState<string>(value?.description);
    const handleSaveTaskName = () => {
        updateTaskName(value.id, editedTaskName, editedTaskDescription);
        setIsEditTask(false);
    };

    return (
        <div className={"todoItem " + (value?.status == 'complete' ? "completed" : "")}>
            <div className={"todoItemText"} onClick={() => {
                if (isEditTask) {
                    return;
                } else {
                    changeCompleted(value?.id);
                }
            }}>

                {value?.status == 'complete' && !isEditTask &&
                    <CompletedSVG/>
                }

                <div className={"content"}>
                    {!isEditTask && <p className={"taskName " + "taskTitle"}>{value?.title}</p>}
                    {!isEditTask && <p className={"taskName " + "taskDescription"}>{value?.description}</p>}

                    {isEditTask && <input className={"editedTitle"} type="text" value={editedTaskName}
                                          onChange={(e) => setEditedTaskName(e.target.value)}
                    />}
                    {isEditTask && <input type="text" value={editedTaskDescription}
                                          onChange={(e) => setEditedTaskDescription(e.target.value)}
                    />}

                    <p className={"taskName " + "due_date"}>{`${value?.due_date}`}</p>

                </div>


            </div>
            {isEditTask && <div className="confirmButton" onClick={handleSaveTaskName}>
                <ConfirmSVG/>
            </div>}

            {isEditTask &&
                <span className="cancelEditButton" onClick={() => setIsEditTask(false)}>
                    Cancel
                </span>
            }

            {!isEditTask && value?.status == 'incomplete' && <div className={"todoItemEdit"} onClick={() => setIsEditTask(!isEditTask)}>
                <EditSVG/>
            </div>}

            {!isEditTask &&
                <div className={"todoItemClose"} onClick={() => deleteItem(value.id)}>
                    <DeleteSVG/>
                </div>
            }
        </div>
    );
}

export default TaskItem;
