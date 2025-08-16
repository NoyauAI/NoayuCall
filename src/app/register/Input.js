

export const Input = ({name, type, placeholder, onChange, value}) => {
    return (
        <>    
            <input 
            name={name}
            onChange={onChange}
            value={value}
            className=" w-full bg-blue-100/80 text-blue-700 dark:bg-blue-500/30 dark:text-blue-400 font-semibold py-2 px-3 rounded-md mb-2   text-sm mt-1 shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 " type={type} placeholder={placeholder}></input>
        </>
    )
}