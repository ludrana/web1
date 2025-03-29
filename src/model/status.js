const Status = {
    BACKLOG: "backlog",
    IN_PROGRESS: "in-progress",
    DONE: "done",
    TRASH: "trash",
};

const StatusLabel = {
    [Status.BACKLOG]: "Бэклог",
    [Status.IN_PROGRESS]: "B прoцессе",
    [Status.DONE]: "Готово",
    [Status.TRASH]: "Kорзина",
};

export {Status, StatusLabel};