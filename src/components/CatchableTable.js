import React, { Component } from 'react';

function CatchablesItem(props) {
    const catchable = props.value;
    var timeStr = 'All Day';

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

class CatchableTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: [],
            sortDirection: 'asc',
            sortField: 'name'
        }
    }

    setSort(newSortField) {
        if (newSortField == this.state.sortField) {
            this.setState({ sortDirection: this.state.sortDirection === 'asc' ? 'desc' : 'asc'});
        } else {
            this.setState({
                sortField: newSortField,
                sortDirection: 'asc'
            });
        }
    }

    sortByName(a, b) {
        return a.fields.name > b.fields.name ? 1 : -1;
    }

    sortByPlace(a, b) {
        return a.fields.place > b.fields.place ? 1 : -1;
    }

    sortByPrice(a, b) {
        return a.fields.sellPrice > b.fields.sellPrice ? 1 : -1;
    }

    render() {
        var rows = this.state.rows.filter(isAvailableNow),
            iconName = this.state.sortDirection === 'desc' ? 'caret-down' : 'caret-up',
            icon = (<FontAwesomeIcon icon={iconName} />),
            nameIcon, placeIcon, priceIcon;

        if (this.state.sortField === 'name') {
            rows.sort(this.sortByName);
            nameIcon = icon;
        } else if (this.state.sortField === 'place') {
            rows.sort(this.sortByPlace);
            placeIcon = icon;
        } else if (this.state.sortField === 'price') {
            rows.sort(this.sortByPrice);
            priceIcon = icon;
        }

        if (this.state.sortDirection === 'desc') {
            rows.reverse();
        }

        return (
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col" onClick={this.setSort.bind(this, 'name')} className="border-top-0">Name {nameIcon}</th>
                        <th scope="col" onClick={this.setSort.bind(this, 'place')} className="border-top-0">Place {placeIcon}</th>
                        <th scope="col" onClick={this.setSort.bind(this, 'price')} className="border-top-0">Sell Price {priceIcon}</th>
                        <th scope="col" className="border-top-0">Time</th>
                    </tr>
                </thead>

                <tbody>
                    <CatchablesList catchables={rows} />
                </tbody>
            </table>
        )
    }
}

export default CatchableTable;
