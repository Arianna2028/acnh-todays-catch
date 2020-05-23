import CatchableTable from './CatchableTable';

class FishTable extends CatchableTable {

    componentDidMount() {
        if (this.state.rows.length < 1) {
            fetch('https://api.airtable.com/v0/apphC982qIGZ5B8Zp/Fish', {
                headers: {
                    'Authorization': 'Bearer ' + process.env.AIR_TABLE_API_KEY
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

export default FishTable;
