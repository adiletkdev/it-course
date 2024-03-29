import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Htag, Button, P, Tag, Rating, Input, Textarea } from '../components/';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Text</Htag>
      <Button appearance="primary" arrow="down">Button</Button>
      <Button appearance="ghost" arrow="down">Button</Button>
      <P size='s' className='par'>Small</P>
      <P size='m'>Medium</P>
      <P size='l'>Large</P>
      <P>Medium</P>
      <Tag size="m" color="green">green</Tag>
      <Tag size="s" color="primary">primary</Tag>
      <Tag size="m" color="red">red</Tag>
      <Tag size="m" color="gray">gray</Tag>
      <Tag>Ghost</Tag>
      <Rating rating={rating}></Rating>
      <Rating rating={rating} isEditable setRating={setRating}></Rating>
      <Input placeholder='test' />
      <Textarea placeholder='test area' />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number
}