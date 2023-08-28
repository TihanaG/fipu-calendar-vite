import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

export const RadioButton = ({ value, checked, color, onChange }) => {
    const handleClick = () => {
        if (!checked) {
            onChange(value);
        }
    };

    return (
        <div style={{ color }} onClick={handleClick}>
            {checked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
        </div>
    );
};
