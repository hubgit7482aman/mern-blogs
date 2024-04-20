// we will click on tags or search anything if we will not have anything related to that that search or that tag then we will display this thing
const NoDataMessage = ({ message }) => {
    return (
        <div className="text-center w-full p-4 rounded-full bg-grey/50 mt-4">
            <p>{ message }</p>
        </div>
    )
}

export default NoDataMessage;