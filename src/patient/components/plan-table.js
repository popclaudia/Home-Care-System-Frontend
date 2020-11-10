import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    // {
    //     Header: 'ID',
    //     accessor: 'id',
    // },
    {
        Header: 'Period',
        accessor: 'treatment_period',
    },
    {
        Header: 'Medication',
        accessor: 'medicationname',
    },
    {
        Header: 'Dosage',
        accessor: 'medicationdosage',
    } ,
    {
        Header: 'Intervals',
        accessor: 'intervals',
    }
];

const filters = [
    {
        accessor: 'name',
    }
];

class PlanTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={5}
                handleSelectRow={this.props.handleSelectRow}
            />
        )
    }
}

export default PlanTable;