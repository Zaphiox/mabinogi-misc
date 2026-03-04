import { FormControlLabel, Radio, Switch } from '@mui/material';

interface BaseProps {
  id?: string;
  label: string;
  defaultChecked?: boolean;
  value?: string;
}

type SwitchProps = BaseProps & { controlMethod: 'switch'; id: string };

type RadioProps = BaseProps & { controlMethod: 'radio'; value: string };

type ControlProps = SwitchProps | RadioProps;

const BasicControl = (props: ControlProps) => {
  const { id, label, defaultChecked = false, value, controlMethod } = props;
  return (
    <FormControlLabel
      control={
        controlMethod === 'switch' ? (
          <Switch id={id} name={id} defaultChecked={defaultChecked} />
        ) : controlMethod === 'radio' ? (
          <Radio id={id} name={id} value={value} />
        ) : (
          <></>
        )
      }
      label={label}
    />
  );
};

export default BasicControl;
