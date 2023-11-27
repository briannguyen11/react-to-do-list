import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";

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
            disableAutoFocusItem
        >
            <MenuItem onClick={handleOpen}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <VerticalSplitIcon style={{ marginRight: "8px" }} />
                    Open
                </div>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <DeleteOutlineIcon style={{ marginRight: "8px" }} />
                    Delete
                </div>
            </MenuItem>
        </Menu>
    );

    return {
        handleContextMenu,
        contextMenuComponent,
    };
}

export default ContextMenu;
