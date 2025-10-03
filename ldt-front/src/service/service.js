import instance from "../config/axiosConfig";

export const deleteTask = async (id) => {
    try {
        await instance.delete(`/task/${id}`);
    } catch (error) {
        console.error('Não foi possivel excluir a task', error);
    }
  };

export const updateTask = async (id, taskData) => {
    try {
        await instance.put(`/task/${id}`, taskData);
    } catch (error) {
        console.error('There was an error updating the task!', error);
    }
};