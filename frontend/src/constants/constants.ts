
export interface DEFAULT_USER_TODOS_PROPS {
    id: number;
    title: string;
    description: string;
    status: string;
    due_date: string;
}

export const TOAST_SETTINGS : {} = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: "dark",
};