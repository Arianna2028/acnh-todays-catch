import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import FishTable from './components/FishTable';
import BugTable from './components/BugTable';


const now = moment();


class App extends Component {

    render() {
        return (
            <div className="container">
                <h1 className="text-white mb-3">Right now, it is: {now.format('MMMM Do, h:mma')}</h1>
                <div className="row">
                    <div className="col">
                        <div className="card bg-dark table-card mb-3">
                            <FishTable />
                        </div>
                    </div>
                    <div className="col">
                        <div className="card bg-dark table-card mb-3">
                            <BugTable />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;
