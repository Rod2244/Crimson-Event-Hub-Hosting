const Button = ({ label, children, onClick, className="", disabled }) => {
    return (
        <button
            onClick={onClick}
            className={className}
            disabled={disabled}
        >
            {label}
            {children}
        </button>
    );
}
export default Button;