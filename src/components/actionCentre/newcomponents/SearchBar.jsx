import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Input, Select, Tooltip } from "antd";
function SearchBar(props) {
    const { t, i18n } = useTranslation();
    const { Search } = Input;
    const { Option } = Select;
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const { term, setTerm, onSearchSubmit, clearResults, keyAccess, searchTypeList, getEntity, selectedItems, setSelectedItems, setSortType, sortType } = props;

    // update 'term' value after 1 second from the last update of 'debouncedTerm'
    useEffect(() => {
        const timer = setTimeout(() => {
            setTerm(debouncedTerm);
            if (debouncedTerm === '' && searchTypeList) {
                setSelectedItems(searchTypeList)
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [debouncedTerm])

    // submit a new search
    useEffect(() => {
        if (term !== '' && term) {
            onSearchSubmit(term.trim());
        }
        else {
            clearResults();
        }
    }, [term, keyAccess, getEntity]);

    const orderChange = (order) => {
        setSortType((sortType) => { return { ...sortType, order: order } })
    }


    return (
        <div className="mainContainerNav">
            <section className="sort-section">
                <small className="searchSortText">{t('Label_Sort')}</small>
                <Select size="small"
                    defaultValue={sortType.type} onChange={(e) => setSortType((sortType) => { return { ...sortType, type: e } })}>
                    <Option value="name">{t('Label_Alphabetically')}</Option>
                    <Option value="modifiedDate">{t('Label_ModifiedDate')}</Option>
                </Select>


                {sortType.order === 'desc' ?
                    <div className="up-arrow" onClick={() => orderChange('asc')}>
                        &#9650;
                    </div>
                    :
                    <div className="down-arrow" onClick={() => orderChange('desc')}>
                        &#9660;
                    </div>
                }
            </section>

            <section className="search-section">
                <small className="searchSortText">{t('Label_Search')}</small>
                <div>
                    <Select className="searchBar-filter" size="small"
                        placeholder={`${t('Label_SearchBy')}`}
                        mode="multiple"
                        onChange={setSelectedItems}
                        showArrow="true"
                        maxTagCount={0}
                        maxTagPlaceholder={searchTypeList && searchTypeList.length === selectedItems.length ? `${t('Label_All')}` : `${selectedItems.length} ${t('Label_Check')}`}
                        defaultValue={selectedItems}
                        disabled={!term && searchTypeList}
                        dropdownStyle={{
                            minWidth: '20rem'
                        }}
                    >
                        {
                            searchTypeList && searchTypeList.map(
                                (item) =>
                                    <Option key={item} value={item} className="searchTypeList-opt"> <Tooltip placement="top" title={item}>{item} </Tooltip></Option>
                            )}
                    </Select>
                    <Search className="searchBar-search" size="small" clearresults="true"
                        placeholder={`${t('Label_Search')}`}
                        title={debouncedTerm}
                        onChange={e => setDebouncedTerm(e.target.value)}
                        value={debouncedTerm} allowClear />
                </div>
            </section>
        </div>
    )
}
export default SearchBar;