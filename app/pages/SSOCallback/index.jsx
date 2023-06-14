//******  Core: Google SSO - Start
//page for the callback google
import {googleCallback} from 'Core/src/integrations/idps'
import useCustomer from 'App/commerce-api/hooks/useCustomer'
import useNavigation from 'App/hooks/use-navigation'
import {createGetTokenBody} from 'App/commerce-api/utils'
/**
 * SSO callback component for Google authentication.
 *
 * @returns {JSX.Element} - The JSX element representing the SSO callback component.
 */
const SSOCallback = () => {
    return googleCallback({useCustomer, useNavigation, createGetTokenBody})
}
export default SSOCallback
//******  Core: Google SSO - End
