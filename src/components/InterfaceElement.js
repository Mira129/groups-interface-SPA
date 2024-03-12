export default function InterfaceElement(props) {
    if (props.content){
        return(
            <div className={props.className} style={{ backgroundColor: `${props.avatar_color}` }}>{props.title}{props.content}</div>
        );
    } else {
        return;
    }
}