import React, {useEffect, useState} from 'react';
import {RootConverter} from './styled.converter';
import { SimpleDropdown } from 'react-js-dropdavn'
import 'react-js-dropdavn/dist/index.css';
import ExIcon from '../../assets/icon/reload.png'
import getSatoshiPrice from '../../utils/getSatoshiPrice';
import { getCurrencyName } from '../../utils/getCurrencyName';

const Converter = ({currencies, dcp, refresh}) => {

    const [count, setCount] = useState(1);
    const [convertedSymbolPrice, setConvertedSymbolPrice] = useState(null);

    const price = Number(Object.values(dcp)[0])
    const date = new Date(Number(Object.keys(dcp)[0]));
    const timeToShow = date.toDateString() + '  ' + date.toLocaleTimeString();

    const formatter = new Intl.NumberFormat();

    const fxData = Object.keys(currencies).map(fx => ({label: currencies[fx].symbol, value: currencies[fx].last}));
    const [dropdownValue, setDropdownValue] = useState(fxData.filter(fx => fx.label === 'USD')[0])

    useEffect(()=>{
        const satoshiPrice = getSatoshiPrice(dropdownValue.value);
        setConvertedSymbolPrice(count * satoshiPrice * price)
    }, [count, dcp, dropdownValue])
    
    const countHandler = (e) => {if(e.target.value >= 1) setCount(e.target.value)}
    const dropdownHandler = (value) => setDropdownValue(value)


    return (
        <RootConverter>
            <div className='dropdowns'>
                <div className='countDiv'>
                    <input type='number' className='number' value={count} onChange={e => countHandler(e)} />
                    <span>DCP</span> 
                </div>
                <img src={ExIcon} alt="Exchange-icon" />
                <SimpleDropdown
                    options={fxData}
                    labels={{selectedPrefix: 'Convert to'}}
                    onChange={(value) => dropdownHandler(value)}
                    defaultValue={dropdownValue.value}
                    searchable
                    configs={ { position: { y: 'bottom', x: 'center' } } }
                />
            </div>
            {convertedSymbolPrice ? <div className='showPrice'>
                <div><span>{count}</span> DCP crypto currency</div> = 
                <div><span>{formatter.format(convertedSymbolPrice.toFixed(4))}</span> {getCurrencyName(dropdownValue.label)} ({dropdownValue.label})</div>
            </div> : null}
            <div className='time'>{timeToShow}</div>
            <div className='buttons'>
                <button onClick={() => refresh({refresh: true})}>Refresh Price</button>
            </div>
            <div className='priceNow'>Each DCP is equal to <span>{(price / 100000000).toFixed(6)}</span> BTC</div>
        </RootConverter>
    )
}

export default Converter