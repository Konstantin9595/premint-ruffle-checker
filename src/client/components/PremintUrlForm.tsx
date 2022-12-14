import React, { FC, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { PremintUrlFormProps } from '../types'

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

const PremintUrlForm: FC<PremintUrlFormProps> = ({validateFormField, isValid}) => {

    const onChange = (event: SyntheticEvent) => {
        const inputData = (event.target as HTMLFormElement).value
        validateFormField(inputData)
    }

    return (
        <>
        <Form onChange={onChange}>
            <Input 
            type='text' 
            className={isValid ? 'valid' : 'invalid'} 
            placeholder='paste premint ruffle url'
            />
        </Form>
        </>
    )
}

export default PremintUrlForm