import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const data = {
    labels: ['Maths', 'English', 'Science', 'Art', 'History'],
    datasets: [
        {
            label: 'Student profile',
            data: [63, 52, 78, 69, 80],
            backgroundColor: 'rgba(85, 205, 76, 0.2)',
            borderColor: 'rgba(85, 205, 76, 1)',
            borderWidth: 1,
        },
    ],
};

const RadarChart = () => {
    return (
        <div style={{width:'50%', margin:'auto'}}>
            <Radar 
        data={data}
        options={{
            scales: {
                r: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }}
        />
        </div>
    )
}

export default RadarChart
