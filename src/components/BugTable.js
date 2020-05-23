import CatchableTable from './CatchableTable';

class BugTable extends CatchableTable {

    componentDidMount() {
        if (this.state.rows.length < 1) {
            fetch('https://api.airtable.com/v0/apphC982qIGZ5B8Zp/Bugs', {
                headers: {
                    'Authorization': 'Bearer ' + process.env.REACT_APP_AIR_TABLE_API_KEY
                }
            })
            .then((resp) => resp.json())
            .then(data => {
                if (data.records) {
                    this.setState({ rows: data.records });
                }
            });
        }
    }
}

export default BugTable;
