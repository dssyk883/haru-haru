import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { saveUserName, saveUserTasks, getUserName, getUserTasks } from '../utils/storage';

const Intro = () => {
    // step variables if the page is on setting "name" step or "tasks" step
    // Initialize with "name" step
    const [step, setStep] = useState<"name" | "tasks">("name")
    const [name, setName] = useState("")
    const [taskInput, setTaskInput] = useState("")
    const [tasks, setTasks] = useState<string []>([])

    const navigate = useNavigate()

    // Save name and tasks to local storage for now
    const handleNameSubmit = () => {
        // Need to handle this later like
        // not accept submit when it's empty/containing unacceptable special characters
        if (!name.trim()) return
        saveUserName(name.trim())
        setStep("tasks")
    }

    // Add the entered task into the current list
    // It's not storing the task list to local storage
    const handleTaskSubmit = () => {
        const trimmed = taskInput.trim()
        // In this case, it's okay to skip tasks
        if (!trimmed) return
        setTasks([... tasks, trimmed])
        setTaskInput("")
    }

    const handleFinalSubmit = () => {
        if (tasks.length == 0) return
        saveUserTasks(tasks)
        navigate("/home")
    }

    const handleDeleteTask = (indexToDelete : number) => {
        const updated = tasks.filter((_, i) => i !== indexToDelete)
        setTasks(updated)
    }

    useEffect(() => {
        const name = getUserName();
        const tasks = getUserTasks();

        if (name && tasks.length > 0) {
            navigate('/home')
        }
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-6">
            {step === "name" ? (
                <div className="flex flex-col space-y-6 text-center items-center">
                    <h1 className="text-4xl font-bold">Haru</h1>
                    <p className='text-lg'>What's your name?</p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                        className="border rounded p-2 w-64 text-center"
                        autoFocus
                        />

                    <button
                        onClick={handleNameSubmit}
                        className='w-1/3 bg-blue-500 text-white px-4 rounded hover:bg-blue-600'
                    >
                        Next →
                    </button>

                </div>
            ) : (
                <div className="space-y-6 text-center w-full max-w-md">
                    <h2 className="text-2xl font-semibold">Nice to meet you, {name}!</h2>
                    <p className="text-lg">Add a task you often do</p>
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleTaskSubmit()}
                        className='border rounded p-2 w-full text-center'
                        placeholder='e.g. Study, YouTube, Walk'
                        autoFocus
                    />
                    <ul className='text-left space-y-1'>
                        {tasks.map((task, index) => (
                            <li
                            key={index}
                            className='bg-gray-100 px-4 py-2 rounded flex text-center justify-between w-full'>
                            <span className='flex-grow'>{task}</span>
                            <button
                            onClick={() => handleDeleteTask(index)}
                            className='bg-gray-300 text-red-100 font-bold px-2 rounded-full hover:bg-red-300'
                            >
                                x
                            </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={handleFinalSubmit}
                        disabled={tasks.length === 0}
                        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300'>
                        Start Haru →
                    </button>
                </div>
            )
        }
        </div>
    )
}

export default Intro