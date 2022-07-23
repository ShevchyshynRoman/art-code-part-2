import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectOption } from '../../types/selectOption';

type Props = {
  selectList: selectOption[];
  prefix: string;
};

export const Select: React.FC<Props> = ({ selectList, prefix }) => {
  const [selectValue, setSelectValue] = useState('');
  const [pathname, setPathname] = useState('');
  const location = useLocation();

  const navigate = useNavigate();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectValue) {
      navigate(
        pathname.replace(`${prefix}-${selectValue}`, `${prefix}-${e.target.value}`),
      );
    } else if (pathname !== '/') {
      navigate(`${pathname}/${prefix}-${e.target.value}`,
        { replace: true });
    } else {
      navigate(`/${prefix}-${e.target.value}`);
    }

    setSelectValue(e.target.value);
  };

  useEffect(() => {
    const [query] = pathname
      .split('/')
      .filter((el) => !!el.length && el.split('-')[0] === prefix);

    if (query) {
      setSelectValue(query.replace(`${prefix}-`, ''));
    }
  }, [pathname]);

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  return (
    <select name="select" value={selectValue} onChange={selectHandler}>
      <option value="" disabled>
        Please select value
      </option>
      {selectList.map((el) => (
        <option key={el.id} value={el.slug}>
          {el.label}
        </option>
      ))}
    </select>
  );
};
