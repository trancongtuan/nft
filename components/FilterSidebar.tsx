import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input } from 'theme-ui'

const FilterSidebar = ({ selectedTab, setSelectedTab }) => {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(null);
  const [filter, setFilter] = useState([]);

  const _setOpen = (type: string) => {
    setOpen(ori => ori === type ? null : type);
  }

  const _setFilter = (type: string) => {
    setFilter(ori => {
      const oriCopy = [...ori];
      if (oriCopy.includes(type)) {
        oriCopy.splice(oriCopy.indexOf(type), 1);
      } else {
        oriCopy.push(type);
      }
      return oriCopy;
    })
  }

  return (
    <div className="border-r border-gray-500" style={{ width: '100%' }}>
      <div className="p-4 font-bold text-xl">
        {t('filter_sidebar.filter')}
      </div>

      <div className="p-4 font-bold cursor-pointer" onClick={() => _setOpen('type')}>
        {t('filter_sidebar.type')}
      </div>
      <div className="transition-all px-4 font-bold cursor-pointer overflow-hidden" style={{ height: open === 'type' ? 120 : 0 }}>
        {
          ['asset', 'user', 'collection'].map(item => (
            <Button
              onClick={() => setSelectedTab(item)}
              variant={item === selectedTab ? 'primary' : 'secondary'}
              sx={{
                fontSize: 1,
                height: 30,
                marginBottom: 2,
              }}
            >{t(`filter_sidebar.${item}`)}</Button>
          ))
        }
      </div>

      <div className="p-4 font-bold cursor-pointer" onClick={() => _setOpen('status')}>
        {t('filter_sidebar.status')}
      </div>
      <div className="transition-all px-4 font-bold cursor-pointer overflow-hidden" style={{ height: open === 'status' ? 80 : 0 }}>
        {
          ['buy_now', 'new'].map(item => (
            <Button
              onClick={() => _setFilter(item)}
              variant={filter.includes(item) ? 'primary' : 'secondary'}
              sx={{
                fontSize: 1,
                height: 30,
                marginBottom: 2,
              }}
            >{t(`filter_sidebar.${item}`)}</Button>
          ))
        }
      </div>

      <div className="p-4 font-bold cursor-pointer" onClick={() => _setOpen('price')}>
        {t('filter_sidebar.price')}
      </div>
      <div className="transition-all px-4 font-bold cursor-pointer flex flex-row overflow-hidden" style={{ height: open === 'price' ? 30 : 0 }}>
        <Input p={0} mr={2} placeholder="min." />
        to
        <Input p={0} ml={2} placeholder="max." />
      </div>

      <div className="p-4 font-bold cursor-pointer" onClick={() => _setOpen('categories')}>
        {t('filter_sidebar.categories')}
      </div>
      <div className={`transition-all px-4 font-bold cursor-pointer overflow-hidden`} style={{ height: open === 'categories' ? 300 : 0 }}>
        {
          [
            'Music',
            'Domains',
            'Metaverses',
            'DeFi',
            'Photography',
            'Games',
            'Memes',
          ].map(item => (
            <Button
              onClick={() => _setFilter(item)}
              variant={filter.includes(item) ? 'primary' : 'secondary'}
              sx={{
                fontSize: 1,
                height: 30,
                marginBottom: 2,
              }}
            >{t(`filter_sidebar.${item}`)}</Button>
          ))
        }
      </div>
    </div>
  )
}

export default FilterSidebar;