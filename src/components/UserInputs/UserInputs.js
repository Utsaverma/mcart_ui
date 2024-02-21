import { ADDRESS_KEY_MAPPING } from "../../helper/utility";

export const AddressUserInputs = ({ field, required, handleChange, useExistingAddress, existingAddresses, address, error }) => {

    return (
        <>
            {
                required ? <>
                    <label className="newAdressLabel" htmlFor={field}>{ADDRESS_KEY_MAPPING[field]?.value}<span className='requiredFeild'>*</span></label>
                    <input className="newAddressInput" type="text" id={field} name={field} value={useExistingAddress ? existingAddresses[useExistingAddress][field] : address[field]} onChange={handleChange} required />
                    {error[field] && <div className="errorMessage">{error[field]}</div>}
                </>
                    : <>
                        <label className="newAdressLabel" htmlFor={field}>{ADDRESS_KEY_MAPPING[field]?.value}</label>
                        <input className="newAddressInput" type="text" id={field} name={field} value={useExistingAddress ? existingAddresses[useExistingAddress][field] : address[field]} onChange={handleChange} />
                    </>
            }
        </>
    )

}
