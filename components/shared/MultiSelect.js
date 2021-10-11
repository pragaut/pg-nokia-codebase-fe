import React from 'react'
import PropTypes from 'prop-types';
import config from '../../config';
import styles from '../../theme/app.scss';
import Styled from 'styled-components';

const MainContainer = Styled.div`
    position: relative;
    height: 35px;
    border: 1px solid rgb(204,204,204);
    font-size: 13px;
    display: inline-block;
    width:240px;
    .input_txt_top{
        height: 100%;
        width: 100%;
        border: 0px;
        outline:none;
        padding: 5px;
        box-sizing: border-box;
    }
    .dropdown_menu{
        position: absolute;
        width: 100%;
        height: 150px;
        overflow-y: scroll;
        border: 1px solid #ccc;
        top: 100%;
        left: 0px;
        background: #fff;
        z-index:2

    }
    .dropdown_menu::-webkit-scrollbar {
        width: 5px;
    }
    
    .dropdown_menu::-webkit-scrollbar-track {
        background: #ddd;
    }
    
    .dropdown_menu::-webkit-scrollbar-thumb {
        background: #666; 
    }
`;

export default class MultiSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...this.prepareStateAfterPropsChanges(props),
            optionsOpened: false
        };
    }

    prepareStateAfterPropsChanges = (props) => {
        return {
            searchText: '',
            dataRows: props.dataRows ? (props.dataRows.map(dataRow => {
                return {
                    ...dataRow,
                    checked: (props.selectedIds ? props.selectedIds : []).indexOf(dataRow[this.props.idFieldName ? this.props.idFieldName : 'id']) > -1
                }
            })) : [],
            selectedIds: props.selectedIds ? props.selectedIds : [],
            selectedValues: (props.dataRows && props.selectedIds) ? this.getTextValuesWithHelpOfIds(props.dataRows, props.selectedIds)  : '',
        };
    }


    getTextValuesWithHelpOfIds = (dataRows, ids) => {
        
        const selectedValues = dataRows.filter(dataRow => {
            const id = dataRow[this.props.idFieldName ? this.props.idFieldName : 'id'];
            return ids.indexOf(id) > -1;
        }).map(dataRow => {
            return dataRow[this.props.valueFieldName ? this.props.valueFieldName : 'name'];
        });

        return selectedValues.join(', ');
    };


    UNSAFE_componentWillReceiveProps(nextProps) {
        let proceedIfSatisfied = false;
        
        if (nextProps.dataRows) {
            this.setState({
                ...this.prepareStateAfterPropsChanges(nextProps)
            }, () => {
            });
        }
    }


    onItemSelectionStateChanged = (id, index, checked) => {
        // let's find it first

        const dataRows = JSON.parse(JSON.stringify(this.state.dataRows));
        const result = dataRows.find(dataRow => dataRow[this.props.idFieldName ? this.props.idFieldName : 'id'] === id);

        if (result) {
            // found
            result.checked = checked;

            this.setState({
                dataRows
            });
        }

        if (this.props.onItemSelectionStateChanged) {
            this.props.onItemSelectionStateChanged({
                result,
                id,
                index,
                checked,
                dataRows,
                checkedData: dataRows.filter(dataRow => dataRow.checked)
            });
        }
    };


    render(){
        return (
            <MainContainer onClick={() => {
            }}>
                <input className="input_txt_top" type='text' readOnly  defaultValue={this.state.selectedValues} onClick={event => {
                    this.setState({
                        optionsOpened: !this.state.optionsOpened
                    })
                }} ></input>
                {this.state.optionsOpened && <div className="dropdown_menu">
                    <div style={{ position: 'relative'}}>
                    <input type='text' style={{height: "30px",width:" 100%",margin:" auto",padding:" 5px",position: 'sticky',zIndex: '2',top: '30px'}} placeholder='Type text here to search' value={this.state.searchText.length > 0 ? this.state.searchText : ''} defaultValue={this.state.searchText} onChange={event => {
                        this.setState({ searchText: event.target.value });
                    }} ></input>
                    <span
                        style={{
                            position: 'absolute',
                            right: '10px',
                            top: '10px',
                            fontSize: '10px',
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            color: 'black',
                            zIndex: '2'
                        }}
                        onClick={(event)=>{
                            this.setState({
                                searchText: ''
                            })
                        }}
                    >X</span>
                    </div>
                

                {this.state.dataRows && this.state.dataRows.filter(dataRow => {
                    if (this.state.searchText === '') return true;
                    if (!this.state.searchText) return true;
                    
                    const value = dataRow[this.props.valueFieldName ? this.props.valueFieldName : 'name'];

                    if (!value) {
                        return true;
                    }

                    return value.indexOf(this.state.searchText) > -1;
                }).map((dataRow, index) => {
                    const id = dataRow[this.props.idFieldName ? this.props.idFieldName : 'id'];
                    const value = dataRow[this.props.valueFieldName ? this.props.valueFieldName : 'name'];

                    return <div>
                            <input type='checkbox'
                                checked={dataRow.checked}
                                onChange={(event) => {
                                    this.onItemSelectionStateChanged(id, index, event.target.checked)
                                }} ></input>
                            <span style={{ fontSize: '10px'}} >{value}</span>
                        </div>
                })}
                </div>}
            </MainContainer>
        );
    }
  };


  MultiSelect.propTypes = {
    selectedValues: PropTypes.array,
    selectedIds: PropTypes.array,
    idFieldName: PropTypes.string,
    valueFieldName: PropTypes.string,
    onItemSelectionStateChanged: PropTypes.func
  };