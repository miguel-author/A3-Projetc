try{

            const token = localStorage.getItem("token");
        const config = {
            headers: {
                method:'POST',
            Authorization: `Bearer ${token}`,
            },
        };
        await axios.create('http://localhost:3001/task', config, {
            title, description, status, expirationDate
        });
        setMensagem('Task criada com sucesso')
    }catch (error) {
        if (error.responde && error.response.status === 400) {
            setMensagem("Credenciais invalidas");
        } else {
            setMensagem("Erro ao criar usuário o login")
        }
        console.log(error)
    }

    danilo.miguel@saojudas.br

   

   <div>
            <h2>Edit Task</h2>
            <input
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                placeholder="Title"
            />
            <input
                type="text"
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                placeholder="Description"
            />
            <input
                type="checkbox"
                checked={taskData.status}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.checked })}
            /> Completed
            <input
                type="date"
                value={taskData.expirationDate}
                onChange={(e) => setTaskData({ ...taskData, expirationDate: e.target.value })}
            />
            <button onClick={handleUpdate}>Update Task</button>
            <button onClick={() => history.push('/')}>Cancel</button>
        </div>