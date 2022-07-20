import React, { useEffect, useState } from 'react';
import { selectOption } from '../types/selectOption';

type Props = {
  selectList: selectOption[],
  name: string,
  pathname: string,
};

export const Select: React.FC<Props> = ({
  selectList,
  name,
  pathname,
}) => {
  const [selectValue, setSelectValue] = useState('');

  // eslint-disable-next-line no-console
  console.log(pathname);

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectValue) {
      window.history.pushState({}, '', pathname.replace(`${name}-${selectValue}`, `${name}-${e.target.value}`));
    } else {
      const newUrl = pathname.replace(pathname, `${pathname.length > 1 ? `${pathname}/` : ''}${name}-${e.target.value}`);

      window.history.pushState({}, '', newUrl);
    }

    setSelectValue(e.target.value);
  };

  useEffect(() => {
    const query = pathname
      .split('/')
      .filter(el => !!el.length && el.split('-')[0] === name)[0];

    if (query) {
      setSelectValue(query.split('-')[1]);
    }
  }, []);

  return (
    <select
      name="select"
      value={selectValue}
      onChange={selectHandler}
    >
      {selectList.map(el => (
        <option key={el.id} value={el.slug}>{el.label}</option>
      ))}
    </select>
  );
};
