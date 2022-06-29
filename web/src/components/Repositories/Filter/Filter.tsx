import { useState } from 'react';
import { Button } from 'reactstrap';

import './Filter.css';

interface FilterProps {
  languages: string[];
  onClick(language: string | undefined): void;
}

export function Filter(props: FilterProps) {
  const { languages, onClick } = props;
  const [isSelected, setIsSelected] = useState(false);

  const onLanguageSelected = (language: string | undefined) => {
    setIsSelected(true);
    onClick(language);
  };

  const onClearClicked = () => {
    setIsSelected(false);
    onClick(undefined);
  };

  return (
    <>
      <span>Filter repositories by Language: </span>
      {languages.map((language) => (
        <Button
          color="primary"
          key={language}
          className="languageButton"
          onClick={() => onLanguageSelected(language)}
        >
          {language}
        </Button>
      ))}
      <Button disabled={!isSelected} onClick={onClearClicked}>
        Clear
      </Button>
    </>
  );
}
