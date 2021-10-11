import { withCookies } from 'react-cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import style from '../../theme/app.scss';
import A from './A';
import Pagination from './Pagination';

import Input from './InputBox';
import * as WorkingType from '../../../../front-end/tmc/action-types/working.action.types';
import { save, deleteItems, shouldStoreDataInStateByKey } from '../../utils/editFormHelper';
import PopUp from './PopUp';
import { constants } from '../../utils/constants';

import window from 'global'

import * as util from '../../utils';
import config from '../../config';
import MultiSelect from './MultiSelect';
import { numberFormat } from '../../helper'
import { CSVLink } from "react-csv";

// import { getVendors } from '../../actions/shopping/vendor.actions';

const RowTr = styled.div`
      display:flex;
      align-items:center;
      flex-direction:row;
      flex-wrap:nowrap;
      border-bottom:1px solid #ccc;
      &.thead_fixed{
        background-color: #e9e9e9;
        position: sticky;
        top: 0px;
        & > div{
            text-transform: capitalize;
            font-weight: 500;
        }
      }
    
`;


const Column = styled.div`
    color:#222;
    font-size:13px;
    padding: 4px 5px;
    text-align:center;
    box-sizing:border-box;
`;


const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border: none;
    border-spacing: 5px 2px;
    color: black;
`;


const TableHeading = styled.th`
    background-color: white;
    border: .5px solid rgba(193, 190, 190, 0.5);
    color: #45494a;
    border: .5px solid rgba(193, 190, 190, 0.5);
    width: ${props => props.w};
`;


const TD = styled.td`
    text-align: ${props => (props.type === 'integer' || props.type === 'currency') ? 'left' : 'left'};
    background-color: ${props => {
        return props.color ? props.color + '!important' : 'white';
    }
    };
    border: .5px solid rgba(193, 190, 190, 0.5);    
    text-align: center;
    font-size: 10px;
`;


const TDContent = styled.span`
font-family :Asap;
    font-size:${props => props.type === 'currency' ? '13px' : '12px'};
    text-align:${props => props.type === 'currency' ? 'center' : 'center'};
    display:${props => props.type === 'currency' ? 'block' : ''};
    padding-right:${props => props.type === 'currency' ? '10px' : ''}; 
    &::before {
        content: ${props => props.type === 'currency' && props.rupaySignVisible === true ? '"₹"' : '""'};
        font-size:${props => props.type === 'currency' && props.rupaySignVisible === true ? '12px' : '0px'};
        margin-right: 2px;
        vertical-align: text-top;
        line-height: 22px;
    };
`;

const Button = styled.button`
    padding: 7px 17px;
    color: #000;
    margin-bottom: 5px;
    // height: 35px;
    background: #f9f9f9;
    cursor: pointer;
    border-radius: 4px;
    margin-right:10px;
    border: .5px solid #01bcd4;
    transition: all 0.2s;
    position:relative;
    outline:none;
    &:hover{
        color: #fff;
        background: #01bcd4;
    }
`;

const SelectSpan = styled.span`
    display:flex;
    align-items:center;
    height:35px;
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 20px;
    color: #333;
    white-space: nowrap;
    &:hover{
        text-decoration: none;
        color: #262626;
        background-color: #f5f5f5;
    }

