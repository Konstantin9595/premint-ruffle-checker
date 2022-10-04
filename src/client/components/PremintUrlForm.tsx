import React, { FC, SyntheticEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import useDebounce from '../hooks/useDebounce'
import { PremintUrlFormProps } from '../types'
import ErrorComponent from './ErrorComponent'

const Form = styled.form`
    display: flex;
    flex-direction: row;
`
const Input = styled.input`
    flex-basis: 40%;
    display: inline-block;
    margin: 0 auto;

    ::placeholder {
        color: rgba(150, 140, 140, 0.44);
    }

    &.valid {
        box-shadow: 1px 1px 5px 4px rgb(63 165 50 / 20%);
        border: 1px solid rgba(63, 165, 50, 0.2);
    }
    &.invalid {
        box-shadow: 1px 1px 5px 4px rgb(255 0 0 / 20%);
        border: 1px solid rgba(255, 0, 0, 0.2);
    }
    
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
        'https://premint.xyz',
        'https://www.premint.xyz'
    ]

    return correctHostFormatList.includes(origin)
}

const hasPathname = ({pathname}:URL): boolean => {
    return pathname.length > 1
}



const PremintUrlForm: FC<PremintUrlFormProps> = ({checkValidUrlForm}) => {
    const [textFieldErrors, setTextFieldError] = useState<string[]>([])
    const debounceCheckUrl = useDebounce(checkValidUrl, 1500)

    // const isValidInputFormat = (): boolean => {
    //     if(textFieldErrors.length > 0) {
    //         return false
    //     }

    //     return textFieldErrors.length > 0 ? false : true
    // }

    // useEffect(() => {
    //     console.log('useEffectErrors: ', textFieldErrors)

    //     const debounceId = setTimeout(function(){
    //         console.log('I am a debounce')
    //     }, 2000)

    //     return () => clearTimeout(debounceId)
    //     //console.log('isValidInputFormat', isValidInputFormat())
    //     //checkUrlFormat(new URL(window.location.href))
    // }, [textFieldErrors])

    const isValidateInputField = (inputData: string): boolean => {
        if(!isUrl(inputData)) {
            setTextFieldError(['input format is not a link. Correct format is: https://premint.xyz/{ruffle-name}'])
            return false
        } else {
            if(!isPremintUrl(new URL(inputData))) {
                setTextFieldError(['Incorrect hostname. The hostname should be in the format https://premint.xyz or https://www.premint.xyz'])
                return false
            }
    
            if(!hasPathname(new URL(inputData))) {
                setTextFieldError(['Empty pathname. The link should be in the format https://premint.xyz/{ruffle-name}'])
                return false
            }
        }

        setTextFieldError([])
        return true
    }

    const onChange = (event: SyntheticEvent) => {
        const inputData = (event.target as HTMLFormElement).value
        const isValid = isValidateInputField(inputData)
        if(isValid) {
            debounceCheckUrl(inputData)
        }
    }

    function checkValidUrl(inputUrl: string) {
        fetch(`${process.env.REACT_APP_API_URL}/check-url`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ruffleUrl: inputUrl})
        })
        .then((resp: any) => resp.json())
        .then((jsonData: any) => {
            console.log('jsonDataResponse: ', jsonData)
            const {responseStatus} = jsonData
            if(responseStatus === 400) {
                return setTextFieldError(['No such premint url.'])
            }
            if(responseStatus === 404) {
                return setTextFieldError(['An error occurred while validating the url. Try a little later.'])
            }
            if(responseStatus === 500) {
                return setTextFieldError(['A server error has occurred. Try a little later.'])
            }

            setTextFieldError([])
        })
        .catch((err: any) => {
            return setTextFieldError(['An error occurred while validating the url. Try a little later.'])
        })
    }

    return (
        <>
        <Form onChange={onChange}>
            <Input 
            type='text' 
            className={textFieldErrors.length === 0 ? 'valid' : 'invalid'} 
            placeholder='paste premint ruffle url'
            />
        </Form>
        <ErrorComponent errors={textFieldErrors}/>
        </>
    )
}

export default PremintUrlForm