const getStatusColor = (status) => {
    switch (status) {
        case "Not Started":
            return { backgroundColor: "#f0f0f0", iconColor: "#767676" };
        case "In Progress":
            return { backgroundColor: "#ffebbd", iconColor: "#cc7722" };
        case "Done":
            return { backgroundColor: "#d2e7d6", iconColor: "#50835c" };
        default:
            return { backgroundColor: "#f0f0f0", iconColor: "#767676" };
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

export { getStatusColor, getCategoryColor };
