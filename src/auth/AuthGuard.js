import { Authenticator } from '@aws-amplify/ui-react';
import { AuthData } from '../App';

const AuthGuard = ({ children }) =>{

    const {currUser} = AuthData();

    return <>
    {
    currUser.isAuthenticated ? <>{children}</> :
     <Authenticator socialProviders={['google', 'facebook']} initialState='signIn' variation="modal" 
        components={{
        SignUp: {
            FormFields() {
            return (
                <>
                <Authenticator.SignUp.FormFields />
                <div><label>Name</label></div>
                <input
                    type="text"
                    name="name"
                    placeholder="Please enter your name"
                />
                </>
            );
            },
        },
        }}
        services={{
        async validateCustomSignUp(formData) {
            if (!formData.name) {
            return {
                name: 'Name is required',
            };
            }
        },
        }}
        >
        {
            () => (
                <>{children}</>
            )
        }  
    </Authenticator>
 
    }
</>
}

export default AuthGuard;