import React from "react";
import Table from "../../commons/tables/table";
import {Button, Modal, ModalBody, ModalHeader} from 'reactstrap'
import PlanForm from "./plan-form";
import * as API_PLAN from "../../patient/api/medication-plan-api";
import PlanTable from "../../patient/components/plan-table";



const filters = [
    {
        accessor: 'name',
    }
];

class PatientsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            tableData2: null,
            type: "patient",
            open: false,
            errorStatus: 0,
            error: null
        };
        this.toggleForm = this.toggleForm.bind(this);
    }

    columns = [
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
            Header: 'Medical record',
            accessor: 'medical_record',
        },
        {
            Header: 'Medical plans',
            accessor: 'id',
            Cell: cell=>(<Button color={'info'} onClick={()=>{ this.handlePlan(cell.value)}}>Show medication plans</Button>)
        }

    ];

    fetchMedicationPlans(id) {
        return API_PLAN.getMedicationPlans(id, (result, status, err) => {
            if (result !== null && status === 200) {
                this.setState({
                    tableData2: result,
                });
            } else {
                this.setState(({
                    errorStatus: status,
                    error: err
                }));
            }
        });
    }

    handlePlan (id){
        this.fetchMedicationPlans(id);
        this.toggleForm()
    }

    toggleForm() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <div>
                <Table
                    data={this.state.tableData}
                    columns={this.columns}
                    search={filters}
                    pageSize={10}
                    type={this.state.type}
                    handleSelectRow={this.props.handleSelectRow}
                />

                <Modal isOpen={this.state.open} toggle={this.toggleForm}
                       className={this.props.className} size={'xl'}>
                    <ModalHeader toggle={this.toggleForm}> Medication plans: </ModalHeader>
                    <ModalBody>
                        {this.state.tableData2!=null && <PlanTable tableData = {this.state.tableData2}
                        />}
                    </ModalBody>
                </Modal>

            </div>


        )
    }
}

export default PatientsTable;