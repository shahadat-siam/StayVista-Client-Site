import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CategoryBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  console.log(category === label)
  const nevigate = useNavigate()
  const hundleClick = () => {
    let currentQuery = {category:label}
    const url = queryString.stringifyUrl({
      url: '/',
      query: currentQuery
    })
    nevigate(url)
  }

  return (
    <div onClick={hundleClick} className={`flex flex-col items-center justify-center ${category === label && 'border-neutral-800 text-neutral-900'} gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer`}>
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
