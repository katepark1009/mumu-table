import React, { Component } from "react";
import PropTypes from "prop-types";
import data from './data.json'
import { Patables } from "../patable";
import styled from '@emotion/styled'

const List = styled.li`
list-style-type: none;
padding: 0 10px;
`
const ListContainer = styled.ul`
display: flex;
`

const TableData = styled.td`
min-width: 120px
`

class MumuTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.setState(() => ({ users: data }))
  }

  render() {
    const renderTable = props => {
      console.log(props);
      return (
        <div>
          <div className="form-row mb-3">
            <input
              className="form-control"
              placeholder="Search..."
              value={props.search}
              onChange={props.setSearchTerm}
            />
          </div>
          <table className="table table-hover mb-4">
            <thead className="bg-primary text-white">
              <tr>
                <th name="firstname" onClick={props.setColumnSortToggle}>
                  FirstName
                </th>
                <th name="lastname" onClick={props.setColumnSortToggle}>
                  LastName
                </th>
                <th name="dob" onClick={props.setColumnSortToggle}>
                  Date Of Birth
                </th>
                <th name="occupation" onClick={props.setColumnSortToggle}>
                  occupation
                </th>
                <th name="gender" onClick={props.setColumnSortToggle}>
                gender
                </th>
                <th name="phone" onClick={props.setColumnSortToggle}>
                phone
                </th>
                <th name="latitude" onClick={props.setColumnSortToggle}>
                latitude
                </th>
                <th name="longitude" onClick={props.setColumnSortToggle}>
                longitude
                </th>
              </tr>
            </thead>
            <tbody>
              {props.visibleData.map((user, i) => {
                return (
                  <tr key={i}>
                    <TableData>{user.firstname}</TableData>
                    <TableData>{user.lastname}</TableData>
                    <TableData>{user.dob}</TableData>
                    <TableData>{user.occupation}</TableData>
                    <TableData>{user.gender}</TableData>
                    <TableData>{user.phone}</TableData>
                    <TableData>{user.latitude}</TableData>
                    <TableData>{user.longitude}</TableData>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="row my-4 justify-content-between">
            <div className="col-md-6">
              <div className="form-inline">
                <label className="my-1 mr-2">Result set: </label>
                <select
                  className="form-control"
                  value={props.resultSet}
                  onChange={e => {
                    props.setResultSet(parseInt(e.target.value));
                  }}
                >
                  <option>5</option>
                  <option>10</option>
                  <option>15</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <ListContainer className="pagination rounded-flat pagination-primary d-flex justify-content-center">
                <List
                  className={
                    props.prevDisabled ? "page-item invisible" : "page-item"
                  }
                  onClick={() => {
                    props.setPageNumber(props.currentPage - 1);
                  }}
                >
                  <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </List>

                {props.paginationButtons.map((page, i) => {
                  return (
                    <List
                      key={i}
                      className={
                        props.currentPage === page
                          ? "page-item active"
                          : "page-item"
                      }
                    >
                      <span
                        className="page-link pointer"
                        onClick={() => {
                          props.setPageNumber(page);
                        }}
                      >
                        {page}
                      </span>
                    </List>
                  );
                })}

                <List
                  className={
                    props.nextDisabled ? "page-item invisible" : "page-item"
                  }
                  onClick={() => {
                    props.setPageNumber(props.currentPage + 1);
                  }}
                >
                  <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </List>
              </ListContainer>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h1>Users</h1>

            <hr className="mb-4" />

            <Patables
              render={renderTable}
              initialData={this.state.users}
              resultSet={5}
              sortColumn="firstname"
              sortOrder="desc"
              searchKeys={["firstname", "lastname"]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MumuTable;
