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
        Header: 'Birth date',
        accessor: 'birthdate',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'Address',
        accessor: 'address',
    },
    {
        Header: 'Patients',
        accessor: 'patients',
    }

];

const filters = [
    {
        accessor: 'name'
    }
];

class CaregiversTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            type: "caregiver"
        };
    }

    render() {
        return (
            <div>
            <Table
                data={this.state.tableData}
                columns={columns}
                search={filters}
                pageSize={10}
                type={this.state.type}
                handleSelectRow={this.props.handleSelectRow}
            />
            </div>

        )

    }
}

export default CaregiversTable;