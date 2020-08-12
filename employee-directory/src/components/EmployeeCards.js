import React from 'react';
import API from '../utils/API';
import EmployeeCard from './EmployeeCard';
import SearchBar from './SearchBar';
import Button from './Buttton';

class EmployeeCards extends React.Component {
    state = {
        search: "",
        results: [],
        filteredResults: []
    };

    componentDidMount = () => {
        this.searchEmployees();
    };

    renderEmployees = () => {
        return this.state.filteredResults.map(results => <EmployeeCard key={results.cell} result={results} />)
    };


    searchEmployees = () => {
        API.search()
            .then(res => this.setState({
                results: res.data.results,
                filteredResults: res.data.results
            }))
            .catch(err => console.error(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target
        this.setState(()=> {
            if (!value) {
                return {
                    [name]: value,
                    filteredResults: this.state.results
                };
            } else {
                return { [name]: value }
            };
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        this.setState(() => {
            const updatedResults = this.state.filteredResults.filter(x => 
                x.name.first.includes(this.state.search) || 
                x.name.last.includes(this.state.search) ||
                x.login.username.includes(this.state.search)|| 
                x.location.state.includes(this.state.search) ||
                x.location.username.includes(this.state.search))
            if (!this.state.search) {
                return { filteredResults: this.state.results }
            } else {
                return { filteredResults: updatedResults }
            };
        });

        this.renderEmployees();
    };

    renderSortedEmployees = event => {
        event.preventDefault();

        // found at https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
        function compare(a, b) {
            const nameA = a.name.last.toUpperCase();
            const nameB = b.name.last.toUpperCase();

            let comparison = 0;
            if (nameA > nameB) {
                comparison = 1;
            } else if (nameA < nameB) {
                comparison = -1;
            };
            return comparison;
        };

        return this.setState({ filteredResults: this.state.filteredResults.sort(compare) })
    };

    render() {
        return (
            <div className='container'>
                <SearchBar
                    handleInputChange={this.handleInputChange}
                    value={this.state.search}
                    handleFormSubmit={this.handleFormSubmit}
                    name='Search'
                />
                <Button
                    handleFormSubmit={this.renderSortedEmployees}
                    name='Sort By Last Name'
                    className='mb-3 btn-success'
                />
                {this.renderEmployees()}
            </div>
        );
    };
}

export default EmployeeCards;