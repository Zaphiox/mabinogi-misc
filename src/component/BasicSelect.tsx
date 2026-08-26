import React from 'react';
import Select, { type ActionMeta, type SingleValue } from 'react-select';

type Option = { value: unknown; label: string; id?: string | number };

const getId = (opt?: Option | null) => opt && (opt.id ?? String(opt.value));

interface BasicSelectProps {
  options: Option[];
  id: string;
  defaultSelect?: number;
  isOptionDisabled?: (opt: Option) => boolean;
  onChange?: (value: SingleValue<Option>, action: ActionMeta<Option>) => void;
  placeholder?: string;
}

const BasicSelect: React.FC<BasicSelectProps> = (props) => {
  const {
    options,
    id,
    defaultSelect = 0,
    isOptionDisabled = () => false,
    onChange = () => {},
    placeholder = 'Select...',
  } = props;
  return (
    <Select
      id={id}
      name={id}
      options={options}
      defaultValue={options[defaultSelect]}
      className="select-container"
      classNamePrefix="cal-react-select"
      noOptionsMessage={() => '沒有選項'}
      getOptionLabel={(opt) => opt.label}
      isOptionSelected={(option, selected) => {
        if (!selected) return false;
        return getId(option as Option) === getId(selected as unknown as Option);
      }}
      onChange={onChange}
      isOptionDisabled={isOptionDisabled}
      menuPlacement={'auto'}
      placeholder={placeholder}
    />
  );
};

export default BasicSelect;
