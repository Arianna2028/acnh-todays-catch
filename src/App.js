import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import CatchableTable from 'components/CatchableTable';

var API_KEY = 'key6kyXjGGK6x51pW';

const now = moment();
const currentMonth = now.format('MMMM');

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


// class FishTable extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             rows: [],
//             sortDirection: 'asc',
//             sortField: 'name'
//         }
//     }

//     componentDidMount() {
//         if (this.state.rows.length < 1) {
//             fetch('https://api.airtable.com/v0/apphC982qIGZ5B8Zp/Fish', {
//                 headers: {
//                     'Authorization': 'Bearer ' + API_KEY
//                 }
//             })
//             .then((resp) => resp.json())
//             .then(data => {
//                 if (data.records) {
//                     this.setState({ rows: data.records });
//                 }
//             });
//         }
//     }

//     setSort(newSortField) {
//         if (newSortField == this.state.sortField) {
//             this.setState({ sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'});
//         } else {
//             this.setState({
//                 sortField: newSortField,
//                 sortDirection: 'asc'
//             });
//         }
//     }

//     sortByName(a, b) {
//         return a.fields.name > b.fields.name ? 1 : -1;
//     }

//     sortByPlace(a, b) {
//         return a.fields.place > b.fields.place ? 1 : -1;
//     }

//     sortByPrice(a, b) {
//         return a.fields.sellPrice > b.fields.sellPrice ? 1 : -1;
//     }

//     render() {
//         var rows = this.state.rows.filter(isAvailableNow),
//             iconName = this.state.sortDirection === 'desc' ? 'caret-down' : 'caret-up',
//             icon = (<FontAwesomeIcon icon={iconName} />),
//             nameIcon, placeIcon, priceIcon;

//         if (this.state.sortField === 'name') {
//             rows.sort(this.sortByName);
//             nameIcon = icon;
//         } else if (this.state.sortField === 'place') {
//             rows.sort(this.sortByPlace);
//             placeIcon = icon;
//         } else if (this.state.sortField === 'price') {
//             rows.sort(this.sortByPrice);
//             priceIcon = icon;
//         }

//         if (this.state.sortDirection === 'desc') {
//             rows.reverse();
//         }

//         return (
//             <table className="table table-striped table-dark">
//                 <thead>
//                     <tr>
//                         <th scope="col" onClick={this.setSort.bind(this, 'name')} className="border-top-0">Name {nameIcon}</th>
//                         <th scope="col" onClick={this.setSort.bind(this, 'place')} className="border-top-0">Place {placeIcon}</th>
//                         <th scope="col" onClick={this.setSort.bind(this, 'price')} className="border-top-0">Sell Price {priceIcon}</th>
//                         <th scope="col" className="border-top-0">Time</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     <CatchablesList catchables={rows} />
//                 </tbody>
//             </table>
//         )
//     }
// }

class App extends Component {


    render() {
        return (
            <div className="container">
                <h1 className="text-white mb-3">Right now, it is: {now.format('MMMM Do, h:mma')}</h1>
                <div className="row">
                    <div className="col">
                        <div className="card bg-dark fish-card">
                            <CatchableTable />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-dark fish-card">
                            <CatchableTable />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
