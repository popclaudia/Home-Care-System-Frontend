import React from "react";
import Table from "../../commons/tables/table";


const columns = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Side effects',
        accessor: 'side_effects',
    },
    {
        Header: 'Dosage',
        accessor: 'dosage',
    }

];

const filters = [
    {
        accessor: 'name',
    }
];

class MedicationTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            type: "medication"
        };
    }

    render() {
        return (
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={10}
                type={this.state.type}
                handleSelectRow={this.props.handleSelectRow}
            />
        )
    }
}

export default MedicationTable;