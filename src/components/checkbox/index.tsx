import ReactSwitch from "react-switch";

interface ICheckboxProps {
  name?: string;
  label?: string;
  checked: boolean;
  disbabled?: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = (props: ICheckboxProps) => {
  const { name, label, checked, disbabled, onChange } = props;

  return (
    <div className={`flex w-fit items-center cursor-pointer gap-x-3`}>
      <ReactSwitch disabled={disbabled} onChange={onChange} checked={checked} />
      <label
        htmlFor={name}
        className="cursor-pointer text-white select-none text-sm font-medium peer-disabled:text-grey-disabled"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
