import { Pie } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import '../index.css'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function MoodChart({ moods }) {
    const data = {
        labels: moods.map(mood => mood.name),
        datasets: [
            {
                label: '%',
                data: moods.map(mood => mood.probability),
                backgroundColor: [
                    '#FF6B6B',  '#FFE066',  '#6BFFB8',  '#6B9CFF',  '#A463FF'
                ],
                hoverBackgroundColor: [
                    '#FF8F8F',  '#FFEE9F',  '#8FFFE3',  '#8FA3FF',  '#CC8AFF'
                ]
            }
        ]
    };
    
    return (
        <div className='chart-contrainer'>
            <Pie data={data}/>
        </div>
    )
}