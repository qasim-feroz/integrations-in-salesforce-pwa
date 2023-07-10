import {googleCallback} from "pwa-custom-core/src/integrations/idps"
import useCustomer from "../../commerce-api/hooks/useCustomer"
import useNavigation from "../../../app/hooks/use-navigation"
import {createGetTokenBody} from "../../../app/commerce-api/utils"

/**
 * SSO callback component for Google authentication.
 *
 * @returns {JSX.Element} - The JSX element representing the SSO callback component.
 */
const SSOCallback = () => {
    return googleCallback({ useCustomer, useNavigation, createGetTokenBody });
};
export default SSOCallback;
