import React from 'react'
import { RuffleStatusByAddressProps, } from '../types'
//import { RuffleStatuses} from '../../server/types'

import styled from 'styled-components'

const AllowList = styled.div`
    color: green;
`
const PublicMint = styled.div`
    color: orange;
`
const Unregistred = styled.div`
    color: red;
`
const Pending = styled.div`
    color: gray;
`
const Unselected = styled.div`
    color: red;
`

// export enum RuffleStatuses {
//     ALLOWLIST_MINT = 'ALLOWLIST_MINT',
//     PUBLIC_MINT = 'PUBLIC_MINT',
//     UNREGISTRED = "UNREGISTRED",
//     PENDING = 'PENDING',
//     UNSELECTED = 'UNSELECTED',
// }

const RuffleStatusByAddress = ({ruffleStatus, message}: RuffleStatusByAddressProps) => {
    // const render = (ruffleStatus: RuffleStatuses) => {
    //     switch(ruffleStatus) {
    //         case '':

    //     }
    // }
    return (
        <>
            <div> Ruffle status: {ruffleStatus} </div>
            <div> message: {message} </div>

        </>
    )

}

export default RuffleStatusByAddress