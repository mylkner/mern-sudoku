const GridCell = (props) => {
    return (
        <input
            type="number"
            value={props.value}
            className={`${props.bg} border ${props.border} text-2xl text-center w-[11.1111111%] focus:outline-none caret-transparent cursor-pointer h-[50px]`}
            onClick={props.onClick}
            onChange={props.onChange}
            disabled={props.disabled}
        />
    );
};

export default GridCell;
