import React from 'react';
import PropTypes from 'prop-types';
import { List, Spin, Button, Input, Dropdown, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './styles.css';

const HomaPage = ({ location }) => {;
  const [searchParam, setSearchParam] = React.useState(
    new URLSearchParams(location.search)
    .get('search')
  );
  const [sortParam, setSortParam] = React.useState(
    new URLSearchParams(location.search)
    .get('sort')
  );
  const [dataForRender, setdataForRender] = React.useState([]);

  const isLoaded = useSelector(state => state.isLoaded);
  const libraries = useSelector(state => state.libraries.map(i => ({
    order: i.order,
    fullname: i.fullname,
    territory: i.territory,
    libraries: i.libraries,
  })));

  const { Search } = Input;

  const sortCallback = (a, b) => {
    if (sortParam === 'asc') {
      return a.libraries - b.libraries;
    }
    if (sortParam === 'desc') {
      return b.libraries - a.libraries;
    }
    return 0;
  }

  const buildSearchString = (search, sort) => {
    const params = new URLSearchParams();
    if (search) {
      params.append('search', search );
    }
    if (sort) {
      params.append('sort', sort);
    }
    return (search || sort) ? `?${params.toString()}` : '/';
  }

  const onInputChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    const searchParamsString = buildSearchString(searchString, sortParam);
    window.history.replaceState(null, null, searchParamsString);
    
    const newData = libraries.filter((i) => (
      i.territory
      .toLowerCase()
      .includes(searchString)
      ));
      newData.sort(sortCallback);
      setdataForRender(newData);
      setSearchParam(searchString);
  }

  const onSortClick = (e) => {
    setSortParam(e.item.props.value);
  }

  React.useEffect(() => {
    const sortParamsString = buildSearchString(searchParam, sortParam);
    window.history.replaceState(null, null, sortParamsString);
    const newData = [...dataForRender];
    newData.sort(sortCallback);
    setdataForRender(newData);
  }, [sortParam]);

  React.useEffect(() => {
    let newData = [...libraries];
    if (searchParam) {
      newData = libraries.filter((i) => (
        i.territory.toLowerCase().includes(searchParam)
      ));
    }
    if (sortParam) {
      newData.sort(sortCallback);
    } 
    setdataForRender(newData);
  }, [isLoaded]);

  const menu = (
    <Menu>
      <Menu.Item onClick={onSortClick} value="asc">
          Asc
      </Menu.Item>
      <Menu.Item onClick={onSortClick} value="desc">
        Desc
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="root">
      {
        isLoaded ? <List
          header={
            <div className="panel">
              <Search
                onChange={onInputChange}
                placeholder="Find region"
                value={searchParam}
                style={{ width: 200 }}
              />
              <Dropdown overlay={menu}>
                <Button>Sort</Button>
              </Dropdown>
            </div>
          }
          footer={<div>Footer</div>}
          bordered
          dataSource={dataForRender}
          renderItem={item => {
            return (
              <List.Item className="item">
                {`Name: ${item.fullname}`}
                <List.Item.Meta
                  title={<span>{`Count: ${item.libraries}`}</span>}
                />
                <Link to={`/library/${item.order}`} className="link">
                  <Button type="primary">More Info</Button>
                </Link>
              </List.Item>
            );
          }}
        /> : 
        <Spin className="spiner" />
      }
    </div>
  );
};

HomaPage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default HomaPage;