import React, { Component } from "react";
import PropTypes from "prop-types";
import data from './data.json'
import { MumuTable } from "../mumutable";
import styled from '@emotion/styled'
import { Formik } from 'formik';
import * as Yup from 'yup'

const List = styled.li`
  list-style-type: none;
  padding: 0 10px;
`

const ListContainer = styled.ul`
  display: flex;
`

const TableData = styled.td`
  min-width: 120px;
`

const SearchHeader = styled.h3`
  display: inline-block;
  margin-right:10px;
`

const Container = styled.div`
  height: 200px;
`

const StyledDiv = styled.div`
  margin-right:10px;
  display: inline-block;
`

class Example extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      id: '',
      firstname:'',
      lastname: '',
      dob: '',
      occupation: '',
      gender: '',
      phone: '',
    }
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.setState(() => ({ users: data }))
  }

  FormSchema = Yup.object().shape({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    dob: Yup.string().required(),
    occupation: Yup.string().required(),
    gender: Yup.string().required(),
    phone: Yup.string().required(),
  })

  Form = () => (
    <Container>
      <h1>My Form</h1>
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.FormSchema}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <StyledDiv>
            <label htmlFor=''>firstname</label>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.firstname}
              name="firstname"
            />
            </StyledDiv>
            <StyledDiv>
            <label htmlFor=''>lastname</label>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastname}
              name="lastname"
            />
            </StyledDiv>
            <StyledDiv>
            <label htmlFor=''>dob</label>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.dob}
              name="dob"
            />
            </StyledDiv>
            <StyledDiv>
            <label htmlFor=''>occupation</label>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.occupation}
              name="occupation"
            />
            </StyledDiv>
            <StyledDiv>
            <label htmlFor=''>gender</label>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.gender}
              name="gender"
            />
            </StyledDiv>
            <StyledDiv>
            <label htmlFor=''>phone</label>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.phone}
              name="phone"
            />
            </StyledDiv>
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </Container>
  );

  render() {
    const renderTable = props => {
      console.log(props);
      return (
        <div>
          <div className="form-row mb-3 col">
            <SearchHeader>Search</SearchHeader>
            <input
              className="form-control col-6"
              placeholder="Search..."
              value={props.search}
              onChange={props.setSearchTerm}
            />
            <button type="button" class="btn btn-primary" data-toggle="modal">
             Add Data
            </button>
          </div>
          <table className="table table-hover mb-4">
            <thead className="bg-primary text-white">
              <tr>
                <th name="id" onClick={props.setColumnSortToggle}>
                  id
                </th>
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
                <th name="longitude" onClick={props.setColumnSortToggle}>
                Action
                </th>
              </tr>
            </thead>
            <tbody>
              {props.visibleData.map((user, i) => {
                return (
                  <tr key={i}>
                    <TableData>{user.id}</TableData>
                    <TableData>{user.firstname}</TableData>
                    <TableData>{user.lastname}</TableData>
                    <TableData>{user.dob}</TableData>
                    <TableData>{user.occupation}</TableData>
                    <TableData>{user.gender}</TableData>
                    <TableData>{user.phone}</TableData>
                    <TableData onClick={()=> props.removeTableData(this.state.users, user.id)}>Remove ❌</TableData>
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
            {this.Form()}
            <h1>Mumu Table</h1>

            <hr className="mb-4" />

            <MumuTable
              render={renderTable}
              initialData={this.state.users}
              resultSet={5}
              sortColumn="firstname"
              sortOrder="desc"
              searchKeys={["firstname", "lastname", 'id']}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Example;
