import { useState, useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom'
import { getUserTasks, saveUserTasks } from '../utils/storage';

const Timer = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');
    const [showTask, setShowTask] = useState(false);
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState<string []>(getUserTasks());
    const [taskInput, setTaskInput] = useState("");
    const [showSaved, setShowSaved] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    const handleAddTaskSubmit = () => {
        const trimmed = newTask.trim()
        if (trimmed) {
            setTasks(prev => [... prev, trimmed])
            setNewTask("")
        }
        saveUserTasks(tasks)
    };

    const handleSaveTaskTime = () => {
        // Save the elapsed time with the current task
        
        //
        setFadeOut(false);
        setShowSaved(true);
        
        setTimeout(() => {
            setFadeOut(true);
        }, 2000);
        setTimeout(() => {
            setShowSaved(false);
            setElapsed(0);
        }, 2500);
    };

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
            
                <div className='text-3xl font-bold mb-4'>
                    Task: {selectedTask} 
                </div>
                <button
                onClick={() => setShowTask(true)}
                className='ml-2 px-4 py-1 bg-gray-200'>
                    Select a task
                </button>
            
            {/* Pop up window for selecting a task */}
            { showTask && (
                <div className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded shadow-2xl w-64 z-50">
                    {/* Close button */}
                    <div className='text-center font-bold text-2xl'> Tasks </div>
                    <button
                        onClick={() => setShowTask(false)}
                        className='absolute top-1 right-3 text-gray-500 hover:text-black text-xl font-bold'
                        aria-label='Close'
                    >
                        x
                    </button>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTaskSubmit()}
                        className='border rounded p-2 w-full text-center mt-6 mb-2'
                        placeholder='Enter a task e.g. Study, Walk'
                        autoFocus
                    />
                    <ul className='text-left space-y-1'>
                        {tasks.map((task, index) => (
                            <li
                            key={index}
                            onClick={() => {
                                setSelectedTask(task)
                                setShowTask(false)
                            }}
                            className='bg-gray-100 px-4 py-2 rounded flex text-center justify-between w-full hover:bg-gray-200'>
                            <span className='flex-grow'>{task}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Pop up window for saved time & task info */}
            { showSaved && (
                <div className={`fixed top-1/2 left-1/2 px-4 py-10 text-3xl text-center transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-2xl w-64 z-50 transition-opacity duration-500
                ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
                    Saved <br/>
                    <div className='mt-2 text-4xl font-bold text-green-800'>
                    {selectedTask}
                    <br/>
                    {new Date(elapsed * 1000).toISOString().substr(11, 8)}
                    </div>
                </div>
            )}

            {/* Relative vertical container */}
            <div className='relative flex flex-col justify-center'>
                    <img src='/images/timer-icon.png' className='opacity-30'/>
                    <div className='absolute inset-0 flex flex-col items-center justify-center'> 
                        <div className='text-4xl font-bold bg-green-200 px-10 py-7 rounded mb-4' style={{ backgroundColor:'rgba(97, 218, 139, 0.5)'}}> 
                            {new Date(elapsed * 1000).toISOString().substr(11, 8)}
                        </div>
                        <button
                        className={`text-2xl mt-2 px-4 py-2 rounded font-bold ${running ? 'bg-red-100 hover: bg-red- 200' : 'bg-blue-100 hover:bg-blue-200'}`}
                        onClick = {() => {
                            if (!running) {
                                setStartTime(Date.now());
                                setRunning(true);
                            } else {
                                setRunning(false);
                                handleSaveTaskTime();
                            }
                        }}
                        >
                            {running ? 'Stop' : 'Start'}
                        </button>
                    </div>    
                </div>
        </div>
    )
}

export default Timer