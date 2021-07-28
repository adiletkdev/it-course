import React, { useEffect, useReducer } from 'react';
import { Advantages, HhData, Htag, Product, Sort, Tag, } from '../../components';
import { TopPageComponentProps } from './TopPageComponent.props';
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from '../../interfaces/page.interface';
import parse from 'html-react-parser';
import { SortEnum } from '../../components/Sort/Sort.props';
import { SortReducer } from './sort.reducer';

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(SortReducer, { products, sort: SortEnum.Rating });

  const setSort = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  useEffect(() => {
    dispathSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && <Tag color='gray' size='m'>{products.length}</Tag>}
        <Sort sort={sort} setSort={setSort} />
      </div >
      <div>
        {sortedProducts && sortedProducts.map(p => (<Product layout key={p._id} product={p} />))}
      </div>
      <div>
        <div className={styles.hhTitle}>
          <Htag tag='h2'>Вакансии - {page.category}</Htag>
          <Tag color='red' size='m'>hh.ru</Tag>
        </div >
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
      {page.advantages && page.advantages.length > 0 &&
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      }
      {page.seoText && <p>{parse(page.seoText)}</p>}
      <Htag tag='h2'>Получаемые навыки</Htag>
      {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
    </div >
  );
};