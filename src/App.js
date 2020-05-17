import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import FishTable from './components/FishTable';
import BugTable from './components/BugTable';


const now = moment();


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isMobile: window.innerWidth <= 768,
            activeTab: 'fish'
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange.bind(this));
    }

    render() {
        var desktop = (
            <div className="container">
                <h3 className="text-white mb-3 mt-2">Right now, it is: {now.format('MMMM Do, h:mma')}</h3>
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
        );

        var mobile = (
            <div className="container">
                <h3 className="text-white mb-3 mt-2">Right now, it is: {now.format('MMMM Do, h:mma')}</h3>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={this.state.activeTab === 'fish' ? 'nav-link active' : 'nav-link'} href="#" onClick={this.setTab.bind(this, 'fish')}>Fish</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.state.activeTab === 'bugs' ? 'nav-link active' : 'nav-link'} href="#" onClick={this.setTab.bind(this, 'bugs')}>Bugs</a>
                    </li>
                </ul>

                <div className="row">
                    <div className="col">
                        <div className="card bg-dark table-card table-card-sm">
                            {this.state.activeTab === 'fish' ? <FishTable /> : <BugTable />}
                        </div>
                    </div>
                </div>
            </div>
        );

        return this.state.isMobile ? mobile : desktop;
    }

    handleWindowSizeChange = function() {
        this.setState({isMobile: window.innerWidth <= 768});
    };

    setTab = function(newTab) {
        if (newTab !== this.state.activeTab) {
            this.setState({activeTab: newTab});
        }
    }
}

export default App;
