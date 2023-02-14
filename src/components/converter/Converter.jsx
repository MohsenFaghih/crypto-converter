import React, {useEffect, useReducer, useMemo, useCallback} from 'react';
import {RootConverter} from './styled.converter';
import ExIcon from '../../assets/icon/reload.png'
import getSatoshiPrice from '../../utils/getSatoshiPrice';
import { getCurrencyName } from '../../utils/getCurrencyName';
import DropDown from '../dropdown/DropDown';

const Converter = ({currencies, dcp, refresh}) => { 

    const fxData = useMemo(() => Object.keys(currencies).map(fx => ({label: currencies[fx].symbol, value: currencies[fx].last})), [currencies])
    const price = Number(Object.values(dcp)[0])
    const date = new Date(Number(Object.keys(dcp)[0]));
    const timeToShow = date.toDateString() + '  ' + date.toLocaleTimeString();
    const formatter = new Intl.NumberFormat();

    const reducer = (state, action) => {
        switch(action.type){
            case 'CHANGE_COUNT': return {...state, count: action.payload};
            case 'DROPDOWN_VALUE': return {...state, dropdownValue: action.payload};
            case 'CONVERTED_SYMBOL_PRICE': return {...state, convertedSymbolPrice: action.payload};
            default: return {...state}
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        count: 1, 
        dropdownValue: fxData.filter(fx => fx.label === 'USD')[0],
        convertedSymbolPrice: null,
    })
    
    const countHandler = useCallback((e) => {if(e.target.value >= 1) dispatch({type: 'CHANGE_COUNT', payload: e.target.value})}, [])
    const dropdownHandler = useCallback((value) => dispatch({type: 'DROPDOWN_VALUE', payload: value}), [])

    useEffect(()=>{
        const satoshiPrice = getSatoshiPrice(state.dropdownValue.value);
        dispatch({type: 'CONVERTED_SYMBOL_PRICE', payload: state.count * satoshiPrice * price})
    }, [state.count, state.dropdownValue, price])

    const defaultValue = useMemo(()=>state.dropdownValue.value, [state.dropdownValue])

    return (
        <RootConverter>
            <div className='dropdowns'>
                <div className='countDiv'>
                    <input type='number' className='number' value={state.count} onChange={e => countHandler(e)} />
                    <span>DCP</span> 
                </div>
                <img src={ExIcon} alt="Exchange-icon" />
                {state.dropdownValue.value
                    ? <DropDown fxData={fxData} dropdownHandler={dropdownHandler} defaultValue={defaultValue} />
                    : null
                }
            </div>

            {state.convertedSymbolPrice ? 
                <div className='showPrice'>
                    <div><span>{state.count}</span> DCP crypto currency</div> = 
                    <div>
                        <span>{formatter.format(state.convertedSymbolPrice.toFixed(4))}</span>&nbsp;
                        {getCurrencyName(state.dropdownValue.label)} ({state.dropdownValue.label})
                    </div>
                </div> : 
            null}

            <div className='time'>{timeToShow}</div>

            <div className='buttons'>
                <button onClick={() => refresh({refresh: true})}>Refresh Price</button>
            </div>

            <div className='priceNow'>Each DCP is equal to <span>{(price / 100000000).toFixed(6)}</span> BTC</div>
        </RootConverter>
    )
}

export default Converter