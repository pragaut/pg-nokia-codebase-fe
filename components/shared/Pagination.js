import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from '../../theme/app.scss';

class Pagination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 0,
            rows: props.rowsToDisplayPerPage,
            allRecordsSelected: false
        };

    }

    paginate = step => event => {

        let pageIndex = this.state.pageIndex;

        switch(step) {
            case 'start':
                pageIndex = 0;
                break;
            case 'last':
                pageIndex = Math.floor(this.props.recordsCount / this.state.rows);
                if (this.props.recordsCount % this.state.rows === 0) {
                    pageIndex --;
                }
                break;
            case 'previous':
                pageIndex = pageIndex - 1;
                break;
            case 'next':
                pageIndex = pageIndex + 1;
                break;
        }

        this.setState({ pageIndex });
        
        setTimeout(() => this.props.onPageChange(pageIndex, this.state.rows), 100)
    };


    onRowChanged = event => {
        const value = event.target.value;

        this.setState({
            rows: value
        });

        setTimeout(() => this.props.onPageChange(this.state.pageIndex, value), 100)
    }

    render() {

        const lowerRange = (this.state.pageIndex * this.state.rows) + 1;
        let upperRange = (this.state.pageIndex + 1) * this.state.rows;

        const { recordsCount } = this.props;


        if (upperRange > recordsCount) {
            upperRange = recordsCount;
        }


        return (
            <div>
                <div className={style.page_wrapper}>
                    <div>
                        <span className={style.row_show}>Rows per page:</span>
                        <select value={this.props.rows} onChange={this.onRowChanged} className={style.select_page}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option  value="40">40</option>
                        </select>
                    </div>
                    <div>
                        <button className={style.page_but} 
                            onClick={this.state.pageIndex === 0 ? null : this.paginate('start')}
                        >
                            <i  className={["fas fa-backward", style.range_icons].join(' ')}
                                style={{ color: this.state.pageIndex === 0 ? 'Gray' : 'LightGray' }}
                                />
                        </button>
                        <button className={style.page_but} onClick={this.state.pageIndex === 0 ? null : this.paginate('previous')}>
                            <i  className={["fas fa-chevron-left" , style.range_icons].join(' ')}
                                style={{ color: this.state.pageIndex === 0 ? 'Gray' : 'LightGray' }}
                                ></i>
                        </button>
                        <span className={style.range_wrapper}>showing {lowerRange} - {upperRange} of {recordsCount} records</span>
                        <button className={style.page_but}
                            onClick={upperRange === recordsCount ? null : this.paginate('next')}
                        >
                            <i  className={["fas fa-chevron-right", style.range_icons].join(' ')}
                                style={{ color: upperRange === recordsCount ? 'Gray' : 'LightGray' }}
                                ></i>
                        </button>
                        <button className={style.page_but}>
                            <i  className={["fas fa-forward", style.range_icons].join(' ')}
                                onClick={upperRange === recordsCount ? null : this.paginate('last')}
                                style={{ color: upperRange === recordsCount ? 'Gray' : 'LightGray' }}
                                ></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

Pagination.propTypes = {
    onPageChange: PropTypes.func.isRequired,
};


export default Pagination;