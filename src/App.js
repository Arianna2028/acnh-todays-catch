import React, { Component } from 'react';
import moment from 'moment';

var API_KEY = 'key6kyXjGGK6x51pW';

const now = moment();
const currentMonth = now.format('MMMM');

function CatchablesItem(props) {
    const catchable = props.value;
    var timeStr = 'All Day',
        shadowSize = null;

    if (catchable.timeStartA && catchable.timeEndA) {
        var startA = moment(catchable.timeStartA).format('ha'),
            endA = moment(catchable.timeEndA).format('ha');

        timeStr = startA + ' - ' + endA;

        if (catchable.timeStartB && catchable.timeEndB) {
            var startB = moment(catchable.timeStartB).format('ha'),
                endB = moment(catchable.timeEndB).format('ha');
            timeStr = timeStr + ', ' + startB + ' - ' + endB;
        }
    }

    return (
        <tr>
            <td>{catchable.name}</td>
            <td>{catchable.place}</td>
            <td>{catchable.sellPrice}</td>
            <td>{timeStr}</td>
        </tr>
    )
}

function CatchablesList(props) {
    const catchables = props.catchables;

    return (
        catchables.map((f) => <CatchablesItem key={f.id} value={f.fields} />)
    );
}

function FishTable(props) {
    const catchables = props.catchables;

    return (
        <table className="table table-striped table-dark">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Place</th>
                    <th scope="col">Sell Price</th>
                    <th scope="col">Time</th>
                </tr>
            </thead>

            <tbody>
                <CatchablesList catchables={catchables} />
            </tbody>
        </table>
    )
}

function isAvailableNow(item) {
    const validMonth = item.fields.monthsN.includes(currentMonth);

    var validTime = null;

    if (!item.fields.timeStartA) {
        validTime = true;
    } else {
        var startA = Number(moment(item.fields.timeStartA).format('HH')),
            endA = Number(moment(item.fields.timeEndA).format('HH')),
            currentHour = Number(now.format('HH'));

        validTime = currentHour >= startA && currentHour < endA;

        if (!validTime && item.fields.timeStartB) {
            var startB = Number(moment(item.fields.timeStartB).format('HH')),
                endB = Number(moment(item.fields.timeEndB).format('HH'));

            validTime = currentHour >= startB && currentHour < endB;
        }
    }

    return validMonth && validTime;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fish: []
        };
    }

    componentDidMount() {
        if (this.state.fish.length < 1) {
            fetch('https://api.airtable.com/v0/apphC982qIGZ5B8Zp/Fish', {
                headers: {
                    'Authorization': 'Bearer ' + API_KEY
                }
            })
            .then((resp) => resp.json())
            .then(data => {
                if (data.records) {
                    this.setState({ fish: data.records });
                }
            });
        }
    }

    render() {
        const allFish = this.state.fish,
            fish = allFish.filter(isAvailableNow);

        return (
            <div className="container">
                <h1>Right now, it is: {now.format('MMMM Do, h:mma')}</h1>
                <FishTable catchables={fish} />
            </div>
        )
    }
}

export default App;
