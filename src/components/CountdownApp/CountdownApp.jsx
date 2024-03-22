import './Countdown.css';
import {useState, useEffect, useRef} from "react";

export default function CountdownApp() {
    const [targetTime, setTargetTime] = useState('');
    const [diff, setDiff] = useState(0);
    const intervalId = useRef(null);

    const handleSubmit = () => {
        intervalId.current = setInterval(() => {
            setDiff(new Date(targetTime) - new Date())
        }, 1000)
    }

    useEffect(() => {
        if (diff < 0) {
            clearInterval(intervalId.current);
            setDiff(0);
            setTargetTime('');
        }
    }, [diff]);

    const handleReset = () => {
        clearInterval(intervalId.current);
        setDiff(0);
        setTargetTime('');
    }

    const calculateTimeLeft = () => {
        let totalSeconds = Math.floor(diff / 1000);

        // Calculate days
        const days = Math.floor(totalSeconds / (3600 * 24));
        totalSeconds %= 3600 * 24;

        // Calculate hours
        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;

        // Calculate minutes
        const minutes = Math.floor(totalSeconds / 60);

        // Calculate seconds
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    }

    return(
        <div>
            <h1>Countdown App</h1>
            <input type='datetime-local'
                value={targetTime} onChange={(e) => setTargetTime(e.target.value)}
            />
            <button className='start-btn' onClick={handleSubmit}>Start</button>
            <button className='start-btn' onClick={handleReset}>Reset</button>
            <p>Time in ms: {diff}</p>
            <div className='time-block'>
                <h4>Time left:</h4>
                <div className='rem-time'>
                    <div className='time'>
                        <p className='num'>{calculateTimeLeft().days}</p>
                        <h4>days</h4>
                    </div>
                    <div className='time'>
                        <p className='num'>{calculateTimeLeft().hours}</p>
                        <h4>hours</h4>
                    </div>
                    <div className='time'>
                        <p className='num'>{calculateTimeLeft().minutes}</p>
                        <h4>mins</h4>
                    </div>
                    <div className='time'>
                        <p className='num'>{calculateTimeLeft().seconds}</p>
                        <h4>secs</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}