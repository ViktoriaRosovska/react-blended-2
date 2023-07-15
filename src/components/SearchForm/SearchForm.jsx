import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({ onHandleSubmit }) => {
  const onFormSubmit = e => {
    e.preventDefault();
    const { value } = e.target.elements.search;
    onHandleSubmit(value);
  };

  return (
    <SearchFormStyled onSubmit={onFormSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </SearchFormStyled>
  );
};

// export class SearchForm extends Component {
//   state = {
//     searchValue: '',
//   };

//   onFormSubmit = e => {
//     e.preventDefault();
//     this.props.onHandleSubmit(this.state.searchValue);
//   };
//   onHandleChange = e => {
//     this.setState({ searchValue: e.target.value });
//   };
//   render() {
//     return (
//       <SearchFormStyled onSubmit={this.onFormSubmit}>
//         <FormBtn type="submit">
//           <FiSearch size="16px" />
//         </FormBtn>
//         <InputSearch
//           onChange={this.onHandleChange}
//           placeholder="What do you want to write?"
//           name="search"
//           required
//           autoFocus
//           value={this.searchValue}
//         />
//       </SearchFormStyled>
//     );
//   }
// }
