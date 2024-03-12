import InterfaceElement from './InterfaceElement.js';
import ExpanderChildren from './ExpanderChildren.js';
import Expander from './Expander.js';


export default function GroupInterface(props) {
    return(
        <div key={props.value.id} className="group-interface">
            <InterfaceElement className="list-item" title="" content ={props.value.name}/>
            <InterfaceElement className="list-avatar" avatar_color={props.value.avatar_color ?? 0} title="" content={props.value.avatar_color ?? 0}/>
            <InterfaceElement className="list-item" title="Тип приватности: " content={props.value.closed ? 'Закрытая' : 'Открытая'}/>
            <InterfaceElement className="list-item" title="Количество подписчиков: " content={props.value.members_count}/>
            <Expander view={props.value.friends} title={`Количество друзей: ${props.value.friends ? props.value.friends.length : 0}`} >
                <ExpanderChildren content={props.value.friends}/>
            </Expander>
        </div> 
    )
}