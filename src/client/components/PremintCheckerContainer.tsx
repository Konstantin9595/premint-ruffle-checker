import { useState, SyntheticEvent, useEffect } from 'react'
import styled from 'styled-components'
import ErrorComponent from './ErrorComponent'
import SwitchMode from './SwitchMode'
import PremintUrlForm from './PremintUrlForm'
import { Mode } from '../types'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CheckIcon from '@mui/icons-material/Check'
import {checkValidUrl, checkResultByAddress, sleep} from '../helpers'
import LoopIcon from '@mui/icons-material/Loop'

const SwitchModeButtons = styled.div`
`
const SwitchModeButton = styled.button`
    width: 200px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 1px 1px 5px 4px rgb(183 183 183 / 50%);
    border: 1px solid rgba(183,183,183,1);
    padding: 5px;
    margin: 10px;
`
const StyledEditIcon = styled(EditIcon)`
    font-size: 22px;
    vertical-align: bottom;
`
const StyledSaveIcon = styled(SaveIcon)`
    font-size: 22px;
    vertical-align: bottom;
`
const StyledCheckIcon = styled(CheckIcon)`
    font-size: 22px;
    vertical-align: bottom;
`
const StyledLoopIcon = styled(LoopIcon)`
    font-size: 16px;
    margin-left: 5px;
    vertical-align: text-bottom;
    animation: lds-dual-ring 1.2s linear infinite;

    @keyframes lds-dual-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
`
const ContentTopWrapper = styled.div``
const ContentBottomWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const isUrl = (string: string): boolean => {
    try {
        new URL(string)
        return true
    } catch {
        return false
    }
}

const isPremintUrl = ({origin}: URL): boolean => {
    const correctHostFormatList = [
        'https://www.premint.xyz'
    ]

    return correctHostFormatList.includes(origin)
}

const hasPathname = ({pathname}:URL): boolean => {
    return pathname.length > 1
}

const PremintCheckerContainer = () => {
    const [formErrors, setFormError] = useState<string[]>([])
    const [textareaErrors, setTextareaError] = useState<string[]>([])

    const [textareaValues, setTextareaValue] = useState<string[]>([])
    const [walletAddresses, setWallets] = useState(() => getStorage())
    const [mode, setMode] = useState<Mode>(Mode.VIEW)
    const [formInputUrl, setFormInputUrl] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [results, setResult] = useState<string[]>([])

    useEffect(() => {
        setResult([])
    }, [formInputUrl, mode])

    function getStorage () {
        const walletAddresses = JSON.parse(localStorage.getItem('walletAddresses') as string) ?? []
        const isWallets = walletAddresses ? true : false

        if(!isWallets) {
            setTextareaError(['Add premint url and list of addresses for check'])
        }

        setTextareaValue(walletAddresses)

        return walletAddresses
    }

    const isValidTextareaField = (addresses: string[]): boolean => {
        if(!addresses.length) {
            return false
        }
        const unvalidAddresses = addresses.filter(el => el.length !== 42)
        return unvalidAddresses.length > 0 ? false : true
    }

    const textareaTypingHandle = (e: SyntheticEvent) => {
        const values = (e.target as HTMLFormElement).value
        const splitedValues: string[] = values.split('\n').filter((el: string) => el !== '')

        if(!isValidTextareaField(splitedValues)) {
            setTextareaError(['Each address must be on a new line and have 42 characters length.'])
            return
        }
        setTextareaError([])
        setTextareaValue(splitedValues)
    }

    const save = () => {
        if(!isValidTextareaField(textareaValues)) {
            setTextareaError(['Each address must be on a new line and have 42 characters length.'])
            return
        }

        setTextareaError([])
        localStorage.setItem('walletAddresses', JSON.stringify(textareaValues))
        setWallets(textareaValues)
        setMode(Mode.VIEW)
    }

    const edit = () => {
        setMode(Mode.EDIT)
    }

    async function premintCheck () {
        try {
            setLoading(true)
            setResult([])
            const {responseStatus} = await checkValidUrl(formInputUrl)

            if(responseStatus !== 200) {
                setFormError(['this address does not exist'])
                setLoading(false)
                return
            }
            
            await sleep(2000)

            for (let wallet of walletAddresses) {
                
                const {message, responseStatus} = await checkResultByAddress(formInputUrl, wallet)
                console.log("message: ", message, "responseStatus: ", responseStatus, "formInputUrl: ", formInputUrl)
                setResult((prevState) => [...prevState, message])
                await sleep(2000)
            }

            setLoading(false)
        } catch {
            setFormError(['An error occurred while check the url. Try later.'])
            return
        }

    }

    const validateFormField = (inputData: string): boolean => {
        setFormInputUrl(inputData)
        if(!isUrl(inputData)) {
            setFormError(['input format is not a link. Correct format is: https://www.premint.xyz/{ruffle-name}'])
            return false
        } else {
            if(!isPremintUrl(new URL(inputData))) {
                setFormError(['Incorrect hostname. The hostname should be in the format: https://www.premint.xyz'])
                return false
            }
    
            if(!hasPathname(new URL(inputData))) {
                setFormError(['Empty pathname. The link should be in the format https://www.premint.xyz/{ruffle-name}'])
                return false
            }
        }
        setFormError([])
        return true
    }

    return (
        <>
            <ContentTopWrapper>
                <PremintUrlForm validateFormField={validateFormField} isValid={(!formErrors.length && !textareaErrors.length) && formInputUrl !== ''}/>
                <SwitchMode statusListResults={results} walletAddresses={walletAddresses} mode={mode} textareaTypingHandle={textareaTypingHandle}  />
            </ContentTopWrapper>
            <ContentBottomWrapper>
                <SwitchModeButtons>
                    { mode === Mode.VIEW ? 
                    <>
                        <SwitchModeButton 
                        disabled={mode === Mode.VIEW ? false : true } 
                        onClick={() => edit()}
                        >
                            <StyledEditIcon /> Edit
                        </SwitchModeButton>
                        <SwitchModeButton 
                        disabled={mode === Mode.VIEW && (!formErrors.length && !textareaErrors.length) && formInputUrl ? false : true } 
                        onClick={() => premintCheck()}
                        >
                            <StyledCheckIcon /> Premint Check
                        </SwitchModeButton>
                        {isLoading ? <StyledLoopIcon /> : null}
                    </>
                    :
                    <SwitchModeButton 
                    disabled={mode === Mode.EDIT && (!formErrors.length && !textareaErrors.length) ? false : true } 
                    onClick={() => save()}
                    >
                    <StyledSaveIcon /> Save
                    </SwitchModeButton>
                    }
                </SwitchModeButtons>
                <ErrorComponent errors={[...formErrors, ...textareaErrors]}/>
            </ContentBottomWrapper>
        </>
    )
}



export default PremintCheckerContainer