`;

class ListTable extends React.Component {



    setOrder = (key, index) => {
        let arr = [...this.state.dataRows];
        let temp = '';

        switch (key) {

            case 'moveUp':
                if (index === 0) {
                    alert("at Top");
                }
                else {
                    temp = arr[index];
                    arr[index] = arr[index - 1];
                    arr[index - 1] = temp;
                }

                { this.props.changeOrder && this.props.changeOrder(this.props.modelName, arr[index].id, arr[index - 1].id); }
                break;

            case 'moveDown':
                if (index === (this.state.dataRows.length - 1)) {
                    alert("at bottom");
                }
                else {
                    temp = arr[index];
                    arr[index] = arr[index + 1];
                    arr[index + 1] = temp;
                }

                { this.props.changeOrder && this.props.changeOrder(this.props.modelName, arr[index].id, arr[index + 1].id); }
                break;

            default: break;
        };


        this.setState({
            dataRows: [...arr]
        });
    }



    EditPop = PopUp((props) => {
        const EditForm = this.props && this.props.EditForm;

        return <EditForm {...props} />;
        // return <this.props.EditForm   {...props} />;
    }, () => this.setState({ popup: false }));

    UnlockAccountPop = PopUp((props) => {
        const UnlockAccountForm = this.props && this.props.UnlockAcount;

        return <UnlockAccountForm {...props} />;
        // return <this.props.EditForm   {...props} />;
    }, () => this.setState({ UnlockAccountPop: false }));

    CancelSelfAuditPopup = PopUp((props) => {
        const CancelAuditForm = this.props && this.props.CancellationSelfAuditPlan;

        return <CancelAuditForm {...props} />;
        // return <this.props.EditForm   {...props} />;
    }, () => this.setState({ CancelSelfAuditPopup: false }));

    FilterPop = PopUp(() => {
        return (
            <div className={style.modal_dialog} style={{ width: '700px', overflowY: 'auto', maxHeight: "80vh" }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className={style.filter_select}>
                        <label>Name</label>
                        <select name="filterName" value={this.state.tempFilter.key} onChange={this.handleChange('key')}>
                            <option value='--select--'>--select--</option>
                            {
                                this.filterDataRow && this.filterDataRow.length > 0 && this.filterDataRow.map(key => {
                                    return (
                                        <option key={key.id} value={key.name}>{key.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    &nbsp;
                    &nbsp;
                    <div className={style.filter_select}>
                        <label>Filter</label>
                        <select name="filterComp" value={this.state.tempFilter.type} onChange={this.handleChange('type')}>
                            <option value='--select--'>--select--</option>
                            <option value='eq'>Equals</option>
                            <option value='ne'>Not Equals</option>
                            <option value='contains'>Contains</option>
                            <option value='lt'>Less than</option>
                            <option value='lte '>Less Than Equals</option>
                            <option value='gt'>Greater than</option>
                            <option value='gte'>Greater than Equals</option>
                            <option value='bt'>Between</option>
                        </select>
                    </div>
                    &nbsp;
                    &nbsp;
                    <div className={style.filter_select}>
                        <label>&nbsp;</label>
                        {
                            this.state.tempFilter.type === 'bt' ?
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <input type="text" name="dataSearchTo" value={this.state.tempFilter.value} style={{ width: '100px' }} onChange={this.handleChange('value')} />

                                    &nbsp;<span style={{ lineHeight: '35px' }}>AND</span>&nbsp;

                                    <input type="text" name="dataSearchFrom" value={this.state.tempFilter.value2} style={{ width: '100px' }} onChange={this.handleChange('value2')} />
                                </div>
                                :
                                <input type="text" name="filterSearch" defaultValue={this.state.tempFilter.value} onChange={this.handleChange('value')} required />
                        }
                    </div>
                    <div className={style.filter_select}>
                        <label>&nbsp;</label>
                        <Button onClick={this.filterAdd}>Add</Button>
                    </div>
                </div>

                <table style={{ marginTop: '20px', border: '0px solid #ccc' }}>
                    <tr>
                        <th>Key</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Value2</th>
                        <th>Action</th>
                    </tr>
                    {
                        this.state.filterArry && this.state.filterArry.length > 0 && this.state.filterArry.map((data, i) => {
                            return (

                                <tr key={i}>
                                    <td>{data.key}</td>
                                    <td>{data.type}</td>
                                    <td>{data.value}</td>
                                    <td>{data.value2 && data.value2.length > 0 ? data.value : 'Null'}</td>
                                    <td>
                                        <i className="fas fa-undo-alt" style={{ cursor: "pointer", color: 'red' }} onClick={() => {
                                            let temp = [...this.state.filterArry];
                                            const editValue = temp.splice(i, 1);

                                            this.setState({
                                                filterArry: [...temp],
                                                tempFilter: {
                                                    key: editValue[0].key,
                                                    type: editValue[0].type,
                                                    value: editValue[0].value,
                                                    value2: editValue[0].value2
                                                }
                                            });
                                        }}>
                                        </i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <div style={{ marginTop: "20px" }}>
                        <button className={style.primary_btn}
                            onClick={() => {
                                let where = [...this.state.filterArry];
                                this.setState({
                                    filterPop: false,
                                    showTags: true,
                                    quickSearchText: ''
                                }, () => {
                                    this.props.onRefresh(0, this.state.rowsToDisplayPerPage, undefined, where);
                                });
                            }}
                        >Send</button>
                    </div>
                </table>
            </div>
        )
    }, () => {
        this.setState({
            filterPop: false
        })
    })

    constructor(props) {
        super(props);

        const key = props.columnKey ? props.columnKey : new Date();

        const cookie_rowPerPage = props.cookies.get('rowPerPage');
        const cookie_columnHeadings = props.cookies.get('headings');

        let columns = undefined;

        if (cookie_columnHeadings) {
            columns = cookie_columnHeadings[key];
        }


        const rows = this.assignColorsToRows(props.dataRows || []);

        this.state = {
            checkboxes: [],
            checkboxeIds: [],
            selectedCheckboxData: [],
            filterArry: [],
            tempFilter: {
                key: '',
                type: '',
                value: '',
                value2: ''
            },
            showTags: false,
            popup: false,
            filterPop: false,
            UnlockAccountPop: false,
            CancelSelfAuditPopup: false,
            baseObject: undefined,
            id: -1,
            mode: '',
            pageIndex: 0,
            filter: '',
            index: -1,
            visible: {},
            columnHeadings: columns ? columns : props.columnHeadings,
            columnChooserOpened: false,
            columnSortOpened: false,
            dataRows: rows,
            rowsToDisplayPerPage: (cookie_rowPerPage && cookie_rowPerPage > 0) ? cookie_rowPerPage : (props.rowsToDisplayPerPage ? props.rowsToDisplayPerPage : constants.DEFAULT_ROWS_LIST),
            dragStart: {
                data: '',
                index: ''
            },
            dragStop: '',
            filterDataRow: [],
            columnsToShow: [],
            quickSearchText: '',
        };


        setTimeout(() => {
            this.pushChildrenData(rows, columns ? columns : props.columnHeadings);
        }, 100);
    }

    assignColorsToRows = (existingRows) => {
        const rows = JSON.parse(JSON.stringify(existingRows));

        if (this.props.rowColorConfigs && this.props.rowColorConfigs.length > 0) {

            this.props.rowColorConfigs.forEach(rowColorConfig => {
                rows.forEach(row => {
                    if (row[rowColorConfig.column] && (row[rowColorConfig.column].toLowerCase() === rowColorConfig.value.toLowerCase())) {
                        row.tbs_color = rowColorConfig.color;
                        row.tbs_fontColor = rowColorConfig.fontColor;
                    }
                });
            });
        }
        return rows;
    }

    initialize = (props) => {
        // let's try to initialize it, if required

    };

    handleChange = key => event => {
        let temp = Object.assign({}, this.state.tempFilter);
        temp[key] = event.target.value;

        this.setState({
            tempFilter: Object.assign({}, temp)
        })
    }
    // filter data push in  filterArry

    filterDataPush = () => {
        let temp = [...this.state.filterArry];
        temp.push(this.state.tempFilter);
        this.setState({
            filterArry: [...temp],
        });
        this.setState({
            tempFilter: {
                key: "",
                type: "",
                value: "",
                value2: ""
            }
        })
    }


    dateFilterDataPush = () => {
        let isPresent = this.state.tempFilter.value2 === this.state.tempFilter.value;

        if (isPresent) {
            alert('Date Range cannot be same, please check your response');
            return;
        }

        else if (parseInt(this.state.tempFilter.value.split('-').reverse().join('')) > parseInt(this.state.tempFilter.value2.split('-').reverse().join(''))) {
            alert("to is Greater-than Form");
        }

        else {
            let temp = [...this.state.filterArry];
            const tempObj = {
                key: 'createdAt',
                type: 'bt',
                value: this.state.tempFilter.value,
                value2: this.state.tempFilter.value2
            }
            temp.push(tempObj)
            this.setState({
                filterArry: temp
            });

            let where = [...this.state.filterArry];

            this.setState({
                filterPop: false,
                showTags: true,
                quickSearchText: ''
            }, () => {
                this.props.onRefresh(0, this.state.rowsToDisplayPerPage, undefined, where);
            });
        }
    }

    // valid for name and type

    checkFilterValid = () => {
        if (this.state.tempFilter.key === "" || this.state.tempFilter.key === "--select--") {
            alert("Please Select key")

        }
        else if (this.state.tempFilter.type === "" || this.state.tempFilter.type === "--select--") {
            alert("Please Select filterType")
        }
    }


    componentDidUpdate(prevProps, prevState) {

        const thisState = this.state;
        const thisProps = this.props;

        // Object.keys(thisState).forEach(key => {
        //     if (prevState[key] !== thisState[key]) {
        //       }
        //     });


        //     Object.keys(thisProps).forEach(key => {
        //         if (prevProps[key] !== thisProps[key]) {
        //           }
        //         });

    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        // let's load the vendors, for first time

        // this.props.getVendors(0, 10000, undefined, undefined);

    };


    // filter data add in table with validation

    filterAdd = () => {
        let filterKey = this.state.tempFilter.key;
        let isPresent = this.state.filterArry.some(data => data.key === filterKey);

        if (isPresent) {
            alert('Key cannot be repeated');
            return;
        }

        if (this.state.tempFilter.type !== "bt") {
            this.checkFilterValid()

            if (this.state.tempFilter.value === null || this.state.tempFilter.value === "") {
                alert("Please Enter Data To Search Value")
            }
            else {
                this.filterDataPush()
            }
        }

        else if (this.state.tempFilter.type === "bt") {
            this.checkFilterValid();
            if (this.state.tempFilter.value === "" || this.state.tempFilter.value === null) {
                alert("Please Enter Search To  value");
            }
            else if (this.state.tempFilter.value2 === "" || this.state.tempFilter.value2 === null) {
                alert("Please Enter Search From  value");
            }
            else if (parseInt(this.state.tempFilter.value) > parseInt(this.state.tempFilter.value2)) {
                alert("to is Greater-than Form");
            }
            else {
                this.filterDataPush()
            }

        }
    }

    getSingularPropertyName = property => {
        if (!property) return undefined;
        const lastThree = property.substring(property.length - 4);

        if (lastThree === 'ies') {
            return property.substring(0, property.length - 3) + 'y';
        }

        return property.substring(0, property.length - 1);
    };

    getPluralPropertyName = property => {
        if (!property) return undefined;
        const last = property.substring(property.length - 1);

        if (last === 'y') {
            return property.substring(0, property.length - 1) + 'ies';
        }

        if (last === 's') {
            return property + 'es';
        }

        return property + 's';
    };

    pushChildrenData = (existingRows, columnHeadings) => {

        this.shouldUpdate = true;

        const rowsClonned = JSON.parse(JSON.stringify(existingRows));
        const arrayColumnHeader = {};

        const firstRow = rowsClonned[0];

        if (typeof firstRow === 'undefined') {
            return;
        }

        // let's assign the checkboxes

        const checkboxes = this.state.checkboxes;
        const checkboxeIds = this.state.checkboxeIds;
        const selectedCheckboxData = this.state.selectedCheckboxData;

        rowsClonned.forEach((row, index) => {
            checkboxes[index] = row.checked ? index : undefined;
            checkboxeIds[index] = row.checked ? row.id : undefined;
            selectedCheckboxData[index] = row.checked ? row : undefined;
        });


        // now we have rows. We will identify if any column with array value is passed.
        columnHeadings.forEach(heading => {
            if (heading.name.indexOf('.') > -1) {
                // ok, this is a relationship
                const splitter = heading.name.split('.');
                const plural = this.getPluralPropertyName(splitter[0]);
                const dataForThisColumn = firstRow[plural];

                if (Array.isArray(dataForThisColumn) && dataForThisColumn.length > 0) {
                    // it means that the data for the column is an array, so we need to keep a record so we can clone the records
                    arrayColumnHeader[plural] = 1;
                }
            }
        });

        // now we have all the columns that needs to be clonned
        const length = rowsClonned.length;


        for (let index = length; index > 0; index--) {
            let thisRow = rowsClonned[index - 1];
            thisRow.baseKeys = [];
            Object.keys(arrayColumnHeader).forEach(arrayHeader => {
                const arrayItems = thisRow[arrayHeader];
                const propertyName = this.getSingularPropertyName(arrayHeader);

                if (arrayItems && Array.isArray(arrayItems) && arrayItems.length > 0) {
                    // this is an array, let's push the items
                    thisRow.baseKeys.push(arrayHeader);

                    arrayItems.forEach((item, _index) => {
                        const clonnedRow = JSON.parse(JSON.stringify(thisRow));
                        clonnedRow.baseKeyIndex = _index;
                        clonnedRow[propertyName] = item;

                        if (_index === 0) {
                            // we have to use the first row
                            rowsClonned.splice(index - 1, 1, clonnedRow);
                            thisRow = clonnedRow;
                        }
                        else {
                            // for every other row after first row, we will push a new row
                            delete clonnedRow.id;
                            rowsClonned.splice(index, 0, clonnedRow);
                        }
                    });
                }
            });
        }

        const columnValues = {};
        const columnsToShow = [];

        rowsClonned.forEach((row, index) => {
            Object.keys(row).forEach(key => {
                if (Array.isArray(row[key]) && row[key].length > 0) {
                    const propertyName = this.getSingularPropertyName(key);

                    Object.keys(row[key][0]).forEach(innerKey => {
                        columnValues[propertyName + '.' + innerKey] = {
                            name: propertyName + '.' + innerKey,
                            checked: row.checked ? true : false
                        };
                    });
                }
                else if (row[key] && typeof row[key] === 'object' && Object.keys(row[key]) && Object.keys(row[key]).length > 0) {
                    Object.keys(row[key]).forEach(innerKey => {
                        columnValues[key + '.' + innerKey] = {
                            name: key + '.' + innerKey,
                            checked: row.checked ? true : false
                        };
                    });
                }
                else {
                    columnValues[key] = {
                        name: key,
                        checked: row.checked ? true : false
                    };
                }
                // checkboxes[index] = typeof checkboxes[index] === 'undefined' ? (row.checked ? index : undefined) : checkboxes[index];
            });

        });

        columnHeadings.forEach(heading => {
            //console.log("static heading : ", heading);
            columnValues[heading.name] = {
                name: heading.displayName ? heading.displayName : heading.name,
                checked: true,
                type: heading.type
            };
        });

        Object.keys(columnValues).forEach(key => {
            columnsToShow.push({
                name: key,
                checked: columnValues[key].checked
            });
        });

        this.setState({
            rowsClonned,
            checkboxes,
            checkboxeIds,
            selectedCheckboxData,
            columnsToShow
        });
    };

    pushMode = false;
    shouldUpdate = true;

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.shouldUpdate = false;

        //console.log("List dataRows 1 : ", nextProps.dataRows);
        //if (nextProps.dataRows && nextProps.dataRows !== this.props.dataRows) {
        if (nextProps.dataRows !== undefined && nextProps.dataRows !== this.props.dataRows) {
            //console.log("List dataRows 2 : ", nextProps.dataRows);
            // we got new data,
            let pushToState = false;

            const newRows = JSON.parse(JSON.stringify(nextProps.dataRows));
            newRows.key = nextProps.dataRows.key;
            const columnHeadings = JSON.parse(JSON.stringify(this.state.columnHeadings));

            if (nextProps.dataRows && nextProps.dataRows.length > 0) {
                //console.log("List dataRows 3 : ", nextProps.dataRows);
                const firstRow = nextProps.dataRows[0];

                const validColumns = Object.keys(firstRow);

                for (let index = columnHeadings.length - 1; index >= 0; index--) {
                    if (validColumns.indexOf(columnHeadings[index]) === -1) {
                    }
                }
            }

            if (typeof this.state.dataRows === 'undefined' || typeof this.state.dataRows.key === 'undefined' || (nextProps.dataRows.key !== this.state.dataRows.key && nextProps.dataRows.key > this.state.dataRows.key)) {
                //console.log("List dataRows 4 : ", nextProps.dataRows);
                setTimeout(() => {
                    const oldRows = JSON.parse(JSON.stringify(this.state.dataRows));

                    if (this.pushMode) {
                        //console.log("List dataRows 4.1 : ", nextProps.dataRows);
                        oldRows.push(...newRows);
                        oldRows.key = newRows.key;

                        this.setState({
                            dataRows: this.assignColorsToRows(oldRows)
                        }, () => {
                            this.pushChildrenData(this.state.dataRows, columnHeadings);
                        });

                        this.pushMode = false;
                    }
                    else {
                        //console.log("List dataRows 4.2 : ", nextProps.dataRows);
                        if (nextProps.isFilterRequired && nextProps.dataRows.length === 0) {
                            //console.log("List dataRows 4.2.1 : ", nextProps.dataRows);
                            this.setState({
                                dataRows: [],
                                rowsClonned: []
                            });
                        }
                        else {
                            //console.log("List dataRows 4.2.2 : ", nextProps.dataRows);
                            this.setState({
                                dataRows: this.assignColorsToRows(newRows)
                            }, () => {
                                this.pushChildrenData(this.state.dataRows, columnHeadings);
                            });
                        }
                    }
                }, 100);
            }
            else {
                //console.log("List dataRows 5 : ", nextProps.dataRows);
                // push to state is false, now let's cover the edit case
                const modifiedRows = newRows.filter(item => item.modified === true);

                if (modifiedRows && modifiedRows.length > 0) {
                    setTimeout(() => {
                        this.setState({
                            dataRows: this.assignColorsToRows(nextProps.dataRows)
                        });

                        this.pushChildrenData(nextProps.dataRows, columnHeadings);
                    }, 100);
                }
                else { }
            }
        }
        else {

        }


        if (nextProps.openPopup !== this.state.CancelSelfAuditPopup) {
            console.log("list p2 : ", nextProps.openPopup);
            this.setState({
                CancelSelfAuditPopup: nextProps.openPopup
            });
        }

        const storeInState = (data, key) => {
            // time to store
            if (!data) return; data.key = new Date();
            const state = Object.assign({}, this.state);
            state[key] = data;

            this.setState({ ...state });
        };
    }

    Modifier = props => {
        //console.log("[props.baseObject.isInvoiceCancelled]", props.baseObject.isInvoiceCancelled && props.baseObject.isInvoiceCancelled)
        let IsCancelledData = props.baseObject.isInvoiceCancelled ? props.baseObject.isInvoiceCancelled : undefined;

        //console.log("Single data is cancelled", IsCancelledData)
        return (
            <div className={style.action_btn} style={{ color: 'black', justifyContent: 'center' }}>
                {!this.props.hideGridEdit && (props.baseObject.isAuditCancelled !== 1 && props.baseObject.isAuditCancelled !== true) && (props.baseObject.isAuditExecuted !== 1 && props.baseObject.isAuditExecuted !== true) &&
                    <A onClick={() => {
                        // open add/edit window
                        this.setState({
                            popup: true,
                            mode: 'edit',
                            id: props.baseObject.id,
                            baseObject: props.baseObject,
                            index: props.index,
                        });
                        //alert(this.state.popup);
                    }}
                        text={<i className="fas fa-pencil-alt"></i>}
                    ></A>}
                &nbsp;&nbsp;
                {!this.props.hideGridDelete &&
                    <A onClick={() => {
                        if (confirm('Would you like to delete the record?'))
                            this.props.onDelete([props.baseObject.id]);
                        //this.props.onDelete([props.index]);
                    }}
                        text={<i className="fas fa-trash"></i>}
                    ></A>
                }

                {this.props.viewInvoiceButtonRequired &&
                    <A onClick={() => {
                        this.props.onClickViewInvoice([props.baseObject.id])
                    }}
                        text={<i className="">View Details</i>}
                    ></A>
                }



                {this.props.isUnlockAcountBtnRequired && props.baseObject.isUserLocked === true &&
                    <A onClick={() => {
                        // open add/edit window
                        this.setState({
                            UnlockAccountPop: true,
                            mode: 'edit',
                            id: props.baseObject.id,
                            baseObject: props.baseObject,
                            index: props.index,
                        });
                        //alert(this.state.UnlockAccountPop);
                    }}
                        text={<i className="">Unlock Account</i>}
                    ></A>
                }

                {this.props.isCancelAuditButtonVisble && this.props.isCancelAuditButtonVisble === true && props.baseObject && props.baseObject.isAuditExecuted == 0 && props.baseObject.isAuditCancelled !== 1 &&
                    <A onClick={() => {
                        // open add/edit window
                        this.props.onCancelClicked(true);
                        this.setState({
                            CancelSelfAuditPopup: true,
                            mode: 'edit',
                            id: props.baseObject.id,
                            baseObject: props.baseObject,
                            index: props.index
                        });
                    }}
                        text={<i className="">Cancel Audit</i>}
                    ></A>
                }
                {this.props.isCancelAuditButtonVisble && this.props.isCancelAuditButtonVisble === true && props.baseObject && (props.baseObject.isAuditCancelled === 1 || props.baseObject.isAuditCancelled === true) &&
                    <A text={<i className="">Cancelled </i>}
                    ></A>
                }
            </div>
        )
    };
    types = undefined;

    getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    dragHandler = index => event => {
        const current = event.pageX;
    };

    start = 0;

    dragStartHandler = index => event => {
        this.start = event.pageX;
    };

    dragStoptHandler = index => event => {

        const currentX = event.pageX;
        const element = document.getElementById('tbh-' + this.props.columnKey + '-' + index);

        const newWidth = element.clientWidth - (this.start - currentX);

        const headings = this.state.columnHeadings;

        headings[index].width = newWidth + 'px';

        if ((index + 1) < this.state.columnHeadings.length) {
            const nextElement = document.getElementById('tbh-' + this.props.columnKey + '-' + (index + 1));
            const newNextWidth = nextElement.clientWidth + (this.start - currentX);
            headings[index + 1].width = newNextWidth + 'px';

        }
        else {
            const nextElement = document.getElementById('tbh-' + this.props.columnKey + '-' + (index - 1));
            const newNextWidth = nextElement.clientWidth + (this.start - currentX);
            headings[index - 1].width = newNextWidth + 'px';
        }

        this.setState({ columnHeadings: headings });
    };


    convertContentToCorrectFormat = (content, heading) => {
        if (content && content.length > 100) {
            return content.substring(0, 99) + '....';
        }

        if (heading.toLowerCase().indexOf('date') > -1 && util.validateDate(content)) {
            return new Date(content).toLocaleDateString() + (this.props.isDateAndTimeRequired ? ' ' + new Date(content).toLocaleTimeString() : '');
        }
        else if (heading.toLowerCase().indexOf('html') > -1) {
            return <p dangerouslySetInnerHTML={{ __html: content }}></p>
        }

        return typeof content === 'object' ? '' : content;
    };


    overElement = undefined;
    filterDataRow = [];

    createShortFormOfName = longName => {
        let shortName = longName.substring(0, 1);

        for (let charIndex = 1; charIndex < longName.length; charIndex++) {
            const ascii = longName.charCodeAt(charIndex);
            if (ascii > 64 && ascii < 97) {
                shortName = shortName + longName[charIndex].toUpperCase();
            }
        }

        return shortName.length === 1 ? longName : shortName;
    };

    renderCount = 0;
    render() {


        const dataRows = this.state.rowsClonned || [];
        //console.log("list render datarows ", dataRows);
        const columnHeadings = this.state.columnHeadings;
        const checkboxes = this.state.checkboxes;
        const checkboxeIds = this.state.checkboxeIds;
        const selectedCheckboxData = this.state.selectedCheckboxData;

        const columnsToShow = this.state.columnsToShow;
        const isSuperAdmin = true

        if (this.props.rowColorConfigs) {

        }


        this.filterDataRow = [...this.state.columnsToShow];

        return (
            <div onScroll={this.handleScroll} >
                {/* <div>
                    <this.props.EditForm />
                </div> */}
                {
                    this.props.showDateFilter && <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div>
                                <label style={{ color: '#000' }}>To: </label>
                                <input label="To:" type='date' value={this.state.tempFilter.value} onChange={this.handleChange('value')} />
                            </div>
                            &nbsp;
                            <div>
                                <label style={{ color: '#000' }}>From: </label>
                                <input label="From:" type='date' value={this.state.tempFilter.value2} onChange={this.handleChange('value2')} />
                            </div>
                            &nbsp;
                            <Button onClick={this.dateFilterDataPush}>Submit</Button>
                        </div>
                    </div>
                }
                <div>
                    {/* {!this.props.hideAddEditCopy && <div> */}
                    {!this.props.hideAdd && <span>
                        <Button onClick={() => {
                            this.shouldUpdate = true;
                            this.setState({
                                popup: true,
                                mode: 'add',
                                baseObject: undefined,
                                index: -1
                            });
                        }}><i className="fas fa-plus"></i></Button>
                    </span>}
                    &nbsp;
                    {!this.props.hideCopy && <span>
                        <Button onClick={
                            () => {
                                const finalIdsToCopy = checkboxes.filter(box => typeof (box) !== 'undefined');

                                if (finalIdsToCopy && finalIdsToCopy.length > 0 && confirm('Would you like to copy the record?')) {
                                    // we got some items to delete. Yo
                                    this.props.onCopy(finalIdsToCopy);
                                }
                            }
                        } ><i className="far fa-copy"></i></Button>
                    </span>}
                    &nbsp;
                    {!this.props.hideTrash && <span>
                        <Button onClick={
                            () => {
                                const finalIdsToDelete = checkboxes.slice().filter(box => typeof (box) !== 'undefined');

                                if (finalIdsToDelete && finalIdsToDelete.length > 0 && confirm('Would you like to delete the record?')) {
                                    // we got some items to delete. Yo
                                    this.props.onDelete(finalIdsToDelete);


                                }
                            }
                        } ><i className="fas fa-trash"></i></Button>
                    </span>}
                    &nbsp;
                    {!this.props.hideRefresh && <span>
                        <Button onClick={
                            () => {
                                let temp = this.state.dataRows;
                                temp.splice(0, temp.length); // Fatest way to empty array than array = []
                                this.setState({
                                    dataRows: [...temp]
                                }, () => {
                                    let status = this.props.onRefreshStatus || '';
                                    const onRefreshDataFilters = this.props.onRefreshDataFilters;
                                    //console.log("onRefreshDataFilters : ", onRefreshDataFilters);
                                    if (onRefreshDataFilters)
                                        this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, onRefreshDataFilters)
                                    else
                                        this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                                });
                            }
                        } ><i className="fas fa-sync-alt"></i></Button>
                    </span>}
                    &nbsp;&nbsp;
                    {this.props.rowColorConfigs && this.props.rowColorConfigs.length > 0 && <span>
                        <span style={{ color: 'black', fontSize: '10px' }}>Legends:</span> {this.props.rowColorConfigs.map((config, index) => {
                            return <span key={index}><label style={{ cursor: 'pointer' }} for={config.value}><span style={{ background: config.color, color: config.fontColor, fontSize: '10px', marginRight: '4px' }}>{config.column} = {config.value}</span></label><input type="color" id={config.value} style={{ display: 'none' }} defaultValue={config.color} onChange={(event) => { this.props.changeColor(index, event.target.value) }} /></span>;
                        })}
                    </span>}
                    {/* </div>} */}
                    {!this.props.hideChooseColumns && <span>
                        <Button onClick={
                            () => {
                                this.setState({
                                    columnChooserOpened: !this.state.columnChooserOpened
                                })
                            }
                        }>
                            Choose Columns
                            {this.state.columnChooserOpened &&
                                <div onClick={event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                                }
                                    className={style.overflow_scroll}
                                    style={{
                                        marginTop: " 10px",
                                        position: "absolute",
                                        maxHeight: " 200px",
                                        left: "0px",
                                        background: "#fff",
                                        textAlign: "left",
                                        color: "#222",
                                        border: "1px solid #ccc",
                                        lineHeight: "24px",
                                        minWidth: " 150px",
                                        maxWidth: "220px",
                                        overflowY: "auto",
                                        zIndex: '4',
                                        borderRadius: '3px'
                                    }}>
                                    <input type='text' defaultValue=''

                                        style={{
                                            height: '35px',
                                            width: '100%',
                                            lineHeight: '35px'
                                        }}

                                        onChange={event => {
                                            this.setState({
                                                filterText: event.target.value
                                            });
                                        }}></input>
                                    {columnsToShow.filter(item => {
                                        return (typeof this.state.filterText === 'undefined' || this.state.filterText === '' || item.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) > -1) && item.name.toLowerCase().indexOf('basekey') === -1;
                                    }).map((item, index) => <SelectSpan><input key={index} type='checkbox'
                                        checked={item.checked}
                                        onChange={() => {
                                            const headings = this.state.columnHeadings;
                                            // if found the name
                                            const itemIndex = headings.findIndex(heading => item.name === heading.name);

                                            //----------------------------------------------//
                                            const itemColumnsToShow = columnsToShow && columnsToShow.findIndex(heading => item.name === heading.name);
                                            if (itemColumnsToShow > -1) {
                                                columnsToShow[itemColumnsToShow].checked = !columnsToShow[itemColumnsToShow].checked;
                                            }
                                            if (itemIndex > -1) {
                                                headings.splice(itemIndex, 1);
                                            }
                                            else {
                                                headings.push({
                                                    name: item.name,
                                                    type: item.type
                                                });
                                            }
                                            setTimeout(() => {
                                                this.setState({
                                                    columnHeadings: headings,
                                                    columnsToShow: columnsToShow,
                                                });
                                            }, 200);
                                            //----------------------------------------------//
                                            // if (itemIndex > -1) {
                                            //     headings.splice(itemIndex, 1);
                                            // }
                                            // else {
                                            //     headings.push({
                                            //         name: item.name,
                                            //         type: item.type
                                            //     });
                                            // }
                                            // this.setState({
                                            //     columnHeadings: headings
                                            // });
                                            //------------------------------------------------//
                                            const cookie_columnHeadings = this.props.cookies.get('headings');
                                            const key = this.props.columnKey;

                                            if (!cookie_columnHeadings) {
                                                const newHeadingObject = {};
                                                newHeadingObject[key] = headings;

                                                this.props.cookies.set('headings', newHeadingObject);
                                            }
                                            else {
                                                cookie_columnHeadings[key] = headings;

                                                this.props.cookies.set('headings', cookie_columnHeadings);

                                            }
                                        }} ></input><label for={item.name}>{item.name} </label></SelectSpan>)
                                    }
                                </div>
                            }
                        </Button>
                    </span>}
                    {this.props.exportToCSVFile && this.props.exportToCSVFile === true && this.props.csvdataRows && this.props.csvdataRows.length > 0 &&
                        <CSVLink filename={this.props.csvfilename + ".csv"} data={this.props.csvdataRows} headers={this.props.csvheaders}>
                            <Button> Download CSV</Button>
                        </CSVLink>
                    }
                    {!this.props.hideSortingColumns && <span>
                        <Button onClick={
                            () => {
                                this.setState({
                                    columnSortOpened: !this.state.columnSortOpened
                                })
                            }
                        }>
                            Sort Grid Data
                            {this.state.columnSortOpened &&
                                <div onClick={event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                }
                                }
                                    className={style.overflow_scroll}
                                    style={{
                                        marginTop: " 10px",
                                        position: "absolute",
                                        maxHeight: " 200px",
                                        left: "0px",
                                        background: "#fff",
                                        textAlign: "left",
                                        color: "#222",
                                        border: "1px solid #ccc",
                                        lineHeight: "24px",
                                        minWidth: " 150px",
                                        maxWidth: "220px",
                                        overflowY: "auto",
                                        zIndex: '4',
                                        borderRadius: '3px',
                                        paddingLeft: '10px'
                                    }}>
                                    {this.props.sortDDLData.map((item, index) =>
                                        <SelectSpan
                                            onClick={() => {
                                                this.props.onClickSortDDL(item.id)
                                            }}
                                        >
                                            <input key={index} type='checkbox' checked={item.selected}></input>
                                            <label for={item.name}>{item.name} </label>
                                        </SelectSpan>)
                                    }
                                </div>
                            }
                        </Button>
                    </span>}
                    {/* &nbsp;
                    <input type='text' style={{ height: "34px", width: "200px", borderRadius: " 4px", border: "1px solid #ccc", boxSizing: " border-box", padding: "5px" }} defaultValue={this.state.filter} maxLength='100' onChange={event => {
                        this.setState({ filter: event.target.value });
                    }}></input> */}

                    {/* <Button onClick={() => {
                        // let's do it only if we have at least 3 rows

                        if (typeof this.types === 'undefined') {
                            this.types = {};

                            if (this.state.dataRows.length < 3) {
                                return alert('Insufficient data in list');
                            }
                            else if (this.state.dataRows.length < 3) {
                                return alert('Insufficient data in list');
                            }
                            else {

                                const isValidString = variable => {
                                    const isValidNumber = util.validateNumber(variable);
                                    const isValidDate = util.validateDate(variable);
                                    const isArray = Array.isArray(variable);

                                    return isValidNumber === false && isValidDate === false && isArray === false && variable && typeof variable.id === 'undefined';
                                };

                                for (let i = 0; i < 3; i++) {
                                    const o = dataRows[0];

                                    Object.keys(o).forEach(k => {
                                        const s = isValidString(o[k]);

                                        if (s) {
                                            if (typeof this.types[k] === 'undefined') {
                                                this.types[k] = true;
                                            }
                                        }
                                    });
                                }
                            }
                        }
                        const where = [];

                        Object.keys(this.types).forEach(key => {
                            where.push({
                                key,
                                type: 'contains',
                                value: this.state.filter,
                                value2: '',
                                pushedFor: 'or'
                            })
                        });
                        this.setState({
                            dataRows: []
                        });

                        this.props.onRefresh(0, this.state.rowsToDisplayPerPage, undefined, where);

                    }}>
                        Filter
                    </Button> */}
                    {!this.props.hideAddFilters && <span>
                        <Button onClick={() => {
                            this.props.onclickFilterEnable();
                            // this.setState({
                            //     filterPop: !this.state.FilterPop
                            // })
                        }}>
                            <i className="fas fa-sliders-h"></i> &nbsp;Filter
                        </Button>
                    </span>}
                    &nbsp;
                    {!this.props.hideClearFilters && <span>
                        <Button onClick={() => {
                            if (confirm('Would you like to remove filter?')) {
                                this.setState({
                                    dataRows: [],
                                    quickSearchText: ''
                                });
                                this.props.onRefresh(0, this.state.rowsToDisplayPerPage, undefined, undefined);
                            }
                        }}>
                            Clear Filter
                        </Button>
                    </span>}
                    &nbsp;
                    {
                        this.state.showTags &&

                        <span style={{ color: 'black', width: 'fit-content', padding: '3px', fontSize: '13px' }}>
                            {
                                this.state.filterArry && this.state.filterArry.length > 0 && this.state.filterArry.map((data, index) => {
                                    return (
                                        <span key={index} style={{ background: '#00bcd4', color: 'white', padding: '5px', borderRadius: '8px', marginLeft: '2px' }}>
                                            {data.key}
                                            <span
                                                style={{ fontSize: '15px', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => {
                                                    let temp = [...this.state.filterArry];
                                                    if (temp.length === 1) {
                                                        temp.splice(0, 1)
                                                        this.setState({
                                                            showTags: false
                                                        });
                                                    } else {
                                                        if (index > -1) {
                                                            temp.splice(index, 1)
                                                        }
                                                    }
                                                    this.setState({
                                                        filterArry: [...temp]
                                                    }, () => {
                                                        let where = [...this.state.filterArry];
                                                        this.props.onRefresh(0, this.state.rowsToDisplayPerPage, undefined, where);
                                                    })
                                                }}>&nbsp;&nbsp;X</span>
                                        </span>
                                    )
                                })
                            }
                        </span>
                    } &nbsp;
                    {this.props.tableAction && this.props.tableAction.map((element, index) => {
                        return <Button key={index}><div onClick={() => {
                            /** we will certainly need the checkboxes data here */
                            const selectedIds = checkboxes.slice().filter(box => typeof (box) !== 'undefined');
                            this.update = true;
                            this.props.tableActionMethods[index](selectedIds, this.state);
                        }} className={style.small_text + ' ' + style.show_hand + ' ' + style.underline}>{element}</div>
                        </Button>
                    })}

                    {/* <Pagination 
                rowsToDisplayPerPage={rowsToDisplayPerPage}
                recordsCount={this.props.recordsCount}
                onPageChange={(pageIndex, rowsPerPage) => {
                    this.props.onRefresh(pageIndex, rowsPerPage, undefined, undefined);
                }}
            /> */}
                </div>
                {/* <div style={{ height: '0.5rem' }}></div> */}
                {/* <div className={style.overflow_scroll} style={{ maxHeight: this.props.maxHeight ? this.props.maxHeight : '500', margin: '0px -15px' }}>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeading width='30px'><input type='checkbox' onChange={
                                    event => {
                                        const checkboxes = [];
                                        dataRows.filter(item => !item.deleted).map((row, index) => {
                                            checkboxes[index] = event.target.checked ? index : undefined;
                                            this.setState({ checkboxes });
                                        });
                                    }
                                } ></input></TableHeading>
                                {this.props.showMoveUpAndDown &&
                                <TableHeading width='30px'>move up</TableHeading>
                                }
                                {!this.props.hideAddEditCopy &&
                                    <TableHeading width='30px'>Actions</TableHeading>}
                                {this.props.rowAction && <TableHeading width='30px'>Row Action</TableHeading>}

                                {columnHeadings.map((heading, index) => {
                                    let name = heading.name;

                                    if (name.indexOf('.') > -1) {
                                        const splitter = name.split('.');

                                        if (splitter && splitter.length > 1) {
                                            name = this.createShortFormOfName(splitter[0]) + ' - ' + splitter[1];
                                        }
                                    }

                                    return <TableHeading
                                        id={'tbh-' + this.props.columnKey + '-' + index}
                                        width={heading.width ? heading.width : 'auto'} w={heading.width ? heading.width : 'auto'} key={heading.name}
                                    >
                                        <div style={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>

                                            <span style={{ display: 'block', textAlign: 'center' }}
                                                draggable onDragStart={(event) => {

                                                    this.setState({
                                                        dragStart: {
                                                            data: heading,
                                                            index: index
                                                        }
                                                    });

                                                }}

                                                onDragOver={(event) => {
                                                    this.overElement = event.currentTarget.innerText;
                                                }}

                                                onDragEnd={(event) => {
                                                    let tempColumnHeading = JSON.parse(JSON.stringify(this.state.columnHeadings));

                                                    let tempSecondValue_new = undefined;

                                                    tempColumnHeading.forEach((item, i) => {
                                                        if (item.name.toLowerCase() === this.overElement.toLowerCase()) {
                                                            tempSecondValue_new = {
                                                                data: item,
                                                                index: i
                                                            };
                                                        }
                                                    });

                                                    if (tempSecondValue_new) {

                                                        let tempSecondValue = tempSecondValue_new;

                                                        tempColumnHeading[tempSecondValue.index] = this.state.dragStart.data;
                                                        tempColumnHeading[this.state.dragStart.index] = tempSecondValue.data

                                                        this.setState({
                                                            columnHeadings: [...tempColumnHeading]
                                                        })
                                                    }

                                                }}
                                            >

                                                {name}
                                            </span>
                                            <span draggable="true" id={'border-span-' + index} title='resize'
                                                onDragStart={this.dragStartHandler('border-span-' + index)}
                                                onDrag={this.dragHandler(index)}
                                                onDragEnd={this.dragStoptHandler(index)}
                                                style={{ cursor: 'col-resize', position: "absolute", right: 0, width: '5px', color: 'transparent', backgroundColor: 'red' }}>
                                                <i className="fa fa-arrows-v" aria-hidden="true"></i>
                                                <i className="fa fa-arrows-v" aria-hidden="true"></i></span>
                                        </div></TableHeading>
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {dataRows && dataRows.filter(item => !item.deleted).map((row, index) => {
                                return <tr key={'row-' + index}>

                                    <TD><input type='checkbox' checked={typeof (checkboxes[index]) !== 'undefined'} onChange={
                                        event => {
                                            checkboxes[index] = event.target.checked ? index : undefined;
                                            this.setState({ checkboxes }, () => {
                                            });
                                        }
                                    } ></input></TD>

                                    {this.props.showMoveUpAndDown && <TD><i className={"fas fa-arrow-up " + style.show_hand}
                                        onClick={() => { this.setOrder('moveUp', index) }}
                                    ></i>
                                        &nbsp;
                                    <i className={"fas fa-arrow-down " + style.show_hand}
                                            onClick={() => {
                                                this.setOrder('moveDown', index)
                                            }}
                                        ></i></TD>}
                                    {!this.props.hideAddEditCopy && <TD>
                                        {(typeof row.baseKeyIndex === 'undefined' || row.baseKeyIndex === 0) && <this.Modifier index={index} baseObject={row} ></this.Modifier>}</TD>}
                                    {this.props.rowAction && <TD>
                                        <div id='parent-action' style={{ backgroundColor: 'white' }}>
                                            <span className={style.small_text + ' ' + style.show_hand + ' ' + style.underline} onClick={() => {
                                                const visible = this.state.visible;
                                                visible[index] = !visible[index];
                                                this.setState({ visible })
                                            }}>Actions</span>
                                            {this.state.visible[index] && <div style={{ border: '1px solid gray', position: "absolute", height: 'auto', maxHeight: '200px', overflowY: 'scroll', width: '200px', backgroundColor: 'white' }}>
                                                {this.props.rowAction.map((element, index) => {
                                                    return <div onClick={() => {
                                                        this.props.rowActionMethods[index](row);
                                                    }} className={style.small_text + ' ' + style.show_hand + ' ' + style.underline} style={{ marginTop: '10px', marginLeft: '5px' }}>{element}</div>
                                                })}
                                            </div>}
                                        </div>
                                    </TD>}


                                    {columnHeadings.map((heading, colIndex) => {
                                        if (heading.name.indexOf('.') > -1) {
                                            const splitter = heading.name.split('.');
                                            const primary = row[splitter[0]];
                                            let secondary = '';

                                            if (primary) {
                                                secondary = primary[splitter[1]];

                                                secondary = typeof secondary === 'object' ? '' : secondary;
                                            }
                                            return <TD color={row.tbs_color} width={heading.width ? heading.width : '50px'} type={heading.type} key={'column-' + colIndex}><TDContent type={heading.type} key={'td-content-' + index}>{secondary}</TDContent></TD>
                                        }
                                        return (
                                            <TD color={row.tbs_color} title={row[heading.name]} width={heading.width ? heading.width : '50px'} type={heading.type} key={'column-' + colIndex}>

                                                {heading.name === 'image' ? <img src={row[heading.name]} height='100px' /> :

                                                    (
                                                        (row[heading.name] && typeof row[heading.name] === 'string' && row[heading.name].substring(0, 1) === '<') ? <div dangerouslySetInnerHTML=
                                                            {{
                                                                __html: `
                                    ${row[heading.name]}
                                    `
                                                            }}></div>


                                                            :
                                                            (

                                                                <TDContent type={heading.type} key={'td-content-' + index}>{this.convertContentToCorrectFormat(row[heading.name], heading.name)}</TDContent>)
                                                    )

                                                }

                                            </TD>
                                        )
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </div> */}
                {!this.props.hideQuickSearch &&
                    <div style={{ marginBottom: '20px', color: 'black', fontSize: '10px' }}>Quick search:
                        {this.props.quickSearch && this.props.quickSearch.length > 0 && this.props.quickSearch.map((data, index) => {
                        let tempField = data.replace('.', ' ');

                        return (
                            <span key={index} style={{ marginLeft: '10px' }}>
                                <input placeholder={`Search By ${tempField}`}
                                    onChange={(event) => {
                                        this.setState({
                                            quickSearchText: event.target.value
                                        })
                                    }
                                    }

                                    style={{ height: '30px', fontSize: '10px' }}
                                />
                                <i className="fas fa-search"
                                    onClick={() => {
                                        const tempFilter = [{
                                            key: data,
                                            type: 'contains',
                                            value: this.state.quickSearchText
                                        }];

                                        this.setState({
                                            filterArry: [...tempFilter],
                                        }, () => {
                                            let where = [...this.state.filterArry];
                                            this.props.onRefresh(0, this.state.rowsToDisplayPerPage, undefined, where);
                                        });
                                    }}
                                    style={{ marginRight: '10px', marginLeft: '5px' }}
                                ></i>
                            </span>

                        )
                    })
                        }
                    </div>
                }
                <div style={{ padding: '0px 12px', width: '100%', maxHeight: this.props.maxHeight ? this.props.maxHeight : '500', overflow: 'scroll' }}>
                    <table style={{ overflowY: 'auto', maxHeight: this.props.maxHeight ? this.props.maxHeight : '500', margin: '0px -15px' }}> {/* <div className={style.overflow_scroll} style={{ maxHeight: this.props.maxHeight ? this.props.maxHeight : '500', margin: '0px -15px' }}></div> */}
                        <RowTr className="thead_fixed">
                            {!this.props.hideGridCheckBox &&
                                <Column style={{ width: '30px' }}><input type='checkbox' onChange={
                                    event => {
                                        const checkboxes = [];
                                        const checkboxeIds = [];
                                        const selectedCheckboxData = [];

                                        dataRows.filter(item => !item.deleted).map((row, index) => {
                                            if ((row.IsAlreadyPlanned !== 'Yes' && this.props.isCheckboxVisibleOnlyPlanNoExistingPlan && this.props.isCheckboxVisibleOnlyPlanNoExistingPlan === true) || (!this.props.isCheckboxVisibleOnlyPlanNoExistingPlan || this.props.isCheckboxVisibleOnlyPlanNoExistingPlan === false)) {
                                                checkboxes[index] = event.target.checked ? index : undefined;
                                                checkboxeIds[index] = event.target.checked ? row.id : undefined;
                                                selectedCheckboxData[index] = event.target.checked ? row : undefined;
                                                this.setState({ checkboxes, checkboxeIds, selectedCheckboxData });
                                            }
                                        });
                                        const selectedIds = checkboxeIds && checkboxeIds.slice().filter(box => typeof (box) !== 'undefined');
                                        const selectedData = selectedCheckboxData && selectedCheckboxData.slice().filter(box => typeof (box) !== 'undefined');
                                        if (this.props.needIdsOnCheckboxSelection && selectedIds && selectedIds.length > 0) {
                                            // we got some items to selection. Yo                                            
                                            this.props.onSelection(selectedIds, selectedData);
                                        }
                                    }
                                } ></input></Column>}
                            {!this.props.hideGridMoveUp &&
                                <Column style={{ width: '75px' }}>move up</Column>
                            }
                            {!this.props.hideAddEditCopy &&
                                <Column style={{ width: this.props.actionsWidth ? this.props.actionsWidth : '110px' }}>Actions</Column>}
                            {this.props.rowAction && <Column style={{ width: '110px' }}>Row Action</Column>}

                            {columnHeadings.map((heading, index) => {
                                //console.log("default header : ", heading)
                                let name = heading.displayName ? heading.displayName : heading.name;

                                if (name.indexOf('.') > -1) {
                                    const splitter = name.split('.');

                                    if (splitter && splitter.length > 1) {
                                        name = heading.displayName ? heading.displayName : splitter[1];
                                    }
                                }

                                return <Column style={{ width: heading.width ? heading.width : '180px' }}
                                    id={'tbh-' + this.props.columnKey + '-' + index}
                                    key={heading.name}
                                >
                                    <div style={{ display: 'flex', position: 'relative', justifyContent: 'center' }}>

                                        <span style={{ display: 'block', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                            draggable onDragStart={(event) => {

                                                this.setState({
                                                    dragStart: {
                                                        data: heading,
                                                        index: index
                                                    }
                                                });

                                            }}

                                            onDragOver={(event) => {
                                                this.overElement = event.currentTarget.innerText;
                                            }}

                                            onDragEnd={(event) => {
                                                let tempColumnHeading = JSON.parse(JSON.stringify(this.state.columnHeadings));

                                                let tempSecondValue_new = undefined;

                                                tempColumnHeading.forEach((item, i) => {
                                                    if (item.name && item.name.toLowerCase() === this.overElement && this.overElement.toLowerCase()) {
                                                        tempSecondValue_new = {
                                                            data: item,
                                                            index: i
                                                        };
                                                    }
                                                });

                                                if (tempSecondValue_new) {

                                                    let tempSecondValue = tempSecondValue_new;

                                                    tempColumnHeading[tempSecondValue.index] = this.state.dragStart.data;
                                                    tempColumnHeading[this.state.dragStart.index] = tempSecondValue.data

                                                    this.setState({
                                                        columnHeadings: [...tempColumnHeading]
                                                    })
                                                }
                                            }}

                                            //title={name}
                                            onMouseOver={() => {
                                                // hover
                                            }}
                                            onMouseOut={() => {
                                            }}
                                        >

                                            {name}
                                        </span>
                                        <span draggable="true" id={'border-span-' + index} title='resize'
                                            onDragStart={this.dragStartHandler('border-span-' + index)}
                                            onDrag={this.dragHandler(index)}
                                            onDragEnd={this.dragStoptHandler(index)}
                                            style={{ cursor: 'col-resize', position: "absolute", right: 0, width: '5px', color: 'transparent', backgroundColor: 'red', marginTop: '-9px' }}>
                                            <i className="fa fa-arrows-v" aria-hidden="true"></i>
                                            <i className="fa fa-arrows-v" aria-hidden="true"></i></span>
                                    </div></Column>
                            })}
                        </RowTr>
                        <tbody style={{ maxHeight: this.props.maxHeight ? this.props.maxHeight : '500', overflowY: 'auto' }}>


                            {dataRows && dataRows.filter(item => !item.deleted).map((row, index) => {
                                return <RowTr key={'row-' + index}>
                                    {!this.props.hideGridCheckBox && ((row.IsAlreadyPlanned !== 'Yes' && this.props.isCheckboxVisibleOnlyPlanNoExistingPlan && this.props.isCheckboxVisibleOnlyPlanNoExistingPlan === true)
                                        || (!this.props.isCheckboxVisibleOnlyPlanNoExistingPlan || this.props.isCheckboxVisibleOnlyPlanNoExistingPlan === false)
                                    ) &&
                                        <Column style={{ width: '30px', maxWidth: '30px' }}><input type='checkbox' checked={typeof (checkboxes[index]) !== 'undefined'} onChange={
                                            event => {
                                                checkboxes[index] = event.target.checked ? index : undefined;
                                                checkboxeIds[index] = checkboxeIds[index] !== 'undefined' && event.target.checked ? row.id : undefined;
                                                selectedCheckboxData[index] = selectedCheckboxData[index] !== 'undefined' && event.target.checked ? row : undefined;
                                                this.setState({ checkboxes, checkboxeIds, selectedCheckboxData });

                                                const selectedIds = checkboxeIds && checkboxeIds.slice().filter(box => typeof (box) !== 'undefined');
                                                const selectedData = selectedCheckboxData && selectedCheckboxData.slice().filter(box => typeof (box) !== 'undefined');
                                                if (this.props.needIdsOnCheckboxSelection && selectedIds && selectedIds.length > 0) {
                                                    // we got some items to selection. Yo                                            
                                                    this.props.onSelection(selectedIds, selectedData);
                                                }
                                            }
                                        } ></input></Column>
                                    }
                                    {!this.props.hideGridMoveUp &&
                                        <Column style={{ width: '75px', maxWidth: '75px' }}><i className={"fas fa-arrow-up " + style.show_hand}
                                            onClick={() => { this.setOrder('moveUp', index) }}
                                        ></i>
                                            &nbsp;
                                            <i className={"fas fa-arrow-down " + style.show_hand}
                                                onClick={() => {
                                                    this.setOrder('moveDown', index)
                                                }}
                                            ></i></Column>
                                    }
                                    {!this.props.hideAddEditCopy && <Column style={{ width: this.props.actionsWidth ? this.props.actionsWidth : '110px' }}><this.Modifier index={index} baseObject={row} ></this.Modifier></Column>}
                                    {this.props.rowAction && <Column style={{ width: '110px' }}>
                                        <div id='parent-action' style={{ backgroundColor: 'white' }}>
                                            <span className={style.small_text + ' ' + style.show_hand + ' ' + style.underline} onClick={() => {
                                                const visible = this.state.visible;
                                                visible[index] = !visible[index];
                                                this.setState({ visible })
                                            }}>Actions</span>
                                            <span draggable="true" id={'border-span-' + index} title='resize'
                                                onDragStart={this.dragStartHandler('border-span-' + index)}
                                                onDrag={this.dragHandler(index)}
                                                onDragEnd={this.dragStoptHandler(index)}
                                                style={{ cursor: 'col-resize', position: "absolute", right: 0, width: '5px', color: 'transparent', backgroundColor: 'red', marginTop: '-9px' }}>
                                                <i className="fa fa-arrows-v" aria-hidden="true"></i>
                                                <i className="fa fa-arrows-v" aria-hidden="true"></i></span>

                                            {this.state.visible[index] && <div style={{ border: '1px solid gray', position: "absolute", height: 'auto', maxHeight: '200px', overflowY: 'scroll', width: '200px', backgroundColor: 'white' }}>
                                                {this.props.rowAction.map((element, index) => {
                                                    return <div onClick={() => {
                                                        this.props.rowActionMethods[index](row);
                                                    }} className={style.small_text + ' ' + style.show_hand + ' ' + style.underline} style={{ marginTop: '10px', marginLeft: '5px' }}>{element}</div>
                                                })}
                                            </div>}
                                        </div>
                                    </Column>}


                                    {columnHeadings.map((heading, colIndex) => {
                                        if (heading.name.indexOf('.') > -1) {
                                            const splitter = heading.name.split('.');
                                            const primary = row[splitter[0]];
                                            let secondary = '';

                                            if (primary) {
                                                secondary = primary[splitter[1]];

                                                secondary = typeof secondary === 'object' ? '' : secondary;
                                            }

                                            return <Column style={{ width: heading.width ? heading.width : '180px', overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-all' }} color={row.tbs_color} width={heading.width ? heading.width : '50px'} type={heading.type} key={'column-' + colIndex}>
                                                <TDContent type={heading.type} key={'td-content-' + index}>{secondary}</TDContent>
                                            </Column>
                                        }
                                        return (
                                            <Column style={{ width: heading.width ? heading.width : '180px', overflow: 'hidden', whiteSpace: 'normal', wordBreak: 'break-all' }} color={row.tbs_color} title={row[heading.name]} type={heading.type} key={'column-' + colIndex}>
                                                {heading.name === 'image' ? <img src={row[heading.name]} height='100px' /> :
                                                    (
                                                        (row[heading.name] && typeof row[heading.name] === 'string' && row[heading.name].substring(0, 1) === '<') ?
                                                            <div dangerouslySetInnerHTML=
                                                                {{
                                                                    __html: `${row[heading.name]}`
                                                                }}></div>
                                                            :
                                                            (
                                                                <TDContent style={{ whiteSpace: 'pre-wrap',textAlign:'left' }} rupaySignVisible={this.props.rupaySignVisible ? this.props.rupaySignVisible : undefined} type={heading.type} key={'td-content-' + index}>
                                                                    {heading.type === "currency" ?
                                                                        <>
                                                                            {numberFormat(row[heading.name])}
                                                                        </>
                                                                        :
                                                                        heading.type === 'bool' ?
                                                                            <>
                                                                                {row[heading.name] === true || row[heading.name] === 1 ? "Yes" : "No"}
                                                                            </>
                                                                            :
                                                                            <>
                                                                                {this.convertContentToCorrectFormat(row[heading.name], heading.name)}
                                                                            </>
                                                                    }

                                                                </TDContent>
                                                            )
                                                    )
                                                }
                                            </Column>
                                        )
                                    })}
                                </RowTr>
                            })}
                        </tbody>
                    </table> {/* </div> */}
                </div>

                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', }}>
                    {!this.props.hideLoadMore &&
                        <span>
                            <A onClick={() => {
                                let status = this.props.onRefreshStatus || '';
                                this.props.onRefresh(this.state.pageIndex + 1, this.state.rowsToDisplayPerPage, undefined, undefined, status ? status : '');
                                this.pushMode = true;
                                this.setState({ pageIndex: this.state.pageIndex + 1 });
                            }} text='Load More' /> &nbsp;&nbsp;<span style={{ color: "#222", fontSize: "15px" }}> Default rows:</span>  &nbsp;&nbsp;
                            <select>
                                <option selected={this.state.rowsToDisplayPerPage === 10} >10</option>
                                <option selected={this.state.rowsToDisplayPerPage === 20} >20</option>
                                <option selected={this.state.rowsToDisplayPerPage === 30} >30</option>
                                <option selected={this.state.rowsToDisplayPerPage === 40} >40</option>
                                <option selected={this.state.rowsToDisplayPerPage === 50} >50</option>
                                <option selected={this.state.rowsToDisplayPerPage === 100} >100</option>
                                <option selected={this.state.rowsToDisplayPerPage === 200} >200</option>
                                <option selected={this.state.rowsToDisplayPerPage === 500} >500</option>
                                <option selected={this.state.rowsToDisplayPerPage === 1000} >1000</option>
                            </select>
                        </span>
                    }
                    &nbsp;&nbsp;
                    {this.state.popup && <this.EditPop onCancel={() => {
                        let temp = this.state.dataRows;
                        temp.splice(0, temp.length); // Fatest way to empty array than array = []
                        this.setState({
                            popup: false, dataRows: [...temp]
                        }, () => {
                            let status = this.props.onRefreshStatus || '';
                            this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                        });

                        // this.setState({ popup: false })

                    }} baseObject={this.state.baseObject} index={this.state.index} id={this.state.id}
                        onSave={(item, index) => {
                            // this.setState({
                            //     popup: false
                            // });
                            //console.log("SAVE item : ", item);
                            this.props.onSave(item, this.state.index);
                            setTimeout(() => {
                                let temp = this.state.dataRows;
                                //console.log("temp : ", temp);
                                temp && temp.splice(0, temp.length); // Fatest way to empty array than array = []
                                this.setState({
                                    dataRows: [...temp], CancelSelfAuditPopup: false
                                }, () => {
                                    let status = this.props.onRefreshStatus || '';
                                    this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                                    if (this.props.isCloseAfterSave) {
                                        this.setState({
                                            popup: false
                                        });
                                    }

                                });
                            }, 500);
                        }} getById={this.props.getById} ></this.EditPop>}

                    {this.state.filterPop &&
                        <this.FilterPop close={() => this.setState({ filterPop: false })} />
                    }
                    {this.state.UnlockAccountPop &&
                        <this.UnlockAccountPop onCancel={() => {
                            let temp = this.state.dataRows;
                            temp.splice(0, temp.length); // Fatest way to empty array than array = []
                            this.setState({
                                UnlockAccountPop: false, dataRows: [...temp]
                            }, () => {
                                let status = this.props.onRefreshStatus || '';
                                this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                            });

                            // this.setState({ UnlockAccountPop: false })

                        }} baseObject={this.state.baseObject} index={this.state.index} id={this.state.id}
                            onSave={(item, index) => {
                                // this.setState({
                                //     UnlockAccountPop: false
                                // });
                                //console.log("SAVE item : ", item);
                                this.props.onSave(item, this.state.index);
                                setTimeout(() => {
                                    let temp = this.state.dataRows;
                                    //console.log("temp : ", temp);
                                    temp && temp.splice(0, temp.length); // Fatest way to empty array than array = []
                                    this.setState({
                                        dataRows: [...temp]
                                    }, () => {
                                        let status = this.props.onRefreshStatus || '';
                                        this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                                        if (this.props.isCloseAfterSave) {
                                            this.setState({
                                                UnlockAccountPop: false
                                            });
                                        }


                                    });
                                }, 500);
                            }} getById={this.props.getById} >

                        </this.UnlockAccountPop>
                    }
                    {this.state.CancelSelfAuditPopup &&
                        <this.CancelSelfAuditPopup onCancel={() => {
                            let temp = this.state.dataRows;
                            temp.splice(0, temp.length); // Fatest way to empty array than array = []
                            this.setState({
                                CancelSelfAuditPopup: false,
                                dataRows: [...temp]
                            }, () => {
                                let status = this.props.onRefreshStatus || '';
                                this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                            });

                            // this.setState({ CancelSelfAuditPopup: false })

                        }} baseObject={this.state.baseObject} index={this.state.index} id={this.state.id}
                            onSave={(item, index) => {
                                // this.setState({
                                //     CancelSelfAuditPopup: false
                                // });
                                //console.log("SAVE item : ", item);
                                alert("Ok List Table")
                                this.props.onSave(item, this.state.index);
                                setTimeout(() => {
                                    let temp = this.state.dataRows;

                                    //console.log("temp : ", temp);
                                    temp && temp.splice(0, temp.length); // Fatest way to empty array than array = []
                                    this.setState({
                                        dataRows: [...temp], CancelSelfAuditPopup: false
                                    }, () => {
                                        let status = this.props.onRefreshStatus || '';
                                        this.props.onRefresh(0, ((this.state.pageIndex + 1) * this.state.rowsToDisplayPerPage), undefined, undefined, status ? status : '')
                                        if (this.props.isCloseAfterSave) {
                                            this.setState({
                                                CancelSelfAuditPopup: false, popup: false
                                            });
                                        }

                                    });
                                }, 500);
                            }} getById={this.props.getById} >

                        </this.CancelSelfAuditPopup>
                    }
                </div>
            </div>
        );
    }
};

/**
 * for these proptypes, the functions like on edit, add etc will be the redux action references added from the parent window. Example:
 * 
 * <ListTable
 *      onSave={this.props.saveProduct}
 *      onDelete={this.props.deleteProduct} />
 * 
 * Also, if pickEditFromMemory is true, it will load the edit form with the object already given in the row clicked
 * 
 * editForm will be required for the edit window. 
 * 
 * actionType will be used for the type being pushed by redux. Handy if we need to check if data updates or changes.
 * 
 * isChildtable means, when we save, we will actually it in the array of the calling component. This wll be used when we are adding an item in the model which is added as list as a child of a different component. For example, ProductVariation for product table.
 */

ListTable.propTypes = {
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    getById: PropTypes.func,
    pickEditFromMemory: PropTypes.bool,
    editForm: PropTypes.element.isRequired,
    actionType: PropTypes.string,
    dataRows: PropTypes.array.isRequired,
    columnHeadings: PropTypes.array.isRequired,
    isChildTable: PropTypes.bool,
    // records count is required for making pagination work correctly
    recordsCount: PropTypes.number.isRequired,
    rowsToDisplayPerPage: PropTypes.number,
    // if we want to include some button for rows. Will be array of elements
    rowAction: PropTypes.element,
    // array of functions. Required if sent rowAction
    rowActionMethods: PropTypes.func,
    // if we want to include some button for table. Will be array of elements
    tableAction: PropTypes.element,
    // array of functions. Required if sent tableAction
    tableActionMethods: PropTypes.func,

    // if you would like to hire the add/edit option
    hideAddEditCopy: PropTypes.bool,

    // if the row color has to be changed, the config has to be sent for this. The format will be:
    /**
     * [{
     *      color: red
     *      column: 'orderStatus'
     *      value: 'incomplete'
     * }]
     * This will color the row red for all the orderstatuses with incomplete
     */
    rowColorConfigs: PropTypes.array,
    showActions: PropTypes.bool,
    showMoveUpAndDown: PropTypes.bool,

    // if showDateFilter is true, it will show a date range to filter data with
    showDateFilter: PropTypes.bool
};

const mapStateToProps = state => {

    return {};
};

export default connect(mapStateToProps, null)(withCookies(ListTable));
