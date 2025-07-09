import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getUserTasks, saveUserTasks } from '../utils/storage';

const Timer = () => {
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState(0);
    const [running, setRunning] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-6">
            <h1 className='text-4xl font-bold text-green-700 pb-3'>Haru</h1>
            <img src='/images/timer-icon.png' className='opacity-30'/>
        </div>
    )
}

export default Timer