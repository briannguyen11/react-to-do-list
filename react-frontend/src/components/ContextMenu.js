import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function ContextMenu({ tasks, removeOneTask, toggleTaskInfo, getTaskId }) {
    const [contextMenu, setContextMenu] = useState(null);
    const [clickedRowIndex, setClickedRowIndex] = useState(null);

    const handleContextMenu = (event, rowIndex) => {
        event.preventDefault();
        setContextMenu({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
        setClickedRowIndex(rowIndex);
    };

    const handleCloseContextMenu = () => {
        setContextMenu(null);
        setClickedRowIndex(null);
    };

    const handleOpen = async () => {
        if (clickedRowIndex !== null) {
            getTaskId(tasks[clickedRowIndex]._id);
            toggleTaskInfo();
        }
        handleCloseContextMenu();
    };

    const handleDelete = () => {
        removeOneTask(tasks[clickedRowIndex]._id);
        handleCloseContextMenu();
    };

    const contextMenuItems = [
        { label: "Open", action: handleOpen },
        { label: "Delete", action: handleDelete },
    ];

    const contextMenuComponent = (
        <Menu
            open={contextMenu !== null}
            onClose={handleCloseContextMenu}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
            }
        >
            {contextMenuItems.map((item, index) => (
                <MenuItem key={index} onClick={item.action}>
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );

    return {
        handleContextMenu,
        contextMenuComponent,
    };
}

export default ContextMenu;
