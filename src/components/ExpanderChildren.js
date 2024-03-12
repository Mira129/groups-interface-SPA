export default function ExpanderChildren({content}) {
    if (content){
        return(
            <>
            {content.map((element, index) => {
                return (<div key={index}>{element.first_name} {element.last_name}</div>);
            })}
            </>
        );
    } else {
        return;
    }
}