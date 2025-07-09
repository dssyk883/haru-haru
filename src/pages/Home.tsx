import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getUserName, forgetMe } from '../utils/storage';

const Home = () => {
    const name = getUserName()
    const time = new Date().getHours() < 12 ? "morning" :  new Date().getHours() < 18 ? "afternoon" : "evening"
    const navigate = useNavigate()

    // Deleting the current uesr name and all tasks and start over from the intro page
    const handleForgetButton = () => {
        forgetMe()
        navigate("/") 
    }

    // Direct to the Timer page
    const handleTimerImage = () => {
        navigate("/timer")
    }

    // Direct to the Stat page
    const handleStatImage = () => {
        navigate("/stat")
    }

    // Direct to the Tasks page
    const handleTasksImage = () => {
        navigate("/tasks")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-6">
            {/* This is Forget button - should be deleted later*/}
            <button
                onClick={handleForgetButton}
                className='absolute top-4 right-4 bg-red-200 px-2 py-1 rounded font-bold hover:bg-red-400 hover:text-white'
            >
                START OVER
            </button>
            <h1 className='text-4xl font-bold text-green-700 pb-3'>Haru</h1>
            <h2 className='text-4xl'>Good {time}, {name}</h2>
            <hr className='border-t-5 border-gray-300 w-full my-4'></hr>
            <div className='flex items-center items-stretch gap-x-4'>
                <img
                    className='max-w-xs hover:bg-green-200'
                    onClick={handleTimerImage}
                    src='/images/timer-icon.png'
                />
                <div className='border-l-[5px] border-gray-300'></div>
                <img
                    className='max-w-xs hover:bg-green-200'
                    onClick={handleStatImage}
                    src='/images/stat-icon.png'
                /> 
                <div className='border-l-[5px] border-gray-300'></div>
                <img
                    className='max-w-xs hover:bg-green-200'
                    onClick={handleTasksImage}
                    src='/images/tasks-icon.png'
                />
            </div>
        </div>
    )
}

export default Home