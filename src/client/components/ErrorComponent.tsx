import React, { useState, useEffect, SyntheticEvent } from 'react'
import styled from 'styled-components'
import {Error}  from '../types'

const ErrorsBlock = styled.div`
    color: red;
    width: 400px;
    margin: 5px auto;
`

const ErrorItem = styled.div`
`

const ErrorComponent = ({errors}: Error) => {
    return (
        <>
            <ErrorsBlock>
                {errors.map((error, ndx) => <ErrorItem key={ndx}> {error} </ErrorItem>)}
            </ErrorsBlock>
        </>
    )
}

export default ErrorComponent