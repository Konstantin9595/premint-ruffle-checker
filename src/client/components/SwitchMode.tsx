import { FC } from 'react'
import styled from 'styled-components'

import { SwitchModeProps, Mode, EditModeProps, ViewModeProps } from '../types'

const ViewModeList = styled.ul`
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183, 183, 183, 1);
    padding: 10px;
    text-align: center;
    height: 350px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex-basis: 40%;x
`
const ViewModeListItem = styled.li`
    list-style: none;
    border-bottom: 1px solid #ccc;
    color: #ccc;
    padding: 2px;
    width: fit-content;
    margin: 0 auto;
`
const EmptyListItem = styled.li`
    list-style: none;
    color: #ccc;
    margin: auto;
`
const Textarea = styled.textarea`
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183, 183, 183, 1);
    padding: 10px;
    width: 400px;
    margin: 0 auto;
    text-align: center;
    height: 500px;
    overflow: auto;
    resize: none;
    margin-block-end: 1em;
`
const StatusList = styled.ul`
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183, 183, 183, 1);
    padding: 10px;
    text-align: center;
    height: 350px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    flex-basis: 20%;
    margin-left: 15px;
`
const StatusItem = styled.li`
    color: #ccc;
    border-bottom: 1px solid #ccc;
    list-style: none;
    padding: 2px;
    margin: 0;
`
const ViewModeContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
`
const indextoNum = (ndx: number): string => {
    return `${++ndx}.`
}

const ViewMode: FC<ViewModeProps> = ({walletAddresses, statusListResults}) => {
    return (
        <ViewModeContainer>
            <ViewModeList>
                { walletAddresses.length ? walletAddresses.map((address: string, ndx: number) => {
                    return (
                        <ViewModeListItem key={ndx}>{address}</ViewModeListItem>
                    )
                }) : <EmptyListItem key={1}>Press the edit button and paste a list of metamask addresses (Each address on a new line)</EmptyListItem>}
            </ViewModeList>
            <StatusList>
                {statusListResults.map((message, ndx) => (
                <StatusItem key={ ndx }>
                    {indextoNum(ndx)} {message}
                </StatusItem>))}
            </StatusList>
        </ViewModeContainer>
    )
}

const EditMode: FC<EditModeProps> = ({walletAddresses, textareaTypingHandle}) => {
    const addressString = walletAddresses.join('\n')

    return (
        <>
            <Textarea onChange={(e) => textareaTypingHandle(e)} defaultValue={addressString}/>
        </>
    )
}

const SwitchMode = ({statusListResults, walletAddresses, mode, textareaTypingHandle}: SwitchModeProps) => {

    return (
        <>
            {mode === Mode.VIEW ? <>{<ViewMode statusListResults={statusListResults} walletAddresses={walletAddresses}/>}</> : <>{<EditMode walletAddresses={walletAddresses} textareaTypingHandle={textareaTypingHandle} />}</>}
        </>
    )
}

export default SwitchMode