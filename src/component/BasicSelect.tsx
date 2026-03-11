import Select from 'react-select';

const getId = (opt) => opt && (opt.id ?? String(opt.value));

const BasicSelect = (props: {
  options: any;
  id: any;
  defaultSelect?: number;
  isOptionDisabled?: ((opt) => boolean) | undefined;
  onChange?: ((value: any, action: any) => void) | undefined;
  placeholder?: string;
}) => {
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
        return getId(option) === getId(selected);
      }}
      onChange={onChange}
      isOptionDisabled={isOptionDisabled}
      menuPlacement={'auto'}
      placeholder={placeholder}
    />
  );
};

export default BasicSelect;
