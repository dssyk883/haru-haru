import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getUserTasks, saveUserTasks } from '../utils/storage';

const Timer = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState<string []>(getUserTasks())

    const handleAddTaskSubmit = () => {
        const trimmed = newTask.trim()
        if (trimmed) {
            setTasks(prev => [... prev, trimmed])
            setNewTask("")
        }
        saveUserTasks(tasks)
    }

    useEffect(() => {
        saveUserTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (running && startTime != null){
            interval = setInterval(() => {
                setElapsed(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running, startTime]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <h1 className='text-4xl font-bold text-green-700 pb-3'>Haru</h1>
            <hr className='border-t-5 border-gray-300 w-full my-4'></hr>
            {/* Horizontal Container */}
            <div className='flex items-center items-stretch gap-x-4'>
                {/* Timer Container */}
                <div className='relative flex flex-col items-center justify-center'>
                    <span className='text-center text-3xl font-bold'> Task: {selectedTask}</span>
                    <img src='/images/timer-icon.png' className='opacity-30'/>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'>                
                        <div className='text-4xl font-bold bg-green-200 px-10 py-7 rounded mb-4'> 
                            {new Date(elapsed * 1000).toISOString().substr(11, 8)}
                        </div>
                        <button
                        className={`mt-2 px-4 py-2 rounded font-bold ${running ? 'bg-red-100' : 'bg-blue-100'}`}
                        onClick = {() => {
                            if (!running) {
                                setStartTime(Date.now());
                                setRunning(true);
                            } else {
                                setRunning(false);
                            }
                        }}
                        >
                            {running ? 'Stop' : 'Start'}
                        </button>
                    </div>    
                </div>
                <div className='border-l-[5px] border-gray-300'></div>

                {/* Task list Container */}
                <div className='flex flex-col items-start'>
                    {/* Task input box */}
                    <div className='flex items-center mb-4'>
                        <input
                            type="text"
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTaskSubmit()}
                            placeholder='Enter a task'
                            className='border border-gray-400 px-4 py-2 rounded w-64 mr-2'
                        >
                        </input>
                        <button
                            onClick={() => handleAddTaskSubmit}
                            className='bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-300'
                            >
                            Add
                        </button>
                    </div>        
                    {/* Task list */}
                    <select
                        value={selectedTask}
                        onChange={(e) => setSelectedTask(e.target.value)}
                        className='w-full border border-gray-300 rounded px-4 py-2 bg-white'
                    >
                        <option value=''> Select a task </option>
                        { tasks.map((task, index) => (
                            <option key={index} value={task}>
                                {task}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Timer