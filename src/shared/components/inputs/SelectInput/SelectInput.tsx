import { FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import styles from './SelectInput.module.scss';

export interface SelectInputOption {
  label: string;
  value: string | number;
}

export interface SelectInputProps {
  label: string;
  options: SelectInputOption[];
  value: string | number;
  onChange: (value: string | number) => void; // handler recibe valor, no evento
  id?: string;
}

export function SelectInput({
  label,
  options,
  value,
  onChange,
  id = label,
}: SelectInputProps) {
  // Cambiamos la firma a SelectChangeEvent<string|number>
  const handleChange = (e: SelectChangeEvent<string | number>) => {
    onChange(e.target.value as string | number);
  };

  return (
    <div className='mt-[16px] mb-[8px]'>
      <FormControl className={styles.formControl} variant="outlined" size="medium" fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          label={label}
          value={value}
          onChange={handleChange}      // coincide ahora con SelectProps
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}