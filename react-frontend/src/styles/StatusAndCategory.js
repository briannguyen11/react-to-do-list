const statuses = ["Not Started", "In Progress", "Done"];

const categories = ["Personal", "School", "Work", "Sports"];

const getStatusColor = (status) => {
    switch (status) {
        case "Not Started":
            return {
                buttonColor: "#e6e6e6",
                iconColor: "#767676",
                backgroundColor: "#f5f5f5",
            };
        case "In Progress":
            return {
                buttonColor: "#ffebbd",
                iconColor: "#cc7722",
                backgroundColor: "#fffaf0",
            };
        case "Done":
            return {
                buttonColor: "#d2e7d6",
                iconColor: "#50835c",
                backgroundColor: "#f4f9f4",
            };
        default:
            return {
                buttondColor: "#e3e3e3",
                iconColor: "#767676",
                backgroundColor: "#f0f0f0",
            };
    }
};

const getCategoryColor = (category) => {
    switch (category) {
        case "Personal":
            return "#ffdddd"; // Red background for Personal
        case "Work":
            return "#ffebbd"; // Yellow background for Work
        case "School":
            return "#d2e7d6"; // Green background for School
        case "Sports":
            return "#c7e1ff"; // Blue background for Sports
        default:
            return "#f0f0f0"; // Default background color
    }
};

export { statuses, categories, getStatusColor, getCategoryColor };
