import './form-input.styles.scss';

const FormInput = ({ label, ...inputProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...inputProps} />
      {label && (
        <label
          className={`form-input-label ${inputProps.value.length ? 'shrink' : ''}`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
