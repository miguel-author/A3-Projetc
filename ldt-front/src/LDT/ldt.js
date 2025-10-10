import React, { useEffect, useState } from "react";
import './ldt.css';
import instance from "../config/axiosConfig";
import { deleteTask, updateTask } from "../service/service";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"; // Se usar React Router

const Ldt = () => {
  // const navigate = useNavigate(); // Se usar React Router

  const [task, setTask] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: false,
    expirationDate: ''
  });

  const fetchTask = async () => {
    try {
      const response = await instance.get('/task');
      setTask(response.data);
    } catch (error) {
      console.error('Não foi possível encontrar as tasks', error);
      toast.error('Não foi possível encontrar as tasks');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  const newTask = () => {
    // Se usar React Router:
    // navigate('/nova-tarefa');
    window.location.href = 'http://localhost:3000/nova-tarefa';
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTask();
      toast.success('Task deletada com sucesso');
    } catch (error) {
      console.error('Não foi possível deletar a task', error);
      toast.error('Não foi possível deletar a task');
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setTaskData({
      title: task.title,
      description: task.description,
      status: task.status,
      expirationDate: task.expirationDate
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!taskData.title || !taskData.description || !taskData.expirationDate) {
      toast.error('Preencha todos os campos para editar a tarefa');
      return;
    }
    try {
      if (editingTask) {
        await updateTask(editingTask.id, taskData);
        toast.success('Task editada com sucesso');
        setEditingTask(null);
        fetchTask();
      }
    } catch (error) {
      toast.error('Não foi possível editar a task');
      console.log('Não foi possível editar a task');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'TO_DO' ? 'DONE' : 'TO_DO';
      await instance.put(`/task/${id}`, { status: newStatus });
      fetchTask();
      toast.success('Status da task atualizado com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa!', error);
      toast.error('Não foi possível atualizar o status da task');
    }
  };

  const filteredTasks = task.filter(task => {
    const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatusFilter = true;
    if (statusFilter === 'DONE') {
      matchesStatusFilter = task.status === 'DONE';
    } else if (statusFilter === 'TO_DO') {
      matchesStatusFilter = task.status === 'TO_DO';
    }

    return matchesSearchQuery && matchesStatusFilter;
  });

  return (
    <div className="todo-container">
      <header>
        <h1>Lista de Tarefas</h1>
        <button className="newTask" onClick={newTask}>
          Nova Tarefa
        </button>
      </header>
      {editingTask && (
        <div className="todo-container">
          <form className="updateForm" onSubmit={handleUpdate}>
            <h2 className="editeSuaTarefa">Editar Tarefa</h2>
            <input
              className="textUpdate"
              type="text"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
              placeholder="Title"
            />
            <input
              className="textUpdate"
              type="text"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
              placeholder="Description"
            />
            <input
              className="dateUpdate"
              type="date"
              value={taskData.expirationDate}
              onChange={(e) => setTaskData({ ...taskData, expirationDate: e.target.value })}
            />
            <button className="updateBtn" type="submit">Update Task</button>
            <button className="CancelBtn" type="button" onClick={() => setEditingTask(null)}>Cancel</button>
          </form>
        </div>
      )}
      <div id="toolbar">
        <div id="search">
          <h4>Procurar:</h4>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Procure pelo Titulo ou Descrição"
          />
        </div>
        <div id="filter">
          <h4>Filtrar: </h4>
          <select id="filter-select" value={statusFilter} onChange={handleStatusChange}>
            <option value="">Todos</option>
            <option value="TO_DO">A fazer</option>
            <option value="DONE">Pronto</option>
          </select>
        </div>
      </div>
      <div id="todo-list" className="listaTarefas">
        <ul>
          {filteredTasks.map(task => (
            <li className="lista" key={task.id}>
              <strong className="taskTitle">{task.title}</strong>
              <i className="statusLista">{task.status}</i>
              <br />
              {task.description}
              <p>
                <button className="editBtn" onClick={() => handleEditClick(task)}>Editar</button>
                <button className="deleteBtn" onClick={() => handleDelete(task.id)}>Deletar</button>
                <label className="statusLabel">
                  <input
                    className="okBtn"
                    type="checkbox"
                    checked={task.status === 'DONE'}
                    onChange={() => toggleTaskStatus(task.id, task.status)}
                  />
                </label>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ldt;