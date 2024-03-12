import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function Filter({filterFunc, funcParams, title}) {
    let keys = Object.keys(funcParams);

    return (
    <div className='filter'>
        <div className='filterTitle'>{title}</div>
        <ButtonGroup aria-label="Basic example">
            {keys.map((key) => { 
                return(
                    <Button key={key} variant="light" onClick={() =>filterFunc(funcParams[key])}>{key}</Button>
                );
            })}
        </ButtonGroup>
    </div>
    );
}