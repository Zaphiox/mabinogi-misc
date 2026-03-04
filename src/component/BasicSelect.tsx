import Select from 'react-select';

const getId = (opt) => opt && (opt.id ?? String(opt.value));

const BasicSelect = (props: {
  options: any;
  id: any;
  defaultSelect?: number;
  isOptionDisabled?: ((opt) => boolean) | undefined;
  onChange?: ((opt) => void) | undefined;
}) => {
  const { options, id, defaultSelect = 0, isOptionDisabled = () => false, onChange = () => {} } = props;
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
    />
  );
};

export default BasicSelect;
